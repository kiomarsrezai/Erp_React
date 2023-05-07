import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import ListItemText from "@mui/material/ListItemText";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MoneyIcon from "@mui/icons-material/Money";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import useLayoutStore from "hooks/store/layout-store";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import KeyIcon from "@mui/icons-material/Key";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import SectionGuard from "components/auth/section-guard";
import SortSharpIcon from "@mui/icons-material/SortSharp";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";

import { blue } from "@mui/material/colors";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { accessNamesConfig } from "config/access-names-config";

interface SidenavShape {
  title: string;
  path: string;
  icon: ReactNode;
  licenseName: string;
}

function AdminSidenavMenu() {
  const normalize = useLayoutStore((state) => state.normlize);

  const sidenavs: SidenavShape[] = [
    {
      title: "گزارش",
      path: "/report/chart/revenue",
      icon: <AssessmentIcon />,
      licenseName: accessNamesConfig.REVENUE_CHART_PAGE,
    },
    {
      title: "بودجه",
      path: "/budget/proposal",
      icon: <MoneyIcon />,
      licenseName: accessNamesConfig.BUDGET_PROPOSAL_PAGE,
    },
    {
      title: "بودجه تفکیکی",
      path: "/budget/seprator",
      icon: <PointOfSaleIcon />,
      licenseName: accessNamesConfig.SEPRATOR_BUDGET_PAGE,
    },
    {
      title: "کدینگ بودجه",
      path: "/budget/coding",
      icon: <CodeIcon />,
      licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
    },
    {
      title: "متولی ها",
      path: "/report/proctor/abstract",
      icon: <MonitorHeartIcon />,
      licenseName: accessNamesConfig.ABSTRUCT_PROCTOR_PAGE,
    },
    {
      title: "واسط کدینگ",
      path: "/transfer",
      icon: <ApartmentIcon />,
      licenseName: accessNamesConfig.TRANSFER_PAGE,
    },
    // credit
    {
      title: "درخواست اعتبار",
      path: "/credit/request",
      icon: <CreditCardIcon />,
      licenseName: accessNamesConfig.CREDIT_REQUEST_PAGE,
    },
    // credit
    {
      title: "دسترسی ها",
      path: "/access",
      icon: <KeyIcon />,
      licenseName: accessNamesConfig.ACCESS_PAGE,
    },
    // project
    {
      title: "پروژه ها",
      path: "/project/org",
      icon: <AccountTreeIcon />,
      licenseName: accessNamesConfig.PROJECT_ORG_PAGE,
    },
    {
      title: "جلسات",
      path: "/project/meetings",
      icon: <GroupsIcon />,
      licenseName: accessNamesConfig.PROJECT_MEETINGS_PAGE,
    },
    // organization
    {
      title: "ساختار",
      path: "/organization/posts",
      icon: <SortSharpIcon />,
      licenseName: accessNamesConfig.ORGANIZATION_POSTS_PAGE,
    },
    // traz
    {
      title: "تراز",
      path: "/traz",
      icon: <DesignServicesIcon />,
      licenseName: accessNamesConfig.TRAZ_PAGE,
    },
  ];

  // active
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <List>
      {sidenavs.map((sidenav, i) => (
        <SectionGuard key={i} permission={sidenav.licenseName}>
          <Tooltip title={normalize ? sidenav.title : ""} placement="right">
            <ListItem
              disablePadding
              component={Link}
              to={sidenav.path}
              sx={isActive(sidenav.path) ? { bgcolor: blue[50] } : {}}
            >
              <ListItemButton disableRipple>
                <ListItemIcon>{sidenav.icon}</ListItemIcon>
                {!normalize && (
                  <ListItemText
                    sx={{ color: "GrayText" }}
                    primary={sidenav.title}
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </SectionGuard>
      ))}
    </List>
  );
}

export default AdminSidenavMenu;
