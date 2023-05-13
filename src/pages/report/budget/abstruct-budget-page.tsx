import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { GetSingleAbstructProctorItemShape } from "types/data/report/abstruct-proctor-type";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import AbstructBudgetForm from "components/sections/report/abstruct-budget/abstruct-budget-form";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import { abstructBudgetApi } from "api/report/abstruct-budget-api";
import { GetSingleAbstructBudgetItemShape } from "types/data/report/abstruct-budget-type";

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

function AbstructBudgetPage() {
  const [formData, setFormData] = useState({
    [abstructBudgetConfig.YEAR]: undefined,
    [abstructBudgetConfig.KIND]: 1,
    [abstructBudgetConfig.ORGAN]: undefined,
  });

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstructBudgetForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 16,
    },
  ];

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
    },
    {
      title: "هزینه ای",
      name: "percent_mosavabCurrent",
      percent: true,
    },
    {
      title: "سرمایه ای",
      name: "mosavabCivil",
      split: true,
      align: "left",
    },
    {
      title: "سرمایه ای",
      name: "percent_mosavabCivil",
      percent: true,
    },
    {
      title: "مالی",
      name: "mosavabFinancial",
      split: true,
      align: "left",
    },
    {
      title: "مالی",
      name: "percent_mosavabFinancial",
      percent: true,
    },
    {
      title: "دیون سنواتی",
      name: "mosavabSanavati",
      split: true,
      align: "left",
    },
    {
      title: "دیون سنواتی",
      name: "percent_mosavabSanavati",
      percent: true,
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

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    mosavabCurrent: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabCurrent"
    ),
    mosavabCivil: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabCivil"
    ),
    mosavabFinancial: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabFinancial"
    ),
    mosavabRevenue: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabRevenue"
    ),
    mosavabDar_Khazane: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabDar_Khazane"
    ),
    mosavabSanavati: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabSanavati"
    ),
    mosavabPayMotomarkez: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabPayMotomarkez"
    ),
    balanceMosavab: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "balanceMosavab"
    ),
    resoures: sumFieldsInSingleItemData(abstractQuery.data?.data, "resoures"),
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
