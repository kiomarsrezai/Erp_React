import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Stack } from "@mui/material";

function MeetingsProjectPage() {
  // forms
  const [formData, setFormData] = useState({
    date: "",
    code: "",
    commite: "",
  });

  // data
  const commiteMettingsDetailQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesDetailModal,
    () => mettingsProjectApi.getCommiteDetail(0),
    {
      enabled: false,
    }
  );

  return (
    <AdminLayout>
      <ProjectMeetingsForm formData={formData} setFormData={setFormData} />
      <Stack p={2} spacing={2}>
        {commiteMettingsDetailQuery.data?.data.map((item, i) => (
          <ProjectMeetingsEditorCard
            number={i + 1}
            key={i}
            projectName={item.projectName}
            data={item.description}
          />
        ))}
      </Stack>
    </AdminLayout>
  );
}

export default MeetingsProjectPage;
