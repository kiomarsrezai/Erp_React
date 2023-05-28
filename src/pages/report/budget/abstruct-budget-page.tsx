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
    [abstructBudgetConfig.KIND]: undefined,
    [abstructBudgetConfig.ORGAN]: undefined,
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
      title: "سرمایه ای",
      name: "mosavabCivil",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "سرمایه ای",
      name: "percent_mosavabCivil",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "مالی",
      name: "mosavabFinancial",
      split: true,
      align: "left",
      colspan: 2,
    },
    {
      title: "مالی",
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
      title: "مانده",
      name: "balanceMosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
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
        actions: actionButtons,
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

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstructBudgetForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={tableData}
        />
      ),
      colspan: 16,
    },
  ];

  // footer
  const sumMosavabCurrent = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCurrent"
  );

  const sumMosavabCivil = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabCivil"
  );

  const sumMosavabFinancial = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabFinancial"
  );

  const sumMosavabRevenue = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabRevenue"
  );

  const sumMosavabDar_Khazane = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabDar_Khazane"
  );

  const sumMosavabSanavati = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabSanavati"
  );

  const sumMosavabPayMotomarkez = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "mosavabPayMotomarkez"
  );

  const sumBalanceMosavab = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "balanceMosavab"
  );

  const sumResources = sumFieldsInSingleItemData(
    abstractQuery.data?.data,
    "resoures"
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    mosavabCurrent: sumMosavabCurrent,
    percent_mosavabCurrent: getPercent(sumMosavabCurrent, sumResources),
    mosavabCivil: sumMosavabCivil,
    percent_mosavabCivil: getPercent(sumMosavabCivil, sumResources),
    mosavabFinancial: sumMosavabFinancial,
    percent_mosavabFinancial: getPercent(sumMosavabFinancial, sumResources),
    mosavabRevenue: sumMosavabRevenue,
    mosavabDar_Khazane: sumMosavabDar_Khazane,
    mosavabSanavati: sumMosavabSanavati,
    percent_mosavabSanavati: getPercent(sumMosavabSanavati, sumResources),
    mosavabPayMotomarkez: sumMosavabPayMotomarkez,
    balanceMosavab: sumBalanceMosavab,
    resoures: sumResources,
    actions: () => "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        footer={tableFooter}
        data={tableData}
      />
    </AdminLayout>
  );
}

export default AbstructBudgetPage;
