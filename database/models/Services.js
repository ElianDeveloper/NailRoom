export const insertService = async (
  db,
  nailType,
  price,
  duration,
  meetingId,
  serviceTypeId
) => {
  await db.runAsync(
    "INSERT INTO Services (nail_type, price, duration, meeting_id, service_type_id) VALUES (?, ?, ?, ?, ?)",
    nailType,
    price,
    duration,
    meetingId,
    serviceTypeId
  );
};

export const fetchServices = async (db) => {
  const services = await db.getAllAsync("SELECT * FROM Services");
  return services;
};

export const updateService = async (
  db,
  id,
  nailType,
  price,
  duration,
  meetingId,
  serviceTypeId
) => {
  await db.runAsync(
    "UPDATE Services SET nail_type = ?, price = ?, duration = ?, meeting_id = ?, service_type_id = ? WHERE id = ?",
    nailType,
    price,
    duration,
    meetingId,
    serviceTypeId,
    id
  );
};

export const deleteService = async (db, id) => {
  await db.runAsync("DELETE FROM Services WHERE id = ?", id);
};
