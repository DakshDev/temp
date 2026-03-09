import { useLang } from "../context/LanguageContext";
import { t } from "../i18n";

export const useTranslation = () => {
  const { lang } = useLang();
  return (key) => t(key, lang);
};