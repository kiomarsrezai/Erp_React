import Box from "@mui/material/Box";
import AdminLayout from "components/layout/admin-layout";
import AccessTree from "components/sections/access/access-tree";

import { useState } from "react";
import { globalConfig } from "config/global-config";
import { UserItemShape } from "types/data/auth/users-type";
import AccessUserList from "components/sections/access/access-user-list";

function AccessPage() {
  const [selectedUser, setSelectUser] = useState<UserItemShape | null>(null);

  const cancelProccess = () => {
    setSelectUser(null);
  };
  return (
    <AdminLayout>
      <Box p={3} height={`calc(100vh - ${globalConfig.headerHeight}px)`}>
        {selectedUser ? (
          <AccessTree user={selectedUser} onCancel={cancelProccess} />
        ) : (
          <AccessUserList onSelectUser={setSelectUser} />
        )}
      </Box>
    </AdminLayout>
  );
}

export default AccessPage;
