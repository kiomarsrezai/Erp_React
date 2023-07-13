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
import SepratorBudgetAbstructModal2 from "./seprator-budget-abstruct-modal2";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

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

  const rightData = data.filter((item) => item.side === 1);
  const leftData = data.filter((item) => item.side === 2);

  const tableData = formatTableData(rightData);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(rightData, "mosavab");
  const sumEdit = sumFieldsInSingleItemData(rightData, "edit");
  const sumExpense = sumFieldsInSingleItemData(rightData, "expense");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    description: null,
    mosavab: sumMosavab,
    edit: sumEdit,
    expense: sumExpense,
  };

  return (
    <Box display={"flex"}>
      <Box sx={{ width: "50%", borderRight: 1, borderColor: "grey.400" }}>
        <FixedTable
          heads={tableHeads}
          // headGroups={tableHeadGroup}
          data={tableData}
          footer={tableFooter}
          notFixed
        />
      </Box>
      {/* modal 2 */}
      <Box sx={{ width: "50%" }}>
        <SepratorBudgetAbstructModal2
          data={leftData}
          // loading={detailCodingMutation.isLoading}
          // formData={formData}
          // motherId={rowMotherId}
          // baseModal2Title={titleActionModal}
        />
      </Box>
    </Box>
  );
}

export default SepratorBudgetAbstructModal1;
