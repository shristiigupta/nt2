// visitorLogger.js
const BIN_ID = "690c728bae596e708f4814ba"; 
const API_KEY = "$2a$10$/ERM20klZc811EtIrQqFGeRAbEjXhKfZd5K92avgff9rfIGoe7cja"; 
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const logVisitor = async (pageName) => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const visitorInfo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      org: data.org,
      timezone: data.timezone,
      date: new Date().toLocaleString(),
      pageVisited: pageName,
      email: localStorage.getItem("userEmail") || "Guest",
    };

    // Get existing logs
    const currentRes = await fetch(`${BASE_URL}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });
    const currentData = await currentRes.json();
    const logs = currentData.record?.logs || [];

    // Add new visitor log
    logs.push(visitorInfo);

    // Update the bin
    await fetch(BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
      },
      body: JSON.stringify({ logs }),
    });

    console.log("Visitor logged:", visitorInfo);
  } catch (err) {
    console.error("Error logging visitor:", err);
  }
};
