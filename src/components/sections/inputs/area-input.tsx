import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { generalFieldsConfig } from "config/features/general-fields-config";

interface AreaInputProps {
  setter: (prevData: any) => void;
  value: number;
}

function AreaInput(props: AreaInputProps) {
  const { setter, value } = props;

  const areaQuery = useQuery(
    ["general-area"],
    () => areaGeneralApi.getData(2),
    {
      onSuccess: (data) => {
        setter((prevState: any) => ({
          ...prevState,
          [generalFieldsConfig.AREA]: data.data[0].id,
        }));
      },
    }
  );

  const areaItems: FlotingLabelTextfieldItemsShape = areaQuery.data
    ? areaQuery.data.data.map((item) => ({
        label: item.areaName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="منطقه"
      name={generalFieldsConfig.AREA}
      items={areaItems}
      value={value}
      setter={setter}
    />
  );
}

export default AreaInput;
