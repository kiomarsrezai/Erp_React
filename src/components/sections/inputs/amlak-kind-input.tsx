import { useQuery } from "@tanstack/react-query";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { trazConfig } from "config/features/traz/traz-config";

interface AmlakKindInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
}

function AmlakKindInput(props: AmlakKindInputProps) {
  const { setter, value } = props;

  const amlakQuery = useQuery(["amlak-kind"], () =>
    contractsPlacesApi.getComboKind()
  );

  const inputItems =
    amlakQuery.data?.data.map((item) => ({
      label: item.amlakInfoKindName,
      value: item.id,
    })) || [];

  return (
    <FlotingLabelSelect
      label="نوع"
      name={trazConfig.kind}
      items={inputItems}
      value={value}
      setter={setter}
    />
  );
}

export default AmlakKindInput;
