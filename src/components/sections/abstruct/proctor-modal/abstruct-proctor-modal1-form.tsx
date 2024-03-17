import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import SectionGuard from "components/auth/section-guard";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import userStore from "hooks/store/user-store";
import { getGeneralFieldItemYear } from "helper/export-utils";
import { abstructProctorStimul } from "stimul/budget/report/proctor/abstruct-proctor-stimul";
import FixedModal from "components/ui/modal/fixed-modal";
import ProctorInput from "components/sections/inputs/proctor-input";
import AreaInput from "components/sections/inputs/area-input";

interface AbstractProctorModal1FormProps {
  formData: any;
  modalFormData: any;
  setModalFormData: any;
}

function AbstractProctorModal1Form(props: AbstractProctorModal1FormProps) {
  const { formData, setModalFormData, modalFormData } = props;

  const userLicenses = userStore((state) => state.permissions);
  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(abstructProctorApi.getProctorInfoModal1, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.report.proctor.abstractProctorModal1,
        data
      );
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    // const havePermission = checkHavePermission(
    //   userLicenses,
    //   [accessNamesConfig.FIELD_YEAR],
    //   joinPermissions([
    //     accessNamesConfig.BUDGET__REPORT_PAGE,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
    //   ])
    // );

    // if (!havePermission) {
    //   return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
    //     variant: "error",
    //   });
    // }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        abstructProctorConfig.PROCTOR,
        abstructProctorConfig.AREA,
      ])
    ) {
      submitMutation.mutate({
        ...modalFormData,
        [abstructProctorConfig.YEAR]: formData[abstructProctorConfig.YEAR],
      });
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(
      reactQueryKeys.report.proctor.abstractProctorModal1,
      {
        data: [],
      }
    );
  }, [formData, queryClient]);

  return (
    <Box component="form" p={1} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
            accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={3}>
            <AreaInput
              setter={setModalFormData}
              value={modalFormData[abstructProctorConfig.AREA]}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
                accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
              ])}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
            accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
            accessNamesConfig.FIELD_PROCTOR,
          ])}
        >
          <Grid lg={3}>
            <ProctorInput
              setter={setModalFormData}
              value={modalFormData[abstructProctorConfig.PROCTOR]}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
                accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
              ])}
            />
          </Grid>
        </SectionGuard>
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

export default AbstractProctorModal1Form;
