const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error('DATABASE_URL not set'); process.exit(1); }

const sql = neon(DATABASE_URL);
const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

// sql.query(string, params) is the correct API for raw SQL strings
// in @neondatabase/serverless (tagged template is for parameterized queries).
const execRaw = (sqlStr) => sql.query(sqlStr);

// Split on semicolons, strip comment-only lines, keep INSERT/UPDATE/DELETE statements.
const statements = seedSQL
  .split(';')
  .map(s => {
    // Remove leading blank lines and comment-only lines, keeping the first SQL line
    return s
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        return trimmed.length > 0 && !trimmed.startsWith('--');
      })
      .join('\n')
      .trim();
  })
  .filter(s => /^\s*(INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s/i.test(s));

(async () => {
  console.log(`\nRunning ${statements.length} seed statements...\n`);
  for (const stmt of statements) {
    try {
      await execRaw(stmt);
    } catch (e) {
      console.error('Error on statement:', stmt.slice(0, 80));
      console.error(e.message);
    }
  }
  console.log('✓ Seed complete\n');
})();
