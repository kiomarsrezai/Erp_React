import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";

interface TableDataItemShape {
  number: ReactNode;
  year: ReactNode;
  description: ReactNode;
  price: ReactNode;
  code: ReactNode;
  final: ReactNode;
  tadilat: ReactNode;
  actions: (row: any) => ReactNode;
}

function CreditRequestBudgetInsertRowModal() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد بودجه",
      name: "code",
    },
    {
      title: "شرح ردیف",
      name: "description",
      align: "left",
    },
    {
      title: "سال",
      name: "year",
    },
    {
      title: "مبلغ",
      name: "price",
      align: "left",
      split: true,
    },
    {
      title: "تعدیلات",
      name: "tadilat",
      align: "left",
      split: true,
    },
    {
      title: "نهایی",
      name: "final",
      align: "left",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const actionBtn = () => (
    <IconButton color="primary" onClick={() => {}}>
      <CheckIcon />
    </IconButton>
  );

  const data: TableDataItemShape[] = [
    {
      number: "1",
      description: "تست",
      code: "2134",
      tadilat: 723864238,
      final: 723864238,
      price: 723864238,
      year: "1400/01/01",
      actions: actionBtn,
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      tadilat: 723864238,
      final: 723864238,
      price: 723864238,
      year: "1400/01/01",
      actions: actionBtn,
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      tadilat: 723864238,
      final: 723864238,
      price: 723864238,
      year: "1400/01/01",
      actions: actionBtn,
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      tadilat: 723864238,
      final: 723864238,
      price: 723864238,
      year: "1400/01/01",
      actions: actionBtn,
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      tadilat: 723864238,
      final: 723864238,
      price: 723864238,
      year: "1400/01/01",
      actions: actionBtn,
    },
  ];

  return <FixedTable heads={tableHeads} data={data} notFixed />;
}

export default CreditRequestBudgetInsertRowModal;
