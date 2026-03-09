import en from "./en.json";
import ar from "./ar.json";
import de from "./de.json";

const dictionaries = { en, ar, de };

export const t = (key, lang = "en") => {
  return dictionaries[lang]?.[key] || dictionaries["en"]?.[key] || key;
};