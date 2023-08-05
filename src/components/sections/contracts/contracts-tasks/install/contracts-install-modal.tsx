import FixedTable from "components/data/table/fixed-table";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  GetSingleSearchContractTaskInstallItemShape,
  GetSingleSearchContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";
import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { convertToCalenderDate } from "helper/date-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import AreaInput from "components/sections/inputs/area-input";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import ContractsInstallModal2 from "./contracts-install-modal-2";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import { globalConfig } from "config/global-config";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@mui/x-date-pickers";
import { add, format, newDate } from "date-fns-jalali";

interface Props {
  formData: any;
}

export default function ContractsInstallModal(props: Props) {
  const { formData } = props;

  const handleClickAddBtn = () => {
    setIsOpenInstallModal2(true);
  };

  const installQuery = useQuery(["get-install", formData.id], () =>
    contractsTasksApi.installRead({
      contractId: formData.id,
    })
  );

  const handleOpenAddMode = () => {
    setActionData({
      date: new Date(),
      amount: 0,
      month: 0,
      yearName: 0,
    });

    setActiveItemAction(undefined);
    setActionMode("add");
  };

  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton size="small" color="primary" onClick={handleClickAddBtn}>
            <MoreVertIcon sx={{ mr: -1.5 }} />
            <AddIcon />
          </IconButton>
          <IconButton size="small" color="primary" onClick={handleOpenAddMode}>
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "number",
      width: "100px",
    },
    {
      title: "تاریخ قسط",
      name: "dateShamsi",
      width: "300px",
    },
    {
      title: "مبلغ",
      name: "monthlyAmount",
      split: true,
      width: "300px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
    },
  ];

  // modal
  const [isOpenInstallModal2, setIsOpenInstallModal2] = useState(false);

  const handleDoneTask = () => {
    setIsOpenInstallModal2(false);
    installQuery.refetch();
  };

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);
  const [activeItemAction, setActiveItemAction] =
    useState<GetSingleSearchContractTaskInstallItemShape>();

  const deleteMutation = useMutation(contractsTasksApi.deleteInstall, {
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
      id: activeItemAction?.id,
    });
  };

  const handleClickDelete = (
    item: GetSingleSearchContractTaskInstallItemShape
  ) => {
    setActiveItemAction(item);
    setIsShowConfrimDelete(true);
  };

  // edit
  const [actionMode, setActionMode] = useState<"edit" | "add">();
  const handleClickEditBtn = (
    item: GetSingleSearchContractTaskInstallItemShape
  ) => {
    setActiveItemAction(item);
    setActionData({
      date: convertToCalenderDate(item.installmentsDate),
      amount: item.monthlyAmount,
      month: item.monthId,
      yearName: item.yearName,
    });
    setActionMode("edit");
  };

  const editMutation = useMutation(contractsTasksApi.updateInstall, {
    onSuccess() {
      cancelEdit();
      handleDoneTask();
    },
  });

  const addMutation = useMutation(contractsTasksApi.insertInstall, {
    onSuccess() {
      cancelEdit();
      handleDoneTask();
    },
  });

  const onSubmitEditFunctionality = () => {
    const initNewDate = add(new Date(actionData.date as any), {
      days: 1,
      months: -1,
    });
    const date = format(initNewDate, "yyyy/MM/dd");
    const [year, month, day] = date.split("/");
    if (actionMode === "edit") {
      editMutation.mutate({
        ...actionData,
        amount: Number(String(actionData.price).replaceAll(",", "")),
        date: newDate(Number(year), Number(month), Number(day)),
        id: activeItemAction?.id,
      });
    } else if (actionMode === "add") {
      addMutation.mutate({
        contractId: formData.id,
        date: newDate(Number(year), Number(month), Number(day)),
        amount: Number(String(actionData.price).replaceAll(",", "")),
        month: +month,
        yearName: +year,
      });
    }
  };

  const cancelEdit = () => {
    setActiveItemAction(undefined);
    setActionMode(undefined);
  };

  // add and update
  const [actionData, setActionData] = useState<any>({
    date: null,
    amount: 0,
    month: null,
    yearName: null,
  });

  const onChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setActionData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const monthlyAmountTextArea = (
    <NumericFormat
      customInput={TextField}
      id="price-request-input"
      label="مبلغ"
      variant="outlined"
      size="small"
      value={actionData.amount}
      name={"price"}
      onChange={onChange}
      allowLeadingZeros
      thousandSeparator=","
      fullWidth
    />
  );

  const dateTextArea = (
    <DatePicker
      value={new Date(actionData.date)}
      label="تاریخ شروع"
      onChange={(newValue: any) =>
        setActionData((state: any) => ({
          ...state,
          date: newValue,
        }))
      }
      slotProps={{
        textField: { size: "small", fullWidth: true },
      }}
    />
  );

  // add
  const addElements = {
    monthlyAmount: monthlyAmountTextArea,
    dateShamsi: dateTextArea,
    number: "افزودن",
    actions: () => actionButtons({} as any),
  };

  // data
  const actionButtons = (item: GetSingleSearchContractTaskInstallItemShape) => {
    return (
      <Stack direction="row" spacing={0.5} justifyContent={"center"}>
        {(item.id === activeItemAction?.id && actionMode === "edit") ||
        (actionMode === "add" && !item?.id) ? (
          <>
            <IconButton
              color="success"
              size="small"
              onClick={onSubmitEditFunctionality}
            >
              <CheckIcon />
            </IconButton>

            <IconButton color="error" size="small" onClick={cancelEdit}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
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
          </>
        )}
      </Stack>
    );
  };
  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskInstallItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      monthlyAmount:
        actionMode === "edit" && activeItemAction?.id === item.id
          ? monthlyAmountTextArea
          : item.monthlyAmount,
      dateShamsi:
        actionMode === "edit" && activeItemAction?.id === item.id
          ? dateTextArea
          : item.dateShamsi,
      number: i + 1,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(installQuery.data?.data || []);

  const finalTableData = [addElements, ...tableData];

  // footer
  const sumPrice = sumFieldsInSingleItemData(
    installQuery.data?.data,
    "monthlyAmount"
  );
  const tableFooter = {
    dateShamsi: null,
    "colspan-number": 2,
    number: "جمع",
    monthlyAmount: sumPrice,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={actionMode === "add" ? finalTableData : tableData}
        footer={tableFooter}
        notFixed
      />

      {/* modal */}
      <FixedModal
        open={isOpenInstallModal2}
        handleClose={() => setIsOpenInstallModal2(false)}
        maxWidth="sm"
        maxHeight="50%"
        title={
          "افزودن قسط به قرارداد شماره " + formData[contractsTasksConfig.number]
        }
      >
        <ContractsInstallModal2
          formData={formData}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>

      {/* delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        text={`آیا مایل به حذف قسط ${activeItemAction?.dateShamsi} هستید ؟`}
        title="حذف آیتم"
      />
    </>
  );
}
