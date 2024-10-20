import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import IconButton from "@mui/material/IconButton";
import BalanceIcon from "@mui/icons-material/Balance";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {FormEvent, ReactNode, useEffect, useState} from "react";
import { transferApi } from "api/transfer/transfer-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import { transferConfig } from "config/features/transfer/transfer-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import FixedModal from "components/ui/modal/fixed-modal";
import TransferModal1 from "./transfer-modal-1";

interface TransferFormProps {
  formData: any;
  setFormData: any;
  deleteGroupUi: () => ReactNode;
}

function TransferForm(props: TransferFormProps) {
  const { formData, setFormData, deleteGroupUi } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const queryClient = useQueryClient();

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const submitMutation = useMutation(transferApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.FINANCIAL__CODING_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        transferConfig.YEAR,
        transferConfig.BUDGET_METHOD,
        transferConfig.AREA,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.transfer.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  // modal
  const [openModal, setOpenModal] = useState(false);

  const dataTableMutation = useMutation(transferApi.getModalData);

  const handleClickBalanceIcon = () => {
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.FINANCIAL__CODING_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        transferConfig.YEAR,
        transferConfig.BUDGET_METHOD,
        transferConfig.AREA,
      ])
    ) {
      dataTableMutation.mutate(formData);

      setOpenModal(true);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.FINANCIAL__CODING_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid sm={2}>
              <YearInput
                setter={setFormData}
                value={formData[transferConfig.YEAR]}
                permissionForm={accessNamesConfig.FINANCIAL__CODING_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.FINANCIAL__CODING_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid sm={2}>
              <AreaInput
                setter={setFormData}
                value={formData[transferConfig.AREA]}
                permissionForm={accessNamesConfig.FINANCIAL__CODING_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.FINANCIAL__CODING_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid sm={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[transferConfig.BUDGET_METHOD]}
                permissionForm={accessNamesConfig.FINANCIAL__CODING_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <Grid sm>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={submitMutation.isLoading}
            >
              نمایش
            </LoadingButton>
            <IconButton
              color="primary"
              size="small"
              onClick={handleClickBalanceIcon}
              sx={{ ml: 1 }}
            >
              <BalanceIcon />
            </IconButton>
          </Grid>
          
          {deleteGroupUi()}
        </Grid>
      </Box>

      {/* modal */}
      <FixedModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        loading={dataTableMutation.isLoading}
      >
        <TransferModal1
          data={dataTableMutation.data?.data || []}
          areaId={formData[transferConfig.AREA] || 0}
          onDoneTask={() => {}}
          formData={formData}
          disableAction
        />
      </FixedModal>
    </>
  );
}

export default TransferForm;
