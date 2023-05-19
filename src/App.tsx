import { ThemeProvider } from "@mui/material/styles";
import { useAppSelector } from "./store/store";
import themeConfigs from "./configs/theme.config";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

import "react-toastify/dist/ReactToastify.css";

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
        limit={2}
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
