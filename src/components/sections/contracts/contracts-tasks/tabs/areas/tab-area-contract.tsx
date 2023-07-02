import { Box, IconButton, TextField } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import { useState } from "react";
import { TableHeadShape } from "types/table-type";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import TabAreaContractModal from "./tab-area-contract-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import {
  GetSingleSearchContractTaskAreaItemShape,
  GetSingleSearchContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface TabAreaContractProps {
  formData: any;
}
function TabAreaContract(props: TabAreaContractProps) {
  const { formData } = props;
  const [isOpenAreaModal, setIsOpenAreaModal] = useState(false);

  const tableHeads: TableHeadShape = [
    {
      name: "number",
      title: (
        <Box>
          ردیف
          <IconButton
            color="primary"
            onClick={() => setIsOpenAreaModal(true)}
            size="small"
          >
            <AddIcon />
          </IconButton>
        </Box>
      ),
      width: "60px",
    },
    {
      name: "areaName",
      title: "منطقه",
      align: "left",
    },
    {
      name: "shareAmount",
      title: "مبلغ",
      width: "160px",
      split: true,
    },
    {
      name: "actions",
      title: "عملیات",
      width: "90px",
    },
  ];

  // read area
  const queryClient = useQueryClient();
  const readAreaMutation = useMutation(contractsTasksApi.areaRead, {
    onSuccess(data) {
      queryClient.setQueryData(reactQueryKeys.contracts.tasks.getArea, data);
    },
  });

  // delete
  const [isShowConfrimDelete, setIsShowConfrimDelete] =
    useState<boolean>(false);
  const [idItemShouldDelete, setIdItemShouldDelete] = useState<number>();

  const [textDeleteModal, setTextDeleteModal] = useState("");

  const deleteMutation = useMutation(contractsTasksApi.areaDelete, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setIsShowConfrimDelete(false);
      readAreaMutation.mutate({
        id: formData.id,
      });
    },
  });

  const onConfrimDelete = () => {
    if (idItemShouldDelete) deleteMutation.mutate({ id: idItemShouldDelete });
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const handleDeleteClick = (row: GetSingleSearchContractTaskAreaItemShape) => {
    const deleteText = `آیا مایل به حذف ${row.areaName} هستید ؟`;
    setTextDeleteModal(deleteText);
    setIdItemShouldDelete(row.id);
    setIsShowConfrimDelete(true);
  };

  // edit
  const [activeEditIdItem, setActiveEditIdItem] = useState<number>();
  const [shareAmountEditValue, setShareAmountEditValue] = useState<number>();

  const editAreaMutation = useMutation(contractsTasksApi.areaEdit, {
    onSuccess() {
      setActiveEditIdItem(undefined);
      readAreaMutation.mutate({
        id: formData.id,
      });
    },
  });

  const handleEditClick = (item: GetSingleSearchContractTaskAreaItemShape) => {
    setShareAmountEditValue(item.shareAmount);
    setActiveEditIdItem(item.id);
  };

  const confrimEditClick = () => {
    editAreaMutation.mutate({
      id: activeEditIdItem,
      shareAmount: shareAmountEditValue,
    });
  };

  const renderShareAmount = (row: GetSingleSearchContractTaskAreaItemShape) => {
    if (row.id === activeEditIdItem) {
      return (
        <TextField
          id="code-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={shareAmountEditValue}
          onChange={(e) => setShareAmountEditValue(+e.target.value)}
          autoComplete="off"
          inputProps={{
            sx: {
              height: "17px",
            },
          }}
          fullWidth
        />
      );
    } else {
      return row.shareAmount;
    }
  };

  // actions
  const actionButtons = (item: GetSingleSearchContractTaskAreaItemShape) => {
    return (
      <Box>
        {activeEditIdItem === item.id ? (
          <>
            <IconButton color="success" size="small" onClick={confrimEditClick}>
              <CheckIcon />
            </IconButton>

            <IconButton
              color="error"
              size="small"
              onClick={() => setActiveEditIdItem(undefined)}
            >
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            {Number(areaQuery.data?.data?.length) > 1 && (
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(item)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            )}

            <IconButton
              size="small"
              onClick={() => handleEditClick(item)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
    );
  };

  // data
  const areaQuery = useQuery(
    reactQueryKeys.contracts.tasks.getArea,
    () => contractsTasksApi.areaRead({}),
    {
      enabled: false,
    }
  );

  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskAreaItemShape[]
  ) => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      shareAmount: () => renderShareAmount(item),
      number: i + 1,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = areaQuery.data ? formatTableData(areaQuery.data?.data) : [];

  // footer
  const sumShareAmount = sumFieldsInSingleItemData(
    areaQuery.data?.data,
    "shareAmount"
  );
  const tableFooter = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    shareAmount: sumShareAmount,
    actions: "",
  };

  return (
    <>
      <Box width={500}>
        <FixedTable
          data={tableData}
          heads={tableHeads}
          footer={tableFooter}
          notFixed
        />
      </Box>

      {/* area modal */}
      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
        title="افزودن منطقه"
        maxWidth="sm"
      >
        <TabAreaContractModal
          formData={formData}
          onClose={() => setIsOpenAreaModal(false)}
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

export default TabAreaContract;
