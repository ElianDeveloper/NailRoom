export const init = async (db) => {
  await migrateDbIfNeeded(db);
};

async function migrateDbIfNeeded(db) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync(
    "PRAGMA user_version"
  );

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE IF NOT EXISTS Meetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meeting_date TIMESTAMP,
        meeting_time TIME
      );

      CREATE TABLE IF NOT EXISTS Services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nail_type TEXT,
        price REAL,
        duration TIME,
        meeting_id INTEGER,
        service_type_id INTEGER,
        FOREIGN KEY (meeting_id) REFERENCES Meetings(id),
        FOREIGN KEY (service_type_id) REFERENCES ServiceTypes(id)
      );

      CREATE TABLE IF NOT EXISTS ServiceTypes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_type TEXT
      );

      CREATE TABLE IF NOT EXISTS Clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        notes TEXT,
        meeting_id INTEGER,
        FOREIGN KEY (meeting_id) REFERENCES Meetings(id)
      );
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default { init };
