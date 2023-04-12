// head
export interface TableSingleHeadShape {
  title: string;
  colspan?: number;
}

export type TableHeadShape = TableSingleHeadShape[];

export interface TableSingleSubHeadShape {
  title: string;
}

export type TableSubHeadShape = TableSingleSubHeadShape[];
