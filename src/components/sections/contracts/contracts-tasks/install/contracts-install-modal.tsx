import FixedTable from "components/data/table/fixed-table";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
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
import { Unstable_Grid2 as Grid } from "@mui/material";
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

  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          {!installQuery.data?.data.length && (
            <IconButton
              size="small"
              color="primary"
              onClick={handleClickAddBtn}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
      ),
      name: "number",
    },
    {
      title: "تاریخ قسط",
      name: "dateShamsi",
      width: "150px",
    },
    {
      title: "مبلغ",
      name: "monthlyAmount",
      width: "150px",
      split: true,
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
  const [isOpenEditMode, setIsOpenEditMode] = useState(false);
  const handleClickEditBtn = (
    item: GetSingleSearchContractTaskInstallItemShape
  ) => {
    setActiveItemAction(item);
    setIsOpenEditMode(true);
  };

  // data
  const actionButtons = (item: GetSingleSearchContractTaskInstallItemShape) => {
    return (
      <Stack direction="row" spacing={0.5} justifyContent={"center"}>
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
      </Stack>
    );
  };
  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskInstallItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(installQuery.data?.data || []);

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
        data={tableData}
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
