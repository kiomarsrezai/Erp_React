import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { yearGeneralApi } from "api/general/year-general-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import {
  budgetMethodItems,
  centerItems,
  generalFieldsConfig,
  organItems,
} from "config/features/general-fields-config";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { transferConfig } from "config/features/transfer/transfer-config";
import { AccessItemShape } from "types/access-type";

function usePermissions() {
  const formatApiFields = (
    label: string,
    name: string,
    labelFieldName: string,
    values: any[]
  ) => {
    return {
      label,
      name,
      value: values.map((item) => ({
        label: item[labelFieldName],
        name: item.id,
      })),
    };
  };

  const formatLocalFields = (label: string, name: string, values: any[]) => {
    return {
      label,
      name,
      value: values.map((item) => ({
        label: item.label,
        name: item.value,
      })),
    };
  };

  //   year
  const yearQuery = useQuery(["general-year"], yearGeneralApi.getData);

  const yearField: AccessItemShape = formatApiFields(
    "سال",
    generalFieldsConfig.YEAR,
    "yearName",
    yearQuery.data?.data || []
  );

  //   organ
  const organField = formatLocalFields(
    "سازمان",
    revenueChartFormConfig.ORGAN,
    organItems
  );

  //   budget method
  const budgetMethodField = formatLocalFields(
    "نوع بودجه",
    generalFieldsConfig.BUDGET_METHOD,
    budgetMethodItems
  );

  //   area
  const areaNumber2Query = useQuery(["general-area", 2], () =>
    areaGeneralApi.getData(2)
  );

  const areaNumber2Field: AccessItemShape = formatApiFields(
    "منطقه",
    generalFieldsConfig.AREA,
    "areaName",
    areaNumber2Query.data?.data || []
  );

  const ACCESS_CONFIG: AccessItemShape[] = [
    {
      label: "گزارش",
      name: revenueChartFormConfig.PAGE_NAME,
      value: [
        yearField,
        organField,
        formatLocalFields("مرکز", generalFieldsConfig.CENTER, centerItems),
        budgetMethodField,
        { label: "درآمد", name: revenueChartFormConfig.REVENUE },
        { label: "فروش اموال", name: revenueChartFormConfig.SALE },
        { label: "وام و اوراق", name: revenueChartFormConfig.LAON },
        { label: "نیابتی", name: revenueChartFormConfig.NIABATI },
      ],
    },
    {
      label: "بودجه",
      name: "budgetProposal",
      value: [yearField, areaNumber2Field, budgetMethodField],
    },

    {
      label: "بودجه تفکیکی",
      name: sepratorBudgetConfig.PAGE_NAME,
      value: [
        yearField,
        areaNumber2Field,
        budgetMethodField,
        {
          label: "دکمه تامین اعتبار",
          name: revenueChartFormConfig.TAMIN_ATBAR,
        },
      ],
    },
    {
      label: "متولی ها",
      name: abstructProctorConfig.PAGE_NAME,
      value: [yearField, areaNumber2Field],
    },
    {
      label: "واسط سازمان ها",
      name: transferConfig.PAGE_NAME,
      value: [yearField, areaNumber2Field, budgetMethodField],
    },
  ];

  return {
    loading: yearQuery.isLoading || areaNumber2Query.isLoading,
    data: ACCESS_CONFIG,
  };
}

export default usePermissions;
