import React, { useEffect } from "react";

function CustomTranslate() {
  useEffect(() => {
    // Load Google Translate script only once
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Add placeholder "Select Language" at the top of dropdown
      const observer = new MutationObserver(() => {
        const select = document.querySelector("#google_translate_element select");
        if (select && !select.dataset.placeholderSet) {
          select.dataset.placeholderSet = "true";
          const firstOption = document.createElement("option");
          firstOption.text = "Select Language";
          firstOption.value = "";
          firstOption.selected = true;
          firstOption.disabled = true;
          select.prepend(firstOption);
        }
      });

      observer.observe(document.getElementById("google_translate_element"), {
        childList: true,
        subtree: true,
      });
    };
  }, []);

  return <div id="google_translate_element" style={{ margin: "0 10px" }}></div>;
}

export default CustomTranslate;
