import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { CacheProvider } from "@emotion/react";
import { ReactNode } from "react";

interface LocalizationProps {
  children: ReactNode;
}
function Localization(props: LocalizationProps) {
  const { children } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      {children}
    </LocalizationProvider>
  );
}

export default Localization;
