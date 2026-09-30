CREATE TABLE IF NOT EXISTS alumni (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  department VARCHAR(150),
  graduation_year INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO alumni (first_name, last_name, email, department, graduation_year) VALUES
  ('Ayşe', 'Yılmaz', 'ayse@example.com', 'Bilgisayar Mühendisliği', 2023),
  ('Mehmet', 'Kaya', 'mehmet@example.com', 'Elektrik-Elektronik', 2022),
  ('Zeynep', 'Demir', 'zeynep@example.com', 'Yazılım Mühendisliği', 2024);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email, password, phone) VALUES
  ('admin', 'admin@alumni.com', 'admin123', '555-0001'),
  ('dilara', 'dilara@alumni.com', 'test123', '555-0002');
