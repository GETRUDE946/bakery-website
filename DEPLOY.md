# Bakery Website - Deployment Guide

This repository is fully configured for a unified deployment. The entire application (React Frontend + Express Backend + SQLite Database) will run as a single **Web Service** on a cloud provider. 

We highly recommend using **Render.com** because they provide "Persistent Disks" which are strictly required so you don't lose your SQLite database (`orders`) when the server restarts.

## Step 1: Push to GitHub
1. Create a new repository on your GitHub account.
2. Initialize this folder as a git repository and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

## Step 2: Deploy on Render.com
1. Create a free account on [Render.com](https://render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your newly created repository.
4. Fill in the following deployment settings:
   - **Name**: `chloes-bakery` (or whatever you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **CRITICAL STEP (Persistent Disk)**:
   - Scroll down to the **Advanced** section.
   - Click **Add Disk**.
   - **Name**: `bakery-db`
   - **Mount Path**: `/opt/render/project/src/server/db`
   - **Size**: 1 GB is plenty for SQLite.
6. Click **Create Web Service**.

Render will now build your React application and start your Express server. Once the build is complete, you can click on the provided URL to view your live bakery website!
