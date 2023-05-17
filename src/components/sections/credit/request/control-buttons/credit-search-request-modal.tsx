import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

import { ReactNode } from "react";
import { TableHeadShape } from "types/table-type";
import {
  CreditReadRequestShape,
  SearchCreditRequestShape,
} from "types/data/credit/credit-request-type";
import { useMutation } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";

interface TableDataItemShape {
  rowNumber: ReactNode;
  employee: ReactNode;
  number: ReactNode;
  dateS: ReactNode;
  description: ReactNode;
  estimateAmount: ReactNode;
  actions: (row: any) => ReactNode;
}

interface CreditSearchRequestModalProps {
  data: any[];
  onDoneTask: (data: CreditReadRequestShape) => void;
}

function CreditSearchRequestModal(props: CreditSearchRequestModalProps) {
  const { data, onDoneTask } = props;

  // table head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "تاریخ",
      name: "dateS",
    },
    {
      title: "ثبت کننده",
      name: "employee",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "براورد مبلغ",
      name: "estimateAmount",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // read request
  const readMutation = useMutation(creditRequestApi.readRequest, {
    onSuccess: (data) => {
      onDoneTask(data.data);
    },
  });

  // table data
  const handleClickCheckBtn = (
    row: TableDataItemShape & SearchCreditRequestShape
  ) => {
    readMutation.mutate(row.id);
  };

  const actionButtons = (
    row: TableDataItemShape & SearchCreditRequestShape
  ) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckBtn(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: SearchCreditRequestShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      rowNumber: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default CreditSearchRequestModal;
