import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TableSortLabel from "@mui/material/TableSortLabel";

import { TableVirtuoso, TableComponents } from "react-virtuoso";

import { grey, blue } from "@mui/material/colors";
import { ReactNode, useState } from "react";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { numberWithCommas } from "helper/calculate-utils";
import { globalConfig } from "config/global-config";
import classNames from "classnames";
import { Tooltip } from "@mui/material";

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
      dataCell = (dataCell || 0) + "%";
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
  bottomFooter?: any;
  moreBottomFooter?: any;
  notFixed?: boolean;
  canSort?: boolean;
  enableVirtual?: boolean;
  tableLayout?: "fixed" | "auto";
  bgcolor?: string;
  clickCell?: (whichColumn: string, row: any) => void;
}
function FixedTable(props: FixedTableProps) {
  const {
    heads,
    bgcolor,
    headGroups,
    data,
    footer,
    notFixed,
    topHeadGroups,
    canSort,
    enableVirtual,
    bottomFooter,
    moreBottomFooter,
    tableLayout,
    clickCell,
  } = props;

  // @ts-ignore
  const VirtuosoTableComponents: TableComponents = React.useMemo(
    () => ({
      Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer component={Paper} {...props} ref={ref} />
      )),
      Table: (props) => (
        <Table
          {...props}
          sx={{
            borderCollapse: "separate",
            tableLayout: tableLayout || "fixed",
          }}
        />
      ),
      TableHead,
      TableFoot: (props: any) => (
        <TableFooter sx={{ bgcolor: grey[200], position: "sticky", bottom: 0 }}>
          {props.children}
        </TableFooter>
      ),
      TableRow: ({ item: row, ...props }: any) => (
        <TableRow
          sx={{
            transition: "background ease 0.1s",
            "&:last-child td, &:last-child th": { border: 0 },
            "&:nth-of-type(even)": {
              bgcolor: row.bgcolor || grey[200],
              "&:hover": {
                "--hover-color": "0.6",
                bgcolor:
                  row.bgcolor === "#fff" ? grey[200] : row.bgcolor || grey[300],
              },
            },
            bgcolor: row.bgcolor || "white",
            "&:hover": {
              "--hover-color": "0.6",
              bgcolor:
                row.bgcolor === "#fff" ? grey[200] : row.bgcolor || grey[300],
            },
          }}
          {...props}
        />
      ),
      TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
      )),
    }),
    [tableLayout, TableHead]
  );

  // sort

  const visibleHeads = heads.filter((item: any) => !item.hidden);
  const borderColor = 400;

  const [orderBy, setOrderBy] = useState("");
  const [ordered, setOrdered] = useState<false | "asc" | "desc">(false);

  const sortedData = orderBy
    ? [...data].sort((a: any, b: any) => {
        if (ordered === "asc") {
          if (isNaN(+a[orderBy])) {
            return a[orderBy] > b[orderBy]
              ? 1
              : b[orderBy] > a[orderBy]
              ? -1
              : 0;
          }
          return b[orderBy] - a[orderBy];
        } else {
          if (isNaN(+a[orderBy])) {
            return a[orderBy] < b[orderBy]
              ? 1
              : b[orderBy] < a[orderBy]
              ? -1
              : 0;
          }
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
  function fixedHeaderContent() {
    return (
      <>
        {topHeadGroups && (
          <TableRow>
            {topHeadGroups?.map((topHeadGroup: any, i: number) => (
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
          <TableRow>
            {headGroups?.map((headGroup: any, i: any) => (
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
                  position: headGroup.sticky ? "sticky" : "static",
                  left: 0,
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
            (head: any, i: number) =>
              !head.hiddenSelf && (
                <TableCell
                  key={i}
                  variant="head"
                  colSpan={head.colspan || 1}
                  sx={{
                    borderRight: 1,
                    borderColor: grey[borderColor],
                    width: head.width || null,
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
                  {head.canSort ? (
                    <TableSortLabel
                      active={head.name === orderBy}
                      direction={
                        head.name === orderBy ? (ordered as any) : "asc"
                      }
                      onClick={() => handleSortClick(head.name)}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          opacity: 0.3,
                          color:
                            head.name === orderBy
                              ? `${blue[600]} !important`
                              : "",
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
  }

  // data
  function rowContent(_index: number, row: any) {
    return visibleHeads.map((item: any, i: any) => {
      const name = item.name;

      if (i === 0 && canSort) {
        return (
          <TableCell
            align={item.align || "center"}
            key={i}
            dir={typeof row[name] === "number" ? "ltr" : "rtl"}
            sx={{
              bgcolor: row[`bgcolor-${name}`] || "inherit",
              color: row[`textcolor-${name}`] || "#000",
              p: 1,
              textAlign: row[`textAlign-${name}`] || item.align,
              borderRight: `1px solid ${grey[300]} !important`,
            }}
          >
            {_index + 1}
          </TableCell>
        );
      }

      return (
        <TableCell
          align={item.align || "center"}
          key={i}
          dir={typeof row[name] === "number" ? "ltr" : "rtl"}
          // title="salam"
          onClick={
            clickCell
              ? (e) => e.ctrlKey && clickCell(name as any, row as any)
              : undefined
          }
          style={{direction: item.dir??item.dir}}
          sx={{
            // width: row[`width-${name}`] || null,
            bgcolor: row[`bgcolor-${name}`] || "inherit",
            color: row[`textcolor-${name}`] || "#000",
            p: 1,
            textAlign: row[`textAlign-${name}`] || item.align,
            borderRight: `1px solid ${grey[300]} !important`,
            position: item.sticky ? "sticky" : "static",
            left: 0,
          }}
        >
          {row[`cellTitle-${name}`] ? (
            <Tooltip title={row[`cellTitle-${name}`]}>
              <div>{formatDataCell(row[name], item, row)}</div>
            </Tooltip>
          ) : (
            <>{formatDataCell(row[name], item, row)}</>
          )}
        </TableCell>
      );
    });
  }

  // footer
  const tableFooterContent = footer && !!sortedData.length && (
    <TableRow>
      {visibleHeads.map((item: any, i: any) => {
        const name = item.name;
        if (footer[name] === null) {
          return <React.Fragment key={i}></React.Fragment>;
        } else {
          return (
            <TableCell
              align={item.align || "center"}
              sx={{
                borderRight: 1,
                borderTop: 1,
                borderColor: grey[borderColor],
                bgcolor: grey[200],
                fontWeight: 500,
                whiteSpace: "nowrap",
                p: 1,
                color: "#000",
                "&:last-child": {
                  borderRight: 0,
                },
                position: item.sticky ? "sticky" : "static",
                left: 0,
              }}
              dir={typeof footer[name] === "number" ? "ltr" : "rtl"}
              key={i}
              colSpan={footer[`colspan-${name}`] || 1}
              rowSpan={footer[`rowspan-${name}`] || 1}
            >
              {formatDataCell(footer[name], item, footer)}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );

  // bottom footer
  const tableBottomFooterContent = bottomFooter && !!sortedData.length && (
    <TableRow>
      {visibleHeads.map((item: any, i: any) => {
        const name = item.name;
        if (bottomFooter[name] === null) {
          return <React.Fragment key={i}></React.Fragment>;
        } else {
          return (
            <TableCell
              align={bottomFooter[`align-${name}`] || item.align || "center"}
              sx={{
                borderRight: 1,
                borderTop: 1,
                borderColor: grey[borderColor],
                bgcolor: bottomFooter[`bgcolor-row`] || grey[200],
                fontWeight: 500,
                whiteSpace: "nowrap",
                p: 1,
                color: bottomFooter[`textcolor-${name}`] || "#000",
                "&:last-child": {
                  borderRight: 0,
                },
                position: item.sticky ? "sticky" : "static",
                left: 0,
              }}
              dir={typeof bottomFooter[name] === "number" ? "ltr" : "rtl"}
              key={i}
              colSpan={bottomFooter[`colspan-${name}`] || 1}
            >
              {formatDataCell(bottomFooter[name], item, bottomFooter)}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );

  // more bottom footer
  const tableMoreBottomFooterContent = moreBottomFooter &&
    !!sortedData.length && (
      <TableRow>
        {visibleHeads.map((item: any, i: any) => {
          const name = item.name;
          if (moreBottomFooter[name] === null) {
            return <React.Fragment key={i}></React.Fragment>;
          } else {
            return (
              <TableCell
                align={
                  moreBottomFooter[`align-${name}`] || item.align || "center"
                }
                sx={{
                  borderRight: 1,
                  borderTop: 1,
                  borderColor: grey[borderColor],
                  bgcolor:
                    moreBottomFooter[`bgcolor-${name}`] ||
                    moreBottomFooter[`bgcolor-row`] ||
                    grey[200],
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  p: 1,
                  color: moreBottomFooter[`textcolor-${name}`] || "#000",
                  "&:last-child": {
                    borderRight: 0,
                  },
                  left: 0,
                  position: item.sticky ? "sticky" : "static",
                }}
                dir={typeof moreBottomFooter[name] === "number" ? "ltr" : "rtl"}
                key={i}
                colSpan={moreBottomFooter[`colspan-${name}`] || 1}
              >
                {moreBottomFooter[`cellTitle-${name}`] ? (
                  <Tooltip
                    title={
                      <span dir="ltr">
                        {moreBottomFooter[`cellTitle-${name}`]}
                      </span>
                    }
                  >
                    <div>
                      {formatDataCell(
                        moreBottomFooter[name],
                        item,
                        moreBottomFooter
                      )}
                    </div>
                  </Tooltip>
                ) : (
                  <>
                    {formatDataCell(
                      moreBottomFooter[name],
                      item,
                      moreBottomFooter
                    )}
                  </>
                )}
              </TableCell>
            );
          }
        })}
      </TableRow>
    );

  return (
    <Paper
      style={{
        width: "100%",
        background: bgcolor || "transparent",
        height: !notFixed
          ? `calc(100vh - ${globalConfig.headerHeight}px)`
          : "100%",
      }}
    >
      {enableVirtual ? (
        <TableVirtuoso
          height={"100%"}
          data={sortedData}
          components={VirtuosoTableComponents}
          itemContent={rowContent}
          fixedHeaderContent={fixedHeaderContent}
          fixedFooterContent={() => (
            <>
              {tableFooterContent} {tableBottomFooterContent}
            </>
          )}
        />
      ) : (
        <TableContainer
          id="table-container"
          sx={{
            maxHeight: !notFixed
              ? `calc(100vh - ${globalConfig.headerHeight}px)`
              : "100%",
          }}
        >
          <Table
            sx={{
              borderCollapse: "separate",
              tableLayout: tableLayout || "auto",
            }}
          >
            <TableHead sx={{ position: "sticky", top: "0px", zIndex: 1 }}>
              {fixedHeaderContent()}
            </TableHead>
            <TableBody>
              {sortedData.map((row: any, i: number) => (
                <TableRow
                  className={classNames({
                    "pulse-many-animation": row.bgcolor_pulse,
                  })}
                  id={row.row_id || undefined}
                  sx={{
                    transition: "background ease 0.1s",
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:nth-of-type(even)": {
                      bgcolor: row.bgcolor || grey[300],
                      "&:hover": {
                        "--hover-color": "0.6",
                        bgcolor:
                          row.bgcolor === "#fff"
                            ? grey[300]
                            : row.bgcolor || grey[400],
                      },
                    },
                    bgcolor: row.bgcolor || "white",
                    "&:hover": {
                      "--hover-color": "0.6",
                      bgcolor:
                        row.bgcolor === "#fff"
                          ? grey[300]
                          : row.bgcolor || grey[400],
                    },
                  }}
                  key={i}
                >
                  {rowContent(i, row)}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter
              sx={{ bgcolor: grey[200], position: "sticky", bottom: 0 }}
            >
              {tableFooterContent}
              {tableBottomFooterContent}
              {tableMoreBottomFooterContent}
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default FixedTable;
