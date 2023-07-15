import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import SuppliersForm from "components/base/suppliers/suppliers-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { SuppliersShape } from "types/data/credit/suppliers-type";
import { suppliersApi } from "api/credit/suppliers-api";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { GetSingleDepartmanAcceptorItemShape } from "types/data/departman/departman-acceptor-type";
import AreaInput from "components/sections/inputs/area-input";
import { globalConfig } from "config/global-config";
import { generalFieldsConfig } from "config/features/general-fields-config";
import DepartmanAcceotorInput from "components/sections/inputs/departman/departman-acceptor-input";
import { departmanAcceptorConfig } from "config/features/departman/departman-acceptor-config";
import { Box } from "@mui/material";
import DepartmanAcceptorTable2 from "components/base/departman/departman-acceptor-table2";
import { enqueueSnackbar } from "notistack";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { UserApi } from "api/base/base-user";
import { UserItemShape } from "types/data/auth/users-type";
import UserModalUpdate from "components/sections/base/user/user-modal-update";
import FixedModal from "components/ui/modal/fixed-modal";

interface TableDataItemShape {
  number: ReactNode;
  name: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

function UserPage() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      //   width: "100px",
    },
    {
      title: "آیدی",
      name: "id",
    },
    {
      title: "نام کاربری",
      name: "userName",
    },
    {
      title: "نام",
      name: "firstName",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
    },
    {
      title: "مسئولیت",
      name: "bio",
      align: "left",
    },
    {
      title: "ایمیل",
      name: "email",
    },
    {
      title: "جنسیت",
      name: "genderName",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  //   actions
  const actionButtons = (item: UserItemShape) => {
    return (
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleOpenInsertModal(item)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    );
  };

  // data
  const formatTableData = (
    unFormatData: UserItemShape[]
  ): (SuppliersShape & TableDataItemShape)[] | any => {
    const formatedData: (SuppliersShape & TableDataItemShape)[] | any =
      unFormatData.map((item, i) => ({
        ...item,
        number: i + 1,
        actions: () => actionButtons(item),
      }));

    return formatedData;
  };

  const userListQuery = useQuery(["all-users"], UserApi.allUsers);

  const tableData = userListQuery.data
    ? formatTableData(userListQuery.data.data)
    : [];

  // modal
  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);
  const [activeRow, setActiveRow] = useState<UserItemShape>();
  const [insertModalTitle, setInsertModalTitle] = useState("");

  const handleOpenInsertModal = (item: UserItemShape) => {
    setInsertModalTitle(`${item.firstName} ${item.lastName}`);
    setActiveRow(item);
    setIsOpenInsertModal(true);
  };

  const handleCloseInsertModal = () => {
    setIsOpenInsertModal(false);
  };

  return (
    <>
      <AdminLayout>
        <FixedTable data={tableData} heads={tableHeads} />
      </AdminLayout>

      <FixedModal
        open={isOpenInsertModal}
        handleClose={handleCloseInsertModal}
        title={insertModalTitle}
        maxHeight="450px"
        minHeight="450px"
      >
        <UserModalUpdate initData={activeRow as any} />
      </FixedModal>
    </>
  );
}

export default UserPage;
