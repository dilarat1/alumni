const pool = require('./db');
const UserFactory = require('./factories/UserFactory');
const AlumniFactory = require('./factories/AlumniFactory');
const AnnouncementFactory = require('./factories/AnnouncementFactory');
const JobPostingFactory = require('./factories/JobPostingFactory');
const ApplicationFactory = require('./factories/ApplicationFactory');

async function seedDatabase() {
  console.log('🌱 [Seeder] Starting database seeding with Factory classes...\n');

  try {
    // 1. Seed Users
    const users = UserFactory.createMany(10);
    console.log(`🏭 [UserFactory] Generated ${users.length} mock users.`);
    for (const u of users) {
      await pool.query(
        'INSERT IGNORE INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)',
        [u.username, u.email, u.password, u.phone]
      );
    }
    console.log('✅ [Users] Seeded into MySQL users table.\n');

    // 2. Seed Alumni
    const alumniList = AlumniFactory.createMany(10);
    console.log(`🏭 [AlumniFactory] Generated ${alumniList.length} mock alumni.`);
    for (const a of alumniList) {
      await pool.query(
        'INSERT IGNORE INTO alumni (first_name, last_name, email, department, graduation_year) VALUES (?, ?, ?, ?, ?)',
        [a.first_name, a.last_name, a.email, a.department, a.graduation_year]
      );
    }
    console.log('✅ [Alumni] Seeded into MySQL alumni table.\n');

    // 3. Seed Announcements
    const announcements = AnnouncementFactory.createMany(5);
    console.log(`🏭 [AnnouncementFactory] Generated ${announcements.length} mock announcements.`);
    for (const an of announcements) {
      await pool.query(
        'INSERT IGNORE INTO announcements (title, content, category, author) VALUES (?, ?, ?, ?)',
        [an.title, an.content, an.category, an.author]
      );
    }
    console.log('✅ [Announcements] Seeded into MySQL announcements table.\n');

    // 4. Seed Job Postings (Linked to Users)
    // Fetch available user ids
    const [existingUsers] = await pool.query('SELECT id FROM users LIMIT 10');
    const userIds = existingUsers.map(u => u.id);
    const defaultUserId = userIds.length > 0 ? userIds[0] : null;

    const jobPostings = JobPostingFactory.createMany(6);
    console.log(`🏭 [JobPostingFactory] Generated ${jobPostings.length} mock job postings.`);
    const createdJobIds = [];
    for (let i = 0; i < jobPostings.length; i++) {
      const jp = jobPostings[i];
      // Distribute jobs across existing users so /api/users/:id/jobs has data
      const assignedUserId = userIds.length > 0 ? userIds[i % userIds.length] : defaultUserId;
      const [res] = await pool.query(
        'INSERT INTO job_postings (user_id, title, company, location, type, description, requirements, salary, contact_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [assignedUserId, jp.title, jp.company, jp.location, jp.type, jp.description, jp.requirements, jp.salary, jp.contact_email]
      );
      createdJobIds.push(res.insertId);
    }
    console.log(`✅ [JobPostings] Seeded ${createdJobIds.length} records linked to users into MySQL job_postings table.\n`);

    // 5. Seed Applications for Created Job Postings
    console.log(`🏭 [ApplicationFactory] Seeding applications linked to job vacancies...`);
    for (const jobId of createdJobIds) {
      const apps = ApplicationFactory.createMany(2, jobId);
      for (const app of apps) {
        await pool.query(
          'INSERT INTO applications (job_posting_id, applicant_name, applicant_email, resume_url, cover_letter, status) VALUES (?, ?, ?, ?, ?, ?)',
          [app.job_posting_id, app.applicant_name, app.applicant_email, app.resume_url, app.cover_letter, app.status]
        );
      }
    }
    console.log('✅ [Applications] Seeded into MySQL applications table.\n');

    console.log('🎉 [Seeder] Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ [Seeder] Error during database seeding:', err.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
