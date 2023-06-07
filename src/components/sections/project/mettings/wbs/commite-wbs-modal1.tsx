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
  ];

  //   modal
  const [isOpenSearchUserModal, setIsOpenSearchUserModal] = useState(false);

  const commiteWbsInsertMutation = useMutation(mettingsProjectApi.wbsInsert, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      wbsDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    },
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
      colspan: 6,
    },
  ];

  const handleSelectUser = (user: any) => {
    commiteWbsInsertMutation.mutate({
      commiteDetailId: commiteDetailItem.id,
      userId: user.id,
    });
    setIsOpenSearchUserModal(false);
  };

  //   data
  const formatTableData = (
    unFormatData: GetSingleCommiteDetailWbsModalShape[]
  ): any[] => {
    const formatedData: any[] | any = unFormatData.map((item, i) => ({
      ...item,
      name: `${item.firstName} ${item.lastName}`,
      number: i + 1,
      // actions: () => actionButtons(item),
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

      <FixedModal
        open={isOpenSearchUserModal}
        handleClose={() => setIsOpenSearchUserModal(false)}
        title="افزودن شخص"
        maxWidth="md"
        maxHeight="70%"
      >
        <Box p={3}>
          <SelectUser onSelectUser={handleSelectUser} />
        </Box>
      </FixedModal>
    </>
  );
}

export default CommiteWbsModal1;
