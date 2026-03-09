export const getLanguage = () => {
  return localStorage.getItem("lang") || "en";
}; 