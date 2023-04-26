import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { mettingsProjectConfig } from "config/features/project/meetings-project-config";
import { mettingsProjectApi } from "api/project/meetings-project-api";

interface YearInputProps {
  setter: (prevData: any) => void;
  value: number;
}

function CommiteInput(props: YearInputProps) {
  const { setter, value } = props;

  const commiteQuery = useQuery(
    ["commite-list"],
    mettingsProjectApi.getComiteList,
    {
      onSuccess: (data) => {
        setter((prevState: any) => ({
          ...prevState,
          [mettingsProjectConfig.commiteType]: data.data[0].id,
        }));
      },
    }
  );

  const commitesItems: FlotingLabelTextfieldItemsShape = commiteQuery.data
    ? commiteQuery.data.data.map((item) => ({
        label: item.commiteName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="کمیته"
      name={mettingsProjectConfig.commiteType}
      items={commitesItems}
      value={value}
      setter={setter}
    />
  );
}

export default CommiteInput;
