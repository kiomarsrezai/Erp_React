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
    },
    {
      title: "هزینه",
      name: "hazine",
      split: true,
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
      title: item["شرح ردیف"],
      code: item["کد بودجه"],
      hazine: item.عملکرد,
      jazb: item["% جذب"],
      mosavab: item.مصوب,
      actions: () => "",
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooters: TableDataItemShape = {
    number: "جمع",
    title: "",
    code: "",
    mosavab: sumFieldsInSingleItemData(data, "مصوب"),
    jazb: "",
    hazine: sumFieldsInSingleItemData(data, "عملکرد"),
  };

  return (
    <FixedTable heads={tableHeads} data={tableData} footer={tableFooters} />
  );
}

export default AbstructRowModalTable;
