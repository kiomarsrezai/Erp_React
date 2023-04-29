import { ReactNode } from "react";

interface PageGuardProps {
  render: ReactNode;
  permission: string;
}

function PageGuard(props: PageGuardProps) {
  const { render, permission } = props;

  // not have access to this page
  if (false) {
    return <div>404</div>;
  }

  return render;
}

export default PageGuard;
