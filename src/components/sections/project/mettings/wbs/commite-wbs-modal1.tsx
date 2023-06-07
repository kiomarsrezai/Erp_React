import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape } from "types/table-type";
import { TableHeadShape } from "types/table-type";
import { GetSingleCommiteDetailWbsModalShape } from "types/data/project/commite-project-type";

interface CommiteWbsModal1Props {
  data: GetSingleCommiteDetailWbsModalShape[];
}
function CommiteWbsModal1(props: CommiteWbsModal1Props) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "اسم",
      name: "name",
      align: "left",
    },
    {
      title: "شرح",
      name: "description",
      split: true,
      align: "left",
    },
    {
      title: "مسولیت",
      name: "responsibility",
      split: true,
      align: "left",
    },
    {
      title: "تاریخ شروع",
      name: "dateStart",
      percent: true,
    },
    {
      title: "تاریخ پایان",
      align: "left",
      name: "dateEnd",
      split: true,
    },
  ];

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      ),
      colspan: 6,
    },
  ];

  //   data
  const formatTableData = (
    unFormatData: GetSingleCommiteDetailWbsModalShape[]
  ): any[] => {
    const formatedData: any[] | any = unFormatData.map((item, i) => ({
      ...item,
      name: `${item.firstName} ${item.lastName}`,
      number: i + 1,
      // actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  const tableFooter: any = {};
  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroup}
      data={tableData}
      notFixed
    />
  );
}

export default CommiteWbsModal1;
