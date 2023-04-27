export interface GetSingleCommiteListShape {
  id: number;
  commiteName: string;
}

export interface GetSingleCommiteModalShape {
  id: number;
  number: number;
  dates: string;
}

export interface GetSingleCommiteDetailModalShape {
  id: number;
  projectId: number;
  projectName: string;
  commiteName: string;
  commiteKindId: number;
}
