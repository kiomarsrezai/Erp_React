import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowLoading from "components/ui/loading/window-loading";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SectionGuard from "components/auth/section-guard";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorAccItemShape,
} from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  dateSanad: ReactNode;
  numberSanad: ReactNode;
  description: ReactNode;
  expense: ReactNode;
}

interface SepratorModal1props {
  data: any[];
}
function SepratorAccModal(props: SepratorModal1props) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره سند",
      name: "numberSanad",
    },
    {
      title: "تاریخ سند",
      name: "dateSanad",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorAccItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumExpense = sumFieldsInSingleItemData(data, "expense");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    numberSanad: null,
    dateSanad: null,
    description: null,
    expense: sumExpense,
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

export default SepratorAccModal;
