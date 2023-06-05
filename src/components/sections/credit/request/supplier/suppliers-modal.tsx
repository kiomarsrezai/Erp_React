import { Box, IconButton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import CheckIocn from "@mui/icons-material/Check";
import { CreditReadRequestSuppliersShape } from "types/data/credit/credit-request-type";
import FixedTable from "components/data/table/fixed-table";

interface SuppliersModalCreditRequestProps {
  onDoneTask: (id: number, name: string) => void;
}

interface TableDataItemShape {
  number: ReactNode;
  suppliersName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function SuppliersModalCreditRequest(props: SuppliersModalCreditRequestProps) {
  const { onDoneTask } = props;

  const suppliersQuery = useQuery(
    ["suppliers-read"],
    creditRequestApi.suplliersRead
  );

  const data = suppliersQuery.data?.data || [];

  const [filterText, setFilterText] = useState("");

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      colspan: 3,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "suppliersName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const actionButtons = (row: CreditReadRequestSuppliersShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => onDoneTask(row.id, row.suppliersName)}
    >
      <CheckIocn />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: CreditReadRequestSuppliersShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(
    data.filter((item, i) => item.suppliersName.includes(filterText) && i < 8)
  );

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      enableVirtual
      notFixed
    />
  );
}

export default SuppliersModalCreditRequest;
