import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./store/store";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: theme })}>
      {/* Config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={theme}
      />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;
