import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { useRef } from "react";
import { globalConfig } from "config/global-config";

const StyledNode = (props: any) => {
  return <ProjectOrgCard></ProjectOrgCard>;
};

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
          <Tree
            lineWidth={"2px"}
            lineColor={grey[400]}
            lineBorderRadius={"3px"}
            label={<StyledNode>Root</StyledNode>}
          >
            <TreeNode label={<StyledNode>Child 3</StyledNode>}>
              <TreeNode label={<StyledNode>Grand Child 1</StyledNode>}>
                <TreeNode label={<StyledNode>Grand Child 1</StyledNode>}>
                  <TreeNode label={<StyledNode>Grand Child 1</StyledNode>}>
                    <TreeNode
                      label={<StyledNode>Grand Child 1</StyledNode>}
                    ></TreeNode>
                  </TreeNode>
                </TreeNode>
              </TreeNode>
              <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
            </TreeNode>
          </Tree>
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default OrgProjectPage;
