import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { yearGeneralApi } from "api/general/year-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { generalFieldsConfig } from "config/features/general-fields-config";

interface YearInputProps {
  setter: (prevData: any) => void;
  value: number;
}

function YearInput(props: YearInputProps) {
  const { setter, value } = props;

  const yearQuery = useQuery(["general-year"], yearGeneralApi.getData, {
    onSuccess: (data) => {
      setter((prevState: any) => ({
        ...prevState,
        [generalFieldsConfig.YEAR]: data.data[0].id,
      }));
    },
  });

  const yearItems: FlotingLabelTextfieldItemsShape = yearQuery.data
    ? yearQuery.data.data.map((item) => ({
        label: item.yearName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="سال"
      name={generalFieldsConfig.YEAR}
      items={yearItems}
      value={value}
      setter={setter}
    />
  );
}

export default YearInput;
