import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { ReactNode } from "react";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: 0,
    height: 500,
  },

  "& .MuiDialogTitle-root": {
    fontSize: 14,
  },

  "& .MuiPaper-root": {},

  "& .MuiBox-root": {
    height: "100%",
  },
}));

interface FixedModalProps {
  open: boolean;
  handleClose: () => void;
  children?: ReactNode;
  loading?: boolean;
  title?: string;
}

function FixedModal(props: FixedModalProps) {
  const { open, handleClose, children, loading, title } = props;

  // loading
  const renderLoading = (
    <Box height={1} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="inherit" />
    </Box>
  );

  return (
    <BootstrapDialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>{title || "جزئیات اطلاعات"}</Box>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box maxHeight={1}>{loading ? renderLoading : children}</Box>
      </DialogContent>
    </BootstrapDialog>
  );
}

export default FixedModal;
