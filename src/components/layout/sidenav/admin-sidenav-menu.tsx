import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
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

import { blue } from "@mui/material/colors";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidenavShape {
  title: string;
  path: string;
  icon: ReactNode;
  authName?: string;
}

function AdminSidenavMenu() {
  const normalize = useLayoutStore((state) => state.normlize);

  const sidenavs: SidenavShape[] = [
    {
      title: "گزارش",
      path: "/report/chart/revenue",
      icon: <AssessmentIcon />,
    },
    {
      title: "بودجه",
      path: "/budget/proposal",
      icon: <MoneyIcon />,
    },
    {
      title: "بودجه تفکیکی",
      path: "/budget/seprator",
      icon: <PointOfSaleIcon />,
    },
    {
      title: "متولی ها",
      path: "/report/proctor/abstract",
      icon: <MonitorHeartIcon />,
    },
    {
      title: "واسط سازمان ها",
      path: "/transfer",
      icon: <ApartmentIcon />,
      authName: "wseg",
    },
    // credit
    {
      title: "درخواست اعتبار",
      path: "/credit/request",
      icon: <CreditCardIcon />,
    },
    // credit
    {
      title: "دسترسی ها",
      path: "/access",
      icon: <KeyIcon />,
    },
    // project
    {
      title: "پروژه ها",
      path: "/project/org",
      icon: <AccountTreeIcon />,
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
        <ListItem
          disablePadding
          component={Link}
          to={sidenav.path}
          key={i}
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
      ))}
    </List>
  );
}

export default AdminSidenavMenu;
