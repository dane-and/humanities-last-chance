
# Deploying to Netlify

This guide provides instructions for deploying the Humanities Last Chance website to Netlify.

## Prerequisites

1. GitHub repository with your code
2. Netlify account (free tier is available)
3. (Optional) A headless CMS account if you want to use one

## Deployment Steps

### 1. Connect your repository to Netlify

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Netlify will automatically detect the project as a Vite app
5. Keep the default build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### 2. Configure Environment Variables

After initial deployment, go to your project settings in Netlify:

1. Navigate to "Site settings" → "Environment variables"
2. Add the following variables:
   - `VITE_HOSTING`: Set to `netlify`
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

### 4. Custom Domain Setup (Optional)

1. In Netlify, go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Enter your domain name and follow the verification steps
4. Update your DNS records as instructed by Netlify
5. Enable HTTPS by clicking "Verify DNS configuration" and then "Provision certificate"

### 5. Optimize Performance

Netlify offers several features to improve your site's performance:

1. **Asset optimization**: Enable in "Site settings" → "Build & deploy" → "Post processing"
2. **Prerendering**: Consider enabling if your site has static content
3. **Headers**: Already configured in the netlify.toml file for caching

### 6. Continuous Deployment

By default, Netlify will deploy each time you push to your main branch. You can customize this:

1. Go to "Site settings" → "Build & deploy" → "Continuous deployment"
2. Modify branch deploy settings and build hooks as needed

## Content Migration

If you're migrating from another platform:

1. Export your content from the admin panel using the Export button
2. Import it into your new CMS, or keep the JSON file for local storage

## Need Help?

If you encounter issues or need assistance with your Netlify deployment, refer to:
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Support Forum](https://answers.netlify.com/)
