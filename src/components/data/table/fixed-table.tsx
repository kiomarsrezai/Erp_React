import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";

import { useEffect, useRef, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

interface DataTableProps {
  headGroups?: TableHeadGroupShape;
  heads: TableHeadShape;
  data: any;
}

const borderColor = 400;

function DataTable(props: DataTableProps) {
  const { heads, headGroups, data } = props;

  // head
  const [headGroupHright, setHeadGroupHright] = useState(0);
  const HeadGroup = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    setHeadGroupHright(HeadGroup.current?.clientHeight || 0);
  }, []);

  const tableHeadContent = (
    <>
      {headGroups && (
        <TableRow ref={HeadGroup}>
          {headGroups?.map((headGroup, i) => (
            <TableCell
              key={i}
              sx={{
                borderRight: 1,
                borderColor: grey[borderColor],
                bgcolor: grey[200],
                textAlign: "left",
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
              top: headGroups ? headGroupHright : 0,
              whiteSpace: "nowrap",
            }}
            align="center"
          >
            {head.title}
          </TableCell>
        ))}
      </TableRow>
    </>
  );

  const getRenderDataCells = (row: any) => {
    return Object.keys(row).map((cell: string, i: number) => (
      <TableCell align="center" key={i}>
        {row[cell]}
      </TableCell>
    ));
  };

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
                {getRenderDataCells(row)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DataTable;
