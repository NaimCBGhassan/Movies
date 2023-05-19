import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./store/store";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

const App = () => {
  const { theme } = useAppSelector((state) => state.theme);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: theme })}>
      {/* Config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={theme}
      />
      {/* mui reset css */}
      <CssBaseline />
      {/* app routes */}
      <RouterProvider router={routes} />
      {/* app routes */}
    </ThemeProvider>
  );
};

export default App;
