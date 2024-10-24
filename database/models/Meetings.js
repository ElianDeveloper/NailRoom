export const insertMeetings = async (db, date, time) => {
  await db.runAsync(
    "INSERT INTO meetings (meeting_date, meeting_time) VALUES (?, ?)",
    date,
    time
  );
};

export const fetchMeetings = async (db) => {
  const meetings = await db.getAllAsync("SELECT * FROM meetings");
  return meetings;
};

export const updateMeeting = async (db, id, date, time) => {
  await db.runAsync(
    "UPDATE meetings SET meeting_date = ?, meeting_time = ? WHERE id = ?",
    date,
    time,
    id
  );
};

export const deleteMeeting = async (db, id) => {
  await db.runAsync("DELETE FROM meetings WHERE id = ?", id);
};
