import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import {
  budgetMethodItems,
  generalFieldsConfig,
} from "config/features/general-fields-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
}

function BudgetMethodInput(props: BudgetMethodInputProps) {
  const { setter, value } = props;

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
