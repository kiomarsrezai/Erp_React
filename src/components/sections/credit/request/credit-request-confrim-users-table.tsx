import FixedTable from "components/data/table/fixed-table";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ApprovalIcon from "@mui/icons-material/Approval";
import ClearIcon from "@mui/icons-material/Clear";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";

interface TableDataItemShape {
  number: ReactNode;
  firstName: ReactNode;
  lastName: ReactNode;
  responsibility: ReactNode;
  sendDate: ReactNode;
  confrimDate: ReactNode;
  description: ReactNode;
  actions: (row: any) => ReactNode;
}

function CreditRequestConfrimUsersTable() {
  // select user modal
  const [isOpenSearchUserModal, setIsOpenSearchUserModal] = useState(false);

  // head group
  const headGroupBtn = (
    <IconButton color="primary" onClick={() => setIsOpenSearchUserModal(true)}>
      <GroupAddIcon />
    </IconButton>
  );

  const tableHeadGroup = [
    {
      title: headGroupBtn,
      colspan: 8,
    },
  ];
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      align: "left",
      name: "firstName",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      align: "left",
    },
    {
      title: "مسئولیت",
      name: "responsibility",
      align: "left",
    },
    {
      title: "تاریخ ارسال",
      name: "sendDate",
    },
    {
      title: "تاریخ تایید",
      name: "confrimDate",
    },
    {
      title: "توضیحات",
      name: "description",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const actionButtons = (
    <>
      <IconButton color="primary" sx={{ position: "relative" }}>
        <ApprovalIcon />
        <ClearIcon
          color="error"
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      </IconButton>

      <IconButton color="primary">
        <ApprovalIcon />
      </IconButton>
    </>
  );

  const data: TableDataItemShape[] = [
    {
      number: "1",
      firstName: "علیرضا",
      lastName: "کثیرزارع",
      description: "تست",
      responsibility: "برنامه نویس فاوا",
      sendDate: "1400/01/01",
      confrimDate: "1400/01/01",
      actions: () => actionButtons,
    },
    {
      number: "1",
      firstName: "علیرضا",
      lastName: "کثیرزارع",
      description: "تست",
      responsibility: "برنامه نویس فاوا",
      sendDate: "1400/01/01",
      confrimDate: "1400/01/01",
      actions: () => actionButtons,
    },
    {
      number: "1",
      firstName: "علیرضا",
      lastName: "کثیرزارع",
      description: "تست",
      responsibility: "برنامه نویس فاوا",
      sendDate: "1400/01/01",
      confrimDate: "1400/01/01",
      actions: () => actionButtons,
    },
    {
      number: "1",
      firstName: "علیرضا",
      lastName: "کثیرزارع",
      description: "تست",
      responsibility: "برنامه نویس فاوا",
      sendDate: "1400/01/01",
      confrimDate: "1400/01/01",
      actions: () => actionButtons,
    },
    {
      number: "1",
      firstName: "علیرضا",
      lastName: "کثیرزارع",
      description: "تست",
      responsibility: "برنامه نویس فاوا",
      sendDate: "1400/01/01",
      confrimDate: "1400/01/01",
      actions: () => actionButtons,
    },
  ];

  return (
    <>
      <FixedTable
        headGroups={tableHeadGroup}
        heads={tableHeads}
        data={data}
        notFixed
      />
      <FixedModal
        open={isOpenSearchUserModal}
        handleClose={() => setIsOpenSearchUserModal(false)}
        title="افزودن تایید کننده"
      >
        <Box p={3}>
          <SelectUser onSelectUser={() => {}} />
        </Box>
      </FixedModal>
    </>
  );
}

export default CreditRequestConfrimUsersTable;
