import { useQuery } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";
import { yearGeneralApi } from "api/general/year-general-api";
import { programProjectApi } from "api/project/programs-project-api";
import { accessNamesConfig } from "config/access-names-config";
import {
  budgetKindItems,
  budgetMethodItems,
  budgetReportItems,
  centerItems,
  organItems,
  trazKindItems,
} from "config/features/general-fields-config";
import { sidenavsLayout } from "config/features/layout-config";
import { getPermissionWithLevel } from "helper/auth-utils";
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

  const formatLocalFields: any = (label: string, name: string, values: any) => {
    return {
      label,
      name,
      ...(Array.isArray(values) && {
        value: values.map((item: any) =>
          formatLocalFields(item.label, item.name || item.value, item.value)
        ),
      }),
      // value: values.map((item: any) => ({
      //   label: item.label,
      //   name: item.value,
      // })),
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

  // program
  const programProjectQuery = useQuery(["program-list"], () =>
    programProjectApi.getProgramList()
  );

  const programProjectField: AccessItemShape = formatApiFields(
    "برنامه",
    accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
    "programName",
    programProjectQuery.data?.data || []
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

  const budgetField = formatLocalFields(
    "نوع گزارش",
    accessNamesConfig.BUDGET__REPORT_PAGE_COMBO,
    budgetReportItems
  );

  //   budget kind
  const budgetKindField = formatLocalFields(
    "نوع فرایند",
    accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
    budgetKindItems
  );

  // traz type
  const trazKindField = formatLocalFields(
    "نوع تراز",
    accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND,
    trazKindItems
  );

  // center
  const centerField = formatLocalFields(
    "مرکز",
    accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER,
    centerItems
  );

  //   area
  const areaNumber2Query = useQuery(["general-area", 2], () =>
    areaGeneralApi.getData(2)
  );

  const areaNumber1Query = useQuery(["general-area", 1], () =>
    areaGeneralApi.getData(1)
  );

  const areaNumber3Query = useQuery(["general-area", 3], () =>
    areaGeneralApi.getData(3)
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

  const areaNumber3Field: AccessItemShape = formatApiFields(
    "منطقه",
    accessNamesConfig.FIELD_AREA,
    "areaName",
    areaNumber3Query.data?.data || []
  );

  const accessValues = {
    // propsal
    [accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND]: formatLocalFields(
      "روند",
      accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
      [areaNumber3Field, budgetMethodField]
    ),
    [accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE]: formatLocalFields(
      "عملکرد",
      accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
      [yearLevel1Field, budgetMethodField, centerField, organField]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT]: formatLocalFields(
      "متولی",
      accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
      [yearLevel1Field]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY]: formatLocalFields(
      "خلاصه بودجه",
      accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
      [yearLevel1Field, budgetKindField, organField]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION]: formatLocalFields(
      "انحراف بودجه",
      accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
      [yearLevel1Field, areaNumber3Field]
    ),

    [accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE]: formatLocalFields(
      "مقیاس پروژه",
      accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
      [yearLevel1Field, areaNumber3Field]
    ),

    // abstruct
    [accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND]:
      budgetKindField,

    [accessNamesConfig.BUDGET__REPORT_PAGE_COMBO]: budgetField,
    // seprator
    [accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN]: {
      label: "دکمه تامین اعتبار",
      name: accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
    },

    // report

    [accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER]: centerField,

    [accessNamesConfig.FIELD_ORGAN]: organField,

    // taraz
    [accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND]: trazKindField,

    // program
    [accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM]: programProjectField,

    // global fileds
    [getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1)]: yearLevel1Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 2)]: yearLevel2Field,

    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 1)]: areaNumber1Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2)]: areaNumber2Field,
    [getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3)]: areaNumber3Field,

    [accessNamesConfig.FIELD_BUDGET_METHOD]: budgetMethodField,
  };

  const getAccessConfig = (items: SidenavShape[]) => {
    let renderedAccessConfig: AccessItemShape[] = [];
    items.forEach((item) => {
      if (!Array.isArray(item.items)) {
        renderedAccessConfig.push({
          label: item.title,
          name: item.licenseName || "1",
          value: [
            ...(item.permissionItems?.map((item) => accessValues[item]) || []),
          ],
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
