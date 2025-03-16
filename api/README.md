
# API Backend for Humanities Last Chance

This directory contains the PHP backend API for the Humanities Last Chance website.

## Setup Instructions

1. Upload these PHP files to your Hostinger hosting account
2. Create a MySQL database in your Hostinger control panel
3. Update the database credentials in `config.php`:
   - `$host` - usually 'localhost'
   - `$username` - your database username
   - `$password` - your database password
   - `$database` - your database name
4. Import the database structure by importing `database.sql` via phpMyAdmin
5. Ensure the frontend is configured to use these API endpoints

## API Endpoints

- `articles.php` - CRUD operations for articles
- `comments.php` - Adding and managing comments
- `pages.php` - CRUD operations for static pages
- `import.php` - Data import functionality

## Architecture

The API is organized using a modular structure:
- `/handlers/` - Contains business logic for each resource type
  - `/article/` - Article CRUD operations
  - `/page/` - Page CRUD operations
- `/routes/` - Request routing logic
- `/utils/` - Utility functions

## Security Notes

- Update the CORS headers in `config.php` to restrict access to your domain only
- Consider adding authentication to protect admin operations
- Keep your database credentials secure

