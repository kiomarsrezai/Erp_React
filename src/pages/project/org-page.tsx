import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { useRef } from "react";

const StyledNode = (props: any) => {
  return <ProjectOrgCard></ProjectOrgCard>;
};

function OrgProjectPage() {
  const element = useRef<any>(null);

  function mouseDown(event: any) {
    // (1) prepare to moving: make absolute and on top by z-index
    // element.current.position = "absolute";
    // element.current.style.zIndex = 1000;

    // move it out of any current parents directly into body
    // to make it positioned relative to the body
    // document.body.append(element.current);

    // centers the ball at (pageX, pageY) coordinates
    let shiftX = event.clientX - element.current.getBoundingClientRect().left;
    let shiftY = event.clientY - element.current.getBoundingClientRect().top;
    function moveAt(pageX: any, pageY: any) {
      element.current.style.left = pageX - shiftX + "px";
      element.current.style.top = pageY - shiftY + "px";
    }

    // move our absolutely positioned ball under the pointer
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event: any) {
      moveAt(event.pageX, event.pageY);
    }

    // (2) move the ball on mousemove
    document.addEventListener("mousemove", onMouseMove);

    // (3) drop the ball, remove unneeded handlers
    element.current.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      element.current.onmouseup = null;
    };
  }

  return (
    <AdminLayout>
      <Box
        dir="ltr"
        height="calc(100vh - 64px)"
        position="relative"
        overflow="hidden"
        onDragStart={() => false}
      >
        <Box
          width="max-content"
          height="max-content"
          position="absolute"
          left="50%"
          sx={{ userSelect: "none", transform: "translateX(0%)" }}
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
