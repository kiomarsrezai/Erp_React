import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Stack, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsTasksForm from "components/sections/contracts/contracts-tasks/contracts-tasks-form";

function ContractsTasks() {
  // forms
  const [formData, setFormData] = useState({
    [contractsTasksConfig.AREA]: undefined,
  });

  // data
  const contractsQuery = useQuery(
    reactQueryKeys.contracts.tasks.getData,
    () => contractsTasksApi.getData({}),
    {
      enabled: false,
    }
  );

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
          <ContractsTasksForm formData={formData} setFormData={setFormData} />
        </Box>
        <Box
          sx={{
            height: `calc(100vh - ${formHeight}px)`,
            overflow: "auto",
          }}
        >
          {JSON.stringify(contractsQuery.data?.data)}
          {/* <Stack p={2} spacing={2}>
            {insertMode && (
              <ProjectMeetingsEditorCard
                formData={formData}
                setInsertMode={setInsertMode}
                maxRow={maxRow}
                checkUnickRow={checkUnickRow}
                insertMode
              />
            )}
            {contractsQuery.data?.data.map((item, i) => (
              <ProjectMeetingsEditorCard
                key={item.id}
                commiteDetailItem={item}
                setInsertMode={setInsertMode}
                checkUnickRow={checkUnickRow}
                insertMode={false}
                formData={formData}
              />
            ))}

            {!contractsQuery.data?.data.length &&
              !insertMode &&
              !!formData.commite && (
                <Typography align="center" variant="caption" mt={30}>
                  هیچ بندی یافت نشد
                </Typography>
              )}
          </Stack> */}
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default ContractsTasks;
