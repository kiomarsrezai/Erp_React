import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import WindowLoading from "components/ui/loading/window-loading";
import PrintIcon from "@mui/icons-material/Print";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleTransferModalDataItemShape } from "types/data/transfer/transfer-type";
import { useMutation } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import { financialTransferStimul } from "stimul/financial/transfer/financial-transfer-stimul";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";

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
  formData: any;
}

function TransferModal1(props: TransferModal1Props) {
  const { data, areaId, onDoneTask, disableAction, formData } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شرح پروژه",
      name: "tafsily6Name",
      align: "left",
    },
    {
      title: "پروژه",
      name: "idTafsily6",
      align: "left",
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
    let codeAcc = "";
    if(areaId <= 9) {
      codeAcc = `${row.idKol}-${row.idMoein}-${row.idTafsily}-${row.idTafsily5}`;
    }else if(areaId >= 11){
      codeAcc = `${row.idKol}-${row.idMoein}-${row.idTafsily}-${row.idTafsily5}-${row.idTafsily6}`;
    }
  
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

  // print
  const handlePrintForm = () => {
    if (data) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 2);

      financialTransferStimul({
        data: data,
        footer: [tableFooter],
        year: yearLabel,
        area: areaLabel,
        numberShow: "ریال",
      });
    }
  };

  const tableHeadGroup = [
    {
      title: (
        <IconButton color="primary" onClick={handlePrintForm}>
          <PrintIcon />
        </IconButton>
      ),
      colspan: 11,
    },
  ];

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        headGroups={tableHeadGroup}
        notFixed
      />

      <WindowLoading active={linkCodeAccMutation.isLoading} />
    </>
  );
}

export default TransferModal1;
