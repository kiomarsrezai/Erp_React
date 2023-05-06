import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

interface AreaInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  disabled?: boolean;
  level?: number;
}

function AreaInput(props: AreaInputProps) {
  const { setter, value, permissionForm, disabled, level } = props;

  const userLicenses = userStore((state) => state.permissions);

  const areaQuery = useQuery(
    ["general-area"],
    () => areaGeneralApi.getData(level || 2),
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

  const inputItems = permissionForm
    ? filedItemsGuard(
        areaItems,
        userLicenses,
        joinPermissions([permissionForm, accessNamesConfig.FIELD_AREA])
      )
    : areaItems;

  return (
    <FlotingLabelSelect
      label="منطقه"
      name={generalFieldsConfig.AREA}
      items={inputItems}
      value={value}
      setter={setter}
      disabled={disabled}
    />
  );
}

export default AreaInput;
