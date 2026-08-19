import { useEffect } from "react";

function DQrcode() {
  useEffect(() => {
    fetch(
      `https://gist.githubusercontent.com/santulanneurotherapy/12eb2e48bcb2084e437bafda086a3c25/raw/diseases_description.json?nocache=${Date.now()}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load Gist");
        }
        return res.json();
      })
      .then((data) => {
        const redirectUrl = data.qrcode_redirect_link;

        if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else {
          console.error("qrcode_redirect_link not found in Gist");
        }
      })
      .catch((err) => {
        console.error("Error loading Gist:", err);
      });
  }, []);

  return null;
}

export default DQrcode;