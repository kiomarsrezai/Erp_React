import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { TextField } from "@mui/material";

interface SepratorCreaditModalprops {
  onDoneTask: () => void;
  initialData: any;
  baseInitialValue: any;
  formData: any;
  modal1Data: any[];
}

function SepratorCreaditModal(props: SepratorCreaditModalprops) {
  const { onDoneTask, initialData, baseInitialValue, formData, modal1Data } =
    props;

  const [modalFormData, setModalFormData] = useState<any>({
    [sepratorCreaditorBudgetConfig.creaditorId]: {},
  });

  const updateMutation = useMutation(sepratorCreaditorBudgetApi.connectOne, {
    onSuccess: () => {
      // enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      //   variant: "success",
      // });
      console.log("item Done");

      // onDoneTask();
    },
  });

  const handleSaveClick = async () => {
    let shouldUpdateItems: any = [];

    for (const key in modalFormData[
      sepratorCreaditorBudgetConfig.creaditorId
    ]) {
      const value =
        modalFormData[sepratorCreaditorBudgetConfig.creaditorId]?.[key];
      if (value === true) {
        shouldUpdateItems.push(+key);
      }
    }
    try {
      await Promise.all(
        shouldUpdateItems.map((item: any) => {
          return updateMutation.mutateAsync({
            [sepratorCreaditorBudgetConfig.coding]: baseInitialValue?.codingId,
            [sepratorCreaditorBudgetConfig.project]:
              baseInitialValue?.projectId,
            [sepratorCreaditorBudgetConfig.creaditorId]: item,
            [sepratorCreaditorBudgetConfig.YEAR]:
              formData[sepratorCreaditorBudgetConfig.YEAR],
            [sepratorCreaditorBudgetConfig.AREA]:
              formData[sepratorCreaditorBudgetConfig.AREA],
          });
        })
      );
    } catch {
      return onDoneTask();
    }

    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    onDoneTask();
  };

  const [filterText, setFilterText] = useState("");

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 2 }}>
      <TextField
        size="small"
        sx={{ mb: 2 }}
        label="جستجو"
        value={filterText}
        variant="filled"
        onChange={(e) => setFilterText(e.target.value)}
        fullWidth
      />

      <BudgetSepratorCreaditorInput
        setter={setModalFormData}
        value={modalFormData[sepratorCreaditorBudgetConfig.creaditorId] as any}
        filterText={filterText}
        ignoreItems={modal1Data.map((item) => item.departmanName) as any}
        isCheckboxed
      />

      <LoadingButton
        variant="contained"
        sx={{ mt: 1, mb: 3 }}
        onClick={handleSaveClick}
        loading={updateMutation.isLoading}
      >
        ثبت
      </LoadingButton>
    </Box>
  );
}

export default SepratorCreaditModal;
