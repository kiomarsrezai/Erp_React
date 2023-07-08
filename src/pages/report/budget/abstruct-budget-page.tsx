import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import AbstructBudgetForm from "components/sections/report/abstruct-budget/abstruct-budget-form";

import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { abstructBudgetApi } from "api/report/abstruct-budget-api";
import { GetSingleAbstructBudgetItemShape } from "types/data/report/abstruct-budget-type";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { generalFieldsConfig } from "config/features/general-fields-config";

interface TableDataItemShape {
  number: ReactNode;
  areaName: ReactNode;
  mosavabRevenue: ReactNode;
  mosavabCurrent: ReactNode;
  mosavabCivil: ReactNode;
  mosavabFinancial: ReactNode;
  mosavabSanavati: ReactNode;
  mosavabPayMotomarkez: ReactNode;
  mosavabDar_Khazane: ReactNode;
  balanceMosavab: ReactNode;
  resoures: ReactNode;
  actions: (row: any) => ReactNode;
}

interface AbstructBudgetProps {
  tabRender?: ReactNode;
}

function AbstructBudgetPage(props: AbstructBudgetProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    [abstructBudgetConfig.YEAR]: undefined,
    // [abstructBudgetConfig.KIND]: 1, //undefined,
    // [abstructBudgetConfig.ORGAN]: 1, //undefined,
    [generalFieldsConfig.numbers]: 1,
  });

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "areaName",
      align: "left",
    },
    {
      title: "درآمد",
      name: "mosavabRevenue",
      split: true,
      align: "left",
    },
    {
      title: "سهم متمرکز",
      name: "mosavabPayMotomarkez",
      split: true,
      align: "left",
    },
    {
      title: "مصوب نیابتی",
      name: "mosavabNeyabati",
      split: true,
      align: "left",
    },
    {
      title: "دریافت از خزانه",
      name: "mosavabDar_Khazane",
      split: true,
      align: "left",
    },
    {
      title: "جمع منابع",
      name: "resoures",
      split: true,
      align: "left",
    },
    {
      title: "هزینه ای",
      name: "mosavabCurrent",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "هزینه ای",
      name: "percent_mosavabCurrent",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "تملک سرمایه ای",
      name: "mosavabCivil",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "تملک سرمایه ای",
      name: "percent_mosavabCivil",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "تملک مالی",
      name: "mosavabFinancial",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "تملک مالی",
      name: "percent_mosavabFinancial",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "دیون سنواتی",
      name: "mosavabSanavati",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "دیون سنواتی",
      name: "percent_mosavabSanavati",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "کنترل موازنه",
      name: "balanceMosavab",
      split: true,
      align: "left",
    },
  ];

  // table data
  const handleListClicked = (row: any) => {
    // setRecordId(row.id);
    // dataModalMutation.mutate(row.id);
    // setTitleModal(row["proctorName"]);
    // handleOpenModal();
  };

  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleListClicked(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const shouldShow = (data: GetSingleAbstructBudgetItemShape) => {
    return (
      data.mosavabCurrent ||
      data.mosavabRevenue ||
      data.mosavabCivil ||
      data.mosavabDar_Khazane ||
      data.mosavabSanavati ||
      data.mosavabFinancial ||
      data.mosavabPayMotomarkez
    );
  };
  const formatTableData = (
    unFormatData: GetSingleAbstructBudgetItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData
      .filter((item) => shouldShow(item))
      .map((item, i) => ({
        ...item,
        percent_mosavabCurrent: getPercent(item.mosavabCurrent, item.resoures),
        "textcolor-percent_mosavabCurrent":
          getPercent(item.mosavabCurrent, item.resoures) > 100 ? "red" : "",
        "textcolor-mosavabCurrent":
          getPercent(item.mosavabCurrent, item.resoures) > 100 ? "red" : "",
        percent_mosavabCivil: getPercent(item.mosavabCivil, item.resoures),
        percent_mosavabSanavati: getPercent(
          item.mosavabSanavati,
          item.resoures
        ),
        percent_mosavabFinancial: getPercent(
          item.mosavabFinancial,
          item.resoures
        ),
        number: i + 1,
      }));

    return formatedData;
  };

  const abstractQuery = useQuery(
    reactQueryKeys.report.abstruct.getData,
    () => abstructBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = abstractQuery.data
    ? formatTableData(abstractQuery.data.data)
    : [];

  // footer

  const sumMosavabNeyabatiShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabNeyabati",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );
  const sumMosavabCurrentShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCurrent",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabCivilShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCivil",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabFinancialShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabFinancial",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabRevenueShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabRevenue",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabDar_KhazaneShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabDar_Khazane",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabSanavatiShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabSanavati",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabPayMotomarkezShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabPayMotomarkez",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumBalanceMosavabShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "balanceMosavab",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumResourcesShahrdari = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "resoures",
    (item: GetSingleAbstructBudgetItemShape) => item.id <= 10
  );

  const sumMosavabCurrentSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCurrent",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );
  const sumMosavabNeyabatiSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabNeyabati",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabCivilSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCivil",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabFinancialSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabFinancial",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabRevenueSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabRevenue",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabDar_KhazaneSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabDar_Khazane",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabSanavatiSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabSanavati",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumMosavabPayMotomarkezSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabPayMotomarkez",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumBalanceMosavabSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "balanceMosavab",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  const sumResourcesSazman = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "resoures",
    (item: GetSingleAbstructBudgetItemShape) => item.id > 10
  );

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع شهرداری",
    "colspan-number": 2,
    areaName: null,
    mosavabNeyabati: sumMosavabNeyabatiShahrdari,
    mosavabCurrent: sumMosavabCurrentShahrdari,
    percent_mosavabCurrent: getPercent(
      sumMosavabCurrentShahrdari,
      sumResourcesShahrdari
    ),
    mosavabCivil: sumMosavabCivilShahrdari,
    percent_mosavabCivil: getPercent(
      sumMosavabCivilShahrdari,
      sumResourcesShahrdari
    ),
    mosavabFinancial: sumMosavabFinancialShahrdari,
    percent_mosavabFinancial: getPercent(
      sumMosavabFinancialShahrdari,
      sumResourcesShahrdari
    ),
    mosavabRevenue: sumMosavabRevenueShahrdari,
    mosavabDar_Khazane: sumMosavabDar_KhazaneShahrdari,
    mosavabSanavati: sumMosavabSanavatiShahrdari,
    percent_mosavabSanavati: getPercent(
      sumMosavabSanavatiShahrdari,
      sumResourcesShahrdari
    ),
    mosavabPayMotomarkez: sumMosavabPayMotomarkezShahrdari,
    balanceMosavab: sumBalanceMosavabShahrdari,
    resoures: sumResourcesShahrdari,
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: "جمع سازمان",
    "colspan-number": 2,
    areaName: null,
    mosavabNeyabati: sumMosavabNeyabatiSazman,
    mosavabCurrent: sumMosavabCurrentSazman,
    percent_mosavabCurrent: getPercent(
      sumMosavabCurrentSazman,
      sumResourcesSazman
    ),
    mosavabCivil: sumMosavabCivilSazman,
    percent_mosavabCivil: getPercent(sumMosavabCivilSazman, sumResourcesSazman),
    mosavabFinancial: sumMosavabFinancialSazman,
    percent_mosavabFinancial: getPercent(
      sumMosavabFinancialSazman,
      sumResourcesSazman
    ),
    mosavabRevenue: sumMosavabRevenueSazman,
    mosavabDar_Khazane: sumMosavabDar_KhazaneSazman,
    mosavabSanavati: sumMosavabSanavatiSazman,
    percent_mosavabSanavati: getPercent(
      sumMosavabSanavatiSazman,
      sumResourcesSazman
    ),
    mosavabPayMotomarkez: sumMosavabPayMotomarkezSazman,
    balanceMosavab: sumBalanceMosavabSazman,
    resoures: sumResourcesSazman,
  };

  const tableMoreBottomFooter: TableDataItemShape | any = {
    number: "جمع کل",
    "colspan-number": 2,
    areaName: null,
    mosavabNeyabati: sumMosavabNeyabatiSazman + sumMosavabNeyabatiShahrdari,
    mosavabCurrent: sumMosavabCurrentShahrdari + sumMosavabCurrentSazman,
    percent_mosavabCurrent: getPercent(
      sumMosavabCurrentShahrdari + sumMosavabCurrentSazman,
      sumResourcesShahrdari + sumResourcesSazman
    ),
    mosavabCivil: sumMosavabCivilShahrdari + sumMosavabCivilSazman,
    percent_mosavabCivil: getPercent(
      sumMosavabCivilShahrdari + sumMosavabCivilSazman,
      sumResourcesShahrdari + sumResourcesSazman
    ),
    mosavabFinancial: sumMosavabFinancialShahrdari + sumMosavabFinancialSazman,
    percent_mosavabFinancial: getPercent(
      sumMosavabFinancialShahrdari + sumMosavabFinancialSazman,
      sumResourcesShahrdari + sumResourcesSazman
    ),
    mosavabRevenue: sumMosavabRevenueShahrdari + sumMosavabRevenueSazman,
    mosavabDar_Khazane:
      sumMosavabDar_KhazaneShahrdari + sumMosavabDar_KhazaneSazman,
    mosavabSanavati: sumMosavabSanavatiShahrdari + sumMosavabSanavatiSazman,
    percent_mosavabSanavati: getPercent(
      sumMosavabSanavatiShahrdari + sumMosavabSanavatiSazman,
      sumResourcesShahrdari + sumResourcesSazman
    ),
    mosavabPayMotomarkez:
      sumMosavabPayMotomarkezShahrdari + sumMosavabPayMotomarkezSazman,
    balanceMosavab: sumBalanceMosavabShahrdari + sumBalanceMosavabSazman,
    resoures: sumResourcesShahrdari + sumResourcesSazman,
  };

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstructBudgetForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: tableData,
            footer: [tableFooter],
            bottomFooter: [tableBottomFooter],
            moreBottomFooter: [tableMoreBottomFooter],
          }}
        />
      ),
      colspan: 16,
    },
  ];

  return (
    // <AdminLayout>
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      footer={tableFooter}
      bottomFooter={tableBottomFooter}
      moreBottomFooter={tableMoreBottomFooter}
      data={tableData}
    />
    // </AdminLayout>
  );
}

export default AbstructBudgetPage;
