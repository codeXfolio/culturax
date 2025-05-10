import { ethers } from 'ethers';
import { Request, Response } from 'express';

export default class BlockchainController {
  public provider: ethers.JsonRpcProvider;
  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      'https://rpc.minato.soneium.org/',
    );
  }

  async getBalances(req: Request, res: Response) {
    const { address } = req.body;
    console.log(address);
    const [eth, usdc, cx] = await Promise.all([
      this.provider.getBalance(address),
      this.getTokenBalance.bind(this)(
        address,
        '0xE9A198d38483aD727ABC8b0B1e16B2d338CF0391',
      ),
      this.getTokenBalance.bind(this)(
        address,
        '0x3c364F6195d4002e59B651Eb77D0A0EC80adE305',
      ),
    ]);
    return res.status(200).json({
      success: true,
      data: {
        eth: ethers.formatEther(eth),
        usdc: parseFloat(usdc).toFixed(2),
        cx: parseFloat(cx).toFixed(2),
      },
    });
  }

  async getTokenBalance(address: string, sc: string) {
    try {
      // Create contract interface for ERC20 token
      const erc20Abi = [
        {
          constant: true,
          inputs: [{ name: '_owner', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ name: 'balance', type: 'uint256' }],
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function',
        },
      ];

      // Create contract instance
      const tokenContract = new ethers.Contract(sc, erc20Abi, this.provider);

      // Get balance and decimals
      const [balance, decimals] = await Promise.all([
        tokenContract.balanceOf(address),
        tokenContract.decimals(),
      ]);

      // Format balance with decimals
      const formattedBalance = ethers.formatUnits(balance, decimals);
      return formattedBalance;
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw error;
    }
  }
}
