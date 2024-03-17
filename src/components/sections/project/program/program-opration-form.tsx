import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import AreaInput from "components/sections/inputs/area-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { programProjectConfig } from "config/features/project/program-project-config";
import ProgramListInput from "components/sections/inputs/list-program";
import { programProjectApi } from "api/project/programs-project-api";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemProgram,
} from "helper/export-utils";
import { programOprationStimul } from "stimul/project/program/program-opration-stimul";

interface ProgramOprationProjectFormProps {
  formData: any;
  setFormData: any;
  printData: {
    data: any[];
    footer: any[];
  };
}

function ProgramOprationProjectForm(props: ProgramOprationProjectFormProps) {
  const { formData, setFormData, printData } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const queryClient = useQueryClient();

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const submitMutation = useMutation(programProjectApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.project.program.data, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
        accessNamesConfig.FIELD_AREA,
      ],
      accessNamesConfig.PROJECT__PLAN_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        programProjectConfig.area,
        programProjectConfig.program,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.project.program.data, {
      data: [],
    });
  }, [formData, queryClient]);

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const areaLabel = getGeneralFieldItemArea(formData, 3);
      const kindLabel = getGeneralFieldItemProgram(formData);

      programOprationStimul({
        data: printData.data,
        footer: printData.footer,
        area: areaLabel,
        kind: kindLabel,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.PROJECT__PLAN_PAGE,
            accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
          ])}
        >
          <Grid lg={2}>
            <ProgramListInput
              setter={setFormData}
              value={formData[programProjectConfig.program]}
              permissionForm={accessNamesConfig.PROJECT__PLAN_PAGE}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.PROJECT__PLAN_PAGE,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[programProjectConfig.area]}
              permissionForm={accessNamesConfig.PROJECT__PLAN_PAGE}
              showError={haveSubmitedForm}
              level={3}
            />
          </Grid>
        </SectionGuard>
        <Grid lg={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <IconButton color="primary" onClick={handlePrintForm}>
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgramOprationProjectForm;
