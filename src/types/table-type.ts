import { ReactNode } from "react";

// head
export interface TableSingleHeadGroupShape {
  title: ReactNode;
  colspan?: number;
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

export interface TableSingleHeadShape {
  title: string;
}

export type TableHeadShape = TableSingleHeadShape[];
