import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

interface DataTableProps {
  headGroups?: TableHeadGroupShape;
  heads: TableHeadShape;
  data: any;
}

function DataTable(props: DataTableProps) {
  const { heads, headGroups, data } = props;

  const borderColor = 400;

  const tableHeadContent = (
    <>
      {headGroups && (
        <TableRow>
          {headGroups?.map((headGroup) => (
            <TableCell
              key={headGroup.title}
              sx={{
                borderRight: 1,
                borderColor: grey[borderColor],
                bgcolor: grey[200],
              }}
              align="center"
              colSpan={headGroup.colspan}
            >
              {headGroup.title}
            </TableCell>
          ))}
        </TableRow>
      )}
      <TableRow>
        {heads.map((head) => (
          <TableCell
            key={head.title}
            sx={{
              borderRight: 1,
              borderColor: grey[borderColor],
              bgcolor: grey[200],
              top: headGroups ? 57 : 0,
            }}
            align="center"
          >
            {head.title}
          </TableCell>
        ))}
      </TableRow>
    </>
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "calc(100vh - 64px)" }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: grey[200] }}>{tableHeadContent}</TableHead>
          <TableBody>
            {data.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-child(even)": { bgcolor: grey[100] },
                }}
              >
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DataTable;
