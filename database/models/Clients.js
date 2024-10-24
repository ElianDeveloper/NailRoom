export const insertClient = async (db, name, phone, notes, meetingId) => {
  await db.runAsync(
    "INSERT INTO Clients (name, phone, notes, meeting_id) VALUES (?, ?, ?, ?)",
    name,
    phone,
    notes,
    meetingId
  );
};

export const fetchClients = async (db) => {
  const clients = await db.getAllAsync("SELECT * FROM Clients");
  return clients;
};

export const updateClient = async (db, id, name, phone, notes, meetingId) => {
  await db.runAsync(
    "UPDATE Clients SET name = ?, phone = ?, notes = ?, meeting_id = ? WHERE id = ?",
    name,
    phone,
    notes,
    meetingId,
    id
  );
};

export const deleteClient = async (db, id) => {
  await db.runAsync("DELETE FROM Clients WHERE id = ?", id);
};
