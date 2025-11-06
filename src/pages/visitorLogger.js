// visitorLogger.js
export const logVisitor = async (pageName) => {
  try {
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

    // ✅ Send data to your collector (replace URL below)
    await fetch("https://webhook.site/2ece17e7-769a-4fee-a293-92ea9b6a1bd8", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visitorInfo),
    });

    console.log("Visitor logged:", visitorInfo);
  } catch (err) {
    console.error("Error logging visitor:", err);
  }
};


