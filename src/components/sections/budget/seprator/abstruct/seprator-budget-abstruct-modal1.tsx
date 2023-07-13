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

interface SepratorBudgetAbstructModal1Props {
  data: GetSingleSepratorAbstructItemShape[];
}
function SepratorBudgetAbstructModal1(
  props: SepratorBudgetAbstructModal1Props
) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "firstName",
      align: "left",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      align: "left",
    },
    {
      title: "مسولیت",
      name: "responsibility",
      align: "left",
    },
    {
      title: "تاریخ تایید",
      name: "dateAcceptShamsi",
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorAbstructItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      dateAcceptShamsi: item.date ? item.dateShamsi : "",
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return (
    <FixedTable
      heads={tableHeads}
      // headGroups={tableHeadGroup}
      data={tableData}
      notFixed
    />
  );
}

export default SepratorBudgetAbstructModal1;
