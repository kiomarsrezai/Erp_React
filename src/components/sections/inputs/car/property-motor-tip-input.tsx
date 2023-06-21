import { useQuery } from "@tanstack/react-query";
import { propertyMotorApi } from "api/property/property-motor-api";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { propertyMotorConfig } from "config/features/property/property-motor-config";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface propertMotorTipInputProps {
  setter: (prevData: any) => void;
  value: number;
  showError?: boolean;
}

function propertMotorTipInput(props: propertMotorTipInputProps) {
  const { setter, value, showError } = props;

  const kindQuery = useQuery(["cat-tip"], () => propertyMotorApi.tipCombo());

  const inputItems: FlotingLabelTextfieldItemsShape = kindQuery.data
    ? kindQuery.data.data.map((item) => ({
        label: item.tipeName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="تیپ ماشین"
      name={propertyMotorConfig.tip}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default propertMotorTipInput;
