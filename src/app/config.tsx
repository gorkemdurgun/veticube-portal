import { Button, ConfigProvider, ConfigProviderProps, theme } from "antd";
import { useState } from "react";

import langTR from "@/localization/tr_TR";

export const AppConfigProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLang, setSelectedLang] = useState("tr");

  const appTheme: ConfigProviderProps["theme"] = {
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
   
  };

  let lang = selectedLang === "tr" ? langTR : undefined;

  return (
    <ConfigProvider theme={appTheme} locale={lang}>
      {children}
    </ConfigProvider>
  );
};
