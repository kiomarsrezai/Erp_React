import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { yearGeneralApi } from "api/general/year-general-api";
import { accessNamesConfig } from "config/access-names-config";
import {
  budgetMethodItems,
  centerItems,
  organItems,
  trazKindItems,
} from "config/features/general-fields-config";
import { sidenavsLayout } from "config/features/layout-config";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { AccessItemShape } from "types/access-type";
import { SidenavShape } from "types/layout-type";

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
  const yearLevel1Query = useQuery(["general-year", 1], () =>
    yearGeneralApi.getData(1)
  );

  const yearLevel2Query = useQuery(["general-year", 2], () =>
    yearGeneralApi.getData(2)
  );

  const yearLevel1Field: AccessItemShape = formatApiFields(
    "سال",
    accessNamesConfig.FIELD_YEAR,
    "yearName",
    yearLevel1Query.data?.data || []
  );

  const yearLevel2Field: AccessItemShape = formatApiFields(
    "سال",
    accessNamesConfig.FIELD_YEAR,
    "yearName",
    yearLevel2Query.data?.data || []
  );

  // organ
  const organField = formatLocalFields(
    "سازمان",
    accessNamesConfig.FIELD_ORGAN,
    organItems
  );

  //   budget method
  const budgetMethodField = formatLocalFields(
    "نوع بودجه",
    accessNamesConfig.FIELD_BUDGET_METHOD,
    budgetMethodItems
  );

  // traz type
  const trazKindField = formatLocalFields(
    "نوع تراز",
    accessNamesConfig.FINANCIAL__TARAZ_PAGE__KIND,
    trazKindItems
  );

  //   area
  const areaNumber2Query = useQuery(["general-area", 2], () =>
    areaGeneralApi.getData(2)
  );

  const areaNumber1Query = useQuery(["general-area", 1], () =>
    areaGeneralApi.getData(1)
  );

  const areaNumber1Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber1Query.data?.data || []
  );

  const areaNumber2Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber2Query.data?.data || []
  );

  // const ACCESS_CONFIG: AccessItemShape[] = [
  //   {
  //     label: "گزارش",
  //     name: accessNamesConfig.REVENUE_CHART_PAGE,
  //     value: [
  //       yearLevel1Field,
  //       organField,
  //       formatLocalFields(
  //         "مرکز",
  //         accessNamesConfig.REVENUE_CHART_PAGE__CENTER,
  //         centerItems
  //       ),
  //       budgetMethodField,
  //     ],
  //   },
  //   {
  //     label: "بودجه",
  //     name: accessNamesConfig.BUDGET_PROPOSAL_PAGE,
  //     value: [yearLevel1Field, areaNumber1Field, budgetMethodField],
  //   },
  //   {
  //     label: "بودجه تفکیکی",
  //     name: accessNamesConfig.SEPRATOR_BUDGET_PAGE,
  //     value: [
  //       yearLevel1Field,
  //       areaNumber2Field,
  //       budgetMethodField,
  //       {
  //         label: "دکمه تامین اعتبار",
  //         name: accessNamesConfig.SEPRATOR_BUDGET_PAGE__TAMIN_BTN,
  //       },
  //     ],
  //   },
  //   {
  //     label: "کدینگ بودجه",
  //     name: accessNamesConfig.BUDGET_CODING_PAGE,
  //     value: [budgetMethodField],
  //   },
  //   {
  //     label: "متولی ها",
  //     name: accessNamesConfig.ABSTRUCT_PROCTOR_PAGE,
  //     value: [yearLevel1Field],
  //   },
  //   {
  //     label: "واسط کدینگ",
  //     name: accessNamesConfig.TRANSFER_PAGE,
  //     value: [yearLevel1Field, areaNumber2Field, budgetMethodField],
  //   },
  //   {
  //     label: "درخواست اعتبار",
  //     name: accessNamesConfig.CREDIT_REQUEST_PAGE,
  //   },
  //   {
  //     label: "دسترسی ها",
  //     name: accessNamesConfig.ACCESS_PAGE,
  //   },
  //   {
  //     label: "پروژه ها",
  //     name: accessNamesConfig.PROJECT_ORG_PAGE,
  //   },
  //   {
  //     label: "جلسات",
  //     name: accessNamesConfig.PROJECT_MEETINGS_PAGE,
  //   },
  //   {
  //     label: "ساختار",
  //     name: accessNamesConfig.ORGANIZATION_POSTS_PAGE,
  //     value: [areaNumber2Field],
  //   },
  //   {
  //     label: "تراز",
  //     name: accessNamesConfig.TRAZ_PAGE,
  //     value: [yearLevel2Field, areaNumber2Field, trazKindField],
  //   },
  // ];

  const accessValues = {
    // global fileds
    [`${accessNamesConfig.FIELD_YEAR}-1`]: yearLevel1Field,
    [`${accessNamesConfig.FIELD_YEAR}-2`]: yearLevel2Field,

    [`${accessNamesConfig.FIELD_AREA}-1`]: areaNumber1Field,
    [`${accessNamesConfig.FIELD_AREA}-2`]: areaNumber2Field,

    [accessNamesConfig.FIELD_BUDGET_METHOD]: budgetMethodField,
  };

  const getAccessConfig = (items: SidenavShape[]) => {
    let renderedAccessConfig: AccessItemShape[] = [];
    items.forEach((item) => {
      if (!Array.isArray(item.items)) {
        renderedAccessConfig.push({
          label: item.title,
          name: item.licenseName || "1",
          value: [],
        });
      } else {
        renderedAccessConfig = [
          ...renderedAccessConfig,
          ...getAccessConfig(item.items),
        ];
      }
    });

    return renderedAccessConfig;
  };

  const ACCESS_CONFIG: AccessItemShape[] = getAccessConfig(sidenavsLayout);

  return {
    loading:
      yearLevel1Query.isLoading ||
      areaNumber2Query.isLoading ||
      yearLevel2Query.isLoading ||
      areaNumber1Query.isLoading,
    data: ACCESS_CONFIG,
  };
}

export default usePermissions;
