import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

import { useQuery } from "@tanstack/react-query";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import userStore from "hooks/store/user-store";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

interface AreaInputProps {
  setter: (prevData: any) => void;
  permissionForm?: string;
  value: number | undefined;
  showError?: boolean;
}

function ProctorInput(props: AreaInputProps) {
  const { setter, value, permissionForm, showError } = props;
  const userLicenses = userStore((state) => state.permissions);

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

  const inputItems = permissionForm
    ? filedItemsGuard(
        proctorItems,
        userLicenses,
        joinPermissions([permissionForm, accessNamesConfig.FIELD_PROCTOR])
      )
    : proctorItems;

  return (
    <FlotingLabelSelect
      label="متولی"
      name={abstructProctorConfig.PROCTOR}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default ProctorInput;
