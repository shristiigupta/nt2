const BIN_ID = "690c728bae596e708f4814ba";
const API_KEY = "$2a$10$/ERM20klZc811EtIrQqFGeRAbEjXhKfZd5K92avgff9rfIGoe7cja";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const logVisitor = async (pageName) => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    // ✅ Strict 24-hour format (no AM/PM, no seconds)
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const visitorInfo = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      org: data.org,
      timezone: data.timezone,
      date: formattedDate,
      pageVisited: pageName,
    };

    // Get existing logs
    const currentRes = await fetch(`${BASE_URL}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });
    const currentData = await currentRes.json();
    const logs = currentData.record?.logs || [];

    // ✅ Add newest visitor to top
    logs.unshift(visitorInfo);

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
