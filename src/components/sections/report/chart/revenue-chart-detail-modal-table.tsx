import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import green from "@mui/material/colors/green";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleDetailRevenueChartShape } from "types/data/report/chart/revenue-chart-type";
import { TableHeadShape } from "types/table-type";
import RevenueChartMoreDetailModalContent from "./revenue-chart-more-detail-modal-content";
import FixedModal from "components/ui/modal/fixed-modal";
import { revenueChartApi } from "api/report/chart-api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { reactQueryKeys } from "config/react-query-keys-config";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  mosavab: ReactNode;
  mosavabDaily: ReactNode;
  expense: ReactNode;
  notDoneValue: ReactNode;
  dailyJazb: ReactNode;
  mosavabJazb: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ChartDetailModalTableProps {
  data: any[];
  formData: any;
}
function RevenueChartDetailModalTable(props: ChartDetailModalTableProps) {
  const { data, formData } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "area",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "مصوب روزانه",
      name: "mosavabDaily",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "محقق نشده",
      name: "notDoneValue",
      split: true,
      align: "left",
    },
    {
      title: "جذب روزانه %",
      name: "dailyJazb",
      percent: true,
    },
    {
      title: "جذب به مصوب %",
      name: "mosavabJazb",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // body
  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleClickDetailValues(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const getNotDoneColor = (item: GetSingleDetailRevenueChartShape) => {
    if (item.notGet < 0) {
      return green[800];
    }
  };

  const formatTableData = (
    unFormatData: GetSingleDetailRevenueChartShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      number: i + 1,
      area: item.areaName,
      dailyJazb: item.percentMosavabDaily,
      expense: item.expense,
      mosavab: item.mosavab,
      mosavabDaily: item.mosavabDaily,
      mosavabJazb: item.percentMosavab,
      notDoneValue: item.notGet,
      actions: actionButtons,
      "textcolor-notDoneValue": () => getNotDoneColor(item),
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    area: null,
    dailyJazb: Math.round(
      (sumFieldsInSingleItemData(data, "expense") /
        sumFieldsInSingleItemData(data, "mosavabDaily")) *
        100
    ),
    expense: sumFieldsInSingleItemData(data, "expense"),
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    mosavabDaily: sumFieldsInSingleItemData(data, "mosavabDaily"),
    mosavabJazb: Math.round(
      (sumFieldsInSingleItemData(data, "expense") /
        sumFieldsInSingleItemData(data, "mosavab")) *
        100
    ),
    notDoneValue: sumFieldsInSingleItemData(data, "notGet"),
    actions: "",
  };

  // modal
  const [isOpenMoreDetailModal, setIsOpenMoreDetailModal] = useState(false);
  const dataTableMutation = useMutation(revenueChartApi.getChart);

  const queryClient = useQueryClient();

  const handleCloseMoreContentModal = () => {
    setIsOpenMoreDetailModal(false);
  };

  const [areaId, setAreaId] = useState(0);

  const revenueChart = useQuery(
    reactQueryKeys.report.chart.revenueMoreDetail,
    () => revenueChartApi.getChart({}),
    {
      enabled: false,
    }
  );

  const handleClickDetailValues = (row: TableDataItemShape) => {
    queryClient.setQueryData(reactQueryKeys.report.chart.revenueMoreDetail, []);

    setAreaId(row.area as number);
    dataTableMutation.mutate({
      ...formData,
      [revenueChartFormConfig.area]: row.area,
    });
    setIsOpenMoreDetailModal(true);
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={handleCloseMoreContentModal}
        loading={dataTableMutation.isLoading}
      >
        <RevenueChartMoreDetailModalContent
          data={revenueChart.data?.data || dataTableMutation.data?.data || []}
          formData={formData}
          area={areaId}
        />
      </FixedModal>
    </>
  );
}

export default RevenueChartDetailModalTable;
