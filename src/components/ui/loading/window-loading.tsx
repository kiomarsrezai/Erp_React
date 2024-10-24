import { Box, Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { createPortal } from "react-dom";

interface WindowLoadingProps {
  active: boolean;
  onCancel?: any;
  canCancel?: boolean;
}
function WindowLoading(props: WindowLoadingProps) {
  const { active, onCancel, canCancel } = props;

  return createPortal(
    <Backdrop open={active} sx={{ zIndex: 100000 }}>
      <Box
        sx={{
          position: "fixed",
          zIndex: 1000002,
          top: "50%",
          left: "50%",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>

      {canCancel && (
        <Box
          sx={{
            position: "fixed",
            zIndex: 1000002,
            bottom: "2%",
            left: "50%",
          }}
        >
          <Button variant="contained" color="error" onClick={onCancel}>
            انصراف
          </Button>
        </Box>
      )}
    </Backdrop>,
    document.body
  );
}

export default WindowLoading;
