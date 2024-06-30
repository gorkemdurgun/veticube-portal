import { Button, ConfigProvider, ConfigProviderProps, theme } from "antd";
import { useState } from "react";
import { useAppSelector } from "@/hooks";

import i18n from "@/localization/i18n";
import componentTranslationsTR from "@/localization/components/tr_TR";
import componentTranslationsEN from "@/localization/components/en_US";

import { customTheme } from "../../styles/theme";
import { I18nextProvider, useTranslation } from "react-i18next";

export const AppConfigProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { darkMode } = useAppSelector((state) => state.theme);
  const { preferredLanguage } = useAppSelector((state) => state.language);

  const tempTheme: ConfigProviderProps["theme"] = {
    token: {},
  };

  const appTheme: ConfigProviderProps["theme"] = {
    algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
    token: customTheme.token,
  };

  const componentTranslations = preferredLanguage === "tr" ? componentTranslationsTR : componentTranslationsEN;

  return (
    <ConfigProvider theme={appTheme} locale={componentTranslations}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </ConfigProvider>
  );
};
