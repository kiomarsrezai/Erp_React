import router from "./router";
import CssBaseline from "@mui/material/CssBaseline";

import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
