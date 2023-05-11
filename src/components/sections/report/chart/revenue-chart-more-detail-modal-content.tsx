import FixedTable from "components/data/table/fixed-table";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import LoadingButton from "@mui/lab/LoadingButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { TableHeadShape } from "types/table-type";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revenueChartApi } from "api/report/chart-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import FixedModal from "components/ui/modal/fixed-modal";
import RevenueChartModal_3 from "./revenue-chart-modal-3";

type GetChartShape = [
  number[],
  string[],
  string[],
  number[],
  number[],
  number[]
];

interface TableDataItemShape {
  number: ReactNode;
  description: ReactNode;
  code: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  percent: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

interface RevenueChartMoreDetailModalProps {
  data: any[];
  formData: any;
  area: number;
}
function RevenueChartMoreDetailModalContent(
  props: RevenueChartMoreDetailModalProps
) {
  const { data, formData, area } = props;

  // head group
  const [tableFormData, setTableFormData] = useState({
    [revenueChartFormConfig.LAON]: formData[revenueChartFormConfig.LAON],
    [revenueChartFormConfig.NIABATI]: formData[revenueChartFormConfig.NIABATI],
    [revenueChartFormConfig.SALE]: formData[revenueChartFormConfig.SALE],
    [revenueChartFormConfig.REVENUE]: formData[revenueChartFormConfig.REVENUE],
  });

  const MountChecker = useRef(false);
  useEffect(() => {
    if (MountChecker.current) {
      queryClient.setQueryData(reactQueryKeys.report.chart.revenueMoreDetail, {
        data: [[], [], [], [], []],
      });
    }

    const timeout = setTimeout(() => {
      MountChecker.current = true;
    }, 1000);

    return () => clearTimeout(timeout);
  }, [tableFormData]);

  const queryClient = useQueryClient();
  const submitMutation = useMutation(revenueChartApi.getChart, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.report.chart.revenueMoreDetail,
        data
      );
    },
  });

  const handleClickDetailValues = () => {
    submitMutation.mutate({
      ...formData,
      ...tableFormData,
      [revenueChartFormConfig.area]: area,
    });
  };

  const tableHeadGroup = [
    {
      title: (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          <CheckboxLabeled
            label="درآمد"
            name={revenueChartFormConfig.REVENUE}
            value={tableFormData[revenueChartFormConfig.REVENUE]}
            setter={setTableFormData}
          />

          <CheckboxLabeled
            label="فروش اموال"
            name={revenueChartFormConfig.SALE}
            value={tableFormData[revenueChartFormConfig.SALE]}
            setter={setTableFormData}
          />

          <CheckboxLabeled
            label="وام و اوراق"
            name={revenueChartFormConfig.LAON}
            value={tableFormData[revenueChartFormConfig.LAON]}
            setter={setTableFormData}
          />

          <CheckboxLabeled
            label="نیابتی"
            name={revenueChartFormConfig.NIABATI}
            value={tableFormData[revenueChartFormConfig.NIABATI]}
            setter={setTableFormData}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            onClick={handleClickDetailValues}
          >
            نمایش
          </LoadingButton>
        </Stack>
      ),
      colspan: 7,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
      canSort: true,
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
      canSort: true,
    },
    {
      title: "عملکرد",
      name: "expense",
      align: "left",
      split: true,
      canSort: true,
    },
    {
      title: "%  جذب",
      name: "percent",
      percent: true,
      canSort: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // body
  const [totalFooter, setTotalFooter] = useState({
    expense: 0,
    mosavab: 0,
  });

  const [modalTitle, setModalTitle] = useState("");
  const [isOpenModal3, setIsOpenModal3] = useState(false);
  const modal3Mutation = useMutation(revenueChartApi.getChart);

  const handleClickModal3 = (row: any, coding: number) => {
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);

    modal3Mutation.mutate({
      ...formData,
      [revenueChartFormConfig.coding]: coding,
    });
    setIsOpenModal3(true);
  };

  const actionButton = (row: any, coding: number) => {
    return (
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleClickModal3(row, coding)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    );
  };

  const formatTableData = (
    unFormatData: GetChartShape
  ): TableDataItemShape[] => {
    const length = unFormatData[0].length;
    const formatedData: TableDataItemShape[] = [];

    let TotalExpense = 0;
    let TotalMosavab = 0;

    for (let i = 0; i < length; i++) {
      const dataItem: TableDataItemShape | any = {
        number: i + 1,
        code: unFormatData[1][i],
        description: unFormatData[2][i],
        mosavab: unFormatData[3][i],
        expense: unFormatData[4][i],
        "textcolor-expense": unFormatData[4][i] < 0 ? "red" : "",
        percent: unFormatData[5][i],
        actions: (row: any) => actionButton(row, unFormatData[0][i]),
      };
      formatedData.push(dataItem);
      TotalExpense += unFormatData[4][i];
      TotalMosavab += unFormatData[3][i];
    }
    setTotalFooter({
      expense: TotalExpense,
      mosavab: TotalMosavab,
    });
    return formatedData;
  };

  const tableData = useMemo(
    () => (data ? formatTableData(data as GetChartShape) : []),
    [data]
  );

  // table footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    expense: totalFooter.expense,
    mosavab: totalFooter.mosavab,
    percent: Math.round((totalFooter.expense / totalFooter.mosavab) * 100),
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
        canSort
        notFixed
      />

      <FixedModal
        open={isOpenModal3}
        handleClose={() => setIsOpenModal3(false)}
        loading={modal3Mutation.isLoading}
        title={modalTitle}
        maxWidth="sm"
        maxHeight="80%"
      >
        <RevenueChartModal_3 data={modal3Mutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default RevenueChartMoreDetailModalContent;
