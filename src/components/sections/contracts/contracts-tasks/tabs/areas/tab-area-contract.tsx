import { Box, IconButton } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import { useState } from "react";
import { TableHeadShape } from "types/table-type";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TabAreaContractModal from "./tab-area-contract-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { GetSingleSearchContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TabAreaContractProps {
  formData: any;
}
function TabAreaContract(props: TabAreaContractProps) {
  const { formData } = props;
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
      align: "left",
    },
    {
      name: "shareAmount",
      title: "مبلغ",
      width: "160px",
      split: true,
    },
    {
      name: "actions",
      title: "عملیات",
      width: "90px",
    },
  ];

  // delete
  const handleDeleteClick = () => {};

  // edit
  const handleEditClick = () => {};

  // actions
  const actionButtons = () => {
    return (
      <Box>
        <IconButton size="small" onClick={handleDeleteClick} color="error">
          <DeleteIcon />
        </IconButton>

        <IconButton size="small" onClick={handleEditClick} color="primary">
          <EditIcon />
        </IconButton>
      </Box>
    );
  };
  // data
  const areaQuery = useQuery(
    reactQueryKeys.contracts.tasks.getArea,
    () => contractsTasksApi.areaRead({}),
    {
      enabled: false,
    }
  );

  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskItemShape[]
  ) => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = areaQuery.data ? formatTableData(areaQuery.data?.data) : [];

  // footer
  const sumShareAmount = sumFieldsInSingleItemData(
    areaQuery.data?.data,
    "shareAmount"
  );
  const tableFooter = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    shareAmount: sumShareAmount,
    actions: "",
  };

  return (
    <>
      <Box width={500}>
        <FixedTable
          data={tableData}
          heads={tableHeads}
          footer={tableFooter}
          notFixed
        />
      </Box>

      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
        title="افزودن منطقه"
        maxWidth="sm"
      >
        <TabAreaContractModal
          formData={formData}
          onClose={() => setIsOpenAreaModal(false)}
        />
      </FixedModal>
    </>
  );
}

export default TabAreaContract;
