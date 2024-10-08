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
      amount: "",
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
      width: "100px",
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
      width: "100px",
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
      title: "مبلغ برآورد",
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
  const onDoneTask = () => {
    estimateDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    setIsOpenConfrimDelete(false);
    setActiveIdUpdate(null);
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
    setActionFormData({
      description: row.description,
      price: row.price,
      quantity: row.quantity,
      amount: row.amount,
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
    amount: "",
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
        multiline
        size="small"
        name="description"
        value={actionFormData.description}
        onChange={onChange}
        autoComplete="off"
        inputProps={{
          sx: {
            height: "17px",
          },
        }}
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
        inputProps={{
          sx: {
            height: "17px",
          },
        }}
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
        inputProps={{
          sx: {
            height: "17px",
          },
        }}
        fullWidth
      />
    ),
    amount: actionFormData.amount,
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

  const formatTableData = (
    unFormatData: GetSingleCommiteDetailEstimateModalShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => {
      if (activeIdUpdate === item.id) {
        return actionItem;
      } else {
        return {
          ...item,
          number: i + 1,
          actions: () => actionBtn(item),
        };
      }
    });

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
