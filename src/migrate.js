const fs = require('fs');
const path = require('path');
const pool = require('./db');

async function runMigrations() {
  console.log('🚀 [Migration] Starting database migration process...');

  try {
    // 1. Create migrations tracking table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Fetch already executed migrations
    const [executedRows] = await pool.query('SELECT name FROM migrations');
    const executedNames = new Set(executedRows.map(r => r.name));

    // 3. Read migration files in /migrations folder
    const migrationsDir = path.join(__dirname, '..', 'migrations');
    if (!fs.existsSync(migrationsDir)) {
      console.log('ℹ️ [Migration] No migrations folder found.');
      return;
    }

    const files = fs.readdirSync(migrationsDir)
      .filter(f => f.endsWith('.sql'))
      .sort();

    let appliedCount = 0;

    for (const file of files) {
      if (executedNames.has(file)) {
        console.log(`⏩ [Migration] Already applied: ${file}`);
        continue;
      }

      console.log(`⏳ [Migration] Applying: ${file}...`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf-8');

      // Split multiple statements if any
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const statement of statements) {
        await pool.query(statement);
      }

      // Record migration
      await pool.query('INSERT INTO migrations (name) VALUES (?)', [file]);
      console.log(`✅ [Migration] Successfully applied: ${file}`);
      appliedCount++;
    }

    if (appliedCount === 0) {
      console.log('✨ [Migration] Database is already up to date. No new migrations.');
    } else {
      console.log(`🎉 [Migration] Finished! Applied ${appliedCount} migration(s).`);
    }
  } catch (error) {
    console.error('❌ [Migration] Migration failed:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

runMigrations();
