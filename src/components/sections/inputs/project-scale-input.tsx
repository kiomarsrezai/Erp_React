import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import { budgetKindItems } from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useQuery } from "@tanstack/react-query";
import { programProjectApi } from "api/project/programs-project-api";
import { programProjectConfig } from "config/features/project/program-project-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function ProjectScaleInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm, showError } = props;
  // const userLicenses = userStore((state) => state.permissions);

  const scaleQuery = useQuery(
    ["project-scale"],
    () => programProjectApi.getScale()
    // {
    //   onSuccess: () => {
    //     if (value !== undefined && permissionForm) {
    //       const havePermission = checkHavePermission(
    //         userLicenses,
    //         [joinPermissions([accessNamesConfig.FIELD_AREA, value])],
    //         permissionForm
    //       );

    //       if (!havePermission) {
    //         setter((prevState: any) => ({
    //           ...prevState,
    //           [generalFieldsConfig.AREA]: undefined,
    //         }));
    //       }
    //     }
    //   },
    // }
  );

  const inputItems =
    scaleQuery.data?.data.map((item) => ({
      label: item.projectScaleName,
      value: item.id,
    })) || [];

  return (
    <FlotingLabelSelect
      label="مقیاس بودجه"
      name={programProjectConfig.scale}
      items={inputItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default ProjectScaleInput;
