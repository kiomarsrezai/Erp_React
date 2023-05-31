import Box from "@mui/material/Box";
import MainHeader from "./admin-header";
import AhadisProvider from "components/layout/ahadis-provider";
import AdminSidenav from "./sidenav/admin-sidenav";
import { useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import useLayoutStore from "hooks/store/layout-store";
import { SidenavShape } from "types/layout-type";
import { sidenavsLayout } from "config/features/layout-config";
import { globalConfig } from "config/global-config";

interface AdminLayoutProps {
  children: ReactNode;
}
function AdminLayout(props: AdminLayoutProps) {
  const { children } = props;

  const pageTitle = useLayoutStore((state) => state.pageTitle);

  const location = useLocation();
  const findTitle = (sidenav: SidenavShape): string | false => {
    let findedTitle: false | string = false;
    if (sidenav.path === location.pathname) {
      findedTitle = sidenav.title;
    } else if (sidenav.items) {
      sidenav.items.every((subsidenav) => {
        const findedSubTitle = findTitle(subsidenav);
        if (findedSubTitle) {
          findedTitle = findedSubTitle;
          return false;
        } else {
          return true;
        }
      });
    }

    return findedTitle;
  };

  useEffect(() => {
    if (pageTitle) {
      document.title = pageTitle;
    } else {
      let title = globalConfig.siteTitle;

      sidenavsLayout.every((sidenav) => {
        const findedTitle = findTitle(sidenav);
        if (findedTitle) {
          title = findedTitle;
          return false;
        } else {
          return true;
        }
      });

      document.title = title;
    }
  }, [location.pathname, pageTitle]);

  return (
    <AhadisProvider>
      <Box sx={{ display: "flex" }}>
        <AdminSidenav />
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <MainHeader />
          {children}
        </Box>
      </Box>
    </AhadisProvider>
  );
}

export default AdminLayout;
