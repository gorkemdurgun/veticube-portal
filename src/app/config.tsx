import { Button, ConfigProvider, ConfigProviderProps, theme } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";

import componentTranslationsTR from "@/localization/components/tr_TR";
import componentTranslationsEN from "@/localization/components/en_US";

import { customTheme } from "@/styles/theme";

import AuthProvider from "@/providers/auth_provider";
import I18Provider from "@/providers/i18_provider";

export const AppConfigProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { darkMode } = useAppSelector((state) => state.theme);
  const { language } = useAppSelector((state) => state.lang);

  const appTheme: ConfigProviderProps["theme"] = {
    algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
    token: customTheme.token,
  };
  const appLocale: ConfigProviderProps["locale"] = language === "tr" ? componentTranslationsTR : componentTranslationsEN;

  return (
    <ConfigProvider theme={appTheme} locale={appLocale}>
      <I18Provider>
        <AuthProvider>{children}</AuthProvider>
      </I18Provider>
    </ConfigProvider>
  );
};
