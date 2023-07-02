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

import ButtonGroup from "@mui/material/ButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { BsEraserFill } from "react-icons/bs";
import { grey } from "@mui/material/colors";

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
import {
  contractsTasksConfig,
  contractsTasksFormDefaultValue,
} from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsSearchModal from "./contracts-search-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

interface ContractsTasksFormProps {
  formData: any;
  setFormData: any;
  setHaveSubmitedForm: (state: any) => void;
}
function ContractsTasksForm(props: ContractsTasksFormProps) {
  const {
    formData,
    setFormData,
    setHaveSubmitedForm: setHaveSubmitedCardForm,
  } = props;

  const userLicenses = userStore((state) => state.permissions);

  // modal
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  // submit
  const submitMutation = useMutation(contractsTasksApi.search, {});

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    // const havePermission = checkHavePermission(
    //   userLicenses,
    //   [accessNamesConfig.FIELD_AREA],
    //   accessNamesConfig.CONTRACT__REPORT_PAGE
    // );

    // if (!havePermission) {
    //   return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
    //     variant: "error",
    //   });
    // }

    setHaveSubmitedForm(true);

    // if (checkHaveValue(formData, [contractsTasksConfig.area])) {
    // submitMutation.mutate(formData);
    setIsOpenSearchModal(true);
    // }
  };

  // check
  const insertMutation = useMutation(contractsTasksApi.insert, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });

      setFormData({
        ...contractsTasksFormDefaultValue,
        [contractsTasksConfig.number]: data.data.number,
        id: data.data.id,
      });
    },
  });

  const updateMutation = useMutation(contractsTasksApi.update, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  const handleCheckClick = () => {
    setHaveSubmitedCardForm(true);
    setHaveSubmitedForm(true);
    if (
      checkHaveValue(formData, [
        contractsTasksConfig.area,
        contractsTasksConfig.date,
        contractsTasksConfig.description,
        contractsTasksConfig.suppliers_id,
        contractsTasksConfig.number,
        contractsTasksConfig.date_from,
        contractsTasksConfig.date_end,
        contractsTasksConfig.amount,
      ])
    )
      if (!formData.id) {
        // insert
        insertMutation.mutate({
          [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
          [contractsTasksConfig.date]: formData[contractsTasksConfig.date],
          [contractsTasksConfig.description]:
            formData[contractsTasksConfig.description],
          [contractsTasksConfig.suppliers_id]:
            formData[contractsTasksConfig.suppliers_id],
          [contractsTasksConfig.number]: String(
            formData[contractsTasksConfig.number]
          ),
          [contractsTasksConfig.date_from]:
            formData[contractsTasksConfig.date_from],
          [contractsTasksConfig.date_end]:
            formData[contractsTasksConfig.date_end],
          [contractsTasksConfig.amount]: formData[contractsTasksConfig.amount],
        });
      } else {
        // update
        updateMutation.mutate({
          id: formData.id,
          [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
          [contractsTasksConfig.date]: formData[contractsTasksConfig.date],
          [contractsTasksConfig.description]:
            formData[contractsTasksConfig.description],
          [contractsTasksConfig.suppliers_id]:
            formData[contractsTasksConfig.suppliers_id],
          [contractsTasksConfig.number]: String(
            formData[contractsTasksConfig.number]
          ),
          [contractsTasksConfig.date_from]:
            formData[contractsTasksConfig.date_from],
          [contractsTasksConfig.date_end]:
            formData[contractsTasksConfig.date_end],
          [contractsTasksConfig.amount]: formData[contractsTasksConfig.amount],
        });
      }
  };

  // clear
  const [showConfrimClearForm, setShowConfrimClearForm] = useState(false);

  const handleClearForm = () => {
    setShowConfrimClearForm(true);
  };

  const onConfrimClearForm = () => {
    setHaveSubmitedCardForm(false);
    setFormData({
      ...contractsTasksFormDefaultValue,
      [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
    });

    setShowConfrimClearForm(false);
  };

  const onCancelClearForm = () => {
    setShowConfrimClearForm(false);
  };

  // delete
  const [showConfrimDeleteForm, setShowConfrimDeleteForm] = useState(false);

  const deleteMutation = useMutation(contractsTasksApi.delete, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });

      setFormData({
        ...contractsTasksFormDefaultValue,
        [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
      });
    },
  });

  const handleDeleteClick = () => {
    setShowConfrimDeleteForm(true);
  };

  const onConfrimDeleteForm = () => {
    setShowConfrimDeleteForm(false);
    deleteMutation.mutate({ id: formData.id });
  };

  const onCancelDeleteForm = () => {
    setShowConfrimDeleteForm(false);
  };

  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit} p={2}>
        <Grid container spacing={2}>
          {/* <SectionGuard
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
          </SectionGuard> */}
          <Grid lg={10}>
            <Button variant="contained" type="submit" sx={{ mx: 1 }}>
              <SearchIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleCheckClick}
              sx={{ mx: 1 }}
            >
              <CheckIcon />
            </Button>
            <Button
              variant="contained"
              onClick={handleClearForm}
              sx={{ mx: 1 }}
            >
              <BsEraserFill fontSize={24} />
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteClick}
              sx={{ mx: 1 }}
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        title="انتخاب قرارداد"
        loading={submitMutation.isLoading}
      >
        <ContractsSearchModal
          data={submitMutation.data?.data || []}
          onClose={() => setIsOpenSearchModal(false)}
          setFormData={setFormData}
          formData={formData}
        />
      </FixedModal>

      {/* confrim clear form */}
      <ConfrimProcessModal
        onCancel={onCancelClearForm}
        onConfrim={onConfrimClearForm}
        open={showConfrimClearForm}
        title="خالی کردن فرم"
      />

      {/* confrim delete form */}
      <ConfrimProcessModal
        onCancel={onCancelDeleteForm}
        onConfrim={onConfrimDeleteForm}
        open={showConfrimDeleteForm}
        title="حذف کردن قرارداد"
      />
    </>
  );
}

export default ContractsTasksForm;
