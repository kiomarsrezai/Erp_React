import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";

import { TableHeadShape } from "types/table-type";

function SepratorDetailModal() {
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

  //   head group
  const headGroupBtn = (
    <Button variant="contained" color="primary">
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
    <FixedTable heads={tableHeads} headGroups={tableHeadGroup} data={[]} />
  );
}

export default SepratorDetailModal;
