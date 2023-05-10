import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { yearGeneralApi } from "api/general/year-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

import userStore from "hooks/store/user-store";

interface YearInputProps {
  setter: (prevData: any) => void;
  value: number | undefined;
  permissionForm?: string;
  disabled?: boolean;
  level?: number;
  showError?: boolean;
}

function YearInput(props: YearInputProps) {
  const { setter, value, permissionForm, disabled, level, showError } = props;
  const userLicenses = userStore((state) => state.permissions);

  const yearQuery = useQuery(
    ["general-year", level || 1],
    () => yearGeneralApi.getData(level || 1),
    {
      onSuccess: () => {
        if (value !== undefined && permissionForm) {
          const havePermission = checkHavePermission(
            userLicenses,
            [joinPermissions([accessNamesConfig.FIELD_YEAR, value])],
            permissionForm
          );

          if (!havePermission) {
            setter((prevState: any) => ({
              ...prevState,
              [generalFieldsConfig.YEAR]: undefined,
            }));
          }
        }
      },
    }
  );

  const yearItems: FlotingLabelTextfieldItemsShape = yearQuery.data
    ? yearQuery.data.data.map((item) => ({
        label: item.yearName,
        value: item.id,
      }))
    : [];

  const inputItems = permissionForm
    ? filedItemsGuard(
        yearItems,
        userLicenses,
        joinPermissions([permissionForm, accessNamesConfig.FIELD_YEAR])
      )
    : yearItems;
  return (
    <FlotingLabelSelect
      label="سال"
      name={generalFieldsConfig.YEAR}
      items={inputItems}
      value={value}
      setter={setter}
      disabled={disabled}
      showError={showError}
    />
  );
}

export default YearInput;
