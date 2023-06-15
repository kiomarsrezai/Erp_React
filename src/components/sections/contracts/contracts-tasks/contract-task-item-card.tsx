import { GetSingleContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import SuppliersModalCreditRequest from "components/sections/credit/request/supplier/suppliers-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

interface ContractTaskItemCardProps {
  contract: GetSingleContractTaskItemShape;
}
function ContractTaskItemCard(props: ContractTaskItemCardProps) {
  const { contract } = props;

  //   supplier
  const [isOpenSuppliersModal, setIsOpenSuppliersModal] = useState(false);

  const handleSelectSupplier = () => {
    setIsOpenSuppliersModal(false);
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
                value={contract.number}
                fullWidth
              />
            </Grid>
            <Grid sm={3}>
              <TextField
                id="date-from-input"
                label="تاریخ شروع"
                variant="outlined"
                size="small"
                value={contract.dateFromShamsi}
                fullWidth
              />
            </Grid>
            <Grid sm={3}>
              <TextField
                id="date-end-input"
                label="تاریخ پایان"
                variant="outlined"
                size="small"
                value={contract.dateEndShamsi}
                fullWidth
              />
            </Grid>
            <Grid sm={3}>
              <TextField
                id="suppliersName-input"
                label="پیمانکار"
                variant="outlined"
                size="small"
                value={contract.suppliersName}
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
                value={contract.amount}
                fullWidth
              />
            </Grid>
            <Grid sm={9}>
              <TextField
                id="description-input"
                label="شرح"
                variant="outlined"
                size="small"
                value={contract.description}
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
