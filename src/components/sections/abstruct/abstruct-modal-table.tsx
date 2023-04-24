import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import { ReactNode } from "react";
import { GetSingleAbstructProctorModalDataItemShape } from "types/data/report/abstruct-proctor-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  title: ReactNode;
  mosavabHazine: ReactNode;
  expenseHazine: ReactNode;
  jazbHazine: ReactNode;
  mosavabSarmaie: ReactNode;
  expenseSarmaie: ReactNode;
  jazbSarmaie: ReactNode;
  jazbKol: ReactNode;
  actions: (row: any) => ReactNode;
}

interface AbstructModalTableProps {
  data: any[];
}

function AbstructModalTable(props: AbstructModalTableProps) {
  const { data } = props;

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "",
      colspan: 1,
    },
    {
      title: "",
      colspan: 1,
    },
    {
      title: "هزینه ای",
      colspan: 3,
      align: "center",
    },
    {
      title: "سرمایه ای",
      colspan: 3,
      align: "center",
    },
    {
      title: "",
      colspan: 2,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "عنوان",
      name: "title",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavabHazine",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expenseHazine",
      split: true,
    },
    {
      title: "جذب %",
      name: "jazbHazine",
      percent: true,
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavabSarmaie",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expenseSarmaie",
      split: true,
    },
    {
      title: "جذب %",
      name: "jazbSarmaie",
      percent: true,
    },
    {
      title: "جذب کل %",
      name: "jazbKol",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const actionButtons = () => (
    <Box display="flex">
      <IconButton color="primary" size="small">
        <CreateIcon />
      </IconButton>

      <IconButton color="primary" size="small">
        <CorporateFareIcon />
      </IconButton>
    </Box>
  );
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.منطقه,
      mosavabHazine: item.mosavabCurrent,
      expenseHazine: item.expenseCurrent,
      jazbHazine: item[" % جذب هزینه ای"],
      mosavabSarmaie: item.mosavabCivil,
      expenseSarmaie: item.expenseCivil,
      jazbSarmaie: item["% جذب سرمایه ای"],
      jazbKol: item["% جذب کل"],
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooter: TableDataItemShape = {
    number: "جمع",
    title: "",
    mosavabHazine: sumFieldsInSingleItemData(data, "mosavabCurrent"),
    expenseHazine: sumFieldsInSingleItemData(data, "expenseCurrent"),
    jazbHazine: "",
    mosavabSarmaie: sumFieldsInSingleItemData(data, "mosavabCivil"),
    expenseSarmaie: sumFieldsInSingleItemData(data, "expenseCivil"),
    jazbSarmaie: "",
    jazbKol: "",
    actions: () => "",
  };

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default AbstructModalTable;
