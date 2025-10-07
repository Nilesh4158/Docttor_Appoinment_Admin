# Prescripto Full-Stack Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Prepare Your Project for Deployment

#### Frontend Environment Variables
Create `.env` file in frontend folder:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

#### Admin Environment Variables  
Create `.env` file in admin folder:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
```

#### Backend Environment Variables
Update your backend `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@gmail.com
ADMIN_PASSWORD=admin
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
PORT=4000
```

### 2. Option A: Vercel + Render (Recommended)

#### Deploy Backend to Render:
1. Go to https://render.com
2. Sign up and connect GitHub
3. Create "New Web Service"
4. Connect your repository
5. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node server.js`
   - **Environment**: Add all your env variables
6. Deploy

#### Deploy Frontend to Vercel:
1. Go to https://vercel.com
2. Import your GitHub repository
3. Settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add VITE_BACKEND_URL
4. Deploy

#### Deploy Admin to Vercel:
1. Create another Vercel project
2. Same repository
3. Settings:
   - **Root Directory**: `admin`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**: Add VITE_BACKEND_URL
4. Deploy

### 3. Option B: All on Render

#### Backend (Web Service):
- Build Command: `npm install`
- Start Command: `npm start`

#### Frontend (Static Site):
- Build Command: `cd frontend && npm install && npm run build`
- Publish Directory: `frontend/dist`

#### Admin (Static Site):
- Build Command: `cd admin && npm install && npm run build`
- Publish Directory: `admin/dist`

### 4. Update Frontend/Admin API URLs

After backend deployment, update your frontend and admin code to use the live backend URL instead of localhost:4000.

### 5. Your Live URLs will be:
- **Frontend**: `https://prescripto-frontend.vercel.app`
- **Admin Panel**: `https://prescripto-admin.vercel.app`  
- **Backend API**: `https://prescripto-backend.onrender.com`

## 🔧 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB Atlas (cloud) database set up
- [ ] Cloudinary account configured
- [ ] Frontend/Admin pointing to live backend URL
- [ ] CORS configured in backend for your domains
- [ ] All dependencies in package.json
- [ ] Build commands working locally

## 🌐 Alternative Quick Options

### Netlify (Frontend/Admin):
1. Build your projects locally: `npm run build`
2. Drag & drop the `dist` folders to netlify.com
3. Configure environment variables in Netlify dashboard

### Heroku (Backend):
1. Install Heroku CLI
2. `heroku create prescripto-backend`
3. `git push heroku main`
4. Configure environment variables in Heroku dashboard

## 📱 Mobile App (Future):
Consider deploying as PWA or creating React Native/Flutter versions for mobile stores.

## 🔐 Security Notes:
- Use environment variables for all secrets
- Enable HTTPS only
- Configure CORS properly
- Use strong JWT secrets
- Validate all inputs

## 💡 Pro Tips:
- Use MongoDB Atlas for database (not local MongoDB)
- Set up automatic deployments from GitHub
- Monitor your applications with uptime checkers
- Consider CDN for better performance
- Set up custom domains for professional look