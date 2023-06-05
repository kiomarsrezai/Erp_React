import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AddIcon from "@mui/icons-material/Add";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import CreditRequestBudgetInsertRowModal from "./credit-request-budget-insert-row-modal";
import { useMutation } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";

interface TableDataItemShape {
  number: ReactNode;
  year: ReactNode;
  code: ReactNode;
  description: ReactNode;
  price: ReactNode;
}

interface CreditRequestBudgetRowTableProps {
  formData: any;
}

function CreditRequestBudgetRowTable(props: CreditRequestBudgetRowTableProps) {
  const { formData } = props;
  // select user modal
  const [isOpenAddBudgetModal, setIsOpenAddBudgetModal] = useState(false);

  const modalDataMutation = useMutation(creditRequestApi.budgetRowRead);

  const handleClickAdd = () => {
    modalDataMutation.mutate({
      [creditRequestConfig.year]: formData[creditRequestConfig.year],
      [creditRequestConfig.area]: formData[creditRequestConfig.area],
      [creditRequestConfig.execute_departman_id]:
        formData[creditRequestConfig.execute_departman_id],
    });
    setIsOpenAddBudgetModal(true);
  };
  // head group
  const headGroupBtn = (
    <IconButton color="primary" onClick={handleClickAdd}>
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
        loading={modalDataMutation.isLoading}
      >
        <CreditRequestBudgetInsertRowModal
          data={modalDataMutation.data?.data || []}
          formData={formData}
        />
      </FixedModal>
    </>
  );
}

export default CreditRequestBudgetRowTable;
