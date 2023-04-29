import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import LinkIcon from "@mui/icons-material/Link";

import { GetSingleSepratorTaminItemShape } from "types/data/budget/seprator-type";
import { ReactNode } from "react";

import { TableHeadShape } from "types/table-type";

interface SepratorTaminModalProps {
  data: any[];
}

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  date: ReactNode;
  budgetCode: ReactNode;
  description: ReactNode;
  requestDescription: ReactNode;
  amount: ReactNode;
  actions: (row: TableDataItemShape) => ReactNode;
}

function SepratorTaminModal(props: SepratorTaminModalProps) {
  const { data } = props;
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره درخواست",
      name: "code",
    },
    {
      title: "تاریخ درخواست",
      name: "date",
    },
    {
      title: "کد بودجه",
      name: "budgetCode",
    },
    {
      title: "شرح ردیف بودجه",
      name: "description",
      align: "left",
    },
    {
      title: "شرح درخواست",
      name: "requestDescription",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "amount",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const handleIconClick = (row: TableDataItemShape) => {};

  const actionButton = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleIconClick(row)}
    >
      <LinkIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleSepratorTaminItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      amount: item.requestPrice,
      date: item.requestDate,
      budgetCode: item.bodgetId,
      code: item.requestRefStr,
      description: item.bodgetDesc,
      requestDescription: item.reqDesc,
      actions: actionButton,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default SepratorTaminModal;
