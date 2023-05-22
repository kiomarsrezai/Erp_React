import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";

interface AreaInputProps {
  setter: (prevData: any) => void;
  value: number | undefined;
}

function ProctorInput(props: AreaInputProps) {
  const { setter, value } = props;

  const areaQuery = useQuery(
    ["general-proctor-list"],
    () => abstructProctorApi.getProctorList(),
    {
      onSuccess: (data) => {
        // setter((prevState: any) => ({
        //   ...prevState,
        //   [abstructProctorConfig.PROCTOR]: data.data[0].id,
        // }));
      },
    }
  );

  const proctorItems: FlotingLabelTextfieldItemsShape = areaQuery.data
    ? areaQuery.data.data.map((item) => ({
        label: item.proctorName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="متولی"
      name={abstructProctorConfig.PROCTOR}
      items={proctorItems}
      value={value}
      setter={setter}
    />
  );
}

export default ProctorInput;
