import SectionGuard from "components/auth/section-guard";
import SearchIcon from "@mui/icons-material/Search";
import CheckIcon from "@mui/icons-material/Check";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

import { BsEraserFill } from "react-icons/bs";
import { Box, Button, Grid } from "@mui/material";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { FormEvent, useState } from "react";
import {
  propertyMotorConfig,
  propertyMotorFormDefaultValue,
} from "config/features/property/property-motor-config";
import { useMutation } from "@tanstack/react-query";
import { propertyMotorApi } from "api/property/property-motor-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";

interface PropertyMotorButtonsProps {
  formData: any;
  setFormData: any;
  setHaveSubmitedForm: (state: any) => void;
}

function PropertyMotorButtons(props: PropertyMotorButtonsProps) {
  const { formData, setFormData, setHaveSubmitedForm } = props;

  // clear
  const [showConfrimClearForm, setShowConfrimClearForm] = useState(false);

  const handleClearForm = () => {
    setShowConfrimClearForm(true);
  };

  const onConfrimClearForm = () => {
    setHaveSubmitedForm(false);
    setFormData(propertyMotorFormDefaultValue);

    setShowConfrimClearForm(false);
  };

  const onCancelClearForm = () => {
    setShowConfrimClearForm(false);
  };

  // delete
  const [showConfrimDeleteForm, setShowConfrimDeleteForm] = useState(false);

  const deleteMutation = useMutation(propertyMotorApi.delete, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });

      setFormData(propertyMotorFormDefaultValue);
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
  // submit - search
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsOpenSearchModal(true);
  };

  // check
  const insertMutation = useMutation(propertyMotorApi.insert, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });

      setFormData({
        ...propertyMotorFormDefaultValue,
        // id: data.data.,
      });
    },
  });

  const updateMutation = useMutation(propertyMotorApi.update, {
    onSuccess(data) {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });
  const handleCheckClick = () => {
    setHaveSubmitedForm(true);
    if (
      checkHaveValue(formData, [
        propertyMotorConfig.color,
        propertyMotorConfig.year,
        propertyMotorConfig.kind_motor,
        propertyMotorConfig.kind,
        propertyMotorConfig.pelak,
        propertyMotorConfig.system,
        propertyMotorConfig.tip,
      ])
    )
      if (!formData.id) {
        // insert
        insertMutation.mutate({
          [propertyMotorConfig.color]: formData[propertyMotorConfig.color],
          [propertyMotorConfig.year]: formData[propertyMotorConfig.year],
          [propertyMotorConfig.kind_motor]:
            formData[propertyMotorConfig.kind_motor],
          [propertyMotorConfig.kind]: formData[propertyMotorConfig.kind],
          [propertyMotorConfig.pelak]: formData[propertyMotorConfig.pelak],
          [propertyMotorConfig.system]: formData[propertyMotorConfig.system],
          [propertyMotorConfig.tip]: formData[propertyMotorConfig.tip],
        });
      } else {
        // update
        updateMutation.mutate({
          id: formData.id,
          [propertyMotorConfig.color]: formData[propertyMotorConfig.color],
          [propertyMotorConfig.year]: formData[propertyMotorConfig.year],
          [propertyMotorConfig.kind_motor]:
            formData[propertyMotorConfig.kind_motor],
          [propertyMotorConfig.kind]: formData[propertyMotorConfig.kind],
          [propertyMotorConfig.pelak]: formData[propertyMotorConfig.pelak],
          [propertyMotorConfig.system]: formData[propertyMotorConfig.system],
          [propertyMotorConfig.tip]: formData[propertyMotorConfig.tip],
        });
      }
  };

  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit} p={2}>
        <Button variant="contained" type="submit" sx={{ mx: 1 }}>
          <SearchIcon />
        </Button>
        <Button variant="contained" onClick={handleCheckClick} sx={{ mx: 1 }}>
          <CheckIcon />
        </Button>
        <Button variant="contained" onClick={handleClearForm} sx={{ mx: 1 }}>
          <BsEraserFill fontSize={24} />
        </Button>
        <Button variant="contained" onClick={handleDeleteClick} sx={{ mx: 1 }}>
          <DeleteIcon />
        </Button>
      </Box>

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        title="انتخاب ماشین"
        // loading={submitMutation.isLoading}
      ></FixedModal>

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
        title="حذف کردن ماشین"
      />
    </>
  );
}

export default PropertyMotorButtons;
