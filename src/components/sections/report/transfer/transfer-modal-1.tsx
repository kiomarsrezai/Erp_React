import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import WindowLoading from "components/ui/loading/window-loading";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleTransferModalDataItemShape } from "types/data/transfer/transfer-type";
import { useMutation } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  markazHazine: ReactNode;
  idTafsily5: ReactNode;
  idMoein: ReactNode;
  idKol: ReactNode;
  name: ReactNode;
  number: ReactNode;
  expense: ReactNode;
  actions: (row: any) => ReactNode;
}

interface TransferModal1Props {
  data: any[];
  areaId: number;
  onDoneTask: () => void;
  disableAction?: boolean;
}

function TransferModal1(props: TransferModal1Props) {
  const { data, areaId, onDoneTask, disableAction } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "عنوان مرکز هزینه",
      name: "markazHazine",
      align: "left",
    },
    {
      title: "مرکز هزینه",
      name: "idTafsily5",
    },
    {
      title: "تفضیلی",
      name: "idTafsily",
    },
    {
      title: "معین",
      name: "idMoein",
    },
    {
      title: "کل",
      name: "idKol",
    },
    {
      title: "نام سرفصل",
      name: "name",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      hidden: disableAction || false,
    },
  ];

  // actions
  const linkCodeAccMutation = useMutation(transferApi.linkCodeAcc, {
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

  const handleLinkClick = (row: any) => {
    const codeAcc = `${row.idKol}-${row.idMoein}-${row.idTafsily}${
      areaId <= 9 ? "-" + row.idTafsily5 : ""
    }`;
    linkCodeAccMutation.mutate({
      ...row,
      [transferConfig.TITLE_ACC]: `${row.name} --- ${row.markazHazine}`,
      [transferConfig.CODE_ACC]: codeAcc,
    });
  };

  const actionButtons = (row: any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleLinkClick(row)}
    >
      <InsertLinkIcon />
    </IconButton>
  );

  // body
  const formatTableData = (
    unFormatData: GetSingleTransferModalDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      markazHazine: item.markazHazine,
      idTafsily5: item.idTafsily5,
      idMoein: item.idMoein,
      idKol: item.idKol,
      name: item.name,
      expense: item.expense,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 7,
    markazHazine: null,
    idTafsily5: null,
    idTafsily: null,
    idMoein: null,
    idKol: null,
    name: null,
    expense: sumFieldsInSingleItemData(data, "expense"),
    actions: "",
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />
      <WindowLoading active={linkCodeAccMutation.isLoading} />
    </>
  );
}

export default TransferModal1;
