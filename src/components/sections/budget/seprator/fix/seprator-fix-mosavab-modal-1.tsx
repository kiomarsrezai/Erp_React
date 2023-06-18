import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

import {
  GetSingleSepratorAccItemShape,
  GetSingleSepratorMosavabItemShape,
} from "types/data/budget/seprator-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface SepratorFixMosavabModal1props {
  data: GetSingleSepratorMosavabItemShape[];
}
function SepratorFixMosavabModal1(props: SepratorFixMosavabModal1props) {
  const { data } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "90px",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavabPublic",
      split: true,
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorMosavabItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumMosavabPublic = sumFieldsInSingleItemData(data, "mosavabPublic");
  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    mosavabPublic: sumMosavabPublic,
    description: null,
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default SepratorFixMosavabModal1;
