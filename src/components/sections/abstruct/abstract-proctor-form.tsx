import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import SectionGuard from "components/auth/section-guard";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import userStore from "hooks/store/user-store";

interface AbstractProctorFormProps {
  formData: any;
  setFormData: any;
}

function AbstractProctorForm(props: AbstractProctorFormProps) {
  const { formData, setFormData } = props;

  const userLicenses = userStore((state) => state.permissions);
  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(abstructProctorApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.report.proctor.abstract, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_YEAR],
      accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (checkHaveValue(formData, [abstructProctorConfig.YEAR])) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.report.proctor.abstract, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid lg={2}>
            <YearInput
              setter={setFormData}
              value={formData[abstructProctorConfig.YEAR]}
              permissionForm={accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>
        {/* <Grid lg={2}>
          <AreaInput
            setter={setFormData}
            value={formData[abstructProctorConfig.AREA]}
          />
        </Grid>

        <Grid lg={2}>
          <BudgetMethodInput
            setter={setFormData}
            value={formData[abstructProctorConfig.BUDGETPROCESS]}
          />
        </Grid>

        <Grid lg={2}>
          <ProctorInput
            setter={setFormData}
            value={formData[abstructProctorConfig.PROCTOR]}
          />
        </Grid> */}

        <Grid>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AbstractProctorForm;