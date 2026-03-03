const BIN_ID = "690c728bae596e708f4814ba";
const API_KEY = "$2a$10$/ERM20klZc811EtIrQqFGeRAbEjXhKfZd5K92avgff9rfIGoe7cja";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export const logVisitor = async (pageName) => {
  try {
    const now = new Date();
    const formattedDate = now.toLocaleString("en-GB", {
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    let visitorInfo = {
      ip: "Unknown",
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      org: "Unknown",
      timezone: "Unknown",
      date: formattedDate,
      pageVisited: pageName,
    };

    // Fetch IP data
    try {
      const res = await fetch("https://ipwho.is/");
      const data = await res.json();

      if (data && data.success) {
        visitorInfo = {
          ip: data.ip || "Unknown",
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          country: data.country || "Unknown",
          org: data.connection?.isp || "Unknown",
          timezone: data.timezone?.id || "Unknown",
          date: formattedDate,
          pageVisited: pageName,
        };
      } else {
        console.warn("IP API failed:", data?.message);
      }
    } catch (ipError) {
      console.warn("IP fetch failed:", ipError);
    }

    // Get existing logs
    const currentRes = await fetch(`${BASE_URL}/latest`, {
      headers: { "X-Master-Key": API_KEY },
    });

    const currentData = await currentRes.json();
    const logs = currentData.record?.logs || [];

    // Add newest visitor
    logs.unshift(visitorInfo);

    // Limit logs to prevent bin overflow (VERY IMPORTANT)
    if (logs.length > 300) {
      logs.pop();
    }

    // Update bin
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