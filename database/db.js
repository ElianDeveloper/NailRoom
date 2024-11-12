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

      CREATE TABLE IF NOT EXISTS ServiceTypes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        service_type TEXT
      );

      CREATE TABLE IF NOT EXISTS NailTypes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      );

      CREATE TABLE IF NOT EXISTS ServiceTypeConfigs (
        service_type_id INTEGER,
        nail_type_id INTEGER,
        price REAL,
        FOREIGN KEY (service_type_id) REFERENCES ServiceTypes(id),
        FOREIGN KEY (nail_type_id) REFERENCES NailTypes(id),
        PRIMARY KEY (service_type_id, nail_type_id)
      );

      CREATE TABLE IF NOT EXISTS Meetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meeting_date TIMESTAMP,
        meeting_time TIME,
        client_id INTEGER,
        FOREIGN KEY (client_id) REFERENCES Clients(id)
      );

      CREATE TABLE IF NOT EXISTS MeetingServices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meeting_id INTEGER,
        service_type_id INTEGER,
        nail_type_id INTEGER,
        price REAL,
        FOREIGN KEY (meeting_id) REFERENCES Meetings(id),
        FOREIGN KEY (service_type_id) REFERENCES ServiceTypes(id),
        FOREIGN KEY (nail_type_id) REFERENCES NailTypes(id)
      );

      CREATE TABLE IF NOT EXISTS Clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        notes TEXT
      );
    `);

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export default { init };
