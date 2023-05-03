import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import LinkIcon from "@mui/icons-material/Link";

import { GetSingleSepratorTaminItemShape } from "types/data/budget/seprator-type";
import { ReactNode } from "react";

import { TableHeadShape } from "types/table-type";
import { useMutation } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import WindowLoading from "components/ui/loading/window-loading";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface SepratorTaminModalProps {
  data: any[];
  formData: any;
  coding: number;
  onDoneTask: () => void;
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
  const { data, formData, coding, onDoneTask } = props;

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
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const linkMutation = useMutation(sepratorBudgetApi.linkTamin, {
    onSuccess: () => {
      onDoneTask();
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

  const handleIconClick = (row: any) => {
    linkMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: coding,
      [sepratorBudgetConfig.REQUEST_DATE]: row.requestDate,
      [sepratorBudgetConfig.REQUEST_PRICE]: row.requestPrice,
      [sepratorBudgetConfig.REQUEST_REF_STR]: row.requestRefStr,
      [sepratorBudgetConfig.REQUEST_DESC]: row.reqDesc,
    });
  };

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

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 6,
    amount: sumFieldsInSingleItemData(data, "requestPrice"),
    code: null,
    budgetCode: null,
    date: null,
    requestDescription: null,
    description: null,
    actions: "" as any,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />
      <WindowLoading active={linkMutation.isLoading} />
    </>
  );
}

export default SepratorTaminModal;
