import { ethers } from 'ethers';

const WELCOME_MESSAGE = 'Welcome to CulturaX';

async function generateSignature() {
  try {
    // Create a new random wallet
    const wallet = ethers.Wallet.createRandom();

    // Sign the welcome message
    const signature = await wallet.signMessage(WELCOME_MESSAGE);

    console.log('\nš Test Credentials Generated:\n');
    console.log('š Private Key:', wallet.privateKey);
    console.log('š Address:', wallet.address);

    console.log('\nš To use in API requests, set these headers:');
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
