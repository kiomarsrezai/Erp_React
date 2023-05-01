import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { createPortal } from "react-dom";

interface WindowLoadingProps {
  active: boolean;
}
function WindowLoading(props: WindowLoadingProps) {
  const { active } = props;

  return createPortal(
    <Backdrop open={active} sx={{ zIndex: 100000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.body
  );
}

export default WindowLoading;
