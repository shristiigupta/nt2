import React, { useEffect } from "react";

function TranslateDropdown() {
  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // original language
          includedLanguages: "", // empty = all languages
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };
  }, []);

  return <div id="google_translate_element" style={{ margin: "10px 0" }}></div>;
}

export default TranslateDropdown;
