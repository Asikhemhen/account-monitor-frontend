import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    i18n.changeLanguage("pt"); // Set default language to Portuguese
  }, [i18n]); // The empty dependency array ensures this only runs once on mount

  return (
    <div className="flex justify-center items-center h-20 bg-white pt-5">
      <p className="text-sm">
        {t("footer.copyright")} &copy; 2025 {t("footer.allRightsReserved")}
      </p>
    </div>
  );
};

export default Footer;
