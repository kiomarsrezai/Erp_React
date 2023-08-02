import FixedTable from "components/data/table/fixed-table";
import { GetSingleSepratorMonthlyItemShape } from "types/data/budget/seprator-type";
import { TableHeadShape } from "types/table-type";

interface SepratorMonthlyModalProps {
  data: GetSingleSepratorMonthlyItemShape[];
}
function SepratorMonthlyModal(props: SepratorMonthlyModalProps) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره",
      name: "code",
    },
    {
      title: "تاریخ",
      name: "date",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "amount",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const formatTableData = (
    unFormatData: GetSingleSepratorMonthlyItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      //   footer={tableFooter}
      notFixed
    />
  );
}

export default SepratorMonthlyModal;
