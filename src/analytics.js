export const trackPageView = (path) => {
  // 1️⃣ Google Analytics (keep this)
  if (window.gtag) {
    window.gtag("config", "G-DEBB3ZWF6M", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  // 2️⃣ Visitor logging (new)
  fetch("/.netlify/functions/log-visit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pageVisited: path
    })
  }).catch(() => {});
};
