import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
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
import {
  GetSingleContractPlacesItemShape,
  GetSingleContractPlacesPrivateItemShape,
} from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import { contractsPlacesConfig } from "config/features/contracts/conreacts-places-config";
import FixedModal from "components/ui/modal/fixed-modal";
import ContractPlacesLeftModal from "./contract-places-left-modal";
import { enqueueSnackbar } from "notistack";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

interface Props {
  activePlaceItem: GetSingleContractPlacesItemShape;
}

function ContractsPlacesLeftSection(props: Props) {
  const { activePlaceItem } = props;

  // head group
  const tableHeadGroup = [
    {
      title: (
        <Typography
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={40}
        >
          {activePlaceItem.estateInfoName} - {activePlaceItem.estateInfoAddress}
        </Typography>
      ),
      colspan: 4,
    },
  ];

  // heads
  const handleClickAddBtn = () => {
    setEditInitData(undefined);
    setIsOpenActionModal(true);
  };

  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton size="small" color="primary" onClick={handleClickAddBtn}>
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "number",
    },
    {
      title: "مساحت",
      name: "masahat",
    },
    {
      title: "شماره",
      name: "numberGhorfe",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const handleDoneTask = () => {
    placesPrivateListQuery.refetch();
    setIsOpenActionModal(false);
  };

  // modal
  const [editInitData, setEditInitData] =
    useState<GetSingleContractPlacesPrivateItemShape>();
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);

  const deleteMutation = useMutation(contractsPlacesApi.deleteLeft, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setIsShowConfrimDelete(false);
      handleDoneTask();
    },
  });

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const onConfrimDelete = () => {
    deleteMutation.mutate({
      id: editInitData?.id,
    });
  };

  // actions
  const handleClickDelete = (item: GetSingleContractPlacesPrivateItemShape) => {
    setEditInitData(item);
    setIsShowConfrimDelete(true);
  };

  const handleClickEditBtn = (
    item: GetSingleContractPlacesPrivateItemShape
  ) => {
    setEditInitData(item);
    setIsOpenActionModal(true);
  };

  const actionButtons = (item: GetSingleContractPlacesPrivateItemShape) => (
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
    </Stack>
  );

  // data
  const placesPrivateListQuery = useQuery(
    ["all-places-places", activePlaceItem.id],
    () =>
      contractsPlacesApi.getLeftData({
        [contractsPlacesConfig.amlak]: activePlaceItem.id,
      })
  );

  const formatTableData = (
    unFormatData: GetSingleContractPlacesPrivateItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = formatTableData(placesPrivateListQuery.data?.data || []);

  return (
    <>
      <FixedTable
        data={tableData}
        heads={tableHeads}
        headGroups={tableHeadGroup}
      />

      {/* modal */}
      <FixedModal
        open={isOpenActionModal}
        handleClose={() => {
          setIsOpenActionModal(false);
        }}
        title={
          editInitData
            ? "ویرایش"
            : ` افزودن آیتم به ${activePlaceItem.estateInfoName} - ${activePlaceItem.estateInfoAddress} - ${activePlaceItem.areaName}`
        }
        maxWidth="sm"
        maxHeight="50%"
      >
        <ContractPlacesLeftModal
          onDoneTask={handleDoneTask}
          initialData={editInitData}
          baseId={activePlaceItem.id}
        />
      </FixedModal>

      {/* delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        text={`آیا مایل به حذف این آیتم هستید ؟`}
        title="حذف آیتم"
      />
    </>
  );
}

export default ContractsPlacesLeftSection;
