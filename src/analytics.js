export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
    });
  }
};
