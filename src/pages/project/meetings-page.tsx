import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Stack, Typography } from "@mui/material";

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

  return (
    <AdminLayout>
      <ProjectMeetingsForm
        formData={formData}
        setFormData={setFormData}
        setInsertMode={setInsertMode}
        insertMode={insertMode}
      />
      <Stack p={2} spacing={2}>
        {insertMode && (
          <ProjectMeetingsEditorCard
            formData={formData}
            setInsertMode={setInsertMode}
            maxRow={maxRow}
            insertMode
          />
        )}
        {commiteMettingsDetailQuery.data?.data.map((item, i) => (
          <ProjectMeetingsEditorCard
            key={item.id}
            commiteDetailItem={item}
            setInsertMode={setInsertMode}
            insertMode={false}
            formData={formData}
          />
        ))}

        {!commiteMettingsDetailQuery.data?.data.length && !insertMode && (
          <Typography align="center" variant="caption" mt={30}>
            هیچ بندی یافت نشد
          </Typography>
        )}
      </Stack>
    </AdminLayout>
  );
}

export default MeetingsProjectPage;
