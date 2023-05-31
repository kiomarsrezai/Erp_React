import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { createPortal } from "react-dom";
import { ReactNode } from "react";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: 0,
    // height: 500,
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
  title?: string | ReactNode;
  topTitle?: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
  isNested?: boolean;
  isBig?: boolean;
  isBiger?: boolean;
}

function FixedModal(props: FixedModalProps) {
  const {
    open,
    handleClose,
    children,
    loading,
    title,
    isNested,
    isBig,
    isBiger,
    maxWidth,
    maxHeight,
    topTitle,
  } = props;

  // loading
  const renderLoading = (
    <Box height={1} display="flex" justifyContent="center" alignItems="center">
      <CircularProgress color="inherit" />
    </Box>
  );

  return createPortal(
    <BootstrapDialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialogContent-root": {},
        "& .MuiDialog-container>.MuiPaper-root": {
          height:
            maxHeight ||
            (isBiger ? "90%" : isBig ? "80%" : isNested ? "70%" : "60%"),
          minHeight: "500px",
          width: "100%",
          maxWidth: maxWidth || (isNested ? "md" : "lg"),
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {!(title === undefined) ? (
            <>
              {topTitle}
              {title}
            </>
          ) : (
            "جزئیات اطلاعات"
          )}
        </Box>
        <IconButton size="small" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? renderLoading : children}
      </DialogContent>
    </BootstrapDialog>,
    document.body
  );
}

export default FixedModal;
