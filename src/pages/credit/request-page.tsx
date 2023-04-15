import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { grey } from "@mui/material/colors";
import { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function RequestCreditPage() {
  // forms
  const [formData, setFormData] = useState({
    doingMethod: "20",
    requestType: "simple",
  });

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // modal
  const [isOpenContractorModal, setIsOpenContractorModal] = useState(false);
  const handleOpenContractorModal = () => {
    setIsOpenContractorModal(true);
  };
  const handleCloseContractorModal = () => {
    setIsOpenContractorModal(false);
  };

  // tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tableRequestRender = (
    <Grid xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ردیف</TableCell>
              <TableCell align="center">شرح</TableCell>
              <TableCell align="center">تعداد</TableCell>
              <TableCell align="center">واحد</TableCell>
              <TableCell align="center">نرخ</TableCell>
              <TableCell align="center">مبلغ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );

  const tableRequestBudget = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ردیف</TableCell>
            <TableCell align="center">نام</TableCell>
            <TableCell align="center">نام خانوادگی</TableCell>
            <TableCell align="center">مسولیت</TableCell>
            <TableCell align="center">تاریخ ارسال</TableCell>
            <TableCell align="center">تاریخ تایید</TableCell>
            <TableCell align="center">توضیحات</TableCell>
            <TableCell align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  const tableRequestAccept = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ردیف</TableCell>
            <TableCell align="center">ردیف</TableCell>
            <TableCell align="center">سال</TableCell>
            <TableCell align="center">کد بودجه</TableCell>
            <TableCell align="center">شرح</TableCell>
            <TableCell align="center">مبلغ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <AdminLayout>
      <Box padding={4}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="year-label">سال</InputLabel>
              <Select
                labelId="year-label"
                id="year-input"
                value={20}
                label="سال"
              >
                <MenuItem value={10}>1399</MenuItem>
                <MenuItem value={20}>1400</MenuItem>
                <MenuItem value={30}>1401</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="state-label">منطقه</InputLabel>
              <Select
                labelId="state-label"
                id="state-input"
                value={10}
                label="منطقه"
              >
                <MenuItem value={10}>همه مناطق و مرکزی</MenuItem>
                <MenuItem value={20}>سازمان فناوری اطلاعات و ارتباطات</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="witch-organ-label">واحد درخواست کننده</InputLabel>
              <Select
                labelId="witch-organ-label"
                id="witch-organ-input"
                value={20}
                label="واحد درخواست کننده"
              >
                <MenuItem value={10}>واحد فلان</MenuItem>
                <MenuItem value={20}>واحد بهمان</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="request-type-label">نوع درخواست</InputLabel>
              <Select
                labelId="request-type-label"
                id="request-type-input"
                value={formData.requestType}
                onChange={handleChange}
                name="requestType"
                label="نوع درخواست"
              >
                <MenuItem value={"simple"}>ساده</MenuItem>
                <MenuItem value={"table"}>جدولی</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} xl={2}>
            <TextField
              id="user-input"
              label="کاربر"
              variant="outlined"
              fullWidth
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
          {/* <Grid xs={3} xl={2}>
            <TextField
              id="request-number-input"
              label="شماره درخواست"
              variant="outlined"
              fullWidth
              value="384756"
            />
          </Grid>
          <Grid xs={3} xl={2}>
            <TextField
              id="request-number-input"
              label="تاریخ"
              variant="outlined"
              fullWidth
              value="1400/03/04 "
            />
          </Grid> */}
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={6} xl={4}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              <Grid xs={12} xl={6}>
                <TextField
                  id="request-number-input"
                  label="شماره درخواست"
                  variant="outlined"
                  fullWidth
                  value="384756"
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="request-number-input"
                  label="تاریخ"
                  variant="outlined"
                  fullWidth
                  value="1400/03/04 "
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <TextField
                  id="request-number-input"
                  label="براورد مبلغ"
                  variant="outlined"
                  fullWidth
                  value="235432"
                />
              </Grid>
              <Grid xs={12} xl={6}>
                <FormControl fullWidth>
                  <InputLabel id="request-type-label">شیوره انجام</InputLabel>
                  <Select
                    labelId="request-type-label"
                    id="request-type-input"
                    value={formData.doingMethod}
                    name="doingMethod"
                    label="شیوره انجام"
                    onChange={handleChange}
                  >
                    <MenuItem value={"10"}>فاکتوری</MenuItem>
                    <MenuItem value={"20"}>استعلام</MenuItem>
                    <MenuItem value={"30"}>مناقصه محدود</MenuItem>
                    <MenuItem value={"40"}>مناقصه عمومی</MenuItem>
                    <MenuItem value={"50"}>ترک تشریفات</MenuItem>1
                  </Select>
                </FormControl>
              </Grid>
              {formData.doingMethod === "50" && (
                <>
                  <Grid xs={12}>
                    <TextField
                      id="request-number-input"
                      label="پیمانکار"
                      variant="outlined"
                      value="235432"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleOpenContractorModal}>
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      multiline
                    />
                  </Grid>
                  <Grid xs={12}>
                    <TextField
                      id="request-number-input"
                      label="دلیل ترک تشریفات"
                      variant="outlined"
                      value="235432"
                      fullWidth
                      multiline
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid xs={12} xl={8}>
            <Grid container rowSpacing={2} columnSpacing={1}>
              {formData.requestType === "simple" && (
                <Grid xs={12}>
                  <TextField
                    id="request-number-input"
                    label="شرح درخواست"
                    variant="outlined"
                    fullWidth
                    value="235432"
                  />
                </Grid>
              )}

              {formData.requestType === "table" && tableRequestRender}
            </Grid>
          </Grid>
        </Grid>

        {/* tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="تایید کنندگان" />
            <Tab label="ردیف های بودجه" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {tableRequestBudget}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {tableRequestAccept}
        </TabPanel>

        {/* modal */}
        <Modal
          open={isOpenContractorModal}
          onClose={handleCloseContractorModal}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>

        {/* <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid xs={3} xl={2}>
            <TextField
              id="request-number-input"
              label="براورد مبلغ"
              variant="outlined"
              fullWidth
              value="235432"
            />
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="request-type-label">شیوره انجام</InputLabel>
              <Select
                labelId="request-type-label"
                id="request-type-input"
                value={formData.doingMethod}
                label="شیوره انجام"
                onChange={handleChange}
              >
                <MenuItem value={"10"}>فاکتوری</MenuItem>
                <MenuItem value={"20"}>استعلام</MenuItem>
                <MenuItem value={"30"}>مناقصه محدود</MenuItem>
                <MenuItem value={"40"}>مناقصه عمومی</MenuItem>
                <MenuItem value={"50"}>ترک تشریفات</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container rowSpacing={2} columnSpacing={1}>
          {formData.doingMethod === "50" && (
            <Grid xs={6} xl={4}>
              <TextField
                id="request-number-input"
                label="دلیل ترک تشریفات"
                variant="outlined"
                value="235432"
                fullWidth
                multiline
              />
            </Grid>
          )}
        </Grid> */}
      </Box>
    </AdminLayout>
  );
}

export default RequestCreditPage;
