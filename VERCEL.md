
# Deploying to Vercel

This guide provides instructions for deploying the Humanities Last Chance website to Vercel and configuring content management.

## Prerequisites

1. GitHub repository with your code
2. Vercel account (free tier is available)
3. (Optional) A headless CMS account if you want to use one

## Deployment Steps

### 1. Connect your repository to Vercel

1. Log in to your Vercel account
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will automatically detect the project as a Vite app
5. Click "Deploy"

### 2. Configure Environment Variables

After initial deployment, go to your project settings in Vercel:

1. Navigate to "Settings" → "Environment Variables"
2. Add the following variables:
   - `VITE_HOSTING`: Set to `vercel`
   - `VITE_CMS_TYPE`: Choose one of the following options based on your content management preference:
     - `local-storage`: Stores content in the browser (admin only)
     - `google-sheets`: Uses a Google Sheet as content source
     - `contentful`: Uses Contentful as CMS
     - `sanity`: Uses Sanity as CMS
     - `strapi`: Uses Strapi as CMS
   - `VITE_ADMIN_USERNAME`: Set your admin username
   - `VITE_ADMIN_PASSWORD`: Set your admin password

### 3. Content Management Options

#### Option 1: Local Storage (Simplest)

This option stores content in your browser's localStorage. Good for personal use, but has limitations:
- Content is device-specific
- Not suitable for multiple authors
- Requires manual export/import for backup

No additional configuration needed, just set `VITE_CMS_TYPE=local-storage`.

#### Option 2: Google Sheets

Use a Google Sheet as your CMS:
1. Create a Google Sheet with appropriate columns (title, content, date, etc.)
2. Make the sheet publicly accessible (read-only)
3. Add these environment variables:
   - `VITE_CMS_TYPE`: Set to `google-sheets`
   - `VITE_GOOGLE_SHEET_ID`: Your Google Sheet ID (found in the URL)

#### Option 3: Headless CMS

For a professional setup, use a headless CMS:

**Contentful:**
1. Create a Contentful account and space
2. Create content models matching your article structure
3. Add these environment variables:
   - `VITE_CMS_TYPE`: Set to `contentful`
   - `VITE_CONTENTFUL_SPACE_ID`: Your Contentful space ID
   - `VITE_CONTENTFUL_ACCESS_TOKEN`: Your Contentful access token

**Sanity:**
1. Set up a Sanity project
2. Add these environment variables:
   - `VITE_CMS_TYPE`: Set to `sanity`
   - `VITE_SANITY_PROJECT_ID`: Your Sanity project ID
   - `VITE_SANITY_DATASET`: Your Sanity dataset (usually "production")

### 4. Admin Access Configuration

To access the admin dashboard at `/admin`, you need to set up authentication:

1. In Vercel, add these environment variables:
   - `VITE_ADMIN_USERNAME`: Your chosen admin username
   - `VITE_ADMIN_PASSWORD`: Your secure admin password

The default values are used if these are not set, but for security, you should always set your own.

### 5. Custom Domain (Optional)

1. In Vercel, go to "Settings" → "Domains"
2. Add your custom domain and follow the verification steps
3. Update your DNS records as instructed by Vercel

## Content Migration

If you're migrating from Hostinger:

1. Export your content from the admin panel using the Export button
2. Import it into your new CMS, or keep the JSON file for local storage

## Development Workflow

For local development with your chosen CMS:

1. Create a `.env` file based on `.env.example`
2. Set the appropriate CMS variables
3. Run `npm run dev` to start the development server

## Need Help?

If you encounter issues or need assistance with your Vercel deployment, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [React on Vercel Guide](https://vercel.com/guides/deploying-react-with-vercel)
