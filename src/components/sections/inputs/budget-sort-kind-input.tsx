import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { accessNamesConfig } from "config/access-names-config";
import {
  budgetKindItems,
  budgetSortKindItems,
} from "config/features/general-fields-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { useQuery } from "@tanstack/react-query";
import { programProjectApi } from "api/project/programs-project-api";
import { programProjectConfig } from "config/features/project/program-project-config";
import { budgetProjectSortConfig } from "config/features/budget/report/budget-project-sort-config";

interface BudgetMethodInputProps {
  setter: (prevData: any) => void;
  value: number;
  permissionForm?: string;
  showError?: boolean;
}

function BudgetSortKindInput(props: BudgetMethodInputProps) {
  const { setter, value, permissionForm, showError } = props;
  // const userLicenses = userStore((state) => state.permissions);

  const scaleQuery = useQuery(
    ["project-sort-kind-field"],
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

  return (
    <FlotingLabelSelect
      label="نوع نمایش"
      name={budgetProjectSortConfig.kind}
      items={budgetSortKindItems}
      value={value}
      setter={setter}
      showError={showError}
    />
  );
}

export default BudgetSortKindInput;
