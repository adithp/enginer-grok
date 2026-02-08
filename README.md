# Engineer-Grok 🤖

A professional AI chat interface with a two-step processing flow that provides engineering-focused responses. Built with Next.js 15, Google Gemini 2.5 Flash, and Framer Motion.

## ✨ Features

- **Two-Step AI Processing**:
  1. **Prompt Rephrasing**: Automatically rephrases user queries for technical accuracy and engineering context
  2. **Professional Response**: Generates responses from a "Senior Professional AI Software Engineer" persona

- **Sleek Dark UI**: Minimalist, professional dark theme with smooth animations
- **Streaming Responses**: Real-time text streaming for better user experience
- **Framer Motion Animations**: Smooth, professional animations throughout
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **AI**: Google Gemini 2.5 Flash
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.17 or later
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))
- npm or yarn package manager

## 🛠️ Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd engineer-grok
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Google Gemini API key:

```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**How to get your API key**:
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in your `.env.local` file

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**:
   - In Vercel project settings, go to "Environment Variables"
   - Add `GOOGLE_API_KEY` with your API key
   - Add it to all environments (Production, Preview, Development)

4. **Deploy**:
   - Click "Deploy"
   - Your app will be live in ~2 minutes!

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable (when prompted)
# Or add it via dashboard after deployment
```

## 📁 Project Structure

```
engineer-grok/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts       # API endpoint for AI processing
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ChatInterface.tsx      # Main chat UI component
│   └── MessageDisplay.tsx     # Message bubble component
├── .env.example               # Environment variables template
├── .gitignore
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies
├── postcss.config.mjs         # PostCSS configuration
├── README.md                  # This file
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔒 Security Notes

- **Never commit `.env.local`** - it's already in `.gitignore`
- **API keys are server-side only** - they never reach the client
- All AI processing happens in API routes on the server

## 🎨 How It Works

1. **User Input**: User types a question in the chat interface
2. **Rephrasing**: The API route calls Gemini to rephrase the query for technical accuracy
3. **Display Rephrase**: The rephrased query slides in with Framer Motion animation
4. **Engineer Response**: Gemini generates a response with engineering expertise
5. **Streaming**: The response streams in real-time to the UI

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure `.env.local` exists in the root directory
- Verify the key is correct: `GOOGLE_API_KEY=your_key_here`
- Restart the dev server after adding environment variables

### Build fails on Vercel
- Check that `GOOGLE_API_KEY` is added in Vercel environment variables
- Ensure all dependencies are in `package.json`
- Check the build logs for specific errors

### Animations not working
- Clear browser cache
- Ensure Framer Motion is installed: `npm install framer-motion`

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

If you encounter any issues, please open a GitHub issue with:
- Description of the problem
- Steps to reproduce
- Screenshots (if applicable)
- Error messages

---

Built with ❤️ using Next.js and Google Gemini AI
