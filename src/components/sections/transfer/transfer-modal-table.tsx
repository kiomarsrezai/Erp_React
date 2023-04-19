import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleTransferModalDataItemShape } from "types/data/transfer/transfer-type";
import { useMutation } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import WindowLoading from "components/ui/loading/window-loading";

interface TableDataItemShape {
  markazHazine: ReactNode;
  idTafsily5: ReactNode;
  idMoein: ReactNode;
  idKol: ReactNode;
  name: ReactNode;
  expense: ReactNode;
  actions: (row: any) => ReactNode;
}

interface TransferModalTableProps {
  data: any[];
  codeAcc: string;
  onDoneTask: () => void;
}

function TransferModalTable(props: TransferModalTableProps) {
  const { data, codeAcc, onDoneTask } = props;

  // heads
  const tableHeads: TableHeadShape = [
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
      title: "عملکرد",
      name: "expense",
      split: true,
    },
    {
      title: "نام سرفصل",
      name: "name",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
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
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const actionButtons = (row: any) => (
    <IconButton
      color="primary"
      onClick={() =>
        linkCodeAccMutation.mutate({
          ...row,
          [transferConfig.TITLE_ACC]: row.name,
          [transferConfig.CODE_ACC]: codeAcc,
        })
      }
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
      markazHazine: item.markazHazine,
      idTafsily5: item.idTafsily5,
      idMoein: item.idMoein,
      idKol: item.idKol,
      name: item.name,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return (
    <>
      <FixedTable heads={tableHeads} data={tableData} notFixed />
      <WindowLoading active={linkCodeAccMutation.isLoading} />
    </>
  );
}

export default TransferModalTable;
