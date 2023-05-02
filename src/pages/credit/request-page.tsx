import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ApprovalIcon from "@mui/icons-material/Approval";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FixedModal from "components/ui/modal/fixed-modal";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import CreditRequestForm from "components/sections/credit/request/credit-request-form";

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
  protein: any
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "1",
    159,
    6.0,
    24,
    <>
      <IconButton color="primary" sx={{ position: "relative" }}>
        <ApprovalIcon />
        <ClearIcon
          color="error"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  ),
  createData(
    "2",
    237,
    9.0,
    37,
    <>
      <IconButton color="error">
        <ClearIcon />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  ),
  createData(
    "3",
    262,
    16.0,
    24,
    <>
      <IconButton color="error">
        <ClearIcon />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  ),
  createData(
    "4",
    305,
    3.7,
    67,
    <>
      <IconButton color="error">
        <ClearIcon />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  ),
  createData(
    "5",
    356,
    16.0,
    49,
    <>
      <IconButton color="error">
        <ClearIcon />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  ),
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
    doingMethod: 1,
    requestType: 1,
  });

  // modal
  const [isOpenContractorModal, setIsOpenContractorModal] = useState(false);
  const handleOpenContractorModal = () => {
    setIsOpenContractorModal(true);
  };
  const handleCloseContractorModal = () => {
    setIsOpenContractorModal(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tableRequestBudget = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell colSpan={8}>
              <Box>
                <IconButton color="primary">
                  <GroupAddIcon />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
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
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
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
          <TableCell colSpan={6}>
            <Box>
              <IconButton color="primary" onClick={handleOpenModal}>
                <AddIcon />
              </IconButton>
            </Box>
          </TableCell>
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
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <AdminLayout>
      <Box padding={4}>
        <CreditRequestForm formData={formData} setFormData={setFormData} />

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

        <FixedModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          title="ردیف های بودجه"
        >
          <BudgetMethodInput setter={() => {}} value={0} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ردیف</TableCell>
                  <TableCell align="center">کد بودجه</TableCell>
                  <TableCell align="center">شرح ردیف</TableCell>
                  <TableCell align="center">سال</TableCell>
                  <TableCell align="center">مبلغ</TableCell>
                  <TableCell align="center">تعدیلات</TableCell>
                  <TableCell align="center">نهایی</TableCell>
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
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary">
                        <CheckIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FixedModal>
      </Box>
    </AdminLayout>
  );
}

export default RequestCreditPage;
