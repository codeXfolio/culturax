// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CulturaXToken is ERC20, Ownable {
    uint256 public maxTransactionAmount;
    uint256 public maxWalletBalance;
    uint256 public cooldownPeriod;

    mapping(address => uint256) public lastTransactionTime;
    mapping(address => bool) public isExcludedFromLimits;

    event MaxTransactionAmountUpdated(uint256 newAmount);
    event MaxWalletBalanceUpdated(uint256 newAmount);
    event CooldownPeriodUpdated(uint256 newPeriod);
    event ExcludedFromLimits(address account, bool excluded);

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 _maxTransactionAmount,
        uint256 _maxWalletBalance,
        uint256 _cooldownPeriod
    ) ERC20(name, symbol) Ownable(msg.sender) {
        require(
            _maxTransactionAmount > 0,
            "Max transaction amount must be greater than 0"
        );
        require(
            _maxWalletBalance > 0,
            "Max wallet balance must be greater than 0"
        );

        maxTransactionAmount = _maxTransactionAmount;
        maxWalletBalance = _maxWalletBalance;
        cooldownPeriod = _cooldownPeriod;

        // Exclude owner from limits
        isExcludedFromLimits[msg.sender] = true;

        // Mint initial supply without restrictions
        _mint(msg.sender, initialSupply);
    }

    function _update(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        require(amount > 0, "Transfer amount must be greater than 0");

        // Skip restrictions for minting and burning
        if (from == address(0) || to == address(0)) {
            super._update(from, to, amount);
            return;
        }

        if (!isExcludedFromLimits[from]) {
            require(
                amount <= maxTransactionAmount,
                "Transfer amount exceeds max transaction amount"
            );
            require(
                balanceOf(to) + amount <= maxWalletBalance,
                "Transfer would exceed max wallet balance"
            );
            require(
                block.timestamp >= lastTransactionTime[from] + cooldownPeriod,
                "Must wait for cooldown period"
            );

            lastTransactionTime[from] = block.timestamp;
        }

        super._update(from, to, amount);
    }

    function setMaxTransactionAmount(
        uint256 _maxTransactionAmount
    ) external onlyOwner {
        require(
            _maxTransactionAmount > 0,
            "Max transaction amount must be greater than 0"
        );
        maxTransactionAmount = _maxTransactionAmount;
        emit MaxTransactionAmountUpdated(_maxTransactionAmount);
    }

    function setMaxWalletBalance(uint256 _maxWalletBalance) external onlyOwner {
        require(
            _maxWalletBalance > 0,
            "Max wallet balance must be greater than 0"
        );
        maxWalletBalance = _maxWalletBalance;
        emit MaxWalletBalanceUpdated(_maxWalletBalance);
    }

    function setCooldownPeriod(uint256 _cooldownPeriod) external onlyOwner {
        cooldownPeriod = _cooldownPeriod;
        emit CooldownPeriodUpdated(_cooldownPeriod);
    }

    function excludeFromLimits(
        address account,
        bool excluded
    ) external onlyOwner {
        isExcludedFromLimits[account] = excluded;
        emit ExcludedFromLimits(account, excluded);
    }
}
