import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ColorizeIcon from "@mui/icons-material/Colorize";
import FixedModal from "components/ui/modal/fixed-modal";
import CastleIcon from "@mui/icons-material/Castle";
import AbstructModal2 from "./abstruct-modal-2";
import PrintIcon from "@mui/icons-material/Print";

import { ReactNode, useState } from "react";
import { GetSingleAbstructProctorModalDataItemShape } from "types/data/report/abstruct-proctor-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { useMutation } from "@tanstack/react-query";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { getGeneralFieldItemYear } from "helper/export-utils";
import { abstructProctorModal1Stimul } from "stimul/budget/report/proctor/abstruct-proctor-modal1-stimul";

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

interface AbstructModal1Props {
  data: any[];
  title: string;
  formdata: any;
  recordId: number;
}

function AbstructModal1(props: AbstructModal1Props) {
  const { data, title, formdata, recordId } = props;

  // table heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "ردیف",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "عنوان",
      colspan: 1,
      rowspan: 2,
      align: "center",
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
      title: "% جذب کل",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "عملیات",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      hiddenSelf: true,
    },
    {
      title: "عنوان",
      name: "title",
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "مصوب",
      name: "mosavabHazine",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseHazine",
      split: true,
      align: "left",
    },
    {
      title: "% جذب",
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
      title: "% جذب",
      name: "jazbSarmaie",
      forceHaveBorder: true,
      percent: true,
    },
    {
      title: "جذب کل %",
      name: "jazbKol",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "عملیات",
      name: "actions",
      hiddenSelf: true,
    },
  ];

  // table data
  const handleClickCreateIcon = (row: any) => {
    dataModalRowMutation.mutate({
      ...formdata,
      [abstructProctorConfig.BUDGETPROCESS]: 2,
      [abstructProctorConfig.PROCTOR]: recordId,
      [abstructProctorConfig.AREA]: row.areaId,
    });
    setAreaName(`${row.areaName} - اعتبارات هزینه ای`);
    handleOpenBudgetRowModal();
  };

  const handleClickFareIcon = (row: any) => {
    dataModalRowMutation.mutate({
      ...formdata,
      [abstructProctorConfig.BUDGETPROCESS]: 3,
      [abstructProctorConfig.PROCTOR]: recordId,
      [abstructProctorConfig.AREA]: row.areaId,
    });
    setAreaName(`${row.areaName} - تملک دارایی های سرمایه ای`);
    handleOpenBudgetRowModal();
  };
  const actionButtons = (row: any) => (
    <Box display="flex" justifyContent={"center"}>
      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickCreateIcon(row)}
      >
        <ColorizeIcon />
      </IconButton>

      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickFareIcon(row)}
      >
        <CastleIcon />
      </IconButton>
    </Box>
  );
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.areaName,
      mosavabHazine: item.mosavabCurrent,
      expenseHazine: item.expenseCurrent,
      jazbHazine: item.percentCurrent,
      mosavabSarmaie: item.mosavabCivil,
      "textcolor-expenseHazine": item.expenseCurrent < 0 ? "red" : "",
      "textcolor-expenseSarmaie": item.expenseCivil < 0 ? "red" : "",
      expenseSarmaie: item.expenseCivil,
      jazbSarmaie: item.percentCivil,
      jazbKol: item.percentTotal,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const sumMosavabHazine = sumFieldsInSingleItemData(data, "mosavabCurrent");
  const sumExpenseHazine = sumFieldsInSingleItemData(data, "expenseCurrent");

  const sumMosavabSarmaie = sumFieldsInSingleItemData(data, "mosavabCivil");
  const sumExpenseSarmaie = sumFieldsInSingleItemData(data, "expenseCivil");

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    title: null,
    mosavabHazine: sumMosavabHazine,
    expenseHazine: sumExpenseHazine,
    jazbHazine: getPercent(sumExpenseHazine, sumMosavabHazine),
    mosavabSarmaie: sumMosavabSarmaie,
    expenseSarmaie: sumExpenseSarmaie,
    jazbSarmaie: getPercent(sumExpenseSarmaie, sumMosavabSarmaie),
    jazbKol: getPercent(
      sumExpenseSarmaie + sumExpenseHazine,
      sumMosavabHazine + sumMosavabSarmaie
    ),
    actions: () => "",
  };

  // modals
  const [budgetRowModal, setBudgetRowModal] = useState(false);
  const [areaName, setAreaName] = useState("");
  const handleCloseBudgetRowModal = () => {
    setBudgetRowModal(false);
  };

  const handleOpenBudgetRowModal = () => {
    setBudgetRowModal(true);
  };

  const dataModalRowMutation = useMutation(abstructProctorApi.getModalRowData);

  // print
  const handlePrintForm = () => {
    if (tableData.length) {
      const yearLabel = getGeneralFieldItemYear(formdata, 1);
      abstructProctorModal1Stimul({
        data: tableData,
        footer: tableFooter,
        year: yearLabel,
        title1: title,
        numberShow: "ریال",
      });
    }
  };

  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" onClick={handlePrintForm}>
          <PrintIcon />
        </IconButton>
      ),
      colspan: 10,
    },
  ];

  return (
    <>
      <FixedTable
        topHeadGroups={tableTopHeadGroups}
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={budgetRowModal}
        handleClose={handleCloseBudgetRowModal}
        title={`${title} - ${areaName}`}
        loading={dataModalRowMutation.isLoading}
        maxHeight="70%"
        maxWidth="md"
      >
        <AbstructModal2
          data={dataModalRowMutation.data?.data || []}
          formdata={formdata}
          modal1Title={title}
          modal2Title={areaName}
        />
      </FixedModal>
    </>
  );
}

export default AbstructModal1;
