import userStore from "hooks/store/user-store";
import { ReactNode } from "react";

interface SectionGuardProps {
  children: ReactNode;
  permission?: string;
}

function SectionGuard(props: SectionGuardProps) {
  const { permission, children } = props;

  const userState = userStore();

  // not have access to this section
  if (permission && !userState.permissions?.split("/").includes(permission)) {
    return null;
  }

  return <>{children}</>;
}

export default SectionGuard;
