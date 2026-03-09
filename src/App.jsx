import { AppContextProvider } from "./context/AppContext";
import { useLang } from "./context/LanguageContext";
import AppRoutes from "./routes/AppRoutes";

function App() {

  const { lang } = useLang();

  return (
    <div dir={lang === "ar" ? "rtl" : "ltr"}>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </div>
  );
}

export default App;
