import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { ReactNode } from "react";

interface FixedModalProps {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
  loading?: boolean;
  title?: string;
}

function FixedModal(props: FixedModalProps) {
  const { open, handleClose, children, loading, title } = props;

  const container = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    bgcolor: "background.paper",
    outline: 0,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  // loading
  const renderLoading = (
    <Box height={1} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="inherit" />
    </Box>
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={container}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px={2}
          height={50}
          py={0.5}
        >
          <Typography variant="body1" fontSize={14} color="GrayText">
            {title || "جزئیات اطلاعات"}
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ overflowY: "auto" }} height={"100%"}>
          {loading ? renderLoading : children}
        </Box>
      </Box>
    </Modal>
  );
}

export default FixedModal;
