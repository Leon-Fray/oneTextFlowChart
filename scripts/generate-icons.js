const fs = require('fs');
const path = require('path');

// Create a simple colored square with a checkmark
const generateIcon = (size) => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" rx="${size/5}" fill="#2563EB"/>
  <path d="M${size*0.25} ${size*0.5}L${size*0.375} ${size*0.625}L${size*0.75} ${size*0.375}" stroke="white" stroke-width="${size*0.0625}" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

  return svg;
};

// Generate icons in different sizes
const sizes = [16, 48, 128];
const outputDir = path.join(__dirname, '../public/assets/icons');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate each icon
sizes.forEach(size => {
  const svg = generateIcon(size);
  fs.writeFileSync(path.join(outputDir, `icon${size}.png`), svg);
  console.log(`Generated icon${size}.png`);
}); 