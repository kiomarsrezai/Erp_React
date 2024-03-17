import { GetSingleContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Unstable_Grid2 as Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import SuppliersModalCreditRequest from "components/sections/credit/request/supplier/suppliers-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import { ChangeEvent, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { changeInputHandler } from "helper/form-utils";
import { DatePicker } from "@mui/x-date-pickers";
import { globalConfig } from "config/global-config";
import { FormControl, InputLabel, Select } from "@mui/material";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface ContractTaskItemCardProps {
  formData: any;
  setFormData: any;
  haveSubmitedForm: boolean;
}
function ContractTaskItemCard(props: ContractTaskItemCardProps) {
  const { formData, setFormData, haveSubmitedForm } = props;

  //   supplier
  const [isOpenSuppliersModal, setIsOpenSuppliersModal] = useState(false);

  const handleSelectSupplier = (id: number, name: string) => {
    setFormData((state: any) => ({
      ...state,
      [contractsTasksConfig.suppliers_id]: id,
      [contractsTasksConfig.suppliers_name]: name,
    }));
    setIsOpenSuppliersModal(false);
  };

  //   form
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputHandler(e, setFormData);
  };

  const doingMethodItems: FlotingLabelTextfieldItemsShape = [
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

  return (
    <>
      <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
        <CardContent sx={{ padding: "16px !important" }}>
          <Grid spacing={3} container>
            <Grid sm={6}>
              <Grid spacing={3} container>
                <Grid sm={6}>
                  <TextField
                    id="number-input"
                    label="شماره قرارداد"
                    variant="outlined"
                    size="small"
                    value={formData[contractsTasksConfig.number]}
                    name={contractsTasksConfig.number}
                    onChange={onChange}
                    type="number"
                    error={
                      !formData[contractsTasksConfig.number] && haveSubmitedForm
                    }
                    helperText={
                      !formData[contractsTasksConfig.number] &&
                      haveSubmitedForm &&
                      globalConfig.ERROR_NO_EMPTY
                    }
                    fullWidth
                  />
                </Grid>
                <Grid sm={6}>
                  <DatePicker
                    value={new Date(formData[contractsTasksConfig.date])}
                    label="تاریخ قرارداد"
                    onChange={(newValue) =>
                      setFormData((state: any) => ({
                        ...state,
                        [contractsTasksConfig.date]: newValue,
                      }))
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid sm={6}>
                  {/* <TextField
                id="date-from-input"
                label="تاریخ شروع"
                variant="outlined"
                size="small"
                value={formData[contractsTasksConfig.date_from]}
                name={contractsTasksConfig.date_from}
                // onChange={handleChangeTextFields}
                fullWidth
              /> */}
                  <DatePicker
                    // label="Date Picker"
                    // editFormData.dateStart
                    value={new Date(formData[contractsTasksConfig.date_from])}
                    label="تاریخ شروع"
                    onChange={(newValue) =>
                      setFormData((state: any) => ({
                        ...state,
                        [contractsTasksConfig.date_from]: newValue,
                      }))
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid sm={6}>
                  {/* <TextField
                id="date-end-input"
                label="تاریخ پایان"
                variant="outlined"
                size="small"
                value={formData[contractsTasksConfig.date_end]}
                name={contractsTasksConfig.date_end}
                fullWidth
              /> */}
                  <DatePicker
                    // label="Date Picker"
                    // editFormData.dateStart
                    label="تاریخ پایان"
                    value={new Date(formData[contractsTasksConfig.date_end])}
                    onChange={(newValue) =>
                      setFormData((state: any) => ({
                        ...state,
                        [contractsTasksConfig.date_end]: newValue,
                      }))
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </Grid>
                <Grid sm={6}>
                  <TextField
                    id="suppliersName-input"
                    label="پیمانکار"
                    variant="outlined"
                    size="small"
                    value={formData[contractsTasksConfig.suppliers_name]}
                    error={
                      !formData[contractsTasksConfig.suppliers_name] &&
                      haveSubmitedForm
                    }
                    helperText={
                      !formData[contractsTasksConfig.suppliers_name] &&
                      haveSubmitedForm &&
                      globalConfig.ERROR_NO_EMPTY
                    }
                    disabled
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setIsOpenSuppliersModal(true)}
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
                <Grid sm={6}>
                  <FlotingLabelSelect
                    label="شیوه انجام"
                    name={contractsTasksConfig.doing_method}
                    items={doingMethodItems}
                    value={formData[contractsTasksConfig.doing_method]}
                    setter={setFormData}
                    showError={
                      haveSubmitedForm &&
                      !formData[contractsTasksConfig.doing_method]
                    }
                  />
                </Grid>
                <Grid sm={6}>
                  <TextField
                    id="amount-input"
                    label="مبلغ"
                    variant="outlined"
                    size="small"
                    type="number"
                    value={formData[contractsTasksConfig.amount]}
                    name={contractsTasksConfig.amount}
                    onChange={onChange}
                    error={
                      !formData[contractsTasksConfig.amount] && haveSubmitedForm
                    }
                    helperText={
                      !formData[contractsTasksConfig.amount] &&
                      haveSubmitedForm &&
                      globalConfig.ERROR_NO_EMPTY
                    }
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid sm={6}>
              <Grid spacing={3} container>
                <Grid sm={12}>
                  <TextField
                    id="description-input"
                    label="شرح"
                    multiline
                    // InputProps={{
                    //   sx: {
                    //     minHeight: "170px",
                    //   },
                    // }}
                    error={
                      !formData[contractsTasksConfig.description] &&
                      haveSubmitedForm
                    }
                    helperText={
                      !formData[contractsTasksConfig.description] &&
                      haveSubmitedForm &&
                      globalConfig.ERROR_NO_EMPTY
                    }
                    rows={7}
                    variant="outlined"
                    size="small"
                    value={formData[contractsTasksConfig.description]}
                    name={contractsTasksConfig.description}
                    onChange={onChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <FixedModal
        open={isOpenSuppliersModal}
        handleClose={() => setIsOpenSuppliersModal(false)}
        title="انتخاب پیمانکار"
      >
        <SuppliersModalCreditRequest onDoneTask={handleSelectSupplier} />
      </FixedModal>
    </>
  );
}

export default ContractTaskItemCard;
