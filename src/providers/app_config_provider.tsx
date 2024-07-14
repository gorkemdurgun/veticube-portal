import { ConfigProvider, ConfigProviderProps, theme } from "antd";
import { useAppSelector } from "@/hooks";
import { customTheme } from "@/styles/theme";
import componentTranslationsTR from "@/localization/components/tr_TR";
import componentTranslationsEN from "@/localization/components/en_US";

const AppConfigProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
      {children}
    </ConfigProvider>
  );
};

export default AppConfigProvider;
