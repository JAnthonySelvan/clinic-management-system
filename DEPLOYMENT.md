# Clinic Management System - Production Deployment Guide

This guide provides step-by-step instructions for deploying the **Clinic Management System** to production.

---

## 📋 Table of Contents
1. [Prerequisites & Database Setup](#1-prerequisites--database-setup)
2. [Option A: Decoupled Deployment (Render Backend + Vercel Frontend)](#option-a-decoupled-deployment-render-backend--vercel-frontend)
3. [Option B: Unified Single-Server Deployment (Render / Railway / VPS)](#option-b-unified-single-server-deployment-render--railway--vps)
4. [Option C: Docker Container Deployment](#option-c-docker-container-deployment)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Post-Deployment Verification Checklist](#post-deployment-verification-checklist)

---

## 1. Prerequisites & Database Setup

### Step 1.1: Set up MongoDB Atlas (Cloud Database)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log in or create an account.
2. Create a **Shared Cluster** (Free tier).
3. Under **Security -> Database Access**, create a database user with read/write permissions to any database. Note down the username & password.
4. Under **Security -> Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`) so deployment hosts (Render, Vercel, Railway) can connect to the database.
5. Click **Connect -> Drivers -> Node.js** and copy your MongoDB connection string (`MONGODB_URI`).

---

## Option A: Decoupled Deployment (Render Backend + Vercel Frontend)

### Step A.1: Deploy Backend to Render
1. Sign in to [Render.com](https://render.com/).
2. Click **New + -> Web Service**.
3. Connect your GitHub / Git repository.
4. Configure the service settings:
   - **Name**: `clinic-management-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add the following **Environment Variables**:
   - `NODE_ENV`: `production`
   - `PORT`: `5000` (or leave default assigned by Render)
   - `MONGODB_URI`: *Your MongoDB Atlas Connection String*
   - `JWT_SECRET`: *A random strong secret string*
   - `JWT_EXPIRES_IN`: `7d`
   - `CLIENT_URL`: `https://your-frontend-domain.vercel.app` (Add after step A.2)
   - `CLOUDINARY_CLOUD_NAME`: *Optional Cloudinary Cloud Name*
   - `CLOUDINARY_API_KEY`: *Optional Cloudinary API Key*
   - `CLOUDINARY_API_SECRET`: *Optional Cloudinary API Secret*
   - `GEMINI_API_KEY`: *Optional Gemini API Key*
6. Click **Create Web Service**. Note down your Backend URL (e.g. `https://clinic-backend.onrender.com`).

### Step A.2: Deploy Frontend to Vercel
1. Sign in to [Vercel.com](https://vercel.com/).
2. Click **Add New... -> Project** and import your Git repository.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variables**:
   - `VITE_API_URL`: `https://clinic-backend.onrender.com/api` (Replace with your actual Render backend URL)
5. Click **Deploy**.
6. Once deployed, update your Backend's `CLIENT_URL` environment variable on Render with your Vercel frontend URL.

---

## Option B: Unified Single-Server Deployment (Render / Railway / VPS)

In this mode, the Node.js Express server builds and serves the React Vite frontend static assets directly from a single server instance.

1. Build the frontend into `frontend/dist`:
   ```bash
   npm run build:frontend
   ```
2. Deploy the root repository to your host (Render, Railway, Heroku, or VPS).
3. Set the start script to:
   ```bash
   npm run build && npm start
   ```
4. Set Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: *Your MongoDB Atlas Connection String*
   - `JWT_SECRET`: *Your JWT Secret*
   - `CLIENT_URL`: *Your server URL or domain*

---

## Option C: Docker Container Deployment

### Step C.1: Local / Server Docker Build
To build and run the multi-stage Docker image:
```bash
docker build -t clinic-management:latest .
docker run -d -p 5000:5000 \
  -e MONGODB_URI="your_mongodb_uri" \
  -e JWT_SECRET="your_jwt_secret" \
  --name clinic-app clinic-management:latest
```

### Step C.2: Docker Compose (App + MongoDB)
To run fullstack containerized app alongside local MongoDB:
```bash
docker-compose up -d --build
```

---

## Environment Variables Reference

| Variable Name | Required | Location | Description |
|---|---|---|---|
| `PORT` | No | Backend | Port backend listens on (Default `5000`) |
| `HOST` | No | Backend | Host IP binding (Default `0.0.0.0`) |
| `NODE_ENV` | Yes | Backend | Set to `production` |
| `MONGODB_URI` | Yes | Backend | MongoDB Atlas / database connection URI |
| `JWT_SECRET` | Yes | Backend | Secret key used for signing JWT tokens |
| `JWT_EXPIRES_IN` | No | Backend | Expiration time for tokens (e.g. `7d`) |
| `CLIENT_URL` | Yes | Backend | Allowed CORS origin (Frontend domain URL) |
| `VITE_API_URL` | Yes | Frontend | Base backend API endpoint (e.g. `https://api.domain.com/api`) |
| `CLOUDINARY_*` | No | Backend | Credentials for profile image uploads |
| `GEMINI_API_KEY` | No | Backend | API Key for AI Assistant features |

---

## Post-Deployment Verification Checklist

1. [ ] **Backend Health Check**: Open `https://<backend-url>/health` in your browser. Expect:
   ```json
   { "status": "healthy", "uptime": 12.3, "timestamp": "2026-08-04T..." }
   ```
2. [ ] **API Endpoint Test**: Open `https://<backend-url>/` in your browser. Expect:
   ```json
   { "success": true, "message": "Clinic Management API is running..." }
   ```
3. [ ] **Frontend Application**: Navigate through pages (`/login`, `/register`, `/doctors`, `/dashboard`) to confirm client-side routing works after browser refresh.
4. [ ] **CORS Verification**: Test logging in / submitting appointment forms from frontend to confirm cross-origin requests succeed without CORS errors.
