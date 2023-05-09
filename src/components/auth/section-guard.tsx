import userStore from "hooks/store/user-store";
import { ReactNode } from "react";

interface SectionGuardProps {
  children: ReactNode;
  permission?: string | string[];
  oneOfPermissions?: boolean;
}

function SectionGuard(props: SectionGuardProps) {
  const { permission, children, oneOfPermissions } = props;

  const userState = userStore();
  const splitedPermissions = userState.permissions?.split("/");

  // not have access to this section
  if (Array.isArray(permission)) {
    if (permission.length) {
      const permissionRight = permission.filter(
        (permissionName) => !!splitedPermissions?.includes(permissionName)
      );

      if (!oneOfPermissions && !(permissionRight.length === permission.length))
        return null;

      if (oneOfPermissions && permissionRight.length === 0) return null;
    }
  } else {
    if (permission && !splitedPermissions?.includes(permission)) {
      return null;
    }
  }

  return <>{children}</>;
}

export default SectionGuard;
