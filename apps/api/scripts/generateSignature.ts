import { ethers } from 'ethers';

const WELCOME_MESSAGE = 'Welcome to CulturaX';

async function generateSignature() {
  try {
    // Create a new random wallet
    const wallet = ethers.Wallet.createRandom();

    // Sign the welcome message
    const signature = await wallet.signMessage(WELCOME_MESSAGE);

    console.log('š Test Credentials Generated:\n');

    console.log('x-eth-address:', wallet.address);
    console.log('x-eth-signature:', signature);

    // Verify the signature (as a test)
    const recoveredAddr = ethers.verifyMessage(WELCOME_MESSAGE, signature);
    console.log(
      '\nš Verification:',
      recoveredAddr === wallet.address
        ? 'Signature is valid!'
        : 'Signature verification failed!',
    );
  } catch (error) {
    console.error('Error generating signature:', error);
  }
}

// Run the function
generateSignature();
