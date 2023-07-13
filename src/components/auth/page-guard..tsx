import WindowLoading from "components/ui/loading/window-loading";
import userStore from "hooks/store/user-store";

import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PageGuardProps {
  render: ReactNode;
  permission?: string;
}

function PageGuard(props: PageGuardProps) {
  const { render, permission } = props;

  const userState = userStore();

  const userMutation = useMutation(AuthApi.userByToken, {
    onSuccess(data) {
      if (data.data) {
        userState.chnageUserData({
          id: data.data.id,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          userName: data.data.userName,
          bio: data.data.bio,
          permissions: data.data.lisence,
          nowDate: data.data.dateNow,
        });
      } else {
        navigate("/");
        localStorage.removeItem("token-auth");
      }
    },
    onError: () => {
      navigate("/");
      localStorage.removeItem("token-auth");
    },
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token-auth");

    if (token && !userState.fetched) {
      userMutation.mutate(token);
    }

    if (!token && !userState.fetched) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token-auth");

    const interval = setInterval(() => {
      if (token) {
        userMutation.mutate(token);
      } else {
        navigate("/");
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // loading
  if (!userState.fetched) {
    return <WindowLoading active={true} />;
  }

  // not have access to this page
  if (permission && !userState.permissions?.split("/").includes(permission)) {
    return <div>404</div>;
  }

  return <>{render}</>;
}

export default PageGuard;
