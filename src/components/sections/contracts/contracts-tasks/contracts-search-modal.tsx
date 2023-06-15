import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { GetSingleSearchContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import { TableHeadShape } from "types/table-type";

interface ContractsSearchModalProps {
  data: GetSingleSearchContractTaskItemShape[];
}
function ContractsSearchModal(props: ContractsSearchModalProps) {
  const { data } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "شرح",
      name: "description",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "پیمانکار",
      name: "suppliersName",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const handleClickCheckIcon = (row: any) => {
    // onSelectItem({
    //   date: row.dates,
    //   code: row.code,
    //   commite: "test",
    //   id: row.id,
    // });
  };

  const actionButtons = (row: GetSingleSearchContractTaskItemShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckIcon(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      //   code: item.number,
      //   date: item.dates,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default ContractsSearchModal;
