# TipJar Deployment Guide

## 🚀 Deployment Options

TipJar is a **full-stack Node.js application** with an Express backend server. Choose the deployment option that works best for you:

### ✅ **Option 1: Render.com (Recommended)**

**Perfect for full-stack Node.js apps like TipJar!**

1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your `itswalshy/projectTipjar` repository
5. Configure:
   - **Name**: `tipjar`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18`
6. Add Environment Variables:
   ```
   OCR_ENGINE=azure
   AZURE_DI_KEY=YOUR_AZURE_DOCUMENT_INTELLIGENCE_KEY
   AZURE_DI_ENDPOINT=YOUR_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT
   SESSION_SECRET=tipjar-secure-session-secret-2025
   ```
7. Click "Create Web Service"

**Benefits:**
- ✅ **FREE tier** available
- ✅ **Built for Node.js** apps
- ✅ **Auto-deploys** on GitHub push
- ✅ **Works with Sharp/Tesseract** (native modules)
- ✅ **No code changes** needed

---

### ✅ **Option 2: Railway.app**

**Also great for Node.js apps!**

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `itswalshy/projectTipjar`
5. Add the same environment variables as above
6. Deploy!

**Benefits:**
- ✅ **FREE tier** available
- ✅ **Easy GitHub** integration
- ✅ **Auto-deploys** on push
- ✅ **Works with native** modules

---

### ⚠️ **Option 3: Netlify (Requires Refactoring)**

**Netlify is designed for static sites and serverless functions.**

To use Netlify, you would need to:
1. **Convert backend to Netlify Functions** (major refactor)
2. **Split frontend/backend** into separate repos
3. **May not work** with Sharp/Tesseract native modules
4. **Complex setup** for OCR processing

**Not recommended** for this app without significant changes.

---

## 🔧 **Environment Variables**

All deployment platforms need these variables:

### Required for Azure OCR:
```bash
OCR_ENGINE=azure
AZURE_DI_KEY=YOUR_AZURE_DOCUMENT_INTELLIGENCE_KEY
AZURE_DI_ENDPOINT=YOUR_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT
```

### Optional (but recommended):
```bash
SESSION_SECRET=tipjar-secure-session-secret-2025
```

### Fallback (if no Azure):
```bash
OCR_ENGINE=tesseract
# No additional variables needed - uses offline Tesseract
```

---

## 📊 **Performance Comparison**

| Platform | Setup Time | Cost | OCR Support | Native Modules | Auto-Deploy |
|----------|------------|------|-------------|----------------|-------------|
| **Render** | 5 min | Free | ✅ Full | ✅ Yes | ✅ Yes |
| **Railway** | 5 min | Free | ✅ Full | ✅ Yes | ✅ Yes |
| **Netlify** | 2+ hours | Free | ⚠️ Limited | ❌ No | ✅ Yes |

---

## 🎯 **My Recommendation**

**Use Render.com!** It's:
- ✅ **Perfect** for your Node.js app
- ✅ **FREE** tier with generous limits
- ✅ **No code changes** required
- ✅ **Works with Azure Document Intelligence**
- ✅ **Auto-deploys** on GitHub push

---

## 🚀 **Quick Start with Render**

1. **Go to**: https://render.com
2. **Sign in** with GitHub
3. **Click**: "New +" → "Web Service"
4. **Connect**: `itswalshy/projectTipjar`
5. **Configure**:
   - Build: `npm install --legacy-peer-deps && npm run build`
   - Start: `npm start`
6. **Add env vars** (see above)
7. **Deploy!**

**That's it!** Your TipJar will be live with 95-98% OCR accuracy! 🎉

---

## 🔒 **Security Notes**

- ✅ **API keys are secure** in environment variables
- ✅ **Never commit** `.env` files to git
- ✅ **Azure Document Intelligence** doesn't train on your data
- ✅ **24-hour deletion** of uploaded images

---

## 📞 **Need Help?**

- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Azure Setup**: See `AZURE_DOCUMENT_INTELLIGENCE.md`

**Happy deploying!** 🚀

