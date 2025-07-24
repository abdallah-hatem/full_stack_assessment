# MongoDB Atlas Setup Guide

Follow these steps to set up MongoDB Atlas for your NestJS application:

## 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Complete the registration process

## 2. Create a New Cluster

1. After logging in, click "Build a Database"
2. Choose "M0 Sandbox" (Free tier) for development
3. Select your preferred cloud provider and region
4. Click "Create Cluster"

## 3. Create Database User

1. In the Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

## 4. Configure Network Access

1. Go to "Network Access" in the sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your specific IP addresses
5. Click "Confirm"

## 5. Get Connection String

1. Go to "Database" in the sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" as driver and your version
5. Copy the connection string

## 6. Update Environment Variables

1. Copy `environment.example` to `.env`:
   ```bash
   cp environment.example .env
   ```

2. Update the `.env` file with your Atlas connection string:
   ```env
   DATABASE_URL="mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/nestjs_app?retryWrites=true&w=majority"
   ```

   Replace:
   - `your-username`: Database username you created
   - `your-password`: Database password you created
   - `cluster0.xxxxx.mongodb.net`: Your actual cluster URL
   - `nestjs_app`: Your database name

3. Set a strong JWT secret:
   ```env
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

## 7. Test Connection

1. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

2. Push schema to Atlas:
   ```bash
   npx prisma db push
   ```

3. Start your application:
   ```bash
   npm run start:dev
   ```

## 8. Monitor Your Database

1. In Atlas dashboard, go to "Browse Collections"
2. You should see your database and collections
3. Use "Metrics" tab to monitor performance

## Security Tips

- ✅ Use strong passwords for database users
- ✅ Restrict IP access in production
- ✅ Enable MongoDB's built-in security features
- ✅ Regularly rotate passwords
- ✅ Monitor database access logs

## Troubleshooting

**Connection Issues:**
- Verify IP whitelist includes your current IP
- Check username/password in connection string
- Ensure cluster is active (not paused)

**Authentication Errors:**
- Verify database user permissions
- Check if password contains special characters (URL encode them)

**Network Timeouts:**
- Try different regions if connection is slow
- Check your internet connectivity 