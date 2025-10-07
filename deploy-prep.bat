@echo off
REM Prescripto Deployment Preparation Script for Windows
REM Run this before deploying to ensure everything is ready

echo 🚀 Preparing Prescripto for Deployment...

REM Check if we're in the right directory
if not exist "frontend" (
    echo ❌ Error: frontend folder not found
    goto :error
)
if not exist "admin" (
    echo ❌ Error: admin folder not found
    goto :error
)
if not exist "backend" (
    echo ❌ Error: backend folder not found
    goto :error
)

echo 📦 Installing dependencies...

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
echo Building frontend...
call npm run build
cd ..

REM Install admin dependencies  
echo Installing admin dependencies...
cd admin
call npm install
echo Building admin panel...
call npm run build
cd ..

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo ✅ All dependencies installed and builds completed!

echo 🔧 Next steps:
echo 1. Push your code to GitHub
echo 2. Deploy backend to Render.com or Railway
echo 3. Deploy frontend to Vercel
echo 4. Deploy admin to Vercel
echo 5. Update environment variables with live URLs

echo 📋 Quick deployment links:
echo • Render: https://render.com
echo • Vercel: https://vercel.com
echo • Railway: https://railway.app
echo • Netlify: https://netlify.com

echo 🎉 Ready for deployment!
goto :end

:error
echo ❌ Please run this script from the prescripto-full-stack root directory
pause
exit /b 1

:end
pause