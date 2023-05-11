import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { useQuery } from "@tanstack/react-query";
import { programProjectApi } from "api/project/programs-project-api";
import { programProjectConfig } from "config/features/project/program-project-config";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";

interface ProgramListInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function ProgramListInput(props: ProgramListInputProps) {
  const { setter, value, showError, permissionForm } = props;

  const userLicenses = userStore((state) => state.permissions);

  const programQuery = useQuery(
    ["program-list"],
    programProjectApi.getProgramList,
    {
      onSuccess: () => {
        if (value !== undefined && permissionForm) {
          const havePermission = checkHavePermission(
            userLicenses,
            [
              joinPermissions([
                accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
                value,
              ]),
            ],
            permissionForm
          );

          if (!havePermission) {
            setter((prevState: any) => ({
              ...prevState,
              [programProjectConfig.program]: undefined,
            }));
          }
        }
      },
    }
  );

  const programItems: FlotingLabelTextfieldItemsShape = programQuery.data
    ? programQuery.data.data.map((item) => ({
        label: item.programName,
        value: item.id,
      }))
    : [];

  const inputItems = permissionForm
    ? filedItemsGuard(
        programItems,
        userLicenses,
        joinPermissions([
          permissionForm,
          accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
        ])
      )
    : programItems;

  return (
    <FlotingLabelSelect
      label="برنامه"
      name={programProjectConfig.program}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default ProgramListInput;
