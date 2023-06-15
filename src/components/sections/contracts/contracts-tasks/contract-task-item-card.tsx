import { GetSingleContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
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

interface ContractTaskItemCardProps {
  formData: any;
  setFormData: any;
}
function ContractTaskItemCard(props: ContractTaskItemCardProps) {
  const { formData, setFormData } = props;

  //   supplier
  const [isOpenSuppliersModal, setIsOpenSuppliersModal] = useState(false);

  const handleSelectSupplier = () => {
    setIsOpenSuppliersModal(false);
  };

  //   form
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputHandler(e, setFormData);
  };

  return (
    <>
      <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
        <CardContent sx={{ padding: "16px !important" }}>
          <Grid spacing={3} container>
            <Grid sm={3}>
              <TextField
                id="number-input"
                label="شماره"
                variant="outlined"
                size="small"
                value={formData[contractsTasksConfig.number]}
                name={contractsTasksConfig.number}
                disabled
                fullWidth
              />
            </Grid>
            <Grid sm={3}>
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
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Grid>
            <Grid sm={3}>
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
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Grid>
            <Grid sm={3}>
              <TextField
                id="suppliersName-input"
                label="پیمانکار"
                variant="outlined"
                size="small"
                value={formData[contractsTasksConfig.suppliers_id]}
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
            <Grid sm={3}>
              <TextField
                id="amount-input"
                label="مبلغ"
                variant="outlined"
                size="small"
                type="number"
                value={formData[contractsTasksConfig.amount]}
                name={contractsTasksConfig.amount}
                onChange={onChange}
                fullWidth
              />
            </Grid>
            <Grid sm={9}>
              <TextField
                id="description-input"
                label="شرح"
                variant="outlined"
                size="small"
                value={formData[contractsTasksConfig.description]}
                name={contractsTasksConfig.description}
                onChange={onChange}
                fullWidth
              />
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
