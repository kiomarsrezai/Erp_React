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
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { departmanAcceptorConfig } from "config/features/departman/departman-acceptor-config";

interface DepartmanAcceotorInputProps {
  setter: (prevData: any) => void;
  value: number | undefined;
  permissionForm?: string;
  disabled?: boolean;
  level?: number;
  showError?: boolean;
}

function DepartmanAcceotorInput(props: DepartmanAcceotorInputProps) {
  const { setter, value, disabled, showError } = props;

  const sippliersQuery = useQuery(["general-departman-acceptor"], () =>
    departmanAcceptorApi.getCombo()
  );

  const suppliersItems: FlotingLabelTextfieldItemsShape = sippliersQuery.data
    ? sippliersQuery.data.data.map((item) => ({
        label: item.departmentName,
        value: item.id,
      }))
    : [];

  return (
    <FlotingLabelSelect
      label="نوع"
      name={departmanAcceptorConfig.departman}
      items={suppliersItems}
      value={value}
      setter={setter}
      disabled={disabled}
      showError={showError}
    />
  );
}

export default DepartmanAcceotorInput;
