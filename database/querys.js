// ==================== MEETINGS ====================
export const insertMeeting = async (db, date, time, clientId) => {
  const result = await db.runAsync(
    "INSERT INTO Meetings (meeting_date, meeting_time, client_id) VALUES (?, ?, ?)",
    date,
    time,
    clientId
  );
  return result.lastID;
};

export const fetchMeetings = async (db) => {
  return await db.getAllAsync(`
    SELECT m.*, c.name as client_name 
    FROM Meetings m 
    LEFT JOIN Clients c ON m.client_id = c.id
  `);
};

export const updateMeeting = async (db, id, date, time, clientId) => {
  await db.runAsync(
    "UPDATE Meetings SET meeting_date = ?, meeting_time = ?, client_id = ? WHERE id = ?",
    date,
    time,
    clientId,
    id
  );
};

export const deleteMeeting = async (db, id) => {
  await db.runAsync("DELETE FROM Meetings WHERE id = ?", id);
};

// ==================== CLIENTS ====================
export const insertClient = async (db, name, phone, notes) => {
  const result = await db.runAsync(
    "INSERT INTO Clients (name, phone, notes) VALUES (?, ?, ?)",
    name,
    phone,
    notes
  );
  return result.lastID;
};

export const fetchClients = async (db) => {
  return await db.getAllAsync("SELECT * FROM Clients");
};

export const updateClient = async (db, id, name, phone, notes) => {
  await db.runAsync(
    "UPDATE Clients SET name = ?, phone = ?, notes = ? WHERE id = ?",
    name,
    phone,
    notes,
    id
  );
};

export const deleteClient = async (db, id) => {
  await db.runAsync("DELETE FROM Clients WHERE id = ?", id);
};

// ==================== SERVICE TYPES ====================
export const insertServiceType = async (db, serviceType) => {
  const result = await db.runAsync(
    "INSERT INTO ServiceTypes (service_type) VALUES (?)",
    serviceType
  );

  return result.lastInsertRowId;
};

export const fetchServiceTypes = async (db) => {
  return await db.getAllAsync("SELECT * FROM ServiceTypes");
};

export const updateServiceType = async (db, id, serviceType) => {
  await db.runAsync(
    "UPDATE ServiceTypes SET service_type = ? WHERE id = ?",
    serviceType,
    id
  );
};

export const deleteServiceType = async (db, id) => {
  await db.runAsync("DELETE FROM ServiceTypes WHERE id = ?", id);
};

// ==================== NAIL TYPES ====================
export const insertNailType = async (db, name) => {
  const result = await db.runAsync(
    "INSERT INTO NailTypes (name) VALUES (?)",
    name
  );
  return result.lastID;
};

export const fetchNailTypes = async (db) => {
  return await db.getAllAsync("SELECT * FROM NailTypes");
};

export const updateNailType = async (db, id, name) => {
  await db.runAsync("UPDATE NailTypes SET name = ? WHERE id = ?", name, id);
};

export const deleteNailType = async (db, id) => {
  await db.runAsync("DELETE FROM NailTypes WHERE id = ?", id);
};

// ==================== SERVICE TYPE CONFIGS ====================
export const insertServiceTypeConfig = async (
  db,
  serviceTypeId,
  nailTypeId,
  price
) => {
  const result = await db.runAsync(
    "INSERT INTO ServiceTypeConfigs (service_type_id, nail_type_id, price) VALUES (?, ?, ?)",
    serviceTypeId,
    nailTypeId,
    price
  );

  return result.lastID;
};

export const fetchServiceTypeConfigs = async (db) => {
  return await db.getAllAsync(`
    SELECT stc.*, st.service_type, nt.name as nail_type
    FROM ServiceTypeConfigs stc
    JOIN ServiceTypes st ON stc.service_type_id = st.id
    JOIN NailTypes nt ON stc.nail_type_id = nt.id
  `);
};
export const fetchAllServiceTypeConfigs = async (db) => {
  return await db.getAllAsync(`
    SELECT * FROM ServiceTypeConfigs
  `);
};

export const fetchServiceTypeConfigsByService = async (db, serviceTypeId) => {
  return await db.getAllAsync(
    `
    SELECT 
      stc.price,
      nt.name as nail_type,
      nt.id as nail_type_id
    FROM ServiceTypeConfigs stc
    JOIN NailTypes nt ON stc.nail_type_id = nt.id
    WHERE stc.service_type_id = ?
    ORDER BY nt.name
  `,
    serviceTypeId
  );
};

export const updateServiceTypeConfig = async (
  db,
  serviceTypeId,
  nailTypeId,
  price
) => {
  await db.runAsync(
    "UPDATE ServiceTypeConfigs SET price = ? WHERE service_type_id = ? AND nail_type_id = ?",
    price,
    serviceTypeId,
    nailTypeId
  );
};

export const deleteServiceTypeConfig = async (
  db,
  serviceTypeId,
  nailTypeId
) => {
  await db.runAsync(
    "DELETE FROM ServiceTypeConfigs WHERE service_type_id = ? AND nail_type_id = ?",
    serviceTypeId,
    nailTypeId
  );
};

// ==================== MEETING SERVICES ====================
export const insertMeetingService = async (
  db,
  meetingId,
  serviceTypeId,
  nailTypeId,
  price
) => {
  const result = await db.runAsync(
    "INSERT INTO MeetingServices (meeting_id, service_type_id, nail_type_id, price) VALUES (?, ?, ?, ?)",
    meetingId,
    serviceTypeId,
    nailTypeId,
    price
  );
  return result.lastID;
};

export const fetchMeetingServices = async (db, meetingId) => {
  return await db.getAllAsync(
    `
    SELECT ms.*, st.service_type, nt.name as nail_type
    FROM MeetingServices ms
    JOIN ServiceTypes st ON ms.service_type_id = st.id
    JOIN NailTypes nt ON ms.nail_type_id = nt.id
    WHERE ms.meeting_id = ?
  `,
    meetingId
  );
};

export const updateMeetingService = async (
  db,
  id,
  serviceTypeId,
  nailTypeId,
  price
) => {
  await db.runAsync(
    "UPDATE MeetingServices SET service_type_id = ?, nail_type_id = ?, price = ? WHERE id = ?",
    serviceTypeId,
    nailTypeId,
    price,
    id
  );
};

export const deleteMeetingService = async (db, id) => {
  await db.runAsync("DELETE FROM MeetingServices WHERE id = ?", id);
};
