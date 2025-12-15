export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag("config", "G-DEBB3ZWF6M", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};
