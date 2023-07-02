import { Box, IconButton } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import { useState } from "react";
import { TableHeadShape } from "types/table-type";
import AddIcon from "@mui/icons-material/Add";
import TabAreaContractModal from "./tab-area-contract-modal";
import FixedModal from "components/ui/modal/fixed-modal";

function TabAreaContract() {
  const [isOpenAreaModal, setIsOpenAreaModal] = useState(false);

  const tableHeads: TableHeadShape = [
    {
      name: "number",
      title: (
        <Box>
          ردیف
          <IconButton
            color="primary"
            onClick={() => setIsOpenAreaModal(true)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
      ),
      width: "60px",
    },
    {
      name: "areaName",
      title: "منطقه",
    },
    {
      name: "shareAmount",
      title: "مبلغ",
      width: "160px",
    },
    {
      name: "actions",
      title: "عملیات",
      width: "90px",
    },
  ];
  return (
    <>
      <Box width={500}>
        <FixedTable data={[]} heads={tableHeads} footer={[]} notFixed />
      </Box>

      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
        title="افزودن منطقه"
      >
        <TabAreaContractModal
          formData={FormData}
          onClose={() => setIsOpenAreaModal(false)}
        />
      </FixedModal>
    </>
  );
}

export default TabAreaContract;
