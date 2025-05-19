import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';
import { http } from 'viem';
import { createPublicClient } from 'viem';
import { soneiumMinato } from 'viem/chains';

const WELCOME_MESSAGE = 'Welcome to CulturaX';

const validateSignature = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const signature = req.headers['x-eth-signature'];
    const address = req.headers['x-eth-address'];

    if (req.path === '/top') {
      next();
      return;
    }

    if (!signature || !address) {
      res.status(401).json({
        success: false,
        message: 'Missing signature or address in headers',
      });
      return;
    }

    const publicClient = createPublicClient({
      transport: http(),
      chain: soneiumMinato,
    });
    const valid = await publicClient.verifyMessage({
      message: WELCOME_MESSAGE,
      signature: signature as `0x${string}`,
      address: address as `0x${string}`,
    });

    // Check if the recovered address matches the provided address
    if (!valid) {
      res.status(401).json({
        success: false,
        message: 'Invalid signature',
      });
      return;
    }

    // Attach the verified address to the request object
    req.ethAddress = address as `0x${string}`;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid signature format',
    });
    return;
  }
};

export default validateSignature;
