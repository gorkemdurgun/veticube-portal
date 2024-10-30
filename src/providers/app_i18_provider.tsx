import { useEffect } from "react";

import { useAppSelector } from "@/hooks";
import i18n from "@/localization/i18n";

const AppI18Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // const { language } = useAppSelector((state) => state.lang);
  let language = "en";

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return children;
};

export default AppI18Provider;