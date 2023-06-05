import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import WindowLoading from "components/ui/loading/window-loading";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import CreditSearchRequestModal from "./credit-search-request-modal";
import DeleteIcon from "@mui/icons-material/Delete";

import { grey } from "@mui/material/colors";
import { creditRequestApi } from "api/credit/credit-request-api";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import {
  creditRequestConfig,
  creditRequestFormDefaultValue,
} from "config/features/credit/credit-request-config";
import { useState } from "react";
import { BsEraserFill } from "react-icons/bs";
import { checkHaveValue } from "helper/form-utils";
import { CreditReadRequestShape } from "types/data/credit/credit-request-type";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

interface CreditRequestFormControlsButtonsProps {
  formData: any;
  setFormData: (state: any) => void;
  firstStepCrossed: boolean;
  setFirstStepCrossed: (state: boolean) => void;
  onSubmitedCallback: () => void;
  onClickedSearchCallback: () => void;
  onClearCallback: () => void;
}

function CreditRequestFormControlsButtons(
  props: CreditRequestFormControlsButtonsProps
) {
  const {
    formData,
    setFormData,
    firstStepCrossed,
    setFirstStepCrossed,
    onSubmitedCallback,
    onClickedSearchCallback,
    onClearCallback,
  } = props;

  const userId = userStore((state) => state.id);

  // select request modal
  const [isOpenSelectRequestModal, setIsOpenSelectRequestModal] =
    useState(false);

  const searchRequestMutation = useMutation(creditRequestApi.searchRequest);

  const openSearchRequestModal = () => {
    onClickedSearchCallback();
    if (
      checkHaveValue(formData, [
        creditRequestConfig.year,
        creditRequestConfig.execute_departman_id,
        creditRequestConfig.area,
      ])
    ) {
      searchRequestMutation.mutate({
        [creditRequestConfig.area]: formData[creditRequestConfig.area],
        [creditRequestConfig.execute_departman_id]:
          formData[creditRequestConfig.execute_departman_id],
        [creditRequestConfig.year]: formData[creditRequestConfig.year],
      });

      setIsOpenSelectRequestModal(true);
    }
  };

  // create and update request
  const createRequestMutation = useMutation(creditRequestApi.createRequest, {
    onSuccess(data) {
      setFormData((state: any) => ({
        ...state,
        [creditRequestConfig.request_date]: data.data.date,
        [creditRequestConfig.request_number]: data.data.number,
        id: data.data.id,
      }));

      setFirstStepCrossed(true);

      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError() {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const readRequest = useMutation(creditRequestApi.readRequest, {
    onSuccess: (data) => {
      setFormData((state: any) => ({
        ...state,
        [creditRequestConfig.request_number]: data.data.number,
        [creditRequestConfig.request_date]: data.data.date,
        [creditRequestConfig.approximate_price]: data.data.estimateAmount,
        [creditRequestConfig.doing_method]: data.data.doingMethodId,
        [creditRequestConfig.request_description]: data.data.description,
        [creditRequestConfig.why_leave_ceremonies]: data.data.resonDoingMethod,
        [creditRequestConfig.employee]: data.data.employee,
        [creditRequestConfig.request_id]: data.data.id,
      }));
    },
  });

  const updateRequestMutation = useMutation(creditRequestApi.updateRequest, {
    onSuccess() {
      // setFormData((state: any) => ({
      //   ...state,
      //   [creditRequestConfig.request_date]: data.data.dateS,
      //   [creditRequestConfig.request_number]: data.data.number,
      // }));

      // setFirstStepCrossed(true);

      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError() {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
    onSettled: () => {
      readRequest.mutate(formData.id);
    },
  });

  const handleCheckClick = () => {
    onSubmitedCallback();
    if (!formData[creditRequestConfig.request_number]) {
      // create request
      if (
        checkHaveValue(formData, [
          creditRequestConfig.year,
          creditRequestConfig.execute_departman_id,
          creditRequestConfig.area,
          creditRequestConfig.request_type,
          // creditRequestConfig.approximate_price,
          creditRequestConfig.doing_method,
        ])
      ) {
        if (
          formData[creditRequestConfig.doing_method] === 5 &&
          (!formData[creditRequestConfig.contractor] ||
            !formData[creditRequestConfig.why_leave_ceremonies])
        ) {
          return;
        }
        if (
          formData[creditRequestConfig.request_type] === 1 &&
          !formData[creditRequestConfig.request_description]
        ) {
          return;
        }
        createRequestMutation.mutate({
          ...formData,
          [creditRequestConfig.user_id]: userId,
          [creditRequestConfig.approximate_price]:
            +formData[creditRequestConfig.approximate_price],
        });
      }
    } else {
      // update request
      updateRequestMutation.mutate({
        ...formData,
        [creditRequestConfig.contractor]: null,
        [creditRequestConfig.approximate_price]:
          +formData[creditRequestConfig.approximate_price],
      });
      // alert("should update");
    }
  };

  // select request
  const handleSelectRequest = (data: CreditReadRequestShape) => {
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.request_number]: data.number,
      [creditRequestConfig.request_date]: data.date,
      [creditRequestConfig.approximate_price]: data.estimateAmount,
      [creditRequestConfig.doing_method]: data.doingMethodId,
      [creditRequestConfig.request_description]: data.description,
      [creditRequestConfig.why_leave_ceremonies]: data.resonDoingMethod,
      [creditRequestConfig.employee]: data.employee,
      [creditRequestConfig.request_id]: data.id,
      id: data.id,
    }));
    setIsOpenSelectRequestModal(false);
    setFirstStepCrossed(true);
  };

  // clear
  const [showConfrimClearForm, setShowConfrimClearForm] = useState(false);

  const handleClearForm = () => {
    setShowConfrimClearForm(true);
  };

  const onConfrimClearForm = () => {
    setFormData(creditRequestFormDefaultValue);
    setFirstStepCrossed(false);
    onClearCallback();
    setShowConfrimClearForm(false);
  };

  const onCancelClearForm = () => {
    setShowConfrimClearForm(false);
  };

  // delete
  const [showConfrimDeleteForm, setShowConfrimDeleteForm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfrimDeleteForm(true);
  };

  const onConfrimDeleteForm = () => {
    setShowConfrimDeleteForm(false);
    alert("should delete");
  };

  const onCancelDeleteForm = () => {
    setShowConfrimDeleteForm(false);
  };

  // send
  const [showConfrimSendForm, setShowConfrimSendForm] = useState(false);

  const handleSendClick = () => {
    setShowConfrimSendForm(true);
  };

  const onConfrimSendForm = () => {
    setShowConfrimSendForm(false);
    alert("should send");
  };

  const onCancelSendForm = () => {
    setShowConfrimSendForm(false);
  };

  return (
    <>
      <ButtonGroup fullWidth sx={{ height: 1 }}>
        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={handleCheckClick}
        >
          <CheckIcon />
        </Button>

        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={openSearchRequestModal}
        >
          <SearchIcon />
        </Button>

        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </Button>
        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={handleClearForm}
        >
          <BsEraserFill fontSize={20} />
        </Button>

        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={handleSendClick}
        >
          <SendIcon />
        </Button>
      </ButtonGroup>

      {/* select request modal */}
      <FixedModal
        open={isOpenSelectRequestModal}
        handleClose={() => setIsOpenSelectRequestModal(false)}
        title="انتخاب درخواست"
        loading={searchRequestMutation.isLoading}
      >
        <CreditSearchRequestModal
          data={searchRequestMutation.data?.data || []}
          onDoneTask={handleSelectRequest}
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
        title="حذف کردن درخواست"
      />

      {/* confrim send */}
      <ConfrimProcessModal
        onCancel={onCancelSendForm}
        onConfrim={onConfrimSendForm}
        open={showConfrimSendForm}
        title="ارسال درخواست"
      />

      {/* loading */}
      <WindowLoading active={createRequestMutation.isLoading} />
    </>
  );
}

export default CreditRequestFormControlsButtons;
