import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";

import { TableHeadShape } from "types/table-type";
import SepratorTaminModal from "./seprator-tamin-modal";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import { useMutation } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";

interface SepratorDetailModalProps {
  title: string;
  formdata: any;
}
function SepratorDetailModal(props: SepratorDetailModalProps) {
  const { title, formdata } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "id",
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
    <Button variant="contained" color="primary" onClick={handleTaminEtbarClick}>
      تامین اعتبار
    </Button>
  );
  const tableHeadGroup = [
    {
      title: headGroupBtn,
      colspan: 6,
    },
  ];

  return (
    <>
      <FixedTable heads={tableHeads} headGroups={tableHeadGroup} data={[]} />

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
