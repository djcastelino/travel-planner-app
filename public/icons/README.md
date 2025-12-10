# PWA Icons

This folder should contain PNG icons for the Progressive Web App.

## Required Icons

Create PNG files with these exact names:

- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

## Quick Way to Generate Icons

### Option 1: Use Favicon Generator (Recommended)
1. Go to https://realfavicongenerator.net/
2. Upload a square image (at least 512x512px)
3. Download all sizes
4. Place them in this folder

### Option 2: Use ImageMagick
If you have ImageMagick installed:

```bash
# Create a simple colored square as placeholder
convert -size 512x512 xc:#667eea icon-512x512.png
convert -resize 384x384 icon-512x512.png icon-384x384.png
convert -resize 192x192 icon-512x512.png icon-192x192.png
convert -resize 152x152 icon-512x512.png icon-152x152.png
convert -resize 144x144 icon-512x512.png icon-144x144.png
convert -resize 128x128 icon-512x512.png icon-128x128.png
convert -resize 96x96 icon-512x512.png icon-96x96.png
convert -resize 72x72 icon-512x512.png icon-72x72.png
```

### Option 3: Use online tool
- https://www.pwabuilder.com/imageGenerator
- Upload your logo
- Download all sizes

## Recommended Image

Use a simple, recognizable icon like:
- Airplane ✈️
- Globe 🌍
- Compass 🧭
- Suitcase 🧳

Colors that match the app theme:
- Purple: #667eea
- Pink: #764ba2

