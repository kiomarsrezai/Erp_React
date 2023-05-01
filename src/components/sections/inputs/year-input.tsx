import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { yearGeneralApi } from "api/general/year-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

import userStore from "hooks/store/user-store";

interface YearInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
}

function YearInput(props: YearInputProps) {
  const { setter, value, permissionForm } = props;
  const userLicenses = userStore((state) => state.permissions);

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
      items={filedItemsGuard(
        yearItems,
        userLicenses,
        joinPermissions([permissionForm || "", accessNamesConfig.FIELD_YEAR])
      )}
      value={value}
      setter={setter}
    />
  );
}

export default YearInput;
