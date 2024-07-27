import "./index.css";
import router from "./router";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
import RightToLeft from "components/layout/right-to-left";

import { SnackbarProvider } from "notistack";
import { RouterProvider, useLocation } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// @ts-ignore
import "config/yup-config.ts";
import "assets/styles/font.css";
import "assets/styles/global.css";
import "react-medium-image-zoom/dist/styles.css";
import { reactQueryClient } from "config/react-query-keys-config";
import Localization from "components/layout/localization";
import { useEffect } from "react";
import {orange} from "@mui/material/colors";

// material ui theme
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      // main: '#2F3C7E',
      // main: '#FFBB00',
      // main: '#735DA5',
      // main: '#00246B',
      // main: '#B85042',
      main: orange[500],
      // main: 'rgb(56, 188, 213)',
    },
  },
});

function App() {
  // refesh
  // const userState = userStore();
  useEffect(() => {
    window.addEventListener("storage", (e) => {
      if (e?.key === "token-auth") {
        window.location.reload();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={reactQueryClient}>
      <ThemeProvider theme={theme}>
        <RightToLeft>
          <Localization>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              autoHideDuration={2500}
              classes={{ containerRoot: "z-alert" }}
            >
              <CssBaseline />
              <RouterProvider router={router} />
            </SnackbarProvider>
          </Localization>
        </RightToLeft>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
