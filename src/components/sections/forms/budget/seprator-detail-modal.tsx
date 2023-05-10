import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowLoading from "components/ui/loading/window-loading";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorTaminModal from "./seprator-tamin-modal";
import SectionGuard from "components/auth/section-guard";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { GetSingleDetailSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  date: ReactNode;
  description: ReactNode;
  amount: ReactNode;
  actions: (row: TableDataItemShape) => ReactNode;
}

interface SepratorDetailModalProps {
  title: string;
  formdata: any;
  data: any[];
  coding: number;
}
function SepratorDetailModal(props: SepratorDetailModalProps) {
  const { title, formdata, data, coding } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره",
      name: "code",
    },
    {
      title: "تاریخ",
      name: "date",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "amount",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // tamin modal
  const queryClient = useQueryClient();
  const taminEtbarMutation = useMutation(sepratorBudgetApi.getTaminData, {});

  const removeMutation = useMutation(sepratorBudgetApi.removeTamin, {
    onSuccess() {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });

      sepratorDetailMutation.mutate({
        ...formdata,
        [sepratorBudgetConfig.CODING]: coding,
      });
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

  const sepratorDetailMutation = useMutation(sepratorBudgetApi.getDetail, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.report.proctor.getDetailData,
        data
      );
    },
  });

  const onDoneTask = () => {
    handleCloseTaminModal();
    sepratorDetailMutation.mutate({
      ...formdata,
      [sepratorBudgetConfig.CODING]: coding,
    });
  };

  const [taminModal, setTaminModal] = useState(false);
  const handleOpenTaminModal = () => {
    setTaminModal(true);
  };

  const handleCloseTaminModal = () => {
    setTaminModal(false);
  };

  const handleTaminEtbarClick = () => {
    handleOpenTaminModal();
    taminEtbarMutation.mutate(formdata);
  };

  // head group
  const headGroupBtn = (
    <SectionGuard
      permission={joinPermissions([
        accessNamesConfig.BUDGET__SEPRATOR_PAGE,
        accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
      ])}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleTaminEtbarClick}
      >
        تامین اعتبار
      </Button>
    </SectionGuard>
  );
  const tableHeadGroup = [
    {
      title: headGroupBtn,
      colspan: 6,
    },
  ];

  // data
  const [removeItemId, setRemoveItemId] = useState<null | number>(null);
  const [confrimRemoveText, setConfrimRemoveText] = useState<string>("");

  const onConfrimDeleteModal = () => {
    removeMutation.mutate(removeItemId as number);
    onCancelDeleteModal();
  };
  const onCancelDeleteModal = () => {
    setRemoveItemId(null);
  };
  const handleIconClick = (row: any) => {
    const text = `آیا مایل به حذف کردن ردیف ${row.description} هستید ؟`;
    setConfrimRemoveText(text);
    setRemoveItemId(row.id);
  };

  const actionButton = (row: TableDataItemShape) => (
    <IconButton size="small" color="error" onClick={() => handleIconClick(row)}>
      <DeleteIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleDetailSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      amount: item.estimateAmount,
      code: item.number,
      date: item.date,
      description: item.description,
      actions: actionButton,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    amount: sumFieldsInSingleItemData(data, "estimateAmount"),
    code: null,
    date: null,
    description: null,
    actions: "" as any,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroup}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      {/* tamin modal */}
      <FixedModal
        open={taminModal}
        handleClose={handleCloseTaminModal}
        title={title}
        loading={taminEtbarMutation.isLoading}
      >
        <SepratorTaminModal
          data={taminEtbarMutation.data?.data || []}
          formData={formdata}
          coding={coding}
          onDoneTask={onDoneTask}
        />
      </FixedModal>

      {/* remove detail item modal*/}
      <ConfrimProcessModal
        open={removeItemId !== null}
        onCancel={onCancelDeleteModal}
        onConfrim={onConfrimDeleteModal}
        text={confrimRemoveText}
      />

      {/* lodaing */}
      <WindowLoading
        active={sepratorDetailMutation.isLoading || removeMutation.isLoading}
      />
    </>
  );
}

export default SepratorDetailModal;
