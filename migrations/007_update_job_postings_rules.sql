-- Migration 007: Update job_postings table with domain rules
-- Rules:
--   -> title: required (NOT NULL), max 120 characters (VARCHAR(120))
--   -> company: required (NOT NULL)
--   -> city, description: optional (NULL allowed)

ALTER TABLE job_postings MODIFY COLUMN title VARCHAR(120) NOT NULL;

ALTER TABLE job_postings MODIFY COLUMN company VARCHAR(150) NOT NULL;

ALTER TABLE job_postings ADD COLUMN city VARCHAR(150) NULL AFTER company;

ALTER TABLE job_postings MODIFY COLUMN location VARCHAR(150) NULL;

ALTER TABLE job_postings MODIFY COLUMN description TEXT NULL;

UPDATE job_postings SET city = location WHERE city IS NULL AND location IS NOT NULL;
