import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AddIcon from "@mui/icons-material/Add";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import CreditRequestBudgetInsertRowModal from "./credit-request-budget-insert-row-modal";

interface TableDataItemShape {
  number: ReactNode;
  year: ReactNode;
  code: ReactNode;
  description: ReactNode;
  price: ReactNode;
}

function CreditRequestBudgetRowTable() {
  // select user modal
  const [isOpenAddBudgetModal, setIsOpenAddBudgetModal] = useState(false);

  // head group
  const headGroupBtn = (
    <IconButton color="primary" onClick={() => setIsOpenAddBudgetModal(true)}>
      <AddIcon />
    </IconButton>
  );

  const tableHeadGroup = [
    {
      title: headGroupBtn,
      colspan: 8,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "سال",
      name: "year",
    },
    {
      title: "کد بودجه",
      name: "code",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "price",
      align: "left",
      split: true,
    },
  ];

  // table data

  const data: TableDataItemShape[] = [
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
    {
      number: "1",
      description: "تست",
      code: "2134",
      price: 723864238,
      year: "1400/01/01",
    },
  ];

  return (
    <>
      <FixedTable
        headGroups={tableHeadGroup}
        heads={tableHeads}
        data={data}
        notFixed
      />
      <FixedModal
        open={isOpenAddBudgetModal}
        handleClose={() => setIsOpenAddBudgetModal(false)}
        title="افزودن ردیف بودجه"
      >
        <CreditRequestBudgetInsertRowModal />
      </FixedModal>
    </>
  );
}

export default CreditRequestBudgetRowTable;
