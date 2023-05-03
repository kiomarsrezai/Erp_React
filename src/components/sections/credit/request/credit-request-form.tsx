import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CreidtRequestFormTableTpye from "./crdit-request-form-table-type";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import ProjectMettingsModal from "./credit-search-request-modal";

import { grey } from "@mui/material/colors";
import { ChangeEvent, useState } from "react";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { creditRequestApi } from "api/credit/credit-request-api";
import { useMutation } from "@tanstack/react-query";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import userStore from "hooks/store/user-store";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import WindowLoading from "components/ui/loading/window-loading";

interface CreditRequestFormProps {
  formData: any;
  setFormData: (state: any) => void;
  firstStepCrossed: boolean;
  setFirstStepCrossed: (state: boolean) => void;
}

function CreditRequestForm(props: CreditRequestFormProps) {
  const { formData, setFormData, firstStepCrossed, setFirstStepCrossed } =
    props;

  // form
  const requestTypeItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "ساده",
      value: 1,
    },
    {
      label: "جدولی",
      value: 2,
    },
  ];

  const doingMethodItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "فاکتوری",
      value: 1,
    },
    {
      label: "استعلام",
      value: 2,
    },
    {
      label: "مناقصه محدود",
      value: 3,
    },
    {
      label: "مناقصه عمومی",
      value: 4,
    },
    {
      label: "ترک تشریفات",
      value: 5,
    },
  ];

  const handleChangeTextFields = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  // const handleSelectChange = (e: SelectChangeEvent) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormData((state: any) => ({
  //     ...state,
  //     [name]: value,
  //   }));
  // };

  //   select user modal
  const [isOpenSelectUserModal, setIsOpenSelectUserModal] = useState(false);

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

  const userState = userStore();

  const handleCreateRequest = () => {
    createRequestMutation.mutate({
      ...formData,
      [creditRequestConfig.user_id]: userState.id,
    });
  };

  // control buttons
  const controlButtons = (
    <Grid xs={3} xl={2}>
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
    </Grid>
  );

  return (
    <>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={1}>
          {controlButtons}
          <Grid xs={3} xl={2}></Grid>

          <Grid xs={3} xl={2}>
            <FlotingLabelSelect
              items={requestTypeItems}
              label="نوع درخواست"
              name={creditRequestConfig.request_type}
              value={formData[creditRequestConfig.request_type]}
              setter={setFormData}
            />
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={6} xl={4}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid xs={12} xl={6}>
                <FormControl fullWidth>
                  <InputLabel id="witch-organ-label">
                    واحد درخواست کننده
                  </InputLabel>
                  <Select
                    labelId="witch-organ-label"
                    id="witch-organ-input"
                    value={formData[creditRequestConfig.execute_departman_id]}
                    size="small"
                    label="واحد درخواست کننده"
                  >
                    <MenuItem value={1}>واحد فلان</MenuItem>
                    <MenuItem value={2}>واحد بهمان</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12} xl={6}>
                <TextField
                  id="user-input"
                  label="کاربر"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={`${userState.firstName} ${userState.lastName}`}
                  disabled
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <YearInput
                  setter={setFormData}
                  value={formData[creditRequestConfig.year]}
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <AreaInput
                  setter={setFormData}
                  value={formData[creditRequestConfig.area]}
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="request-number-input"
                  label="شماره درخواست"
                  variant="outlined"
                  value={formData[creditRequestConfig.request_number]}
                  size="small"
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="date-request-input"
                  label="تاریخ"
                  variant="outlined"
                  size="small"
                  value={formData[creditRequestConfig.request_date]}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="price-request-input"
                  label="براورد مبلغ"
                  variant="outlined"
                  size="small"
                  value={formData[creditRequestConfig.approximate_price]}
                  name={creditRequestConfig.approximate_price}
                  onChange={handleChangeTextFields}
                  disabled={!firstStepCrossed}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <FlotingLabelSelect
                  items={doingMethodItems}
                  label="شیوه انجام"
                  name={creditRequestConfig.doing_method}
                  value={
                    firstStepCrossed &&
                    formData[creditRequestConfig.doing_method]
                  }
                  setter={setFormData}
                  disabled={!firstStepCrossed}
                />
              </Grid>
              {formData.doingMethod === 5 && (
                <>
                  <Grid xs={12}>
                    <TextField
                      id="person-tark-tashrifat-input"
                      label="پیمانکار"
                      variant="outlined"
                      value=""
                      size="small"
                      disabled
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setIsOpenSelectUserModal(true)}
                              size="small"
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="why-tark-tashrifat-input"
                      label="دلیل ترک تشریفات"
                      variant="outlined"
                      value=""
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={6} xl={8}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              {formData[creditRequestConfig.request_type] === 1 && (
                <Grid xs={12}>
                  <TextField
                    id="description-request-input"
                    label="شرح درخواست"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value=""
                  />
                </Grid>
              )}

              {formData[creditRequestConfig.request_type] === 2 && (
                <Grid xs={12}>
                  <CreidtRequestFormTableTpye />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

        {/* select user modal */}
        <FixedModal
          open={isOpenSelectUserModal}
          handleClose={() => setIsOpenSelectUserModal(false)}
          title="انتخاب پیمانکار"
        >
          <Box p={3}>
            <SelectUser onSelectUser={() => {}} />
          </Box>
        </FixedModal>

        {/* select request modal */}
        <FixedModal
          open={isOpenSelectRequestModal}
          handleClose={() => setIsOpenSelectRequestModal(false)}
          title="انتخاب درخواست"
        >
          <ProjectMettingsModal />
        </FixedModal>
      </Box>

      {/* loading */}
      <WindowLoading active={createRequestMutation.isLoading} />
    </>
  );
}

export default CreditRequestForm;
