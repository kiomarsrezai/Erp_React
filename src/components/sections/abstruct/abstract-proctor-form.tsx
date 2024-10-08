import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import SectionGuard from "components/auth/section-guard";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

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
import AbstructProctorModal1 from "./proctor-modal/abstruct-proctor-modal-1";
import { Button } from "@mui/material";

interface AbstractProctorFormProps {
  formData: any;
  setFormData: any;
  tabRender?: ReactNode;
  printData: {
    data: any[];
    footer: any[];
  };
}

function AbstractProctorForm(props: AbstractProctorFormProps) {
  const { formData, setFormData, tabRender, printData } = props;

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
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
      ])
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

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      abstructProctorStimul({
        data: printData.data,
        footer: printData.footer,
        year: yearLabel,
        numberShow: "ریال",
      });
    }
  };

  // modal

  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Box component="form" p={1} onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          {tabRender && <Grid xs={12}>{tabRender}</Grid>}

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid sm={2}>
              <YearInput
                setter={setFormData}
                value={formData[abstructProctorConfig.YEAR]}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
                ])}
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

          <Grid sm={2}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={submitMutation.isLoading}
            >
              نمایش
            </LoadingButton>
            <IconButton
              color="primary"
              onClick={handlePrintForm}
              sx={{ ml: 1 }}
            >
              <PrintIcon />
            </IconButton>
          </Grid>
          <Grid sm={2}></Grid>
          <Grid sm={2}></Grid>
          <Grid sm={2}></Grid>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
              accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT_CREDIT_BTN,
            ])}
          >
            <Grid sm={2}>
              <Box display={"flex"} justifyContent={"flex-end"}>
                <Button variant="contained" onClick={handleOpenModal}>
                  درخواست ت اعتبار
                </Button>
              </Box>
            </Grid>
          </SectionGuard>
        </Grid>
      </Box>

      <FixedModal
        open={isOpenModal}
        handleClose={handleCloseModal}
        title="درخواست ت اعتبار"
        maxHeight="90%"
      >
        <AbstructProctorModal1 formdata={formData} />
      </FixedModal>
    </>
  );
}

export default AbstractProctorForm;
