// head
export interface TableSingleHeadGroupShape {
  title: string;
  colspan?: number;
}

export type TableHeadGroupShape = TableSingleHeadGroupShape[];

export interface TableSingleHeadShape {
  title: string;
}

export type TableHeadShape = TableSingleHeadShape[];
