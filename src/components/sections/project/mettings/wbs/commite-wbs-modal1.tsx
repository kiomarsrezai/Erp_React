import { Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape } from "types/table-type";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleCommiteDetailModalShape,
  GetSingleCommiteDetailWbsModalShape,
} from "types/data/project/commite-project-type";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import CommiteWbsModal2 from "./commite-wbs-modal2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

interface CommiteWbsModal1Props {
  data: GetSingleCommiteDetailWbsModalShape[];
  commiteDetailItem: GetSingleCommiteDetailModalShape;
}
function CommiteWbsModal1(props: CommiteWbsModal1Props) {
  const { data, commiteDetailItem } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "اسم",
      name: "name",
      align: "left",
    },
    {
      title: "شرح",
      name: "description",
      split: true,
      align: "left",
    },
    {
      title: "مسولیت",
      name: "responsibility",
      split: true,
      align: "left",
    },
    {
      title: "تاریخ شروع",
      name: "dateStart",
      percent: true,
    },
    {
      title: "تاریخ پایان",
      align: "left",
      name: "dateEnd",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  //   modal
  const [isOpenSearchUserModal, setIsOpenSearchUserModal] = useState(false);

  const commiteWbsInsertMutation = useMutation(mettingsProjectApi.wbsInsert, {
    onSuccess: () => {},
  });

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton
          color="primary"
          onClick={() => setIsOpenSearchUserModal(true)}
        >
          <AddIcon />
        </IconButton>
      ),
      colspan: 7,
    },
  ];

  const onDoneTask = () => {
    wbsDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    setIsOpenSearchUserModal(false);
    setIsOpenConfrimDelete(false);
  };

  const handleSelectUser = async (users: any) => {
    // commiteWbsInsertMutation.mutate({
    //   commiteDetailId: commiteDetailItem.id,
    //   userId: user.id,
    // });
    // setIsOpenSearchUserModal(false);

    let shouldUpdateItems: any = [];
    for (const key in users) {
      const value = users?.[key];
      if (value === true) {
        shouldUpdateItems.push(+key);
      }
    }
    try {
      await Promise.all(
        shouldUpdateItems.map((item: any) => {
          return commiteWbsInsertMutation.mutateAsync({
            commiteDetailId: commiteDetailItem.id,
            userId: item,
          });
        })
      );
    } catch {
      return onDoneTask();
    }
    onDoneTask();
  };

  // edit
  const [isOpenConfrimDelete, setIsOpenConfrimDelete] = useState(false);
  const [idItemForDelete, setIdItemForDelete] = useState(0);
  const [titleItemForDelete, setTitleItemForDelete] = useState("");
  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);

  const handleClickDelete = (row: GetSingleCommiteDetailWbsModalShape) => {
    setTitleItemForDelete(
      `آیا مایل به حذف  ${row.firstName} ${row.lastName} هستید؟`
    );
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  const openEditFunctionality = (row: any) => {
    setActiveIdUpdate(row.id);
  };

  const closeEditFunctionality = () => {
    setActiveIdUpdate(null);
  };

  //   data
  const wbsDeleteMutation = useMutation(mettingsProjectApi.wbsDelete, {
    onSuccess: () => {
      onDoneTask();
    },
  });

  const handleConfrimDelete = () => {
    wbsDeleteMutation.mutate({
      id: idItemForDelete,
    });
  };

  const onSubmitEditFunctionality = () => {};

  const actionBtn = (row: GetSingleCommiteDetailWbsModalShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      {activeIdUpdate === row.id ? (
        <>
          <IconButton
            color="success"
            size="small"
            onClick={onSubmitEditFunctionality}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={closeEditFunctionality}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => openEditFunctionality(row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleClickDelete(row)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleCommiteDetailWbsModalShape[]
  ): any[] => {
    const formatedData: any[] | any = unFormatData.map((item, i) => ({
      ...item,
      name: `${item.firstName} ${item.lastName}`,
      number: i + 1,
      actions: () => actionBtn(item),
    }));

    return formatedData;
  };

  const wbsDataMutation = useMutation(mettingsProjectApi.wbsDataModal);

  const tableData = formatTableData(wbsDataMutation.data?.data || data);

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroup}
        data={tableData}
        notFixed
      />

      {/* add user modal */}
      <FixedModal
        open={isOpenSearchUserModal}
        handleClose={() => setIsOpenSearchUserModal(false)}
        title="افزودن شخص"
        maxWidth="md"
        maxHeight="70%"
      >
        <CommiteWbsModal2
          onSelectUser={handleSelectUser}
          ignoreItems={wbsDataMutation.data?.data || data}
        />
      </FixedModal>

      {/* delete  */}
      <ConfrimProcessModal
        onCancel={() => setIsOpenConfrimDelete(false)}
        onConfrim={handleConfrimDelete}
        text={titleItemForDelete}
        open={isOpenConfrimDelete}
      />
    </>
  );
}

export default CommiteWbsModal1;
