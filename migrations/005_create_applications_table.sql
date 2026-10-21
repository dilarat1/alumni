-- Migration 005: Create applications table (with Foreign Key to job_postings)
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_posting_id INT NOT NULL,
  applicant_name VARCHAR(150) NOT NULL,
  applicant_email VARCHAR(150) NOT NULL,
  resume_url VARCHAR(255),
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_applications_job_posting
    FOREIGN KEY (job_posting_id)
    REFERENCES job_postings(id)
    ON DELETE CASCADE
);

INSERT IGNORE INTO applications (id, job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status) VALUES
  (1, 1, 'Dilara Toraman', 'dilara@example.com', 'https://github.com/dilarat1', 'Passionate full-stack developer with strong Node.js, Express, and Docker architecture background.', 'Reviewing'),
  (2, 1, 'Emre Yılmaz', 'emre.yilmaz@example.com', 'https://linkedin.com/in/emreyilmaz', 'Excited about scalable backend microservices and high-throughput databases.', 'Pending'),
  (3, 2, 'Ayşe Kaya', 'ayse.kaya@example.com', 'https://github.com/aysekaya', 'Experienced in building modern responsive interfaces and component-driven SPAs.', 'Accepted'),
  (4, 3, 'Can Demir', 'can.demir@example.com', 'https://github.com/candemir', 'Strong SQL background and data analysis pipeline skills.', 'Pending');
