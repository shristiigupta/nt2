// visitorLogger.js
export const logVisitor = async (pageName) => {
  try {
    // Get IP + location info
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const visitorInfo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      latitude: data.latitude,
      longitude: data.longitude,
      org: data.org,
      timezone: data.timezone,
      date: new Date().toLocaleString(),
      pageVisited: pageName,
      email: localStorage.getItem("userEmail") || "Guest",
    };

    // Save to localStorage
    const existingLogs =
      JSON.parse(localStorage.getItem("visitorLogs")) || [];
    existingLogs.push(visitorInfo);
    localStorage.setItem("visitorLogs", JSON.stringify(existingLogs));

  } catch (err) {
    console.error("Error logging visitor:", err);
  }
};
