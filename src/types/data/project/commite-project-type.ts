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
  description: string;
  row: number;
}

export interface GetSingleCommiteDetailProjectModalShape {
  id: number;
  projectCode: string;
  projectName: string;
}

// wbs
export interface GetSingleCommiteDetailWbsModalShape {
  id: number;
  firstName: string;
  description: null;
  lastName: string;
  responsibility: string;
  dateStart: string;
  dateEnd: string;
  dateStartShamsi: string;
  datteEndShamsi: string;
}

export interface GetSingleWbsUserListShape {
  id: 1;
  firstName: "کیومرث";
  lastName: "رضایی";
  bio: "مدیر پروژه";
}

// confirmation
export interface GetSingleCommiteDetailConfirmationModalShape {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  resposibility: string;
  dateAccept: string;
  dateAcceptShamsi: string;
}

// estimate
export interface GetSingleCommiteDetailEstimateModalShape {
  id: 1;
  description: "string";
  quantity: 0;
  price: 0;
  amount: 0;
}
