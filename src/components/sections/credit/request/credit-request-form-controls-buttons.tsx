import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import WindowLoading from "components/ui/loading/window-loading";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ProjectMettingsModal from "./credit-search-request-modal";
import DeleteIcon from "@mui/icons-material/Delete";

import { grey } from "@mui/material/colors";
import { creditRequestApi } from "api/credit/credit-request-api";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { useState } from "react";
import { BsEraserFill } from "react-icons/bs";
import { checkHaveValue } from "helper/form-utils";

interface CreditRequestFormControlsButtonsProps {
  formData: any;
  setFormData: (state: any) => void;
  firstStepCrossed: boolean;
  setFirstStepCrossed: (state: boolean) => void;
  onSubmitedCallback: () => void;
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
  } = props;

  const userId = userStore((state) => state.id);

  // select request modal
  const [isOpenSelectRequestModal, setIsOpenSelectRequestModal] =
    useState(false);

  const searchRequestMutation = useMutation(creditRequestApi.searchRequest);

  const openSearchRequestModal = () => {
    searchRequestMutation.mutate({
      [creditRequestConfig.area]: formData[creditRequestConfig.area],
      [creditRequestConfig.execute_departman_id]:
        formData[creditRequestConfig.execute_departman_id],
      [creditRequestConfig.year]: formData[creditRequestConfig.year],
    });

    setIsOpenSelectRequestModal(true);
  };

  // create request
  const createRequestMutation = useMutation(creditRequestApi.createRequest, {
    onSuccess(data) {
      // setFormData((state: any) => ({
      //   ...state,
      //   [creditRequestConfig.request_date]: data.data.dateS,
      //   [creditRequestConfig.request_number]: data.data.number,
      // }));

      setFirstStepCrossed(true);

      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError() {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
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
          creditRequestConfig.approximate_price,
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
        });
      }
    } else {
      // update request
    }
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
        >
          <DeleteIcon />
        </Button>
        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
        >
          <BsEraserFill fontSize={20} />
        </Button>

        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
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
        <ProjectMettingsModal data={searchRequestMutation.data?.data || []} />
      </FixedModal>

      {/* loading */}
      <WindowLoading active={createRequestMutation.isLoading} />
    </>
  );
}

export default CreditRequestFormControlsButtons;
