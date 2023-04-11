import router from "router";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/system/ThemeProvider";
import RightToLeft from "components/layout/right-to-left";

import { RouterProvider } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

import "assets/styles/font.css";
import "assets/styles/global.css";

const theme = createTheme({
  direction: "rtl",
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RightToLeft>
        <CssBaseline />
        <RouterProvider router={router} />
      </RightToLeft>
    </ThemeProvider>
  );
}

export default App;
