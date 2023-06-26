import { ReactNode } from "react";

// head group
export interface TableSingleHeadGroupShape {
  title: ReactNode;
  colspan?: number;
  rowspan?: number;
  align?: "center" | "right" | "left";
  sticky?: boolean;
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

// head
export interface TableSingleHeadShape {
  title: ReactNode;
  align?: "center" | "right" | "left";
  name: string;
  split?: boolean;
  percent?: boolean;
  hidden?: boolean;
  hiddenSelf?: boolean;
  forceHaveBorder?: boolean;
  colspan?: number;
  canSort?: true;
  width?: string;
  sticky?: boolean;
  topTitle?: string;
}

export type TableHeadShape = TableSingleHeadShape[];
