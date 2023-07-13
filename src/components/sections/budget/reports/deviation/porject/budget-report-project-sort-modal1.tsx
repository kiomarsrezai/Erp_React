import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ColorizeIcon from "@mui/icons-material/Colorize";
import FixedModal from "components/ui/modal/fixed-modal";
import CastleIcon from "@mui/icons-material/Castle";
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

interface BudgetReportProjectSortModal1Props {
  data: any[];
}

function BudgetReportProjectSortModal1(
  props: BudgetReportProjectSortModal1Props
) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavabHazine",
      split: true,
      align: "left",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "%",
      name: "percentCreditAmount",
      percent: true,
      width: "80px",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "%",
      name: "percent",
      percent: true,
      width: "80px",
    },
  ];

  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalDataItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
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
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
  const sumExpense = sumFieldsInSingleItemData(data, "expense");

  const sumCreaditAmount = sumFieldsInSingleItemData(data, "creditAmount");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    dateShamsi: null,
    description: null,
    mosavab: sumMosavab,
    creditAmount: sumCreaditAmount,
    percentCreditAmount: getPercent(sumCreaditAmount, sumMosavab),
    expense: sumExpense,
    percent: getPercent(sumExpense, sumMosavab),
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
  // const handlePrintForm = () => {
  //   if (tableData.length) {
  //     const yearLabel = getGeneralFieldItemYear(formdata, 1);
  //     abstructProctorModal1Stimul({
  //       data: tableData,
  //       footer: tableFooter,
  //       year: yearLabel,
  //       title1: title,
  //       numberShow: "ریال",
  //     });
  //   }
  // };

  // const tableTopHeadGroups: TableHeadGroupShape = [
  //   {
  //     title: (
  //       <IconButton color="primary" onClick={handlePrintForm}>
  //         <PrintIcon />
  //       </IconButton>
  //     ),
  //     colspan: 14,
  //   },
  // ];

  return (
    <FixedTable
      // topHeadGroups={tableTopHeadGroups}
      heads={tableHeads}
      //headGroups={tableHeadGroups}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default BudgetReportProjectSortModal1;
