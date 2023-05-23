import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import ProctorInput from "components/sections/inputs/proctor-input";
import { budgetConnectConfig } from "config/features/budget/budget-connect-config";
import { useState } from "react";
import { GetSingleBudgetConnectItemShape } from "types/data/budget/budget-connect-type";
import { useMutation } from "@tanstack/react-query";
import { connectBudgetApi } from "api/budget/budget-connect-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface BudgetConnectEditModalProps {
  initialData: GetSingleBudgetConnectItemShape | null;
  onDoneTask: () => void;
}

function BudgetConnectEditModal(props: BudgetConnectEditModalProps) {
  const { initialData, onDoneTask } = props;

  const [modalFormData, setModalFormData] = useState({
    [budgetConnectConfig.proctor]: initialData?.proctorId,
  });

  const updateMutation = useMutation(connectBudgetApi.updateItem, {
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
      id: initialData?.id,
      [budgetConnectConfig.proctor]: modalFormData[budgetConnectConfig.proctor],
    });
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 2 }}>
      <ProctorInput
        setter={setModalFormData}
        value={modalFormData[budgetConnectConfig.proctor]}
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

export default BudgetConnectEditModal;
