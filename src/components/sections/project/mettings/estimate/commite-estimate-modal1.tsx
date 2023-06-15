import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape } from "types/table-type";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleCommiteDetailEstimateModalShape,
  GetSingleCommiteDetailModalShape,
  GetSingleCommiteDetailWbsModalShape,
} from "types/data/project/commite-project-type";
import FixedModal from "components/ui/modal/fixed-modal";
import SelectUser from "components/sections/select-user";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
// import CommiteWbsModal2 from "./commite-wbs-modal2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { changeInputHandler } from "helper/form-utils";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { convertToCalenderDate } from "helper/date-utils";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface CommiteEstimateModal1Props {
  data: GetSingleCommiteDetailEstimateModalShape[];
  commiteDetailItem: GetSingleCommiteDetailModalShape;
}
function CommiteEstimateModal1(props: CommiteEstimateModal1Props) {
  const { data, commiteDetailItem } = props;

  const addClick = () => {
    setActionFormData({
      description: "",
      price: "",
      quantity: "",
    });
    setIsInsertMode((state) => !state);
    setActiveIdUpdate(null);
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
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "تعداد",
      name: "quantity",
      split: true,
      width: "150px",
      align: "left",
    },
    {
      title: "نرخ",
      name: "price",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "قیمت",
      align: "left",
      name: "amount",
      split: true,
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "150px",
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
    estimateDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    setIsOpenSearchUserModal(false);
    setIsOpenConfrimDelete(false);
    setActiveIdUpdate(null);
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

  const handleClickDelete = (row: GetSingleCommiteDetailEstimateModalShape) => {
    setTitleItemForDelete(`آیا مایل به حذف  ${row.description} هستید؟`);
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  const openEditFunctionality = (row: any) => {
    setEditFormData({
      description: row.description,
      dateStart: convertToCalenderDate(row.dateStart),
      dateEnd: convertToCalenderDate(row.dateEnd),
    });
    setActiveIdUpdate(row.id);
  };

  const closeEditFunctionality = () => {
    setActiveIdUpdate(null);
    setIsInsertMode(false);
  };

  //   delete
  const estimateDeleteMutation = useMutation(
    mettingsProjectApi.estimateDelete,
    {
      onSuccess: () => {
        onDoneTask();
      },
    }
  );

  const handleConfrimDelete = () => {
    estimateDeleteMutation.mutate({
      id: idItemForDelete,
    });
  };

  const updateWbsMutation = useMutation(mettingsProjectApi.wbsUpdate, {
    onSuccess: () => {
      onDoneTask();
    },
  });
  const onSubmitEditFunctionality = () => {
    updateWbsMutation.mutate({
      id: activeIdUpdate,
      ...editFormData,
    });
  };

  // action mode
  const [isInsertMode, setIsInsertMode] = useState(false);

  const insertMutation = useMutation(mettingsProjectApi.estimateInsert, {
    onSuccess: () => {
      estimateDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
      setIsInsertMode(false);
      setActiveIdUpdate(null);
    },
  });

  const updateMutation = useMutation(mettingsProjectApi.estimateUpdate, {
    onSuccess: () => {
      estimateDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
      setIsInsertMode(false);
      setActiveIdUpdate(null);
    },
  });

  const [actionFormData, setActionFormData] = useState<any>({
    description: "",
    price: "",
    quantity: "",
  });

  const clickActionDone = () => {
    if (isInsertMode) {
      insertMutation.mutate({
        ...actionFormData,
        commiteDetailId: commiteDetailItem.id,
      });
    } else {
      updateMutation.mutate({
        ...actionFormData,
        id: activeIdUpdate,
      });
    }
  };

  const onChange = (e: any) => {
    changeInputHandler(e, setActionFormData);
  };

  const actionItem = {
    number: isInsertMode ? "افزودن" : "ویرایش",
    description: (
      <TextField
        id="project-name-input"
        label=""
        variant="outlined"
        // type="number"
        size="small"
        name="description"
        value={actionFormData.description}
        onChange={onChange}
        autoComplete="off"
        fullWidth
      />
    ),
    quantity: (
      <TextField
        id="quantity-input"
        label=""
        variant="outlined"
        type="number"
        size="small"
        name="quantity"
        value={actionFormData.quantity}
        onChange={onChange}
        autoComplete="off"
        fullWidth
      />
    ),
    price: (
      <TextField
        id="price-input"
        label=""
        variant="outlined"
        type="number"
        size="small"
        name="price"
        value={actionFormData.price}
        onChange={onChange}
        autoComplete="off"
        fullWidth
      />
    ),
    actions: (
      <>
        <IconButton onClick={clickActionDone} color="primary" size="small">
          <CheckIcon />
        </IconButton>

        <IconButton
          onClick={closeEditFunctionality}
          color="primary"
          size="small"
        >
          <ClearIcon />
        </IconButton>
      </>
    ),
  };

  // actions
  const actionBtn = (row: GetSingleCommiteDetailEstimateModalShape) => (
    <Box display={"flex"} justifyContent={"center"}>
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
    </Box>
  );

  const [editFormData, setEditFormData] = useState<any>({
    description: "",
    dateStart: "",
    dateEnd: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputHandler(e, setEditFormData);
  };

  const formatTableData = (
    unFormatData: GetSingleCommiteDetailEstimateModalShape[]
  ): any[] => {
    const formatedData: any[] | any = unFormatData.map((item, i) => ({
      ...item,
      // dateStart: () => renderDateStart(item),
      // dateEnd: () => renderDateEnd(item),
      // description: () => renderDescription(item),
      // name: `${item.firstName} ${item.lastName}`,
      number: i + 1,
      actions: () => actionBtn(item),
    }));

    return formatedData;
  };

  const queryClient = useQueryClient();
  const estimateDataMutation = useMutation(
    mettingsProjectApi.estimateDataModal,
    {
      onSuccess(data) {
        queryClient.setQueryData(
          reactQueryKeys.project.mettings.getCommitesEstimateModal,
          data
        );
      },
    }
  );

  const estimateDataQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesEstimateModal,
    mettingsProjectApi.estimateDataModal,
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(estimateDataQuery.data?.data || data);
  const filteredData = [...(isInsertMode ? [actionItem] : []), ...tableData];

  // footer
  const sumAmount = sumFieldsInSingleItemData(data, "amount");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 4,
    description: null,
    quantity: null,
    price: null,
    amount: sumAmount,
    actions: <></>,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        // headGroups={tableHeadGroup}
        data={filteredData}
        footer={tableFooter}
        notFixed
      />

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

export default CommiteEstimateModal1;
