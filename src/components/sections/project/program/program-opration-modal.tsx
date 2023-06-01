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
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { GetSingleProgramDataShape } from "types/data/project/program-project-type";
import { programProjectConfig } from "config/features/project/program-project-config";
import { programProjectApi } from "api/project/programs-project-api";

interface BudgetConnectEditModalProps {
  initialData: GetSingleProgramDataShape | null;
  onDoneTask: () => void;
}

function ProgramOprationModal(props: BudgetConnectEditModalProps) {
  const { initialData, onDoneTask } = props;

  const [modalFormData, setModalFormData] = useState({
    [programProjectConfig.scale]: initialData?.projectScaleId,
  });

  const updateMutation = useMutation(programProjectApi.updateItem, {
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
      [programProjectConfig.scale]: modalFormData[programProjectConfig.scale],
    });
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 2 }}>
      <ProjectScaleInput
        setter={setModalFormData}
        value={modalFormData[programProjectConfig.scale] as any}
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

export default ProgramOprationModal;
