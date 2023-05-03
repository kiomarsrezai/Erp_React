import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import WindowLoading from "components/ui/loading/window-loading";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ProjectMettingsModal from "./credit-search-request-modal";
import { grey } from "@mui/material/colors";
import { creditRequestApi } from "api/credit/credit-request-api";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { useState } from "react";

interface CreditRequestFormControlsButtonsProps {
  formData: any;
  setFormData: (state: any) => void;
  firstStepCrossed: boolean;
  setFirstStepCrossed: (state: boolean) => void;
}

function CreditRequestFormControlsButtons(
  props: CreditRequestFormControlsButtonsProps
) {
  const { formData, setFormData, firstStepCrossed, setFirstStepCrossed } =
    props;

  const userId = userStore((state) => state.id);

  //   select request modal
  const [isOpenSelectRequestModal, setIsOpenSelectRequestModal] =
    useState(false);

  // create request
  const createRequestMutation = useMutation(creditRequestApi.createRequest, {
    onSuccess(data) {
      setFormData((state: any) => ({
        ...state,
        [creditRequestConfig.request_date]: data.data.dateS,
        [creditRequestConfig.request_number]: data.data.number,
      }));

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

  const handleCreateRequest = () => {
    createRequestMutation.mutate({
      ...formData,
      [creditRequestConfig.user_id]: userId,
    });
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
          onClick={handleCreateRequest}
        >
          <AddIcon />
        </Button>
        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
        >
          <CheckIcon />
        </Button>

        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
        >
          <ClearIcon />
        </Button>
        <Button
          sx={{
            borderColor: grey[400],
            color: grey[700],
            "&:hover": { borderColor: grey[400] },
          }}
          onClick={() => setIsOpenSelectRequestModal(true)}
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
          <SendIcon />
        </Button>
      </ButtonGroup>

      {/* select request modal */}
      <FixedModal
        open={isOpenSelectRequestModal}
        handleClose={() => setIsOpenSelectRequestModal(false)}
        title="انتخاب درخواست"
      >
        <ProjectMettingsModal />
      </FixedModal>

      {/* loading */}
      <WindowLoading active={createRequestMutation.isLoading} />
    </>
  );
}

export default CreditRequestFormControlsButtons;
