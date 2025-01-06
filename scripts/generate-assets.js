import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

async function generateAssets() {
  try {
    // Ensure assets directory exists
    await fs.mkdir('assets', { recursive: true });

    // Read the SVG file
    const logoSvg = await fs.readFile('assets/logo.svg');

    // Generate logo PNG
    await sharp(logoSvg)
      .resize(400, 400)
      .png()
      .toFile('assets/generated-logo.png');

    console.log('✓ Generated logo PNG');

    // Generate banner by extending the logo design
    const bannerSvg = await fs.readFile('assets/banner.svg');
    
    await sharp(bannerSvg)
      .resize(1500, 500)
      .png()
      .toFile('assets/generated-banner.png');

    console.log('✓ Generated banner PNG');
  } catch (error) {
    console.error('Error generating assets:', error);
    process.exit(1);
  }
}

generateAssets();
