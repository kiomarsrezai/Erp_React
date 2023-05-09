import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import ListItemText from "@mui/material/ListItemText";
import useLayoutStore from "hooks/store/layout-store";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { blue } from "@mui/material/colors";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidenavShape } from "types/layout-type";
import { sidenavsLayout } from "config/features/layout-config";
import SectionGuard from "components/auth/section-guard";

function AdminSidenavMenu() {
  const { normalize, activeSidenavIndex, onChangeActiveSidenav } =
    useLayoutStore();

  // active
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderItem = (
    sidenav: SidenavShape,
    i: number,
    isSubSidenav: boolean
  ) => {
    return (
      <SectionGuard
        permission={
          sidenav.licenseName ||
          sidenav.items?.map((item) => item.licenseName as string)
        }
        oneOfPermissions
      >
        <Tooltip title={normalize ? sidenav.title : ""} placement="right">
          <ListItem
            disablePadding
            {...(sidenav.path && {
              component: Link,
              to: sidenav.path,
            })}
            sx={{
              ...(isSubSidenav && {
                bgcolor: "grey.100",
                borderLeft: 2,
                borderColor: "grey.400",
              }),
              ...(sidenav.path &&
                isActive(sidenav.path) && { bgcolor: blue[50] }),
            }}
          >
            <ListItemButton
              {...(sidenav.items && {
                onClick: () => onChangeActiveSidenav(i),
              })}
              disableRipple
            >
              <ListItemIcon>
                <sidenav.icon />
              </ListItemIcon>
              {!normalize && (
                <>
                  <ListItemText
                    sx={{ color: "GrayText" }}
                    primary={sidenav.title}
                  />

                  {!sidenav.items ? (
                    <></>
                  ) : i === activeSidenavIndex ? (
                    <ExpandLess sx={{ color: "GrayText" }} />
                  ) : (
                    <ExpandMore sx={{ color: "GrayText" }} />
                  )}
                </>
              )}
            </ListItemButton>
          </ListItem>
        </Tooltip>

        {sidenav.items && (
          <Collapse in={i === activeSidenavIndex} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {sidenav.items.map((subSidenav, subI) => (
                <Fragment key={i}>
                  {renderItem(subSidenav, subI, true)}
                </Fragment>
              ))}
            </List>
          </Collapse>
        )}
      </SectionGuard>
    );
  };

  return (
    <List>
      {sidenavsLayout.map((sidenav, i) => (
        <Fragment key={i}>{renderItem(sidenav, i, false)}</Fragment>
        // sidenav.items ? (
        //   <Collapse in={open} timeout="auto" unmountOnExit>
        // <List component="div" disablePadding>
        /* <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton> */
        //   </List>
        // </Collapse>
        //   )  : (

        //   )
        // <SectionGuard key={i} permission={sidenav.licenseName}>
        // <Tooltip title={normalize ? sidenav.title : ""} placement="right">
        //   <ListItem
        //     disablePadding
        //     component={Link}
        //     to={sidenav.path}
        //     sx={isActive(sidenav.path) ? { bgcolor: blue[50] } : {}}
        //   >
        //     <ListItemButton disableRipple>
        //       <ListItemIcon>{sidenav.icon}</ListItemIcon>
        //       {!normlize && (
        //         <ListItemText
        //           sx={{ color: "GrayText" }}
        //           primary={sidenav.title}
        //         />
        //       )}
        //     </ListItemButton>
        //   </ListItem>
        // </Tooltip>
        // </SectionGuard>
      ))}
    </List>
  );
}

export default AdminSidenavMenu;
