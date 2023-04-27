import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import { reactQueryKeys } from "config/react-query-keys-config";

import { useState } from "react";

function MeetingsProjectPage() {
  // forms
  const [formData, setFormData] = useState({
    date: "",
    code: "",
    commite: "",
  });

  // data
  const mcommiteMettingsDetailQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesDetailModal,
    () => mettingsProjectApi.getCommiteDetail(0),
    {
      enabled: false,
    }
  );

  return (
    <AdminLayout>
      <ProjectMeetingsForm formData={formData} setFormData={setFormData} />
      {JSON.stringify(mcommiteMettingsDetailQuery.data?.data)}
    </AdminLayout>
  );
}

export default MeetingsProjectPage;
