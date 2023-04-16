import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";

import { useEffect, useRef, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

interface FixedTableProps {
  headGroups?: TableHeadGroupShape;
  heads: TableHeadShape;
  data: any;
  footer?: any;
}

const borderColor = 400;

function FixedTable(props: FixedTableProps) {
  const { heads, headGroups, data, footer } = props;

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
                borderColor: grey[borderColor],
                bgcolor: grey[200],
              }}
              align="left"
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
              "&:last-child": {
                borderRight: 0,
              },
            }}
            align={head.align || "center"}
          >
            {head.title}
          </TableCell>
        ))}
      </TableRow>
    </>
  );

  // data
  const getRenderDataCells = (row: any) => {
    return Object.keys(row).map((cell: string, i: number) => (
      <TableCell align="center" key={i}>
        {row[cell] === "" ? "-" : row[cell]}
      </TableCell>
    ));
  };

  // footer
  const tableFooterContent = footer && !!data.length && (
    <TableRow>
      {Object.keys(footer).map((cell: any, i: number) => (
        <TableCell
          key={i}
          sx={{
            borderRight: 1,
            borderTop: 1,
            borderColor: grey[borderColor],
            bgcolor: grey[200],
            top: headGroups ? headGroupHright : 0,
            whiteSpace: "nowrap",
            "&:last-child": {
              borderRight: 0,
            },
          }}
          align="center"
        >
          {footer[cell]}
        </TableCell>
      ))}
    </TableRow>
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
                {getRenderDataCells(row)}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            sx={{ bgcolor: grey[200], position: "sticky", bottom: 0 }}
          >
            {tableFooterContent}
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default FixedTable;
