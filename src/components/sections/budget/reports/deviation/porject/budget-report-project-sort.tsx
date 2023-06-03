import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportProjectSortForm from "./budget-report-project-sort-form";

interface BudgetReportProjectSortProps {
  tabRender?: ReactNode;
}

function BudgetReportProjectSort(props: BudgetReportProjectSortProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    year: undefined,
    area: undefined,
    kind: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد بودجه",
      name: "projectCode",
    },
    {
      title: "شرح ردیف",
      name: "projectName",
      align: "left",
    },

    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "منطقه",
      name: "area",
    },
    {
      title: "سهم",
      name: "share",
    },
    {
      title: "تجمیع",
      name: "sum",
    },
  ];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportProjectSortForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: [],
            footer: [{}],
          }}
        />
      ),
      colspan: 8,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      footer={[]}
      data={[]}
    />
  );
}

export default BudgetReportProjectSort;
