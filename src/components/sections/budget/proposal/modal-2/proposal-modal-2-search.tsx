import FixedTable from "components/data/table/fixed-table";
import AddIocn from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ReactNode, useEffect, useState } from "react";
import {
  GetSearchPropsalModal1Data,
  GetSearchPropsalModal2Data,
} from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { proposalConfig } from "config/features/budget/proposal-config";
import AreaInput from "components/sections/inputs/area-input";

interface TableDataItemShape {
  number: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ProposalModal2SearchProos {
  formData: any;
  codingId: number;
  onDoneTask: () => void;
}

function ProposalModal2Search(props: ProposalModal2SearchProos) {
  const { formData, codingId, onDoneTask } = props;

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
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // insert
  const insertMutation = useMutation(proposalBudgetApi.insertModal2, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const handleAddClick = (
    row: GetSearchPropsalModal1Data & TableDataItemShape
  ) => {
    insertMutation.mutate({
      [proposalConfig.AREA]: modalFormData[proposalConfig.AREA],
      [proposalConfig.coding]: codingId,
      [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
      id: row.id,
    });
  };

  //   data
  const searchMutation = useMutation(proposalBudgetApi.getSearchModal2Data);

  useEffect(() => {
    searchMutation.mutate({ ...formData, ...modalFormData });
  }, [modalFormData]);

  const actionButtons = (row: any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleAddClick(row)}
    >
      <AddIocn />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSearchPropsalModal2Data[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = searchMutation.data?.data
    ? formatTableData(searchMutation.data.data)
    : [];

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      enableVirtual
      notFixed
    />
  );
}

export default ProposalModal2Search;
