import Box from "@mui/material/Box";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { globalConfig } from "config/global-config";
import { ReactNode, useState } from "react";

interface FixedOrgProps {
  data: any[];
  render: (item: any, props: any) => ReactNode;
}

function FixedOrg(props: FixedOrgProps) {
  const { data, render } = props;

  const rootItem = data.find((item) => item.motherId === null);

  // utils
  const itsLastChild = (id: number) => {
    const haveChild = !!data.find((item) => item.motherId === id);
    return !haveChild;
  };

  const [zoomValue, setZoomValue] = useState(1);

  // drag
  const [draggedItemData, setDraggedItemData] = useState<any | null>(null);

  const canDrag = (id: number, toId: number) => {
    let checker: number | null = toId;
    while (checker) {
      if (checker === id) return false;

      const item = data.find((item) => item.id === checker);

      checker = item?.motherId || null;
    }
    return true;
  };

  const renderRoute = (itemId: number) =>
    data
      .filter((item) => item.motherId === itemId)
      .map((item) => (
        <TreeNode
          label={render(item, {
            rootId: rootItem?.id || 0,
            isLastChild: itsLastChild(item.id),
            drag: {
              id: draggedItemData?.id,
              changeItem: setDraggedItemData,
              item: draggedItemData,
              canDrag,
            },
          })}
          key={item.id}
        >
          {renderRoute(item.id)}
        </TreeNode>
      ));

  return (
    <Box
      dir="ltr"
      height={`calc(100vh - ${globalConfig.headerHeight}px)`}
      position="relative"
      overflow="hidden"
    >
      <ProjectOrgTools handleChangeZoom={setZoomValue} zoom={zoomValue} />
      <Box style={{ transform: `scale(${zoomValue})` }}>
        <Draggable
          positionOffset={{ x: "50%", y: "0" }}
          cancel=".MuiPaper-root"
          axis="both"
          defaultPosition={{ x: 0, y: 0 }}
          scale={1 * zoomValue}
        >
          <Box
            width="max-content"
            height="max-content"
            position="absolute"
            left="50%"
            p="30px"
            sx={{
              userSelect: "none",
              bgcolor: grey[50],
              borderRadius: 3,
            }}
            top={30}
          >
            {rootItem && (
              <Tree
                lineWidth={"2px"}
                lineColor={grey[400]}
                lineBorderRadius={"3px"}
                label={render(rootItem, {
                  rootId: rootItem.id,
                  isLastChild: false,
                  drag: {
                    id: draggedItemData?.id,
                    changeItem: setDraggedItemData,
                    item: draggedItemData,
                    canDrag,
                  },
                })}
              >
                {renderRoute(rootItem.id)}
              </Tree>
            )}
          </Box>
        </Draggable>
      </Box>
    </Box>
  );
}

export default FixedOrg;
