import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import SearchIcon from "@mui/icons-material/Search";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { proposalConfig } from "config/features/budget/proposal-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";

interface ContractsTasksFormProps {
  formData: any;
  setFormData: any;
}
function ContractsTasksForm(props: ContractsTasksFormProps) {
  const { formData, setFormData } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const submitMutation = useMutation(contractsTasksApi.search, {});

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_AREA],
      accessNamesConfig.CONTRACT__REPORT_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (checkHaveValue(formData, [contractsTasksConfig.AREA])) {
      submitMutation.mutate(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit} p={2}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.CONTRACT__REPORT_PAGE,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[proposalConfig.AREA]}
              permissionForm={accessNamesConfig.CONTRACT__REPORT_PAGE}
              level={3}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>
        <Grid lg={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
          >
            <SearchIcon />
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContractsTasksForm;
