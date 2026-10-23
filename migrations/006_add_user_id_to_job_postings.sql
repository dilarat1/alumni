-- Migration 006: Add user_id to job_postings and link to users table
ALTER TABLE job_postings ADD COLUMN user_id INT NULL AFTER id;

ALTER TABLE job_postings ADD CONSTRAINT fk_job_postings_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

UPDATE job_postings SET user_id = 1 WHERE user_id IS NULL;
