import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";

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
