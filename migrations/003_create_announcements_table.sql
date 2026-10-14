-- Migration 003: Create announcements table (Homework)
CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  author VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO announcements (id, title, content, category, author) VALUES
  (1, 'Alumni Homecoming Day 2026', 'Join us on campus for our annual alumni reunion event with networking sessions and workshops.', 'Event', 'Rectorate'),
  (2, 'Tech Career Fair Registrations Open', 'Top tech companies are recruiting our graduates. Register before October 15th.', 'Career', 'Career Center'),
  (3, 'Mentorship Program Kickoff', 'Connect with experienced alumni mentors in your industry. Applications are now live.', 'Mentorship', 'Alumni Association');
