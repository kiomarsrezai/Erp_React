import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PageGuardProps {
  render: ReactNode;
  permission?: string;
}

function PageGuard(props: PageGuardProps) {
  const { render, permission } = props;

  // token is not exist
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-auth");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // not have access to this page
  if (false) {
    return <div>404</div>;
  }

  return <>{render}</>;
}

export default PageGuard;
