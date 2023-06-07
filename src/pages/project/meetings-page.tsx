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

function MeetingsProjectPage() {
  // forms
  const [formData, setFormData] = useState({
    date: "",
    code: "",
    commite: "",
    id: undefined,
  });

  // data
  const commiteMettingsDetailQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesDetailModal,
    () => mettingsProjectApi.getCommiteDetail(0),
    {
      enabled: false,
    }
  );

  // insert
  const [insertMode, setInsertMode] = useState(false);

  const maxRow =
    ([...(commiteMettingsDetailQuery.data?.data || [])].sort(
      (a, b) => b.row - a.row
    )?.[0]?.row || 0) + 1;

  const checkUnickRow = (
    row: number,
    commiteItem: GetSingleCommiteDetailModalShape
  ) => {
    return !commiteMettingsDetailQuery.data?.data.find(
      (item) => item.row === row && commiteItem.id !== item.id
    );
  };

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
          <ProjectMeetingsForm
            formData={formData}
            setFormData={setFormData}
            setInsertMode={setInsertMode}
            insertMode={insertMode}
            isSelectedComiite={!!formData.commite}
          />
        </Box>
        <Box
          sx={{
            height: `calc(100vh - ${formHeight}px)`,
            overflow: "auto",
          }}
        >
          <Stack p={2} spacing={2}>
            {insertMode && (
              <ProjectMeetingsEditorCard
                formData={formData}
                setInsertMode={setInsertMode}
                maxRow={maxRow}
                checkUnickRow={checkUnickRow}
                insertMode
              />
            )}
            {commiteMettingsDetailQuery.data?.data.map((item, i) => (
              <ProjectMeetingsEditorCard
                key={item.id}
                commiteDetailItem={item}
                setInsertMode={setInsertMode}
                checkUnickRow={checkUnickRow}
                insertMode={false}
                formData={formData}
              />
            ))}

            {!commiteMettingsDetailQuery.data?.data.length &&
              !insertMode &&
              !!formData.commite && (
                <Typography align="center" variant="caption" mt={30}>
                  هیچ بندی یافت نشد
                </Typography>
              )}
          </Stack>
        </Box>
      </Box>
      {/* </Box> */}
    </AdminLayout>
  );
}

export default MeetingsProjectPage;
