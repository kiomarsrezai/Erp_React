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

interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

type Sample = [string, number, number, number, number];

const sample: readonly Sample[] = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(
  id: number,
  dessert: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
): Data {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Dessert",
    dataKey: "dessert",
  },
  {
    width: 120,
    label: "Calories\u00A0(g)",
    dataKey: "calories",
    numeric: true,
  },
  {
    width: 120,
    label: "Fat\u00A0(g)",
    dataKey: "fat",
    numeric: true,
  },
  {
    width: 120,
    label: "Carbs\u00A0(g)",
    dataKey: "carbs",
    numeric: true,
  },
  {
    width: 120,
    label: "Protein\u00A0(g)",
    dataKey: "protein",
    numeric: true,
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents: TableComponents<Data> = {
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

  //   data
  function rowContent(_index: number, row: any) {
    // return (
    //   <React.Fragment>
    //     {columns.map((column) => (
    //       <TableCell
    //         key={column.dataKey}
    //         align={column.numeric || false ? "right" : "left"}
    //       >
    //         {row[column.dataKey]}
    //       </TableCell>
    //     ))}
    //   </React.Fragment>
    // );

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
      <TableVirtuoso
        data={props.data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
