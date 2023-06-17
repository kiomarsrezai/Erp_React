import FixedTable from "components/data/table/fixed-table";
import AddIocn from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ReactNode, useState } from "react";
import { GetModalBaseData } from "types/data/budget/proposal-type";
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

interface ProposalBudgetBaseModalProps {
  data: GetModalBaseData[];
  formData: any;
  onDoneTask: () => void;
}

function ProposalBudgetBaseModal(props: ProposalBudgetBaseModalProps) {
  const { data, onDoneTask, formData } = props;

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
      colspan: 5,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "80px",
    },
    {
      title: "سطح",
      name: "levelNumber",
      width: "100px",
    },
    {
      title: "کد",
      name: "code",
      width: "150px",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "90px",
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
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  // data
  const handleAddClick = (row: GetModalBaseData & TableDataItemShape) => {
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
    unFormatData: GetModalBaseData[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = formatTableData(
    filterText
      ? data.filter(
          (item) =>
            item.description.includes(filterText) ||
            item.code.includes(filterText)
        )
      : []
  );

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      tableLayout="auto"
      enableVirtual
      notFixed
    />
  );
}

export default ProposalBudgetBaseModal;
