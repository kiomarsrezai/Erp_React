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
import { Stack, TextField } from "@mui/material";

interface BudgetConnectEditModalProps {
  initialData: GetSingleProgramDataShape | null;
  onDoneTask: () => void;
}

function ProgramOprationModal(props: BudgetConnectEditModalProps) {
  const { initialData, onDoneTask } = props;

  const [modalFormData, setModalFormData] = useState({
    [programProjectConfig.scale]: initialData?.projectScaleId,
    projectName: initialData?.projectName,
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
      projectId: initialData?.id,
      [programProjectConfig.scale]: modalFormData[programProjectConfig.scale],
      projectName: modalFormData["projectName"],
    });
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 2 }}>
      <Stack direction={"column"} spacing={2}>
        <ProjectScaleInput
          setter={setModalFormData}
          value={modalFormData[programProjectConfig.scale] as any}
        />

        <TextField
          id="username-input"
          label="شرح"
          variant="outlined"
          size="small"
          // {...register(changePasswordConfig.password)}
          // error={!!errors[changePasswordConfig.password]}
          // helperText={
          //   (errors[changePasswordConfig.password]?.message || "") as any
          // }
          onChange={(e) =>
            setModalFormData((state: any) => ({
              ...state,
              projectName: e.target.value,
            }))
          }
          value={modalFormData["projectName"] as any}
          fullWidth
        />
        <Box>
          <LoadingButton
            variant="contained"
            onClick={handleSaveClick}
            loading={updateMutation.isLoading}
          >
            ثبت
          </LoadingButton>
        </Box>
      </Stack>
    </Box>
  );
}

export default ProgramOprationModal;
