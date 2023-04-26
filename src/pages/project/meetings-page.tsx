import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";

import { useState } from "react";

function MeetingsProjectPage() {
  // forms
  const [formData, setFormData] = useState({
    date: "",
    code: "",
    commite: "",
  });

  return (
    <AdminLayout>
      <ProjectMeetingsForm formData={formData} setFormData={setFormData} />
    </AdminLayout>
  );
}

export default MeetingsProjectPage;
