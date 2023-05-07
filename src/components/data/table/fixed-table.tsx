import Table from "@mui/material/Table";
import TableFooter from "@mui/material/TableFooter";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import grey from "@mui/material/colors/grey";
import TableSortLabel from "@mui/material/TableSortLabel";

import { ReactNode, useEffect, useRef, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { numberWithCommas } from "helper/calculate-utils";
import { globalConfig } from "config/global-config";

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
  topHeadGroups?: TableHeadGroupShape;
  headGroups?: TableHeadGroupShape;
  heads: TableHeadShape;
  data: any;
  footer?: any;
  notFixed?: boolean;
  canSort?: boolean;
}

function FixedTable(props: FixedTableProps) {
  const { heads, headGroups, data, footer, notFixed, topHeadGroups, canSort } =
    props;

  const visibleHeads = heads.filter((item) => !item.hidden);

  // sort
  const [orderBy, setOrderBy] = useState("");
  const [ordered, setOrdered] = useState<false | "asc" | "desc">(false);

  const sortedData = orderBy
    ? [...data].sort((a: any, b: any) => {
        if (ordered === "asc") {
          return b[orderBy] - a[orderBy];
        } else {
          return a[orderBy] - b[orderBy];
        }
      })
    : data;

  const handleSortClick = (name: string) => {
    if (orderBy === name) {
      if (ordered === "desc") {
        setOrderBy("");
        setOrdered(false);
        return;
      }

      setOrdered((state) => (state === "asc" ? "desc" : "asc"));
      return;
    }

    setOrdered("asc");
    setOrderBy(name);
  };

  // head
  const [headGroupHright, setHeadGroupHright] = useState(0);
  const HeadGroup = useRef<HTMLTableRowElement>(null);
  const topHeadGroup = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    setHeadGroupHright(HeadGroup.current?.clientHeight || 0);
  }, []);

  const tableHeadContent = (
    <>
      {topHeadGroups && (
        <TableRow ref={topHeadGroup}>
          {topHeadGroups?.map((topHeadGroup, i) => (
            <TableCell
              key={i}
              sx={{
                borderColor: grey[borderColor],
                bgcolor: grey[200],
                p: 1,
              }}
              align="left"
              colSpan={topHeadGroup.colspan}
            >
              {topHeadGroup.title}
            </TableCell>
          ))}
        </TableRow>
      )}

      {headGroups && (
        <TableRow ref={HeadGroup}>
          {headGroups?.map((headGroup, i) => (
            <TableCell
              key={i}
              rowSpan={headGroup.rowspan || 1}
              sx={{
                borderRight: 1,
                borderColor: grey[borderColor],
                bgcolor: grey[200],
                "&:last-child": {
                  borderRight: 0,
                },
                p: 1,
              }}
              align={headGroup.align || "left"}
              colSpan={headGroup.colspan}
            >
              {headGroup.title}
            </TableCell>
          ))}
        </TableRow>
      )}
      <TableRow>
        {visibleHeads.map(
          (head, i) =>
            !head.hiddenSelf && (
              <TableCell
                key={i}
                sx={{
                  borderRight: 1,
                  borderColor: grey[borderColor],
                  bgcolor: grey[200],
                  top: headGroups ? headGroupHright : 0,
                  whiteSpace: "nowrap",
                  "&:last-child": {
                    borderRight: head.forceHaveBorder ? 1 : 0,
                    borderColor: grey[borderColor],
                  },
                  p: 1,
                  ...(head.canSort && { cursor: "pointer" }),
                }}
                align="center"
              >
                {head.canSort ? (
                  <TableSortLabel
                    active={head.name === orderBy}
                    direction={head.name === orderBy ? (ordered as any) : "asc"}
                    onClick={() => handleSortClick(head.name)}
                    sx={{
                      "& .MuiSvgIcon-root": {
                        opacity: 0.3,
                      },
                    }}
                  >
                    {head.title}
                  </TableSortLabel>
                ) : (
                  head.title
                )}
              </TableCell>
            )
        )}
      </TableRow>
    </>
  );

  // data
  const getRenderDataCells = (row: any, rowNumber: number) => {
    return visibleHeads.map((item, i) => {
      const name = item.name;

      if (i === 0 && canSort) {
        return (
          <TableCell
            align={item.align || "center"}
            key={i}
            dir={typeof row[name] === "number" ? "ltr" : "rtl"}
            sx={{
              bgcolor: row[`bgcolor-${name}`] || "transparent",
              color: row[`textcolor-${name}`] || "#000",
              p: 1,
              textAlign: row[`textAlign-${name}`] || item.align,
            }}
          >
            {rowNumber}
          </TableCell>
        );
      }

      return (
        <TableCell
          align={item.align || "center"}
          key={i}
          dir={typeof row[name] === "number" ? "ltr" : "rtl"}
          sx={{
            bgcolor: row[`bgcolor-${name}`] || "transparent",
            color: row[`textcolor-${name}`] || "#000",
            p: 1,
            textAlign: row[`textAlign-${name}`] || item.align,
          }}
        >
          {formatDataCell(row[name], item, row)}
        </TableCell>
      );
    });
  };

  // footer
  const tableFooterContent = footer && !!data.length && (
    <TableRow>
      {visibleHeads.map((item, i) => {
        const name = item.name;
        if (footer[name] === null) {
          return <></>;
        } else {
          return (
            <TableCell
              align={item.align || "center"}
              sx={{
                borderRight: 1,
                borderTop: 1,
                borderColor: grey[borderColor],
                bgcolor: grey[200],
                top: headGroups ? headGroupHright : 0,
                fontWeight: 500,
                whiteSpace: "nowrap",
                p: 1,
                color: "#000",
                "&:last-child": {
                  borderRight: 0,
                },
              }}
              dir={typeof footer[name] === "number" ? "ltr" : "rtl"}
              key={i}
              colSpan={footer[`colspan-${name}`] || 1}
            >
              {formatDataCell(footer[name], item, footer)}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", height: 1 }}>
      <TableContainer
        sx={{
          maxHeight: !notFixed
            ? `calc(100vh - ${globalConfig.headerHeight}px)`
            : "100%",
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: grey[200] }}>{tableHeadContent}</TableHead>
          <TableBody>
            {sortedData.map((row: any, i: number) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:nth-of-type(even)": { bgcolor: row.bgcolor || grey[100] },
                  bgcolor: row.bgcolor,
                }}
              >
                {getRenderDataCells(row, i + 1)}
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
