import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import WindowLoading from "components/ui/loading/window-loading";
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

  const userMutation = useMutation(AuthApi.userByToken, {
    onSuccess(data) {
      if (data.data) {
        userState.chnageUserData({
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          userName: data.data.userName,
          bio: data.data.bio,
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
  }, [userState]);

  // not have access to this page
  if (false) {
    return <div>404</div>;
  }

  return (
    <>
      {render}
      {/* <WindowLoading
        active={userMutation.isLoading || !userMutation.data?.data}
      />{" "} */}
    </>
  );
}

export default PageGuard;
