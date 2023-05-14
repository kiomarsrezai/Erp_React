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
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";

interface YearInputProps {
  setter: (prevData: any) => void;
  value: number | undefined;
  permissionForm?: string;
  disabled?: boolean;
  level?: number;
  showError?: boolean;
}

function SuppliersInput(props: YearInputProps) {
  const { setter, value, disabled, showError } = props;

  const sippliersQuery = useQuery(
    ["general-suppliers"],
    () => suppliersApi.combo(),
    {
      onSuccess: () => {},
    }
  );

  const suppliersItems: FlotingLabelTextfieldItemsShape = sippliersQuery.data
    ? sippliersQuery.data.data.map((item) => ({
        label: item.companyKindName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="نوع"
      name={suppliersConfig.kind}
      items={suppliersItems}
      value={value}
      setter={setter}
      disabled={disabled}
      showError={showError}
    />
  );
}

export default SuppliersInput;
