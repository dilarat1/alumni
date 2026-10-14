-- Migration 002: Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO users (id, username, email, password, phone) VALUES
  (1, 'admin', 'admin@alumni.com', 'admin123', '555-0001'),
  (2, 'dilara', 'dilara@alumni.com', 'test123', '555-0002');
