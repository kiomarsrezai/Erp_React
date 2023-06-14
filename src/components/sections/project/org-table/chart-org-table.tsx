import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { globalConfig } from "config/global-config";
import { orgProjectApi } from "api/project/org-project-api";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { GetSingleOrgProjectTableItemShape } from "types/data/project/org-project-type";

interface ChartOrgTableProps {
  activeItem: GetSingleOrgProjectTableItemShape;
}
function ChartOrgTable(props: ChartOrgTableProps) {
  const { activeItem } = props;
  const orgProjectQuery = useQuery(
    reactQueryKeys.project.org.getProject,
    () => orgProjectApi.getProject({ [orgProjectConfig.ID]: activeItem.id }),
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
              parentId={item.motherId}
              rootId={rootItem?.id || 0}
              drag={{
                id: draggedItemData?.id,
                changeItem: setDraggedItemData,
                item: draggedItemData,
                canDrag,
              }}
              item={item}
              isLastChild={itsLastChild(item.id)}
            />
          }
          key={item.id}
        >
          {renderRoute(item.id)}
        </TreeNode>
      ));

  // drag
  const [draggedItemData, setDraggedItemData] = useState<any | null>(null);

  const canDrag = (id: number, toId: number) => {
    let checker: number | null = toId;
    while (checker) {
      if (checker === id) return false;

      const item = orgProjectQuery.data?.data.find(
        (item) => item.id === checker
      );

      checker = item?.motherId || null;
    }
    return true;
  };

  // utils
  const itsLastChild = (id: number) => {
    const haveChild = !!orgProjectQuery.data?.data.find(
      (item) => item.motherId === id
    );
    return !haveChild;
  };

  const [zoomValue, setZoomValue] = useState(1);
  return (
    <Box
      dir="ltr"
      height={`30vh`}
      width={"100%"}
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
                label={
                  <ProjectOrgCard
                    title={rootItem.projectName}
                    rootId={rootItem.id}
                    parentId={rootItem.motherId}
                    id={rootItem.id}
                    drag={{
                      id: draggedItemData?.id,
                      changeItem: setDraggedItemData,
                      item: draggedItemData,
                      canDrag,
                    }}
                    isLastChild={false}
                    item={rootItem}
                  />
                }
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

export default ChartOrgTable;
