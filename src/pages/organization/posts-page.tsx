import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { globalConfig } from "config/global-config";
import { useState } from "react";
import OrganizationPostsOrgCard from "components/sections/organization/posts/org-card";

function PostsOrganzationPage() {
  const data = [
    {
      id: 1990,
      motherId: null,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "1990",
      areaId: null,
      weight: null,
    },
    {
      id: 1995,
      motherId: 2070,
      projectName: "خیابان اول ",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 1998,
      motherId: 2101,
      projectName: "خیابان دوم",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 1999,
      motherId: 1995,
      projectName: "خیابان دوم",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2062,
      motherId: 2066,
      projectName: "خیابان دوم",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2063,
      motherId: 2064,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2064,
      motherId: 2069,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "1",
      areaId: null,
      weight: null,
    },
    {
      id: 2065,
      motherId: 2062,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2066,
      motherId: 1990,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2067,
      motherId: 2069,
      projectName: "احداث طرح و میدان طالقانی",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2068,
      motherId: 2078,
      projectName: "test",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2069,
      motherId: 2101,
      projectName: "aqf",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2070,
      motherId: 2066,
      projectName: "asf",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 2073,
      motherId: 2070,
      projectName: "ها",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2074,
      motherId: 2066,
      projectName: "dffdfdf",
      projectCode: "undefined",
      areaId: null,
      weight: null,
    },
    {
      id: 2077,
      motherId: 2078,
      projectName: "esf",
      projectCode: "1",
      areaId: null,
      weight: null,
    },
    {
      id: 2078,
      motherId: 2079,
      projectName: "et",
      projectCode: "22",
      areaId: null,
      weight: null,
    },
    {
      id: 2079,
      motherId: 2098,
      projectName: "asf",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 2080,
      motherId: 2100,
      projectName: "qwd",
      projectCode: "1",
      areaId: null,
      weight: null,
    },
    {
      id: 2081,
      motherId: 2067,
      projectName: "",
      projectCode: "",
      areaId: null,
      weight: null,
    },
    {
      id: 2082,
      motherId: 2068,
      projectName: "qwd",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 2092,
      motherId: 2065,
      projectName: "",
      projectCode: "",
      areaId: null,
      weight: null,
    },
    {
      id: 2096,
      motherId: 2092,
      projectName: "qwf",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 2098,
      motherId: 2073,
      projectName: "we",
      projectCode: "3",
      areaId: null,
      weight: null,
    },
    {
      id: 2100,
      motherId: 2098,
      projectName: "yutytyrftrtrtrt",
      projectCode: "4521212",
      areaId: null,
      weight: null,
    },
    {
      id: 2101,
      motherId: 2074,
      projectName: "hybiuyuy",
      projectCode: "12",
      areaId: null,
      weight: null,
    },
    {
      id: 2103,
      motherId: 2100,
      projectName: "",
      projectCode: "",
      areaId: null,
      weight: null,
    },
    {
      id: 2104,
      motherId: 2070,
      projectName: "",
      projectCode: "",
      areaId: null,
      weight: null,
    },
    {
      id: 2105,
      motherId: 2069,
      projectName: "dfg",
      projectCode: "23",
      areaId: null,
      weight: null,
    },
  ];

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
          label={
            <OrganizationPostsOrgCard
              title={item.projectName}
              id={item.id}
              parentId={item.motherId || 0}
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
  return (
    <AdminLayout>
      {" "}
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
                  label={
                    <OrganizationPostsOrgCard
                      title={rootItem.projectName}
                      rootId={rootItem.id}
                      parentId={rootItem.motherId || 0}
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
    </AdminLayout>
  );
}

export default PostsOrganzationPage;
