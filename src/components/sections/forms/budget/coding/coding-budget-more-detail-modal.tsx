import FixedTable from "components/data/table/fixed-table";
import Box from "@mui/material/Box";

import { TableHeadShape } from "types/table-type";

function CodingDudgetMoreDetailModal() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
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
      title: "سطح",
      name: "level",
    },
    {
      title: "crud",
      name: "crud",
    },
    {
      title: "نمایش",
      name: "show",
    },
    {
      title: "نوع درامد",
      name: "revenueType",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  return (
    <Box>
      {/* <FixedTable
      heads={tableHeads}
      data={tableData || []}
      /> */}
    </Box>
  );
}

export default CodingDudgetMoreDetailModal;
