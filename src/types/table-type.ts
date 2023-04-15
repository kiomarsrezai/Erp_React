import { ReactNode } from "react";

// head group
export interface TableSingleHeadGroupShape {
  title: ReactNode;
  colspan?: number;
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

// table
export interface TableSingleHeadShape {
  title: string;
}

export type TableHeadShape = TableSingleHeadShape[];
