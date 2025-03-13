
# Deployment Guide for Hostinger

This document provides step-by-step instructions for deploying the Humanities Last Chance website to Hostinger.

## Prerequisites

1. A Hostinger account with:
   - PHP hosting plan
   - MySQL database
   - Domain configured

## Database Setup

1. Log in to your Hostinger control panel
2. Navigate to "Databases" → "MySQL Databases"
3. Create a new database and note the following details:
   - Database name
   - Username
   - Password
   - Host (usually "localhost")

## File Upload

1. Connect to your Hostinger account via FTP or File Manager
2. Upload all files from your project to the public_html directory (or a subdirectory if you prefer)
3. Ensure file permissions are set correctly:
   - Directories: 755
   - Files: 644
   - PHP files: 644

## Configuration

1. Configure the database connection by setting environment variables in Hostinger:
   - In your Hostinger panel, go to "Advanced" → "Environment Variables"
   - Add the following variables:
     - DB_HOST (usually "localhost")
     - DB_USERNAME (your database username)
     - DB_PASSWORD (your database password)
     - DB_DATABASE (your database name)
     - ADMIN_API_TOKEN (a secure random string for admin API access)

2. If environment variables are not available in your hosting plan:
   - Edit `api/config.php` directly with your database credentials
   - Ensure this file is not publicly accessible through proper .htaccess rules

3. Import the initial database structure:
   - Go to phpMyAdmin from your Hostinger control panel
   - Select your database
   - Import the `api/database.sql` file

## Domain Configuration

1. Ensure your domain is pointing to Hostinger nameservers
2. Configure SSL for your domain through the Hostinger control panel
3. Update the frontend configuration if you're using a custom domain:
   - Edit the `ALLOWED_ORIGINS` array in `api/config.php` to include your domain

## Testing

After deployment, test the following:

1. Visit your website to ensure the frontend loads correctly
2. Check that articles and pages are loading from the database
3. Test the API health endpoint: `https://yourdomain.com/api/health.php`
4. Verify that comments can be added to articles
5. Test admin functionality with the token you configured

## Troubleshooting

If you encounter issues:

1. Check the PHP error logs in your Hostinger control panel
2. Verify database connection details are correct
3. Ensure all files were uploaded correctly
4. Check file permissions
5. Verify .htaccess files are working correctly

## Performance Optimization

For optimal performance on Hostinger:

1. Enable Hostinger's LiteSpeed Cache if available
2. Configure browser caching through .htaccess (already included)
3. Enable GZIP compression (already configured)
4. Use the Hostinger CDN if available with your plan

## Maintenance

1. Regularly back up your database from the Hostinger control panel
2. Keep your PHP version updated to the latest stable release
3. Monitor disk space and database size
