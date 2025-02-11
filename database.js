const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = process.env.DATABASE_URL || path.join(__dirname, 'contacts.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to SQLite:', err.message);
        return;
    }
    console.log('Connected to SQLite database');
});

db.run(
    `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        address TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
);

module.exports = db;
