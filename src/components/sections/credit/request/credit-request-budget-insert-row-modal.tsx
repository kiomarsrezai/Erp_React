import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AddIcon from "@mui/icons-material/Add";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { CreditReadRequestBudgetRowShape } from "types/data/credit/credit-request-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { useMutation } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";

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

interface CreditRequestBudgetInsertRowModalProps {
  data: CreditReadRequestBudgetRowShape[];
  formData: any;
}

function CreditRequestBudgetInsertRowModal(
  props: CreditRequestBudgetInsertRowModalProps
) {
  const { data, formData } = props;

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
      name: "yearName",
    },
    {
      title: "پروژه",
      name: "project",
    },
    {
      title: "مبلغ",
      name: "mosavabDepartment",
      align: "left",
      split: true,
    },
    // {
    //   title: "تعدیلات",
    //   name: "tadilat",
    //   align: "left",
    //   split: true,
    // },
    // {
    //   title: "نهایی",
    //   name: "final",
    //   align: "left",
    //   split: true,
    // },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const insertMutation = useMutation(creditRequestApi.budgetRowInsert);
  const handleInsertClick = (row: CreditReadRequestBudgetRowShape) => {
    insertMutation.mutate({
      RequestId: formData.id,
      BudgetDetailProjectAreaDepartmentId: row.id,
    });
  };
  const actionBtn = (row: CreditReadRequestBudgetRowShape) => (
    <IconButton color="primary" onClick={() => handleInsertClick(row)}>
      <AddIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: CreditReadRequestBudgetRowShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: () => actionBtn(item),
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavabDepartment");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 5,
    code: null,
    description: null,
    project: null,
    yearName: null,
    mosavabDepartment: sumMosavab,
    actions: "",
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default CreditRequestBudgetInsertRowModal;
