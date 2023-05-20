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

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ProposalModal1SearchProos {
  formData: any;
  data: GetSearchPropsalModal1Data[];
  codingId: number;
  onDoneTask: () => void;
}

function ProposalModal1Search(props: ProposalModal1SearchProos) {
  const { formData, data, codingId, onDoneTask } = props;

  const [filterText, setFilterText] = useState("");

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
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
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
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
      onDoneTask();
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });
  //   data
  const handleAddClick = (
    row: GetSearchPropsalModal1Data & TableDataItemShape
  ) => {
    insertMutation.mutate({
      ...formData,
      [proposalConfig.coding]: row.id,
    });
  };

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
    unFormatData: GetSearchPropsalModal1Data[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = filterText.length || true
    ? formatTableData(
        data.filter(
          (item) =>
            item.description.includes(filterText) ||
            item.code.includes(filterText)
        )
      )
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

export default ProposalModal1Search;
