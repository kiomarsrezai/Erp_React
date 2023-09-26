import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button } from "@mui/material";
import { globalConfig } from "config/global-config";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import ContractsPlacesLeftSection from "components/sections/contracts/contracts-tasks/contracts-places/contracts-places-left-section";
import ContractPlacesRightModal from "components/sections/contracts/contracts-tasks/contracts-places/contract-places-right-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import Grid from "@mui/material/Grid";
import AmlakKindInput from "components/sections/inputs/amlak-kind-input";

function ContractsPlaces() {
  // head group
  const [areaValue, setAreaValue] = useState<any>({
    amlakInfoKindId: undefined,
  });

  const tableHeadGroup = [
    {
      title: (
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item sm={4}>
            <AmlakKindInput
              value={areaValue.amlakInfoKindId as any}
              setter={setAreaValue}
            />
          </Grid>
        </Grid>
      ),
      colspan: 5,
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
      title: "نام",
      name: "estateInfoName",
    },

    {
      title: "آدرس",
      name: "estateInfoAddress",
      align: "left",
    },
    {
      title: "منطقه",
      name: "areaName",
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

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);

  const deleteMutation = useMutation(contractsPlacesApi.deleteRight, {
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
  const [activePlaceItem, setActivePlaceItem] =
    useState<GetSingleContractPlacesItemShape>();

  const openLeftSection = (item: GetSingleContractPlacesItemShape) => {
    setActivePlaceItem(item);
  };

  const handleClickDelete = (item: GetSingleContractPlacesItemShape) => {
    setEditInitData(item);
    setIsShowConfrimDelete(true);
  };

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

  const tableData = formatTableData(
    placesListQuery.data?.data.filter(
      (item) => item.amlakInfoKindId === areaValue.amlakInfoKindId
    ) || []
  );

  return (
    <>
      <AdminLayout>
        <Box display={"flex"}>
          <Box sx={{ width: "70%", borderRight: 1, borderColor: "grey.400" }}>
            <FixedTable
              data={tableData}
              heads={tableHeads}
              headGroups={tableHeadGroup}
            />
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
        title={editInitData?.estateInfoName || "افزودن"}
        maxWidth="sm"
        maxHeight="30%"
      >
        <ContractPlacesRightModal
          onDoneTask={handleDoneTask}
          initialData={editInitData}
        />
      </FixedModal>

      {/* delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        text={`آیا مایل به حذف ${editInitData?.estateInfoName} هستید ؟`}
        title="حذف آیتم"
      />
    </>
  );
}

export default ContractsPlaces;
