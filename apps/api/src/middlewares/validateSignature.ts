import { Request, Response, NextFunction } from 'express';
import { ethers } from 'ethers';

const WELCOME_MESSAGE = 'Welcome to CulturaX';

const validateSignature = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const signature = req.headers['x-eth-signature'];
    const address = req.headers['x-eth-address'];

    if (!signature || !address) {
      res.status(401).json({
        success: false,
        message: 'Missing signature or address in headers',
      });
      return;
    }

    // Verify the signature
    const signerAddr = ethers.verifyMessage(
      WELCOME_MESSAGE,
      signature as string,
    );

    // Check if the recovered address matches the provided address
    if (signerAddr.toLowerCase() !== (address as string).toLowerCase()) {
      res.status(401).json({
        success: false,
        message: 'Invalid signature',
      });
      return;
    }

    // Attach the verified address to the request object
    req.ethAddress = signerAddr;

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
