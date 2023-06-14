import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape } from "types/table-type";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleCommiteDetailConfirmationModalShape,
  GetSingleCommiteDetailModalShape,
} from "types/data/project/commite-project-type";
import FixedModal from "components/ui/modal/fixed-modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import DeleteIcon from "@mui/icons-material/Delete";
import ApprovalIcon from "@mui/icons-material/Approval";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import CommiteConfirmationModal2 from "./commite-confirmation-modal2";
import userStore from "hooks/store/user-store";
import { reactQueryKeys } from "config/react-query-keys-config";

interface CommiteConfirmationModal1Props {
  data: GetSingleCommiteDetailConfirmationModalShape[];
  commiteDetailItem: GetSingleCommiteDetailModalShape;
}
function CommiteConfirmationModal1(props: CommiteConfirmationModal1Props) {
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
      title: "مسولیت",
      name: "resposibility",
      align: "left",
    },
    {
      title: "تاریخ تایید",
      name: "dateAcceptShamsi",
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  //   modal
  const [isOpenSearchUserModal, setIsOpenSearchUserModal] = useState(false);

  const commiteConfirmationInsertMutation = useMutation(
    mettingsProjectApi.confirmationInsert,
    {
      onSuccess: () => {},
    }
  );

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
    confirmationDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    setIsOpenSearchUserModal(false);
    setIsOpenConfrimDelete(false);
    setActiveIdUpdate(null);
  };

  const handleSelectUser = async (users: any) => {
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
          return commiteConfirmationInsertMutation.mutateAsync({
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

  const confirmationDeleteMutation = useMutation(
    mettingsProjectApi.confirmationDelete,
    {
      onSuccess: () => {
        onDoneTask();
      },
    }
  );

  const handleConfrimDelete = () => {
    confirmationDeleteMutation.mutate({
      id: idItemForDelete,
    });
  };

  const handleClickDelete = (
    row: GetSingleCommiteDetailConfirmationModalShape
  ) => {
    setTitleItemForDelete(
      `آیا مایل به حذف  ${row.firstName} ${row.lastName} هستید؟`
    );
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  // aprove
  const confirmationApproveMutation = useMutation(
    mettingsProjectApi.confirmationApprove,
    {
      onSuccess: () => {
        onDoneTask();
      },
    }
  );

  const handleClickApprove = (
    item: GetSingleCommiteDetailConfirmationModalShape
  ) => {
    confirmationApproveMutation.mutate({
      id: item.id,
    });
  };

  //   actions
  const userState = userStore();

  const actionBtn = (item: GetSingleCommiteDetailConfirmationModalShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      {!item.dateAccept && (
        <>
          <IconButton
            color="error"
            onClick={() => handleClickDelete(item)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>

          {userState.id === item.userId && (
            <IconButton
              color="primary"
              onClick={() => handleClickApprove(item)}
              size="small"
            >
              <ApprovalIcon />
            </IconButton>
          )}
        </>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleCommiteDetailConfirmationModalShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      name: `${item.firstName} ${item.lastName}`,
      dateAcceptShamsi: item.dateAccept ? item.dateAcceptShamsi : "",
      actions: () => actionBtn(item),
    }));

    return formatedData;
  };

  const queryClient = useQueryClient();
  const confirmationDataMutation = useMutation(
    mettingsProjectApi.confirmationDataModal,
    {
      onSuccess(data) {
        console.log(data);

        queryClient.setQueryData(
          reactQueryKeys.project.mettings.getCommitesConfirmationModal,
          data
        );
      },
    }
  );

  const confirmationDataQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesConfirmationModal,
    mettingsProjectApi.confirmationDataModal,
    {
      enabled: false,
    }
  );

  const formatedData = confirmationDataQuery.data?.data || data;

  const tableData = formatTableData(formatedData);

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
        <CommiteConfirmationModal2
          onSelectUser={handleSelectUser}
          ignoreItems={confirmationDataMutation.data?.data || data}
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

export default CommiteConfirmationModal1;
