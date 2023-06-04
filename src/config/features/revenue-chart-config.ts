import { generalFieldsConfig } from "./general-fields-config";

export const revenueChartFormConfig = {
  YEAR: generalFieldsConfig.YEAR,
  CENTER: "centerId",
  ORGAN: generalFieldsConfig.ORGAN,
  BUDGET_METHOD: generalFieldsConfig.BUDGET_METHOD,
  REVENUE: "revenue",
  SALE: "sale",
  LAON: "loan",
  NIABATI: "niabati",
  PAGE_NAME: "reportChartRevenue",
  TAMIN_ATBAR: "tamin-atbar",
  coding: "codingId",
  area: generalFieldsConfig.AREA,
};

export const REVENUE_CHART_URL = "ReportApi/ChartApi";
export const DETAIL_REVENUE_CHART_URL = "BudSepApi/DetailChartApi";
