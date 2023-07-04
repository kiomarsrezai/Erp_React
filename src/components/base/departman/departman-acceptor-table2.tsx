import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SuppliersInput from "components/sections/inputs/suppliers-input";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useEffect, useState } from "react";
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";
import { checkHaveValue } from "helper/form-utils";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleDepartmanAcceptorItemShape,
  GetSingleDepartmanAcceptorTable2ItemShape,
} from "types/data/departman/departman-acceptor-type";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import FixedModal from "components/ui/modal/fixed-modal";
import DepartmanEmployeModal from "./departman-employe-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface DepartmanAcceptorTable2Props {
  data: GetSingleDepartmanAcceptorTable2ItemShape[];
  baseData: GetSingleDepartmanAcceptorItemShape;
}
function DepartmanAcceptorTable2(props: DepartmanAcceptorTable2Props) {
  const { data, baseData } = props;

  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  const modalDataMutation = useMutation(departmanAcceptorApi.getEmployeData);

  const addClick = () => {
    modalDataMutation.mutate({
      id: baseData.id,
    });
    setIsOpenInsertModal(true);
  };

  const quertClient = useQueryClient();
  const contractReadMutation = useMutation(departmanAcceptorApi.table2GetData, {
    onSuccess: (data) => {
      quertClient.setQueryData(reactQueryKeys.departman.aceptor.getEmploye, {
        data: data.data,
      });
    },
  });

  const handleDoneTask = () => {
    contractReadMutation.mutate({ id: baseData.id });
    setIsOpenInsertModal(false);
  };

  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton onClick={addClick} color="primary" size="small">
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "number",
      width: "100px",
    },
    {
      title: "نام",
      name: "firstName",
      align: "left",
      width: "300px",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      align: "left",
    },
    {
      title: "مسولیت",
      name: "resposibility",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      align: "left",
      width: "100px",
    },
  ];

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] =
    useState<boolean>(false);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState<number>();

  const [textDeleteModal, setTextDeleteModal] = useState("");

  const deleteMutation = useMutation(departmanAcceptorApi.deleteEmploye, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      // handleDoneActionTask();
      // setIsOpenEditModal(false);
      setIsShowConfrimDelete(false);
      handleDoneTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onConfrimDelete = () => {
    if (idItemShouldDelete) deleteMutation.mutate({ id: idItemShouldDelete });
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const handleDeleteBtnClick = (
    item: GetSingleDepartmanAcceptorTable2ItemShape
  ) => {
    const deleteText = `آیا مایل به حذف ${item.firstName}  ${item.firstName} هستید ؟`;
    setTextDeleteModal(deleteText);
    setIdItemShouldDelete(item.id);
    setIsShowConfrimDelete(true);
  };

  // actions
  const actionButtons = (item: GetSingleDepartmanAcceptorTable2ItemShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      <IconButton
        onClick={() => handleDeleteBtnClick(item)}
        color="error"
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorTable2ItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return (
    <>
      <FixedTable data={tableData} heads={tableHeads} notFixed />

      <FixedModal
        open={isOpenInsertModal}
        handleClose={() => setIsOpenInsertModal(false)}
        title="افزودن شخص"
      >
        <DepartmanEmployeModal
          data={modalDataMutation.data?.data || []}
          baseData={baseData}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        title="حذف آیتم"
        text={textDeleteModal}
      />
    </>
  );
}

export default DepartmanAcceptorTable2;
