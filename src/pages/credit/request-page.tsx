import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CreditRequestForm from "components/sections/credit/request/credit-request-form";

import { useState } from "react";
import CreditRequestConfrimUsersTable from "components/sections/credit/request/credit-request-confrim-users-table";
import CreditRequestBudgetRowTable from "components/sections/credit/request/credit-request-budget-row-table";
import { creditRequestConfig } from "config/features/credit/credit-request-config";

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

function RequestCreditPage() {
  // forms
  const [formData, setFormData] = useState({
    [creditRequestConfig.doing_method]: 1,
    [creditRequestConfig.request_type]: 1,
    [creditRequestConfig.request_date]: "",
    [creditRequestConfig.request_number]: "",
    [creditRequestConfig.year]: 32,
    [creditRequestConfig.area]: 1,
    [creditRequestConfig.execute_departman_id]: 1,
    [creditRequestConfig.approximate_price]: "",
    [creditRequestConfig.contractor]: null,
    [creditRequestConfig.why_leave_ceremonies]: "",
  });

  const [firstStepCrossed, setFirstStepCrossed] = useState(false);

  // tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <AdminLayout>
      <Box padding={4}>
        <CreditRequestForm
          formData={formData}
          setFormData={setFormData}
          firstStepCrossed={firstStepCrossed}
          setFirstStepCrossed={setFirstStepCrossed}
        />

        {/* tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="تایید کنندگان" />
            <Tab label="ردیف های بودجه" />
          </Tabs>
        </Box>
        {firstStepCrossed && (
          <>
            <TabPanel value={tabValue} index={0}>
              <CreditRequestConfrimUsersTable />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <CreditRequestBudgetRowTable />
            </TabPanel>
          </>
        )}
      </Box>
    </AdminLayout>
  );
}

export default RequestCreditPage;
