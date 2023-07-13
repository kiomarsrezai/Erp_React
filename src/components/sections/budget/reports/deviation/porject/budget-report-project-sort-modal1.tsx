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
      name: "rowIndex",
      width: "80px",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
      width: "150px",
    },
    {
      title: "شماره",
      name: "number",
      width: "150px",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مبلغ ت اعتبار",
      name: "requestBudgetAmount",
      split: true,
      align: "left",
      width: "150px",
    },
  ];

  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalDataItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      rowIndex: i + 1,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const sumRequestBudgetAmount = sumFieldsInSingleItemData(
    data,
    "requestBudgetAmount"
  );

  const tableFooter: any = {
    rowIndex: "جمع",
    "colspan-rowIndex": 4,
    dateShamsi: null,
    description: null,
    number: null,
    requestBudgetAmount: sumRequestBudgetAmount,
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default BudgetReportProjectSortModal1;
