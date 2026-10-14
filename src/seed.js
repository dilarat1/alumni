const pool = require('./db');
const UserFactory = require('./factories/UserFactory');
const AlumniFactory = require('./factories/AlumniFactory');
const AnnouncementFactory = require('./factories/AnnouncementFactory');

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

    console.log('🎉 [Seeder] Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ [Seeder] Error during database seeding:', err.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
