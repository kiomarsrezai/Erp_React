import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  contractsTasksConfig,
  contractsTasksFormDefaultValue,
} from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsTasksForm from "components/sections/contracts/contracts-tasks/contracts-tasks-form";
import ContractTaskItemCard from "components/sections/contracts/contracts-tasks/contract-task-item-card";
import TabAreaContract from "components/sections/contracts/contracts-tasks/tabs/areas/tab-area-contract";
import { TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import ContractsPlacesLeftSection from "components/sections/contracts/contracts-tasks/contracts-places/contracts-places-left-section";
import ContractPlacesRightModal from "components/sections/contracts/contracts-tasks/contracts-places/contract-places-right-modal";
import FixedModal from "components/ui/modal/fixed-modal";

function ContractsPlaces() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "estateInfoName",
    },
    {
      title: "آدرس",
      name: "estateInfoAddress",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const handleDoneTask = () => {
    placesListQuery.refetch();
    setIsOpenActionModal(false);
  };

  // modal
  const [editInitData, setEditInitData] =
    useState<GetSingleContractPlacesItemShape>();
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);

  // actions
  const [activePlaceItem, setActivePlaceItem] =
    useState<GetSingleContractPlacesItemShape>();

  const openLeftSection = (item: GetSingleContractPlacesItemShape) => {
    setActivePlaceItem(item);
  };

  const handleClickDelete = (item: GetSingleContractPlacesItemShape) => {};

  const handleClickEditBtn = (item: GetSingleContractPlacesItemShape) => {
    setEditInitData(item);
    setIsOpenActionModal(true);
  };

  const actionButtons = (item: GetSingleContractPlacesItemShape) => (
    <Stack direction="row" spacing={0.5} justifyContent={"center"}>
      <IconButton
        size="small"
        color="error"
        onClick={() => handleClickDelete(item)}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleClickEditBtn(item)}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => openLeftSection(item)}
      >
        <ArrowCircleLeftIcon />
      </IconButton>
    </Stack>
  );

  // data
  const placesListQuery = useQuery(["all-places"], contractsPlacesApi.getData);

  const formatTableData = (
    unFormatData: GetSingleContractPlacesItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionButtons(item),
      bgcolor: activePlaceItem?.id === item.id ? "rgba(187,222,251)" : "",
    }));

    return formatedData;
  };

  const tableData = formatTableData(placesListQuery.data?.data || []);

  return (
    <>
      <AdminLayout>
        <Box display={"flex"}>
          <Box sx={{ width: "50%", borderRight: 1, borderColor: "grey.400" }}>
            <FixedTable data={tableData} heads={tableHeads} />
          </Box>
          {/* modal 2 */}
          <Box sx={{ width: "50%" }}>
            {activePlaceItem && (
              <ContractsPlacesLeftSection activePlaceItem={activePlaceItem} />
            )}
          </Box>
        </Box>
      </AdminLayout>

      {/* modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => {
          setIsOpenActionModal(false);
        }}
        title={editInitData?.estateInfoName}
        maxWidth="sm"
        maxHeight="50%"
      >
        <ContractPlacesRightModal
          onDoneTask={handleDoneTask}
          initialData={editInitData}
        />
      </FixedModal>
    </>
  );
}

export default ContractsPlaces;
