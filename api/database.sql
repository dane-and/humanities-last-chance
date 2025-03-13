
-- Create tables for Humanities Last Chance website

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    author VARCHAR(100) NOT NULL,
    date VARCHAR(50) NOT NULL,
    category ENUM('Blog', 'Interview', 'Review', 'Resource') NOT NULL DEFAULT 'Blog',
    image TEXT,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured TINYINT(1) NOT NULL DEFAULT 0,
    tags TEXT,
    INDEX (slug),
    INDEX (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id VARCHAR(50) PRIMARY KEY,
    article_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    date VARCHAR(50) NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    dislikes INT NOT NULL DEFAULT 0,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    INDEX (article_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Pages table
CREATE TABLE IF NOT EXISTS pages (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    lastUpdated VARCHAR(50) NOT NULL,
    isSystem TINYINT(1) NOT NULL DEFAULT 0,
    INDEX (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default system pages
INSERT INTO pages (id, title, slug, content, lastUpdated, isSystem)
VALUES 
('page_about', 'About', 'about', '<h1>About Humanities Last Chance</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.</p>', CURRENT_DATE(), 1),
('page_contact', 'Contact', 'contact', '<h1>Contact Us</h1><p>You can reach us at contact@humanitieslast.com</p>', CURRENT_DATE(), 1),
('page_resources', 'Resources', 'resources', '<h1>Resources</h1><p>Here are some helpful resources for humanities scholars.</p>', CURRENT_DATE(), 1);

-- Insert sample articles if the table is empty
INSERT INTO articles (id, title, slug, author, date, category, image, excerpt, content, featured, tags)
SELECT * FROM (
    SELECT 
        '1' as id,
        'Sample Blog Post' as title,
        'sample-blog-post' as slug,
        'Admin' as author,
        CURRENT_DATE() as date,
        'Blog' as category,
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3' as image,
        'This is a sample blog post.' as excerpt,
        '<p>This is the content of a sample blog post.</p>' as content,
        1 as featured,
        'History,Literature' as tags
) AS tmp
WHERE NOT EXISTS (
    SELECT id FROM articles WHERE id = '1'
) LIMIT 1;
