-- Migration 004: Create job_postings table
CREATE TABLE IF NOT EXISTS job_postings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  company VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  type VARCHAR(50) DEFAULT 'Full-time',
  description TEXT NOT NULL,
  requirements TEXT,
  salary VARCHAR(100),
  contact_email VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO job_postings (id, title, company, location, type, description, requirements, salary, contact_email) VALUES
  (1, 'Senior Backend Engineer (Node.js)', 'Trendyol Group', 'Istanbul (Hybrid)', 'Full-time', 'Design and scale event-driven distributed microservices serving millions of daily active users.', '3+ years experience with Node.js, Express, Docker, and MySQL/PostgreSQL.', '₺110,000 - ₺145,000 / month', 'careers@trendyol.com'),
  (2, 'Frontend Developer (React / Next.js)', 'Getir Tech', 'Istanbul / Remote', 'Full-time', 'Build high-performance, responsive customer-facing web applications with modern React.', 'Proficiency in TypeScript, React, Next.js, and CSS/Tailwind.', '₺85,000 - ₺115,000 / month', 'tech-jobs@getir.com'),
  (3, 'Junior Data Analyst', 'Hepsiburada', 'Istanbul', 'Full-time', 'Analyze marketplace transactions and generate predictive reporting dashboards.', 'Experience with SQL, Python (pandas), and BI visualization tools.', '₺60,000 - ₺80,000 / month', 'hr@hepsiburada.com'),
  (4, 'Software Engineering Intern', 'Baykar Tech', 'Istanbul (On-site)', 'Internship', 'Contribute to autonomous systems software infrastructure and embedded tools.', 'Computer Science or Engineering student/recent graduate. C++ or Node.js knowledge.', 'Competitive Stipend', 'intern@baykartech.com');
