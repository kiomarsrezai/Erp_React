import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { TableHeadShape } from "types/table-type";
import SepratorTaminModal from "./seprator-tamin-modal";
import { ReactNode, useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import { useMutation } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorTaminItemShape,
} from "types/data/budget/seprator-type";

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
}
function SepratorDetailModal(props: SepratorDetailModalProps) {
  const { title, formdata, data } = props;

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
  const taminEtbarMutation = useMutation(sepratorBudgetApi.getTaminData);

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
        accessNamesConfig.SEPRATOR_BUDGET_PAGE,
        accessNamesConfig.SEPRATOR_BUDGET_PAGE__TAMIN_BTN,
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
  const handleIconClick = (row: TableDataItemShape) => {};

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

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroup}
        data={tableData}
        notFixed
      />

      <FixedModal
        open={taminModal}
        handleClose={handleCloseTaminModal}
        title={title}
        loading={taminEtbarMutation.isLoading}
      >
        <SepratorTaminModal data={taminEtbarMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default SepratorDetailModal;
