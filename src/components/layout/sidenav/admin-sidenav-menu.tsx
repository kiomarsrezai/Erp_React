import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MoneyIcon from "@mui/icons-material/Money";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Link } from "react-router-dom";

import { ReactNode } from "react";

interface SidenavShape {
  title: string;
  path: string;
  icon: ReactNode;
}

function AdminSidenavMenu() {
  const sidenavs: SidenavShape[] = [
    {
      title: "گزارش",
      path: "/dashboard/report",
      icon: <AssessmentIcon />,
    },
    {
      title: "بودجه",
      path: "/",
      icon: <MoneyIcon />,
    },
    {
      title: "بودجه تفکیکی",
      path: "/",
      icon: <PointOfSaleIcon />,
    },
    {
      title: "متولی ها",
      path: "/",
      icon: <MonitorHeartIcon />,
    },
    {
      title: "واسط سازمان ها",
      path: "/",
      icon: <ApartmentIcon />,
    },
  ];

  return (
    <List>
      {sidenavs.map((sidenav) => (
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{sidenav.icon}</ListItemIcon>
            <ListItemText primary={sidenav.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default AdminSidenavMenu;
