import { ReactNode } from "react";

// head group
export interface TableSingleHeadGroupShape {
  title: ReactNode;
  colspan?: number;
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

// head
export interface TableSingleHeadShape {
  title: string;
  align?: "center" | "right" | "left";
}

export type TableHeadShape = TableSingleHeadShape[];

// foot
// export interface TableSingleFootShape {
//   title: string;
// }
// export type TableFootShape = TableSingleFootShape[];
