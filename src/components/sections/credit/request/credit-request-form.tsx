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

import { grey } from "@mui/material/colors";
import CreidtRequestFormTableTpye from "./crdit-request-form-table-type";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";
import { useState } from "react";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface CreditRequestFormProps {
  formData: any;
  setFormData: (state: any) => void;
}

function CreditRequestForm(props: CreditRequestFormProps) {
  const { formData, setFormData } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevState: any) => ({ ...prevState, [name]: value }));
  };

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

  //   select user modal
  const [isOpenSelectUserModal, setIsOpenSelectUserModal] = useState(false);

  return (
    <>
      <Box>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={3} xl={2}>
            <YearInput setter={() => {}} value={32} />
          </Grid>
          <Grid xs={3} xl={2}>
            <AreaInput setter={() => {}} value={1} />
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="witch-organ-label">واحد درخواست کننده</InputLabel>
              <Select
                labelId="witch-organ-label"
                id="witch-organ-input"
                value={20}
                size="small"
                label="واحد درخواست کننده"
              >
                <MenuItem value={10}>واحد فلان</MenuItem>
                <MenuItem value={20}>واحد بهمان</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} xl={2}>
            <FlotingLabelSelect
              items={requestTypeItems}
              label="نوع درخواست"
              name="requestType"
              value={formData.requestType}
              setter={setFormData}
            />
          </Grid>

          <Grid xs={3} xl={2}>
            <TextField
              id="user-input"
              label="کاربر"
              variant="outlined"
              fullWidth
              size="small"
              value="پت و مت"
            />
          </Grid>

          <Grid xs={3} xl={2}>
            <ButtonGroup fullWidth sx={{ height: 1 }}>
              <Button
                sx={{
                  borderColor: grey[400],
                  color: grey[700],
                  "&:hover": { borderColor: grey[400] },
                }}
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
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={12} xl={4}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid xs={12} xl={6}>
                <TextField
                  id="request-number-input"
                  label="شماره درخواست"
                  variant="outlined"
                  value="384756"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="date-request-input"
                  label="تاریخ"
                  variant="outlined"
                  size="small"
                  value="1400/03/04"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="price-request-input"
                  label="براورد مبلغ"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value="235432"
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <FlotingLabelSelect
                  items={doingMethodItems}
                  label="شیوره انجام"
                  name="doingMethod"
                  value={formData.doingMethod}
                  setter={setFormData}
                />
              </Grid>
              {formData.doingMethod === 5 && (
                <>
                  <Grid xs={12}>
                    <TextField
                      id="person-tark-tashrifat-input"
                      label="پیمانکار"
                      variant="outlined"
                      value="235432"
                      size="small"
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
                      value="235432"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={12} xl={8}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              {formData.requestType === 1 && (
                <Grid xs={12}>
                  <TextField
                    id="description-request-input"
                    label="شرح درخواست"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value="235432"
                  />
                </Grid>
              )}

              {formData.requestType === 2 && (
                <Grid xs={12}>
                  <CreidtRequestFormTableTpye />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>

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
