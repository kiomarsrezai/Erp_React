import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { useRef } from "react";
import { globalConfig } from "config/global-config";
import { orgProjectApi } from "api/project/org-project-api";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";

function OrgProjectPage() {
  const element = useRef<any>(null);

  function mouseDown(event: any) {
    let shiftX = event.clientX - element.current.getBoundingClientRect().left;
    let shiftY = event.clientY - element.current.getBoundingClientRect().top;
    function moveAt(pageX: any, pageY: any) {
      element.current.style.left =
        pageX - shiftX - element.current.clientWidth / 2 + "px";
      element.current.style.top =
        pageY - shiftY - globalConfig.headerHeight + "px";
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(event: any) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      document.onmouseup = null;
    };
  }

  const orgProjectQuery = useQuery(
    reactQueryKeys.project.org.getProject,
    () => orgProjectApi.getProject({ [orgProjectConfig.ID]: 1 }),
    {
      // enabled: false,
    }
  );

  const rootItem = orgProjectQuery.data?.data.find(
    (item) => item.motherId === null
  );

  const renderRoute = (itemId: number) =>
    orgProjectQuery.data?.data
      .filter((item) => item.motherId === itemId)
      .map((item) => (
        <TreeNode
          label={
            <ProjectOrgCard
              title={item.projectName}
              id={item.id}
              code={item.projectCode}
              rootId={rootItem?.id || 0}
            />
          }
          key={item.id}
        >
          {renderRoute(item.id)}
        </TreeNode>
      ));

  return (
    <AdminLayout>
      <Box
        dir="ltr"
        height={`calc(100vh - ${globalConfig.headerHeight}px)`}
        position="relative"
        overflow="hidden"
      >
        <Box
          width="max-content"
          height="max-content"
          position="absolute"
          left="50%"
          p="30px"
          sx={{
            userSelect: "none",
            transform: "translateX(-50%)",
            bgcolor: grey[50],
            borderRadius: 3,
          }}
          top={30}
          ref={element}
          onMouseDown={mouseDown}
          onDragStart={() => false}
        >
          {rootItem && (
            <Tree
              lineWidth={"2px"}
              lineColor={grey[400]}
              lineBorderRadius={"3px"}
              label={
                <ProjectOrgCard
                  title={rootItem.projectName}
                  rootId={rootItem.id}
                  code={rootItem.projectCode}
                  id={rootItem.id}
                />
              }
            >
              {renderRoute(rootItem.id)}
            </Tree>
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default OrgProjectPage;
