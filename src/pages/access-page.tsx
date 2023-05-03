import Box from "@mui/material/Box";
import AdminLayout from "components/layout/admin-layout";
import AccessTree from "components/sections/access/access-tree";
import SelectUser from "components/sections/select-user";
import usePermissions from "hooks/permissions-hook";
import BoxLoading from "components/ui/loading/box-loading";

import { useState } from "react";
import { globalConfig } from "config/global-config";
import { UserItemShape } from "types/data/auth/users-type";

function AccessPage() {
  const [selectedUser, setSelectUser] = useState<UserItemShape | null>(null);

  const { loading, data: permissionsListdata } = usePermissions();

  const cancelProccess = () => {
    setSelectUser(null);
  };
  return (
    <AdminLayout>
      <Box p={3} height={`calc(100vh - ${globalConfig.headerHeight}px)`}>
        {selectedUser ? (
          <>
            {loading ? (
              <BoxLoading />
            ) : (
              <AccessTree
                user={selectedUser}
                onCancel={cancelProccess}
                permissionsListdata={permissionsListdata}
              />
            )}
          </>
        ) : (
          <SelectUser onSelectUser={setSelectUser} />
        )}
      </Box>
    </AdminLayout>
  );
}

export default AccessPage;
