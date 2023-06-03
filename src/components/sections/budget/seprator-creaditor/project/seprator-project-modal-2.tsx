import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowLoading from "components/ui/loading/window-loading";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SectionGuard from "components/auth/section-guard";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorAreaItemShape,
} from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  areaNameShort: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
}

interface SepratorProjectModal1props {
  data: any[];
  modal1ProjectId: number | null;
  formData: any;
  onClose: () => void;
  baseCodingId: number;
}
function SepratorProjectModal2(props: SepratorProjectModal1props) {
  const { data, modal1ProjectId, formData, onClose, baseCodingId } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // head group
  const [filterText, setFilterText] = useState("");
  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      colspan: 4,
    },
  ];

  // update
  const queryClient = useQueryClient();
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject, {
    onSuccess: (data) => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      queryClient.setQueryData(
        reactQueryKeys.budget.seprator.projectModal1,
        data
      );
      onClose();
    },
  });

  const updateMutation = useMutation(sepratorBudgetApi.areaAreaUpdate, {
    onSuccess: () => {
      sepratorProjectMutation.mutate({
        ...formData,
        [sepratorBudgetConfig.CODING]: baseCodingId,
      });
    },
  });
  const handleClickLink = (id: number) => {
    updateMutation.mutate({
      budgetDetailPrjectId: modal1ProjectId,
      programOperationDetailId: id,
    });
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickLink(row.id)}
    >
      <CheckIcon />
    </IconButton>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorAreaItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(
    data.filter(
      (item: GetSingleSepratorAreaItemShape) =>
        item.projectCode.includes(filterText) ||
        item.projectName.includes(filterText)
    )
  );

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={headGroup}
      data={tableData}
      notFixed
    />
  );
}

export default SepratorProjectModal2;
