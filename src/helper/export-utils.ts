import {
  budgetKindItems,
  budgetMethodItems,
  generalFieldsConfig,
  numbersItems,
  organItems,
} from "config/features/general-fields-config";
import {
  reactQueryClient,
  reactQueryKeys,
} from "config/react-query-keys-config";

export const stimulDateValue = () => {
  return new Date().toLocaleDateString("fa-IR-u-nu-latn", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};
export const createStimulsoftFilePath = (name: string) => {
  return "/Stimulsoft/list/" + name;
};

export const getGeneralFieldItemYear = (formData: any, id: number) => {
  const yearLabel =
    (
      reactQueryClient.getQueryData([
        ...reactQueryKeys.generals.year,
        id,
      ]) as any
    )?.data.find((item: any) => item?.id === formData[generalFieldsConfig.YEAR])
      ?.yearName || "";

  return yearLabel;
};

export const getGeneralFieldItemBudgetKind = (formData: any) => {
  return (
    budgetKindItems.find(
      (item) => item.value === formData[generalFieldsConfig.kind]
    )?.label || ""
  );
};

export const getGeneralFieldItemNumber = (formData: any) => {
  return (
    numbersItems.find(
      (item) => item.value === formData[generalFieldsConfig.numbers]
    )?.label || ""
  );
};

export const getGeneralFieldItemBudgetMethod = (formData: any) => {
  const budgetMethodLabel =
    budgetMethodItems.find(
      (item) => item.value === formData[generalFieldsConfig.BUDGET_METHOD]
    )?.label || "";

  return budgetMethodLabel;
};
