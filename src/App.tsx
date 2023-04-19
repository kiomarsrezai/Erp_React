import router from "router";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
import RightToLeft from "components/layout/right-to-left";

import { SnackbarProvider } from "notistack";
import { RouterProvider } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "assets/styles/font.css";
import "assets/styles/global.css";

// react query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

// material ui theme
const theme = createTheme({
  direction: "rtl",
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RightToLeft>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            autoHideDuration={1000}
            classes={{ containerRoot: "z-alert" }}
          >
            <CssBaseline />
            <RouterProvider router={router} />
          </SnackbarProvider>
        </RightToLeft>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
