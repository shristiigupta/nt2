
const BIN_ID = "690c3355d0ea881f40d6f088";
const API_KEY = "$2a$10$/ERM20klZc811EtIrQqFGeRAbEjXhKfZd5K92avgff9rfIGoe7cja";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const getVisitData = async () => {
  try {
    const res = await fetch(BASE_URL + "/latest", {
      headers: { "X-Master-Key": API_KEY },
    });
    const data = await res.json();
    return Object.entries(data.record).map(([name, value]) => ({ name, value }));
  } catch (err) {
    console.error("Error fetching visit data:", err);
    return [];
  }
};

export const incrementVisit = async (pageName) => {
  try {
    // Fetch current data
    const res = await fetch(BASE_URL + "/latest", {
      headers: { "X-Master-Key": API_KEY },
    });
    const data = await res.json();
    const current = data.record;

    // Increment specific page
    current[pageName] = (current[pageName] || 0) + 1;

    // Update remote JSON
    await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify(current),
    });
  } catch (err) {
    console.error("Error updating visit count:", err);
  }
};

export const getTotalVisits = async () => {
  const res = await fetch(BASE_URL + "/latest", {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return Object.values(data.record).reduce((a, b) => a + b, 0);
};
