import fs from 'fs/promises';
import path from 'path';

async function copyTwitterAssets() {
  try {
    // Ensure twitter assets directory exists
    await fs.mkdir('assets/twitter', { recursive: true });

    // Copy logo
    await fs.copyFile(
      'attached_assets/image_1736200111134.png',
      'assets/twitter/logo.png'
    );

    // Copy banner
    await fs.copyFile(
      'attached_assets/image_1736200115136.png',
      'assets/twitter/banner.png'
    );

    console.log('✓ Twitter assets copied successfully');
  } catch (error) {
    console.error('Error copying Twitter assets:', error);
    process.exit(1);
  }
}

copyTwitterAssets();
