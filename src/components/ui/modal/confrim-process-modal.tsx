import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";

import { createPortal } from "react-dom";
import { styled } from "@mui/material/styles";
import { Button, Stack } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: 0,
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
  title?: string;
  text?: string;
  onCancel: () => void;
  onConfrim: () => void;
}

function ConfrimProcessModal(props: FixedModalProps) {
  const { open, onCancel, onConfrim, title, text } = props;

  return createPortal(
    <BootstrapDialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>{title || "تایید کردن عملیات"}</Box>
        <IconButton size="small" onClick={onCancel}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box maxHeight={1} padding={3}>
          <Typography
            variant="body1"
            mb={2}
            textAlign="center"
            fontWeight={500}
          >
            {text || "آیا مایل به ادامه دادن هستید ؟"}
          </Typography>

          <Stack justifyContent="center" direction="row" spacing={1}>
            <Button variant="contained" color="primary" onClick={onConfrim}>
              تایید
            </Button>
            <Button variant="text" color="primary" onClick={onCancel}>
              انصراف
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </BootstrapDialog>,
    document.body
  );
}

export default ConfrimProcessModal;
