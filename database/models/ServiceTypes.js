export const insertServiceType = async (db, serviceType) => {
  await db.runAsync(
    "INSERT INTO ServiceTypes (service_type) VALUES (?)",
    serviceType
  );
};

export const fetchServiceTypes = async (db) => {
  const serviceTypes = await db.getAllAsync("SELECT * FROM ServiceTypes");
  return serviceTypes;
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
