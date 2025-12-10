# 🌍 TravelCraft AI - Your Perfect Trip Planner

A beautiful, modern PWA travel planner powered by AI. Create personalized day-by-day itineraries with weather forecasts, budget breakdowns, and local tips.

## ✨ Features

- 🤖 **AI-Powered** - Personalized itineraries using Gemini AI
- ☀️ **Weather Forecasts** - Real-time weather for your travel dates
- 💰 **Budget Planning** - Detailed cost breakdowns and estimates
- 🗺️ **Google Maps Integration** - Direct links to all locations
- 📱 **Progressive Web App** - Install on your phone, works offline
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- n8n workflow running at `https://workflowly.online`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 PWA Installation

Users can install the app on their devices:

1. **Mobile (iOS/Android)**:
   - Open in Safari/Chrome
   - Tap "Add to Home Screen"
   - App appears like a native app!

2. **Desktop (Chrome/Edge)**:
   - Look for install icon in address bar
   - Click to install
   - Opens in its own window

## 🛠️ Built With

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **next-pwa** - Progressive Web App support
- **Lucide React** - Beautiful icons
- **n8n** - Backend workflow automation
- **Gemini AI** - AI-powered itinerary generation

## 🎨 PWA Icons

The app needs icons for PWA installation. Add PNG icons to `/public/icons/`:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

You can use tools like [Favicon Generator](https://realfavicongenerator.net/) to create all sizes from a single image.

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel auto-deploys on every push

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Environment Variables

No environment variables needed! The app connects directly to your n8n webhook.

## 🔧 Configuration

Update the webhook URL in `app/page.tsx`:

```typescript
const response = await fetch('https://workflowly.online/webhook-test/travel-planner', {
  // ... your webhook URL
});
```

## 📱 Mobile Experience

The app is fully responsive and works beautifully on:
- 📱 iPhone/Android phones
- 📱 Tablets
- 💻 Desktop
- 🖥️ Large screens

## 🎯 Usage

1. Enter your destination
2. Select travel dates
3. Set your budget
4. Choose interests (food, culture, adventure, etc.)
5. Select travel style (budget, moderate, luxury)
6. Click "Plan My Perfect Trip"
7. Wait ~20 seconds for AI to create your itinerary
8. Explore your day-by-day plan with maps and tips!

## 🤝 Contributing

Feel free to fork and improve!

## 📄 License

MIT License - feel free to use this for your own projects!

## 🙏 Acknowledgments

- Gemini AI for powering the itinerary generation
- n8n for workflow automation
- Next.js team for amazing framework
- You for building something cool!

---

Made with ❤️ using AI • Built with Next.js & Gemini

