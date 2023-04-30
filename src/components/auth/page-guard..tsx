import userStore from "hooks/store/user-store";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PageGuardProps {
  render: ReactNode;
  permission?: string;
}

function PageGuard(props: PageGuardProps) {
  const { render, permission } = props;
  const userState = userStore();

  // token is not exist
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-auth");
    if (!token && !userState.fetched) {
      navigate("/");
    }
  }, [navigate, userState]);

  // not have access to this page
  if (false) {
    return <div>404</div>;
  }

  return <>{render}</>;
}

export default PageGuard;
