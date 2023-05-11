import FixedTable from "components/data/table/fixed-table";

import { ReactNode, useMemo, useState } from "react";
import { TableHeadShape } from "types/table-type";

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
  area: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  percent: ReactNode;
}

interface RevenueChartModal_3_Props {
  data: any[];
}
function RevenueChartModal_3(props: RevenueChartModal_3_Props) {
  const { data } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "area",
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
  ];

  // body
  const [totalFooter, setTotalFooter] = useState({
    expense: 0,
    mosavab: 0,
  });

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
        area: unFormatData[0][i],
        mosavab: unFormatData[1][i],
        expense: unFormatData[3][i],
        "textcolor-expense": +unFormatData[3][i] < 0 ? "red" : "",
        percent: unFormatData[4][i],
      };
      formatedData.push(dataItem);
      TotalExpense += +unFormatData[3][i];
      TotalMosavab += +unFormatData[1][i];
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
    "colspan-number": 2,
    area: null,
    expense: totalFooter.expense,
    mosavab: totalFooter.mosavab,
    percent: Math.round((totalFooter.expense / totalFooter.mosavab) * 100),
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      canSort
      notFixed
    />
  );
}

export default RevenueChartModal_3;
