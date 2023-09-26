import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape } from "types/table-type";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleCommiteDetailConfirmationModalShape,
  GetSingleCommiteDetailModalShape,
} from "types/data/project/commite-project-type";
import FixedModal from "components/ui/modal/fixed-modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import DeleteIcon from "@mui/icons-material/Delete";
import ApprovalIcon from "@mui/icons-material/Approval";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import userStore from "hooks/store/user-store";
import { reactQueryKeys } from "config/react-query-keys-config";
import {
  GetSingleSepratorAbstructItemShape,
  GetSingleSepratorConfrimItemShape,
} from "types/data/budget/seprator-type";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { dateCrossedMonth } from "helper/date-utils";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface SepratorBudgetAbstructModal2Props {
  data: GetSingleSepratorAbstructItemShape[];
}
function SepratorBudgetAbstructModal2(
  props: SepratorBudgetAbstructModal2Props
) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "50px",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      width: "125px",
      split: true,
    },
    {
      title: "اصلاح",
      name: "edit",
      align: "left",
      width: "125px",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expense",
      width: "125px",
      align: "left",
      split: true,
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorAbstructItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
  const sumEdit = sumFieldsInSingleItemData(data, "edit");
  const sumExpense = sumFieldsInSingleItemData(data, "expense");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    description: null,
    mosavab: sumMosavab,
    edit: sumEdit,
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

export default SepratorBudgetAbstructModal2;
