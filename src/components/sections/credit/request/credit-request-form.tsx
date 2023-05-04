import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import CreidtRequestFormTableTpye from "./crdit-request-form-table-type";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import Paper from "@mui/material/Paper";
import userStore from "hooks/store/user-store";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

import { creditRequestConfig } from "config/features/credit/credit-request-config";
import CreditRequestFormControlsButtons from "./credit-request-form-controls-buttons";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

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

  const userState = userStore();

  // const handleSelectChange = (e: SelectChangeEvent) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setFormData((state: any) => ({
  //     ...state,
  //     [name]: value,
  //   }));
  // };

  // ui
  const controlFormRef = useRef<HTMLDivElement>(null);
  const [paperHeight, setPaperHeight] = useState("0px");
  useEffect(() => {
    setPaperHeight(`${(controlFormRef.current?.clientHeight || 0) - 16}px`);
  }, [controlFormRef, formData[creditRequestConfig.doing_method]]);

  // doing method
  const doingMethodIdRef = useRef<number>(
    formData[creditRequestConfig.doing_method]
  );

  const [textConfrimChangeDoingMethod, setTextConfrimChangeDoingMethod] =
    useState<null | string>(null);

  const onConfrimChangeDoingMethod = () => {
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.why_leave_ceremonies]: "",
      [creditRequestConfig.contractor]: null,
    }));
    setTextConfrimChangeDoingMethod(null);
  };

  const onCancelChangeDoingMethod = () => {
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.doing_method]: 5,
    }));
    setTextConfrimChangeDoingMethod(null);
  };

  useEffect(() => {
    if (doingMethodIdRef.current === 5) {
      setTextConfrimChangeDoingMethod(
        "درصورت تغییر شیوه انجام فیلد های پیمانکار و دلیل ترک تشریفات از بین میرود"
      );
    }

    doingMethodIdRef.current = formData[creditRequestConfig.doing_method];
  }, [formData[creditRequestConfig.doing_method]]);

  const [isOpenSelectUserModal, setIsOpenSelectUserModal] = useState(false);

  return (
    <>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={1} alignItems="start">
          <Grid xs={6} xl={4} ref={controlFormRef}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid xs={12} xl={6}>
                <CreditRequestFormControlsButtons
                  formData={formData}
                  setFormData={setFormData}
                  firstStepCrossed={firstStepCrossed}
                  setFirstStepCrossed={setFirstStepCrossed}
                />
              </Grid>

              <Grid xs={12} xl={6}>
                <FlotingLabelSelect
                  items={requestTypeItems}
                  label="نوع درخواست"
                  name={creditRequestConfig.request_type}
                  value={formData[creditRequestConfig.request_type]}
                  setter={setFormData}
                />
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
                    disabled={firstStepCrossed}
                  >
                    <MenuItem value={1}>واحد فلان</MenuItem>
                    <MenuItem value={2}>واحد بهمان</MenuItem>
                  </Select>
                </FormControl>
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
                <AreaInput
                  setter={setFormData}
                  value={formData[creditRequestConfig.area]}
                  disabled={firstStepCrossed}
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
                <YearInput
                  setter={setFormData}
                  value={formData[creditRequestConfig.year]}
                  disabled={firstStepCrossed}
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <FlotingLabelSelect
                  items={doingMethodItems}
                  label="شیوه انجام"
                  name={creditRequestConfig.doing_method}
                  value={formData[creditRequestConfig.doing_method]}
                  setter={setFormData}
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="price-request-input"
                  label="برآورد مبلغ"
                  variant="outlined"
                  size="small"
                  value={formData[creditRequestConfig.approximate_price]}
                  name={creditRequestConfig.approximate_price}
                  onChange={handleChangeTextFields}
                  fullWidth
                />
              </Grid>
              {formData.doingMethod === 5 && (
                <>
                  <Grid xs={12}>
                    <TextField
                      id="person-tark-tashrifat-input"
                      label="پیمانکار"
                      variant="outlined"
                      value={formData[creditRequestConfig.contractor]}
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
                      name={creditRequestConfig.why_leave_ceremonies}
                      value={formData[creditRequestConfig.why_leave_ceremonies]}
                      onChange={handleChangeTextFields}
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={6} xl={8}>
            <Paper
              sx={{
                width: "100%",
                height: paperHeight,
                overflow: "auto",
                bgcolor: "grey.50",
              }}
              elevation={0}
            >
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
            </Paper>
          </Grid>
        </Grid>

        {/* confrim change doing method input */}
        <ConfrimProcessModal
          onCancel={onCancelChangeDoingMethod}
          onConfrim={onConfrimChangeDoingMethod}
          open={textConfrimChangeDoingMethod !== null}
          text={textConfrimChangeDoingMethod as string}
        />

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
      </Box>
    </>
  );
}

export default CreditRequestForm;
