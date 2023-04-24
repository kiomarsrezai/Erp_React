import { ReactNode } from "react";

// head group
export interface TableSingleHeadGroupShape {
  title: ReactNode;
  colspan?: number;
  align?: "center" | "right" | "left";
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

// head
export interface TableSingleHeadShape {
  title: string;
  align?: "center" | "right" | "left";
  name: string;
  split?: boolean;
  percent?: boolean;
  hidden?: boolean;
}

export type TableHeadShape = TableSingleHeadShape[];
