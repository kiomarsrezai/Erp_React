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

import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface SidenavShape {
  title: string;
  path: string;
  icon: ReactNode;
}

function AdminSidenavMenu() {
  const normalize = useLayoutStore((state) => state.normlize);

  const sidenavs: SidenavShape[] = [
    {
      title: "گزارش",
      path: "/report/chart/revenv-chart",
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
      path: "/report/proctor/proctor-abstract",
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
        <ListItem disablePadding component={Link} to={sidenav.path}>
          <ListItemButton>
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
