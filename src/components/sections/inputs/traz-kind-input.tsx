import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { trazConfig } from "config/features/traz/traz-config";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface TrazKindInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
}

function TrazKindInput(props: TrazKindInputProps) {
  const { setter, value } = props;

  const trazKindItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "درآمد",
      value: 1,
    },
    {
      label: "هزینه",
      value: 2,
    },
    {
      label: "درآمد و هزینه",
      value: 3,
    },
    {
      label: "حساب های دائمی",
      value: 4,
    },
  ];

  return (
    <FlotingLabelSelect
      label="نوع تراز"
      name={trazConfig.kind}
      items={trazKindItems}
      value={value}
      setter={setter}
    />
  );
}

export default TrazKindInput;
