# 🚀 Prescripto Live Deployment - Complete Guide

## 📋 Pre-Deployment Checklist

### ✅ 1. Prepare Your Code
- [ ] All code committed to Git
- [ ] Remove console.logs and debug code
- [ ] Environment variables configured
- [ ] CORS updated for production domains

### ✅ 2. Database Setup
- [ ] MongoDB Atlas account created
- [ ] Database connection string updated
- [ ] Sample data populated (if needed)

### ✅ 3. Cloud Services
- [ ] Cloudinary account configured
- [ ] All API keys secured in environment variables

---

## 🌐 Deployment Steps

### Step 1: Deploy Backend (Render.com - Recommended)

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Create New Web Service**
4. **Connect your repository**
5. **Configuration:**
   ```
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```
6. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://nilesh:nilesh123@cluster0.st4055e.mongodb.net/prescripto
   JWT_SECRET=greatstack
   ADMIN_EMAIL=admin@gmail.com
   ADMIN_PASSWORD=admin
   CLOUDINARY_CLOUD_NAME=digdpiy7n
   CLOUDINARY_API_KEY=836493526693788
   CLOUDINARY_API_SECRET=X0YGWqHH-fEk0K4fixMLM1CMuks
   NODE_ENV=production
   ```
7. **Deploy**

**Your Backend URL:** `https://prescripto-backend-xyz.onrender.com`

### Step 2: Deploy Frontend (Vercel - Recommended)

1. **Go to [Vercel.com](https://vercel.com)**
2. **Import from GitHub**
3. **Configuration:**
   ```
   Root Directory: frontend
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Environment Variables:**
   ```
   VITE_BACKEND_URL=https://prescripto-backend-xyz.onrender.com
   ```
5. **Deploy**

**Your Frontend URL:** `https://prescripto-frontend.vercel.app`

### Step 3: Deploy Admin Panel (Vercel)

1. **Create another Vercel project**
2. **Same repository**
3. **Configuration:**
   ```
   Root Directory: admin
   Framework: Vite
   Build Command: npm run build
   Output Directory: dist
   ```
4. **Environment Variables:**
   ```
   VITE_BACKEND_URL=https://prescripto-backend-xyz.onrender.com
   ```
5. **Deploy**

**Your Admin URL:** `https://prescripto-admin.vercel.app`

---

## 🔗 Your Live Links

After deployment, you'll have:

### 🌟 **Frontend (Patient Portal)**
- **URL:** `https://prescripto-frontend.vercel.app`
- **Features:** Doctor search, appointments, profiles, health info

### 🏥 **Admin Panel**
- **URL:** `https://prescripto-admin.vercel.app`
- **Login:** admin@gmail.com / admin
- **Features:** Doctor approval, patient management, appointments

### ⚙️ **Backend API**
- **URL:** `https://prescripto-backend-xyz.onrender.com`
- **Endpoints:** All your API routes for frontend/admin

---

## 📱 Alternative Deployment Options

### Option A: All on Netlify
1. Build projects locally: `npm run build`
2. Drag & drop `dist` folders to netlify.com
3. Set environment variables in Netlify dashboard

### Option B: Railway for Backend
1. Connect GitHub to Railway.app
2. Deploy backend with auto-deploy
3. Set environment variables

### Option C: Heroku (Paid)
1. Install Heroku CLI
2. `heroku create prescripto-backend`
3. Configure buildpacks and environment

---

## 🔧 Post-Deployment Tasks

### 1. Update CORS in Backend
Add your live URLs to the CORS configuration:
```javascript
const allowedOrigins = [
  'https://prescripto-frontend.vercel.app',
  'https://prescripto-admin.vercel.app'
];
```

### 2. Test Everything
- [ ] Frontend loads correctly
- [ ] Admin login works
- [ ] API endpoints respond
- [ ] Database operations work
- [ ] File uploads work
- [ ] Email notifications (if any)

### 3. Custom Domains (Optional)
- Purchase domains from Namecheap, GoDaddy, etc.
- Configure DNS in Vercel/Netlify
- Set up SSL certificates (auto-handled)

---

## 🎯 Quick Deployment Commands

### Windows Users:
```cmd
# Run the preparation script
deploy-prep.bat

# Then follow deployment steps above
```

### Mac/Linux Users:
```bash
# Run the preparation script
chmod +x deploy-prep.sh
./deploy-prep.sh

# Then follow deployment steps above
```

---

## 🔐 Security Checklist

- [ ] All sensitive data in environment variables
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] CORS properly configured
- [ ] JWT secrets are strong
- [ ] Database access restricted
- [ ] API rate limiting (consider adding)

---

## 📊 Monitoring & Maintenance

### Free Monitoring Tools:
- **Uptime Robot** - Monitor if sites are up
- **Render Dashboard** - Backend logs and metrics
- **Vercel Analytics** - Frontend performance
- **MongoDB Atlas** - Database monitoring

### Regular Tasks:
- Check error logs weekly
- Monitor database storage
- Update dependencies monthly
- Backup database regularly

---

## 🎉 Share Your Project

Once deployed, you can share these links:

### For General Users:
**"Check out my healthcare platform: https://prescripto-frontend.vercel.app"**

### For Admins/Reviewers:
**"Admin panel: https://prescripto-admin.vercel.app (admin@gmail.com / admin)"**

### For Developers:
**"GitHub: https://github.com/yourusername/prescripto-full-stack"**
**"API Documentation: https://prescripto-backend-xyz.onrender.com/api"**

---

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update allowed origins in backend
2. **Environment Variables**: Double-check all are set
3. **Build Failures**: Check package.json scripts
4. **Database Connection**: Verify MongoDB URI
5. **API Not Working**: Check backend logs in Render

### Support:
- Vercel: Check build logs in dashboard
- Render: Check deployment logs
- MongoDB: Check connection in Atlas dashboard

---

## 💡 Pro Tips

1. **Custom Domains**: Buy domains for professional look
2. **Analytics**: Add Google Analytics to track usage
3. **SEO**: Add meta tags and sitemap
4. **Performance**: Enable CDN and compression
5. **Backup**: Regular database backups
6. **Updates**: Set up auto-deploy from GitHub
7. **SSL**: All platforms provide free SSL
8. **Mobile**: Test on mobile devices

---

**🎊 Congratulations! Your Prescripto platform is now LIVE and accessible worldwide!**