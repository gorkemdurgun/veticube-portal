import { ConfigProvider, theme } from "antd";

import componentTranslationsEN from "@/localization/components/en_US";
import componentTranslationsTR from "@/localization/components/tr_TR";
import { customTheme } from "@/styles/theme";

import type { ConfigProviderProps } from "antd";

const AppConfigProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  // const { darkMode } = useAppSelector((state) => state.theme);
  // const { language } = useAppSelector((state) => state.lang);
  let darkMode = false;
  let language = "en";

  const appTheme: ConfigProviderProps["theme"] = {
    algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
    token: customTheme.token,
  };
  const appLocale: ConfigProviderProps["locale"] = language === "tr" ? componentTranslationsTR : componentTranslationsEN;

  return (
    <ConfigProvider theme={appTheme} locale={appLocale}>
      {children}
    </ConfigProvider>
  );
};

export default AppConfigProvider;
