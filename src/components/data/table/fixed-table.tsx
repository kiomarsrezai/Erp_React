import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";

import { ReactNode, useEffect, useRef, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { numberWithCommas } from "helper/calculate-utils";

const borderColor = 400;

const formatDataCell = (
  nameCell: (
    row: any
  ) => (ReactNode | string | number) | ReactNode | string | number,
  headDataCell: any,
  row: any
) => {
  let dataCell: any = typeof nameCell === "function" ? nameCell(row) : nameCell;

  if (typeof dataCell === "number") {
    if (headDataCell?.split) {
      dataCell = numberWithCommas(dataCell);
    }

    if (headDataCell?.percent) {
      dataCell = dataCell + "%";
    }
  }

  if (typeof dataCell === "string") {
    return dataCell || "-";
  }

  return dataCell;
};

interface FixedTableProps {
  headGroups?: TableHeadGroupShape;
  heads: TableHeadShape;
  data: any;
  footer?: any;
  notFixed?: boolean;
}

function FixedTable(props: FixedTableProps) {
  const { heads, headGroups, data, footer, notFixed } = props;

  const visibleHeads = heads.filter((item) => !item.hidden);

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
        {visibleHeads.map(
          (head) =>
            !head.hidden && (
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
            )
        )}
      </TableRow>
    </>
  );

  // data
  const getRenderDataCells = (row: any) => {
    return visibleHeads.map((item, i) => {
      const name = item.name;
      return (
        <TableCell
          align={item.align || "center"}
          key={i}
          dir={typeof row[name] === "number" ? "ltr" : "rtl"}
        >
          {formatDataCell(row[name], item, row)}
        </TableCell>
      );
    });
  };

  // footer
  const tableFooterContent = footer && !!data.length && (
    <>
      {visibleHeads.map((item, i) => {
        const name = item.name;
        return (
          <TableCell
            align={item.align || "center"}
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
            dir={typeof footer[name] === "number" ? "ltr" : "rtl"}
            key={i}
          >
            {formatDataCell(footer[name], item, footer)}
          </TableCell>
        );
      })}
    </>
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: 1 }}>
      <TableContainer
        sx={{ maxHeight: !notFixed ? "calc(100vh - 64px)" : "100%" }}
      >
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
