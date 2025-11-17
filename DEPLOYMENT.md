# Deploying PCBuilder to Heroku

This guide will walk you through deploying your PCBuilder application to Heroku so it's accessible on the internet.

## Prerequisites

1. **Heroku Account**: Sign up at [https://signup.heroku.com/](https://signup.heroku.com/)
2. **Heroku CLI**: Install from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
3. **Git**: Ensure Git is installed on your system

## Step 1: Initialize Git Repository

If you haven't already, initialize a Git repository in your project:

```bash
git init
git add .
git commit -m "Initial commit for Heroku deployment"
```

## Step 2: Login to Heroku

Open your terminal and login to Heroku:

```bash
heroku login
```

This will open a browser window for you to authenticate.

## Step 3: Create a Heroku App

Create a new Heroku application:

```bash
heroku create your-pcbuilder-app
```

Replace `your-pcbuilder-app` with your desired app name (must be unique across Heroku). If you don't specify a name, Heroku will generate one for you.

## Step 4: Set Environment Variables

Set your MongoDB connection string as an environment variable:

```bash
heroku config:set MONGODB_URI="mongodb+srv://avnorboev:carrotman33@cluster0.azsklpr.mongodb.net/?appName=Cluster0"
```

**IMPORTANT SECURITY NOTE**: The MongoDB URI in your `.env` file contains hardcoded credentials. For production, you should:
1. Create a new MongoDB user with restricted permissions
2. Use a strong password
3. Never commit credentials to Git

If you have Supabase configured, also set:

```bash
heroku config:set VITE_SUPABASE_URL="your-supabase-url"
heroku config:set VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

## Step 5: Commit Your Changes

Make sure all changes are committed:

```bash
git add .
git commit -m "Configure for Heroku deployment"
```

## Step 6: Deploy to Heroku

Deploy your application:

```bash
git push heroku main
```

If your default branch is named `master` instead of `main`:

```bash
git push heroku master
```

**Note**: If you get an error about the branch, you may need to push from a different branch:

```bash
git push heroku HEAD:main
```

## Step 7: Verify Deployment

Once deployment completes, open your app:

```bash
heroku open
```

Or visit: `https://your-pcbuilder-app.herokuapp.com`

## Step 8: View Logs (Troubleshooting)

If something goes wrong, check the logs:

```bash
heroku logs --tail
```

## Project Structure

Your app is configured with:

- **Procfile**: Tells Heroku to run `node server.js`
- **package.json**:
  - `start` script runs the Node.js server
  - `heroku-postbuild` runs `npm run build` to build the Vite frontend
  - `engines` specifies Node.js version requirements
- **server.js**: Serves both the API and static frontend files
- **vite.config.ts**: Builds frontend to `dist` folder

## How It Works

1. Heroku detects this is a Node.js app from `package.json`
2. Heroku runs `npm install` to install dependencies
3. Heroku runs `npm run heroku-postbuild` which builds the Vite frontend
4. Heroku starts the app using `npm start` (which runs `node server.js`)
5. The server:
   - Serves the React frontend from the `dist` folder
   - Provides API endpoints at `/parts` and `/categories`
   - Connects to your MongoDB database

## API Endpoints

Your deployed app will have these endpoints:

- `GET /parts` - List all parts (with optional filters)
- `GET /parts/:id` - Get a specific part
- `POST /parts` - Add a new part
- `POST /parts/bulk` - Bulk add parts
- `PUT /parts/:id` - Update a part
- `DELETE /parts/:id` - Delete a part
- `GET /categories` - List all categories

## Updating Your Deployment

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push heroku main
```

## Custom Domain (Optional)

To use a custom domain:

```bash
heroku domains:add www.yourpcbuilder.com
```

Then configure your DNS provider according to Heroku's instructions.

## Scaling (Optional)

To scale your app to more dynos:

```bash
heroku ps:scale web=2
```

## Environment Variables Management

View all environment variables:

```bash
heroku config
```

Set a new variable:

```bash
heroku config:set VARIABLE_NAME="value"
```

Remove a variable:

```bash
heroku config:unset VARIABLE_NAME
```

## Troubleshooting

### App crashes on startup
- Check logs: `heroku logs --tail`
- Verify environment variables are set: `heroku config`
- Ensure MongoDB connection string is correct

### Static files not loading
- Verify build succeeded: check logs for build errors
- Ensure `dist` folder is being created during build

### Database connection issues
- Verify MongoDB URI is set correctly
- Check MongoDB Atlas network access settings (allow all IPs: 0.0.0.0/0)
- Ensure MongoDB user has proper permissions

## Cost

Heroku offers a free tier, but has limitations:
- App sleeps after 30 minutes of inactivity
- Limited dyno hours per month

For production use, consider upgrading to a paid plan.

## Next Steps

After deployment:
1. Test all functionality
2. Set up monitoring with Heroku metrics
3. Configure a custom domain
4. Set up continuous deployment with GitHub
5. Implement proper authentication
6. Add SSL certificate (included with Heroku)

## Security Recommendations

1. **Never commit `.env` files** - They're now in `.gitignore`
2. **Rotate database credentials** - Create new MongoDB user for production
3. **Use environment variables** - All secrets should be in Heroku config vars
4. **Enable HTTPS** - Heroku provides this automatically
5. **Restrict MongoDB access** - Use IP whitelisting when possible
6. **Regular updates** - Keep dependencies updated for security patches

## Support

- Heroku Documentation: [https://devcenter.heroku.com/](https://devcenter.heroku.com/)
- Heroku Status: [https://status.heroku.com/](https://status.heroku.com/)
- MongoDB Atlas Support: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
