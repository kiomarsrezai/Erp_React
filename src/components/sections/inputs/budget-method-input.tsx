import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { generalFieldsConfig } from "config/features/general-fields-config";

import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
}

function BudgetMethodInput(props: BudgetMethodInputProps) {
  const { setter, value } = props;

  const budgetMethodItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "درآمد/منابع",
      value: 1,
    },
    {
      label: "جاری / هزینه ای",
      value: 2,
    },
    {
      label: "عمرانی / سرمایه ای",
      value: 3,
    },
    {
      label: "مالی",
      value: 4,
    },
    {
      label: "دیون قطعی سنواتی",
      value: 5,
    },
  ];

  return (
    <FlotingLabelSelect
      label="نوع بودجه"
      name={generalFieldsConfig.BUDGET_METHOD}
      items={budgetMethodItems}
      value={value}
      setter={setter}
    />
  );
}

export default BudgetMethodInput;
