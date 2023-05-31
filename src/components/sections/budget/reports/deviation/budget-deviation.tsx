import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape } from "types/table-type";
import BudgetReportDeviationForm from "./budget-deviation-form";

interface BudgetReportDeviationProps {
  tabRender?: ReactNode;
}

function BudgetReportDeviation(props: BudgetReportDeviationProps) {
  const { tabRender } = props;
  const [formData, setFormData] = useState({});

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportDeviationForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
        />
      ),
      colspan: 16,
    },
  ];

  return (
    <FixedTable heads={[]} headGroups={tableHeadGroups} footer={{}} data={[]} />
  );
}

export default BudgetReportDeviation;
