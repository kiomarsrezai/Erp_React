import {
  budgetKindItems,
  budgetMethodItems,
  generalFieldsConfig,
  organItems,
} from "config/features/general-fields-config";
import { reactQueryKeys } from "config/react-query-keys-config";

export const checkHaveValue = (formData: any, names: string[]) => {
  let haveValue = true;
  names.forEach((name) => {
    if (formData[name] === undefined) {
      haveValue = false;
    }
  });

  return haveValue;
};

export const getGeneralFieldItem = (
  queryClient: any,
  formData: any,
  fields: [string, number?][]
) => {
  let result = "";

  fields.forEach((field) => {
    // year
    if (field[0] === generalFieldsConfig.YEAR) {
      const yearLabel = (
        queryClient.getQueryData([
          ...reactQueryKeys.generals.year,
          field[1],
        ]) as any
      )?.data.find(
        (item: any) => item?.id === formData[generalFieldsConfig.YEAR]
      );

      result = `${result} - سال ${yearLabel.yearName}`;
    }

    // budget method
    if (field[0] === generalFieldsConfig.BUDGET_METHOD) {
      const budgetMethodLabel =
        budgetMethodItems.find(
          (item) => item.value === formData[generalFieldsConfig.BUDGET_METHOD]
        )?.label || "";

      result = `${result} - ${budgetMethodLabel}`;
    }

    // kind method
    if (field[0] === generalFieldsConfig.kind) {
      const budgetKindLabel =
        budgetKindItems.find(
          (item) => item.value === formData[generalFieldsConfig.kind]
        )?.label || "";

      result = `${result} - ${budgetKindLabel}`;
    }

    // organ
    if (field[0] === generalFieldsConfig.ORGAN) {
      const organLabel =
        organItems.find(
          (item) => item.value === formData[generalFieldsConfig.ORGAN]
        )?.label || "";

      result = `${result} - ${organLabel}`;
    }

    // area
    if (field[0] === generalFieldsConfig.AREA) {
      const areaLabel = (
        queryClient.getQueryData([
          ...reactQueryKeys.generals.area,
          field[1],
        ]) as any
      )?.data.find(
        (item: any) => item.id === formData[generalFieldsConfig.AREA]
      );

      result = `${result} - ${areaLabel.areaName}`;
    }
  });

  return result.slice(2);
};
