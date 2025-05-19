// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SubscriptionManager is Ownable, Pausable, ReentrancyGuard {
    using Address for address payable;

    // USDC token address
    IERC20 public immutable usdcToken;

    enum SubscriptionStatus {
        ACTIVE,
        CANCELLED,
        EXPIRED
    }

    enum PayoutSchedule {
        MONTHLY,
        WEEKLY,
        BIWEEKLY
    }

    enum PaymentToken {
        ETH,
        USDC
    }

    // Optimized struct packing
    struct Subscription {
        address subscriber; // 20 bytes
        address creator; // 20 bytes
        uint48 startDate; // 6 bytes
        uint48 endDate; // 6 bytes
        uint128 amount; // 16 bytes
        SubscriptionStatus status; // 1 byte
        PaymentToken paymentToken; // 1 byte
        // Total: 70 bytes (3 slots)
    }

    // Optimized struct packing
    struct CreatorSettings {
        uint128 price; // 16 bytes
        PayoutSchedule payoutSchedule; // 1 byte
        bool isActive; // 1 byte
        PaymentToken paymentToken; // 1 byte
        // Total: 19 bytes (1 slot)
    }

    // Mapping from creator address to their settings
    mapping(address => CreatorSettings) private _creatorSettings;

    // Mapping from subscription ID to Subscription
    mapping(uint256 => Subscription) private _subscriptions;

    // Mapping from subscriber address to their active subscription IDs
    mapping(address => uint256[]) private _subscriberSubscriptions;

    // Mapping from creator address to their subscription IDs
    mapping(address => uint256[]) private _creatorSubscriptions;

    // Mapping from creator address to their earnings
    mapping(address => uint256) private _creatorEarnings;
    mapping(address => uint256) private _creatorUSDCearnings;

    // Total number of subscriptions
    uint256 private _totalSubscriptions;

    // Constants
    uint256 public constant MIN_WITHDRAWAL_AMOUNT = 0.01 ether;
    uint256 public constant MIN_USDC_WITHDRAWAL_AMOUNT = 1000000; // 1 USDC (6 decimals)
    uint256 public constant MAX_PRICE = 1000 ether;
    uint256 private constant MONTHLY_DURATION = 30 days;
    uint256 private constant WEEKLY_DURATION = 7 days;
    uint256 private constant BIWEEKLY_DURATION = 14 days;

    // Events
    event SubscriptionCreated(
        uint256 indexed id,
        address indexed subscriber,
        address indexed creator,
        uint256 amount,
        uint256 startDate,
        uint256 endDate,
        PaymentToken paymentToken
    );
    event SubscriptionCancelled(uint256 indexed id);
    event SubscriptionExpired(uint256 indexed id);
    event CreatorSettingsUpdated(
        address indexed creator,
        uint256 price,
        PayoutSchedule payoutSchedule,
        PaymentToken paymentToken
    );
    event Withdrawal(
        address indexed creator,
        address indexed destination,
        uint256 ethAmount,
        uint256 usdcAmount,
        uint256 timestamp
    );

    constructor(address _usdcAddress) Ownable(msg.sender) {
        require(_usdcAddress != address(0), "Invalid USDC address");
        usdcToken = IERC20(_usdcAddress);
    }

    // Function to set or update creator settings
    function setCreatorSettings(
        uint256 _price,
        PayoutSchedule _payoutSchedule,
        PaymentToken _paymentToken
    ) external whenNotPaused {
        require(_price > 0, "Price must be greater than 0");
        require(_price <= MAX_PRICE, "Price exceeds maximum limit");

        _creatorSettings[msg.sender] = CreatorSettings({
            price: uint128(_price),
            payoutSchedule: _payoutSchedule,
            isActive: true,
            paymentToken: _paymentToken
        });

        emit CreatorSettingsUpdated(
            msg.sender,
            _price,
            _payoutSchedule,
            _paymentToken
        );
    }

    // Function to subscribe to a creator
    function subscribe(
        address creator
    ) external payable nonReentrant whenNotPaused {
        require(creator != address(0), "Invalid creator address");
        require(creator != msg.sender, "Cannot subscribe to self");

        CreatorSettings memory settings = _creatorSettings[creator];
        require(settings.isActive, "Creator is not accepting subscriptions");

        uint256 paymentAmount;
        if (settings.paymentToken == PaymentToken.ETH) {
            require(msg.value > 0, "Payment must be greater than 0");
            require(msg.value >= settings.price, "Insufficient payment");
            paymentAmount = msg.value;
        } else {
            require(msg.value == 0, "ETH payment not accepted");
            require(
                usdcToken.transferFrom(
                    msg.sender,
                    address(this),
                    settings.price
                ),
                "USDC transfer failed"
            );
            paymentAmount = settings.price;
        }

        // Calculate subscription duration based on payout schedule
        uint256 duration;
        if (settings.payoutSchedule == PayoutSchedule.MONTHLY) {
            duration = MONTHLY_DURATION;
        } else if (settings.payoutSchedule == PayoutSchedule.WEEKLY) {
            duration = WEEKLY_DURATION;
        } else {
            duration = BIWEEKLY_DURATION;
        }

        // Create new subscription
        uint256 subscriptionId = _totalSubscriptions++;
        uint256 startDate = block.timestamp;
        uint256 endDate = startDate + duration;

        _subscriptions[subscriptionId] = Subscription({
            subscriber: msg.sender,
            creator: creator,
            amount: uint128(paymentAmount),
            startDate: uint48(startDate),
            endDate: uint48(endDate),
            status: SubscriptionStatus.ACTIVE,
            paymentToken: settings.paymentToken
        });

        // Update subscriber and creator mappings
        _subscriberSubscriptions[msg.sender].push(subscriptionId);
        _creatorSubscriptions[creator].push(subscriptionId);

        // Add to creator's earnings
        if (settings.paymentToken == PaymentToken.ETH) {
            _creatorEarnings[creator] += paymentAmount;
        } else {
            _creatorUSDCearnings[creator] += paymentAmount;
        }

        emit SubscriptionCreated(
            subscriptionId,
            msg.sender,
            creator,
            paymentAmount,
            startDate,
            endDate,
            settings.paymentToken
        );
    }

    // Function to cancel subscription
    function cancelSubscription(
        uint256 subscriptionId
    ) external nonReentrant whenNotPaused {
        require(
            subscriptionId < _totalSubscriptions,
            "Invalid subscription ID"
        );

        Subscription storage subscription = _subscriptions[subscriptionId];
        require(
            subscription.subscriber == msg.sender,
            "Only subscriber can cancel"
        );
        require(
            subscription.status == SubscriptionStatus.ACTIVE,
            "Subscription is not active"
        );
        require(
            block.timestamp < subscription.endDate,
            "Subscription already expired"
        );

        subscription.status = SubscriptionStatus.CANCELLED;
        emit SubscriptionCancelled(subscriptionId);
    }

    // Function to withdraw earnings
    function withdraw(address destination) external nonReentrant whenNotPaused {
        require(destination != address(0), "Invalid destination address");
        uint256 ethEarnings = _creatorEarnings[msg.sender];
        uint256 usdcEarnings = _creatorUSDCearnings[msg.sender];

        require(
            ethEarnings >= MIN_WITHDRAWAL_AMOUNT ||
                usdcEarnings >= MIN_USDC_WITHDRAWAL_AMOUNT,
            "Insufficient earnings for withdrawal"
        );

        // Reset earnings before transfer to prevent reentrancy
        _creatorEarnings[msg.sender] = 0;
        _creatorUSDCearnings[msg.sender] = 0;

        // Transfer ETH if available
        if (ethEarnings > 0) {
            payable(destination).sendValue(ethEarnings);
        }

        // Transfer USDC if available
        if (usdcEarnings > 0) {
            require(
                usdcToken.transfer(destination, usdcEarnings),
                "USDC transfer failed"
            );
        }

        emit Withdrawal(
            msg.sender,
            destination,
            ethEarnings,
            usdcEarnings,
            block.timestamp
        );
    }

    // Function to check if a subscription is valid
    function isValidSubscription(
        address subscriber,
        address creator
    ) external view returns (bool) {
        require(subscriber != address(0), "Invalid subscriber address");
        require(creator != address(0), "Invalid creator address");

        uint256[] memory subscriberSubs = _subscriberSubscriptions[subscriber];
        uint256 length = subscriberSubs.length;
        for (uint256 i = 0; i < length; ) {
            Subscription memory sub = _subscriptions[subscriberSubs[i]];
            if (
                sub.creator == creator &&
                sub.status == SubscriptionStatus.ACTIVE &&
                block.timestamp <= sub.endDate
            ) {
                return true;
            }
            unchecked {
                ++i;
            }
        }
        return false;
    }

    // Function to get subscription details
    function getSubscription(
        uint256 subscriptionId
    ) external view returns (Subscription memory) {
        require(
            subscriptionId < _totalSubscriptions,
            "Invalid subscription ID"
        );
        return _subscriptions[subscriptionId];
    }

    // Function to get creator settings
    function getCreatorSettings(
        address creator
    ) external view returns (CreatorSettings memory) {
        require(creator != address(0), "Invalid creator address");
        return _creatorSettings[creator];
    }

    // Function to get subscriber's active subscriptions
    function getSubscriberSubscriptions(
        address subscriber
    ) external view returns (uint256[] memory) {
        require(subscriber != address(0), "Invalid subscriber address");
        return _subscriberSubscriptions[subscriber];
    }

    // Function to get creator's subscriptions
    function getCreatorSubscriptions(
        address creator
    ) external view returns (uint256[] memory) {
        require(creator != address(0), "Invalid creator address");
        return _creatorSubscriptions[creator];
    }

    // Function to get creator's earnings
    function getCreatorEarnings(
        address creator
    ) external view returns (uint256) {
        require(creator != address(0), "Invalid creator address");
        return _creatorEarnings[creator];
    }

    // Function to get creator's USDC earnings
    function getCreatorUSDCearnings(
        address creator
    ) external view returns (uint256) {
        require(creator != address(0), "Invalid creator address");
        return _creatorUSDCearnings[creator];
    }

    // Emergency pause function for owner
    function pause() external onlyOwner {
        _pause();
    }

    // Emergency unpause function for owner
    function unpause() external onlyOwner {
        _unpause();
    }

    // Function to get total subscriptions
    function totalSubscriptions() external view returns (uint256) {
        return _totalSubscriptions;
    }
}
