import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { GetSingleSepratorProjectItemShape } from "types/data/budget/seprator-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";

interface SepratorCreaditModalprops {
  onDoneTask: () => void;
  initialData: any;
}

function SepratorCreaditModal(props: SepratorCreaditModalprops) {
  const { onDoneTask, initialData } = props;

  const [modalFormData, setModalFormData] = useState({
    [sepratorCreaditorBudgetConfig.creaditorId]: undefined,
  });

  const updateMutation = useMutation(sepratorCreaditorBudgetApi.connectOne, {
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

  const handleSaveClick = () => {
    updateMutation.mutate({
      [sepratorCreaditorBudgetConfig.projectAreaId]: initialData?.id,
      [sepratorCreaditorBudgetConfig.creaditorId]:
        modalFormData[sepratorCreaditorBudgetConfig.creaditorId],
    });
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 2 }}>
      <BudgetSepratorCreaditorInput
        setter={setModalFormData}
        value={modalFormData[sepratorCreaditorBudgetConfig.creaditorId] as any}
      />

      <LoadingButton
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleSaveClick}
        loading={updateMutation.isLoading}
      >
        ثبت
      </LoadingButton>
    </Box>
  );
}

export default SepratorCreaditModal;
