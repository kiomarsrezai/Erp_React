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
import SectionGuard from "components/auth/section-guard";

import { blue } from "@mui/material/colors";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidenavShape } from "types/layout-type";
import { sidenavsLayout } from "config/features/layout-config";
import { globalConfig } from "config/global-config";

function AdminSidenavMenu() {
  const { normalize, activeSidenavIndex, openSidenav } = useLayoutStore();

  // active
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const formatLicenses = (items?: SidenavShape[]) => {
    let formated: string[] = [];

    items?.forEach((item) => {
      formated = [
        item.licenseName as string,
        ...formated,
        ...formatLicenses(item.items),
      ];
    });

    return formated;
  };

  const renderItem = (sidenav: SidenavShape, i: number, level: number) => {
    return (
      <SectionGuard
        permission={sidenav.licenseName || formatLicenses(sidenav.items)}
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
              ...(level > 0 && {
                bgcolor: `grey.${100 * level}`,
                borderLeft: 2,
                borderColor: "grey.400",
              }),
              ...(!!activeSidenavIndex.includes(sidenav.title) &&
                !!sidenav.items?.length &&
                level === 0 && {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }),
              ...(!!activeSidenavIndex.includes(sidenav.title) &&
                !!sidenav.items?.length && {
                  bgcolor: `grey.${100 * (level + 2)}`,
                }),
              ...(sidenav.path &&
                isActive(sidenav.path) && { bgcolor: blue[100] }),
              "&:hover": {
                bgcolor: blue[50],
              },
            }}
          >
            <ListItemButton
              {...(sidenav.items && {
                onClick: () => openSidenav(sidenav.title),
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
                  ) : !!activeSidenavIndex.includes(sidenav.title) ? (
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
          <Collapse
            in={!!activeSidenavIndex.includes(sidenav.title)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {sidenav.items.map((subSidenav, subI) => (
                <Fragment key={subSidenav.title}>
                  {renderItem(subSidenav, subI, level + 1)}
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
        <Fragment key={sidenav.title}>{renderItem(sidenav, i, 0)}</Fragment>
      ))}
    </List>
  );
}

export default AdminSidenavMenu;
