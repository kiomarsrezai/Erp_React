import FixedTable from "components/data/table/fixed-table";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode } from "react";
import { GetSingleAbstructProctorModalRowDataItemShape } from "types/data/report/abstruct-proctor-type";
import { TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  title: ReactNode;
  code: ReactNode;
  hazine: ReactNode;
  mosavab: ReactNode;
  jazb: ReactNode;
}

interface AbstructRowModalTableProps {
  data: any[];
}

function AbstructRowModalTable(props: AbstructRowModalTableProps) {
  const { data } = props;

  // table heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "عنوان",
      name: "title",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "هزینه",
      name: "hazine",
      split: true,
      align: "left",
    },
    {
      title: "جذب %",
      name: "jazb",
      percent: true,
    },
  ];

  // table data
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalRowDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.description,
      code: item.code,
      hazine: item.expense,
      jazb: item.percent,
      mosavab: item.mosavab,
      actions: () => "",
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooters: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    title: null,
    code: null,
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    jazb: "",
    hazine: sumFieldsInSingleItemData(data, "expense"),
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooters}
      notFixed
    />
  );
}

export default AbstructRowModalTable;
