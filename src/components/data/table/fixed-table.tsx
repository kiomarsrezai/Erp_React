import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";

import TableFooter from "@mui/material/TableFooter";
import TableSortLabel from "@mui/material/TableSortLabel";

import { grey, blue } from "@mui/material/colors";
import { ReactNode, useEffect, useRef, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { numberWithCommas } from "helper/calculate-utils";
import { globalConfig } from "config/global-config";

const VirtuosoTableComponents: TableComponents = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

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

export default function ReactVirtualizedTable(props: any) {
  const visibleHeads = props.heads.filter((item: any) => !item.hidden);
  const borderColor = 400;

  // head
  function fixedHeaderContent() {
    return (
      <>
        {props.headGroups && (
          <TableRow>
            {props.headGroups?.map((headGroup: any, i: any) => (
              <TableCell
                key={i}
                variant="head"
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
            (head: any, i: string) =>
              !head.hiddenSelf && (
                <TableCell
                  key={i}
                  variant="head"
                  sx={{
                    borderRight: 1,
                    borderColor: grey[borderColor],
                    bgcolor: grey[200],
                    //   top: headGroups ? headGroupHright : 0,
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
                  {head.canSort
                    ? //   <TableSortLabel
                      //     active={head.name === orderBy}
                      //     direction={head.name === orderBy ? (ordered as any) : "asc"}
                      //     onClick={() => handleSortClick(head.name)}
                      //     sx={{
                      //       "& .MuiSvgIcon-root": {
                      //         opacity: 0.3,
                      //         color:
                      //           head.name === orderBy
                      //             ? `${blue[600]} !important`
                      //             : "",
                      //       },
                      //     }}
                      //   >
                      // {head.title}
                      head.title
                    : //   </TableSortLabel>
                      head.title}
                </TableCell>
              )
          )}
        </TableRow>
      </>
    );
  }

  // data
  function rowContent(_index: number, row: any) {
    return visibleHeads.map((item: any, i: any) => {
      const name = item.name;

      if (i === 0 && props.canSort) {
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
            {i + 1}
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
  }
  return (
    <Paper
      style={{
        width: "100%",
        height: !props.notFixed
          ? `calc(100vh - ${globalConfig.headerHeight}px)`
          : "100%",
      }}
    >
      {props.enableVirtual ? (
        <TableVirtuoso
          height={"100%"}
          data={props.data}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      ) : (
        <TableContainer
          sx={{
            maxHeight: !props.notFixed
              ? `calc(100vh - ${globalConfig.headerHeight}px)`
              : "100%",
          }}
        >
          <Table sx={{ borderCollapse: "separate", tableLayout: "auto" }}>
            <TableHead sx={{ position: "sticky", top: "0px", zIndex: 1 }}>
              {fixedHeaderContent()}
            </TableHead>
            <TableBody>
              {props.data.map((row: any, i: number) => (
                <TableRow key={i}>{rowContent(i, row)}</TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
