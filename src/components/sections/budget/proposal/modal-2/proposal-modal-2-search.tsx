import FixedTable from "components/data/table/fixed-table";
import AddIocn from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ReactNode, useState } from "react";
import { GetSearchPropsalModal1Data } from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { proposalConfig } from "config/features/budget/proposal-config";
import AreaInput from "components/sections/inputs/area-input";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ProposalModal2SearchProos {
  formData: any;
}

function ProposalModal2Search(props: ProposalModal2SearchProos) {
  const { formData } = props;

  const [modalFormData, setModalFormData] = useState({
    [proposalConfig.AREA]: undefined,
  });

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <AreaInput
            setter={setModalFormData}
            value={modalFormData[proposalConfig.AREA]}
            level={3}
            // showError={haveSubmitedForm}
          />
        </Box>
      ),
      colspan: 4,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "code",
    },
    {
      title: "نام پروژه",
      name: "description",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // insert
  const insertMutation = useMutation(proposalBudgetApi.insertModal1, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });
  //   data
  // const handleAddClick = (
  //   row: GetSearchPropsalModal1Data & TableDataItemShape
  // ) => {
  //   insertMutation.mutate({
  //     ...formData,
  //     [proposalConfig.coding]: "something",
  //   });
  // };

  // const actionButtons = (row: any) => (
  //   <IconButton
  //     color="primary"
  //     size="small"
  //     onClick={() => handleAddClick(row)}
  //   >
  //     <AddIocn />
  //   </IconButton>
  // );

  // const formatTableData = (
  //   unFormatData: GetSearchPropsalModal1Data[]
  // ): TableDataItemShape[] => {
  //   const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
  //     ...item,
  //     number: i + 1,
  //     actions: actionButtons,
  //   }));

  //   return formatedData;
  // };

  return (
    <FixedTable
      data={[]}
      heads={tableHeads}
      headGroups={headGroup}
      enableVirtual
      notFixed
    />
  );
}

export default ProposalModal2Search;
