import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import FixedModal from "components/ui/modal/fixed-modal";

import { useState } from "react";
import RequestTopheadTableModal from "./request-tophead-table-modal";

function RequestTopheadTableForm() {
  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const handleDoneTask = () => {
    setIsOpenAddItemModal(false);
  };

  return (
    <>
      <Stack direction="row">
        <IconButton
          color="primary"
          size="small"
          onClick={() => setIsOpenAddItemModal(true)}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <FixedModal
        open={isOpenAddItemModal}
        handleClose={() => setIsOpenAddItemModal(false)}
        title="افزودن آیتم"
      >
        <RequestTopheadTableModal onDoneTask={handleDoneTask} />
      </FixedModal>
    </>
  );
}

export default RequestTopheadTableForm;
