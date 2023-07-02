import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import {
  contractsTasksConfig,
  contractsTasksFormDefaultValue,
} from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsTasksForm from "components/sections/contracts/contracts-tasks/contracts-tasks-form";
import ContractTaskItemCard from "components/sections/contracts/contracts-tasks/contract-task-item-card";
import TabAreaContract from "components/sections/contracts/contracts-tasks/tabs/areas/tab-area-contract";

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

function ContractsTasks() {
  // tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // forms
  const [formData, setFormData] = useState(contractsTasksFormDefaultValue);
  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  //   ui
  const [formHeight, setFormHeight] = useState(0);
  const boxElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFormHeight(boxElement.current?.clientHeight || 0);
  }, []);

  return (
    <AdminLayout>
      <Box
        sx={{
          maxHeight: `calc(100vh - ${globalConfig.headerHeight}px)`,
          overflow: "hidden",
        }}
      >
        <Box ref={boxElement}>
          <ContractsTasksForm
            formData={formData}
            setFormData={setFormData}
            setHaveSubmitedForm={setHaveSubmitedForm}
          />
        </Box>
        <Box
          sx={{
            height: `calc(100vh - ${formHeight}px)`,
            overflow: "auto",
          }}
        >
          <Box p={2}>
            <ContractTaskItemCard
              formData={formData}
              setFormData={setFormData}
              haveSubmitedForm={haveSubmitedForm}
            />
          </Box>

          {/* tabs */}
          <Box p={2}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="مناطق" />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <TabAreaContract />
            </TabPanel>
          </Box>
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default ContractsTasks;
