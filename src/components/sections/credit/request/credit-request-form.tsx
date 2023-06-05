import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CreidtRequestTable from "./request-table/crdit-request-table";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import FixedModal from "components/ui/modal/fixed-modal";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import Paper from "@mui/material/Paper";
import userStore from "hooks/store/user-store";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import SuppliersModalCreditRequest from "./supplier/suppliers-modal";
import CreditRequestFormControlsButtons from "./control-buttons/credit-request-form-controls-buttons";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { Alert, AlertTitle, FormHelperText } from "@mui/material";
import { globalConfig } from "config/global-config";
import { red } from "@mui/material/colors";
import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";

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

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const onSubmitedCreateRequestCallback = () => {
    setHaveClickedSearch(false);
    setHaveSubmitedForm(true);
  };

  const [haveClickedSearch, setHaveClickedSearch] = useState(false);
  const onClickedSearchCallback = () => {
    setHaveSubmitedForm(false);
    setHaveClickedSearch(true);
  };

  const onClearCallback = () => {
    setHaveClickedSearch(false);
    setHaveSubmitedForm(false);
  };

  // ui
  const controlFormRef = useRef<HTMLDivElement>(null);
  const [paperHeight, setPaperHeight] = useState("0px");
  useEffect(() => {
    setPaperHeight(`${(controlFormRef.current?.clientHeight || 0) - 16}px`);
  }, [controlFormRef, formData[creditRequestConfig.doing_method]]);

  // doing method
  const [isOpenSelectUserModal, setIsOpenSelectUserModal] = useState(false);

  const [showConfrimChangeDoingMethod, setShowConfrimChangeDoingMethod] =
    useState<null | number>(null);

  const handleChangeDoingMethod = (event: SelectChangeEvent) => {
    const value = event.target.value;

    if (formData[creditRequestConfig.doing_method] === 5) {
      setShowConfrimChangeDoingMethod(+value);
    } else {
      setFormData((state: any) => ({
        ...state,
        [creditRequestConfig.doing_method]: +value,
      }));
    }
  };

  const onConfrimChangeDoingMethod = () => {
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.why_leave_ceremonies]: "",
      [creditRequestConfig.contractor]: undefined,
      [creditRequestConfig.doing_method]: showConfrimChangeDoingMethod,
    }));
    setShowConfrimChangeDoingMethod(null);
  };

  const onCancelChangeDoingMethod = () => {
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.doing_method]: 5,
    }));
    setShowConfrimChangeDoingMethod(null);
  };

  const onDoneSelectSupplier = (id: number, name: string) => {
    setIsOpenSelectUserModal(false);
    setFormData((state: any) => ({
      ...state,
      [creditRequestConfig.contractor]: id,
      [creditRequestConfig.contractorName]: name,
    }));
  };

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
                  onSubmitedCallback={onSubmitedCreateRequestCallback}
                  onClickedSearchCallback={onClickedSearchCallback}
                  onClearCallback={onClearCallback}
                />
              </Grid>

              <Grid xs={12} xl={6}>
                <FlotingLabelSelect
                  items={requestTypeItems}
                  label="نوع درخواست"
                  name={creditRequestConfig.request_type}
                  value={formData[creditRequestConfig.request_type]}
                  setter={setFormData}
                  showError={haveSubmitedForm}
                />
              </Grid>

              <Grid xs={12} xl={6}>
                <TextField
                  id="user-input"
                  label="کاربر"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={
                    formData[creditRequestConfig.employee] ||
                    `${userState.firstName} ${userState.lastName}`
                  }
                  disabled
                />
              </Grid>

              {/* <Grid xs={12} xl={6}>
                <FormControl
                  error={
                    !formData[creditRequestConfig.execute_departman_id] &&
                    (haveSubmitedForm || haveClickedSearch)
                  }
                  size="small"
                  fullWidth
                >
                  <InputLabel id="witch-organ-label">
                    واحد درخواست کننده
                  </InputLabel>
                  <Select
                    labelId="witch-organ-label"
                    id="witch-organ-input"
                    value={formData[creditRequestConfig.execute_departman_id]}
                    onChange={(e) =>
                      setFormData((state: any) => ({
                        ...state,
                        [creditRequestConfig.execute_departman_id]:
                          e.target.value,
                      }))
                    }
                    size="small"
                    label="واحد درخواست کننده"
                    disabled={firstStepCrossed}
                  >
                    <MenuItem value={1}>واحد فلان</MenuItem>
                    <MenuItem value={2}>واحد بهمان</MenuItem>
                  </Select>
                  {!formData[creditRequestConfig.execute_departman_id] &&
                    (haveSubmitedForm || haveClickedSearch) && (
                      <FormHelperText>
                        {globalConfig.ERROR_NO_EMPTY}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid> */}
              <Grid xs={12} xl={6}>
                <BudgetSepratorCreaditorInput
                  setter={setFormData}
                  name={creditRequestConfig.execute_departman_id}
                  value={
                    formData[creditRequestConfig.execute_departman_id] as any
                  }
                  showError={haveSubmitedForm || haveClickedSearch}
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
                <AreaInput
                  setter={setFormData}
                  value={formData[creditRequestConfig.area]}
                  disabled={firstStepCrossed}
                  showError={haveSubmitedForm || haveClickedSearch}
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
                  showError={haveSubmitedForm || haveClickedSearch}
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <FormControl
                  fullWidth
                  size="small"
                  error={
                    haveSubmitedForm &&
                    !formData[creditRequestConfig.doing_method]
                  }
                >
                  <InputLabel id="doing-method-floting-select-label">
                    شیوه انجام
                  </InputLabel>
                  <Select
                    labelId="doing-method-floting-select-label"
                    id={"doing-method-floting-select-input"}
                    value={formData[creditRequestConfig.doing_method]}
                    label="شیوه انجام"
                    onChange={handleChangeDoingMethod}
                  >
                    {doingMethodItems.map((item) => (
                      <MenuItem value={item.value} key={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {!formData[creditRequestConfig.doing_method] &&
                    haveSubmitedForm && (
                      <FormHelperText>
                        {globalConfig.ERROR_NO_EMPTY}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="price-request-input"
                  label="برآورد مبلغ"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formData[creditRequestConfig.approximate_price]}
                  name={creditRequestConfig.approximate_price}
                  onChange={handleChangeTextFields}
                  fullWidth
                  // error={
                  //   !formData[creditRequestConfig.approximate_price] &&
                  //   haveSubmitedForm
                  // }
                  // helperText={
                  //   !formData[creditRequestConfig.approximate_price] &&
                  //   haveSubmitedForm &&
                  //   globalConfig.ERROR_NO_EMPTY
                  // }
                />
              </Grid>
              {formData[creditRequestConfig.doing_method] === 5 && (
                <>
                  <Grid xs={12}>
                    <TextField
                      id="person-tark-tashrifat-input"
                      label="پیمانکار"
                      variant="outlined"
                      value={formData[creditRequestConfig.contractorName]}
                      size="small"
                      error={
                        !formData[creditRequestConfig.contractorName] &&
                        haveSubmitedForm
                      }
                      helperText={
                        !formData[creditRequestConfig.contractorName] &&
                        haveSubmitedForm &&
                        globalConfig.ERROR_NO_EMPTY
                      }
                      sx={{
                        "& fieldset": {
                          ...(!formData[creditRequestConfig.contractorName] &&
                            haveSubmitedForm && {
                              borderColor: `${red[600]} !important`,
                            }),
                        },
                      }}
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
                      error={
                        !formData[creditRequestConfig.why_leave_ceremonies] &&
                        haveSubmitedForm
                      }
                      helperText={
                        !formData[creditRequestConfig.why_leave_ceremonies] &&
                        haveSubmitedForm &&
                        globalConfig.ERROR_NO_EMPTY
                      }
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
                    name={creditRequestConfig.request_description}
                    onChange={handleChangeTextFields}
                    fullWidth
                    value={formData[creditRequestConfig.request_description]}
                    error={
                      !formData[creditRequestConfig.request_description] &&
                      haveSubmitedForm
                    }
                    helperText={
                      !formData[creditRequestConfig.request_description] &&
                      haveSubmitedForm &&
                      globalConfig.ERROR_NO_EMPTY
                    }
                  />
                </Grid>
              )}

              {formData[creditRequestConfig.request_type] === 2 && (
                <Grid xs={12}>
                  {!firstStepCrossed && (
                    <Alert severity="info" icon={false}>
                      <AlertTitle>درخواست جدولی</AlertTitle>
                      بعد از ذخیره کردن درخواست میتوانید به جدول آیتم اضافه کنید
                    </Alert>
                  )}
                  <CreidtRequestTable
                    formData={formData}
                    firstStepCrossed={firstStepCrossed}
                  />
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* confrim change doing method input */}
        <ConfrimProcessModal
          onCancel={onCancelChangeDoingMethod}
          onConfrim={onConfrimChangeDoingMethod}
          open={showConfrimChangeDoingMethod !== null}
          text="درصورت تغییر شیوه انجام اطلاعات پیمانکار و دلیل ترک تشریفات از بین میرود"
        />

        {/* select user modal */}
        <FixedModal
          open={isOpenSelectUserModal}
          handleClose={() => setIsOpenSelectUserModal(false)}
          title="انتخاب پیمانکار"
          maxWidth="sm"
        >
          <SuppliersModalCreditRequest onDoneTask={onDoneSelectSupplier} />
        </FixedModal>
      </Box>
    </>
  );
}

export default CreditRequestForm;
