export interface GetSingleContractTaskItemShape {
  id: 1;
  number: "111";
  date: "15/06/2023 12:00:00 ق.ظ";
  dateShamsi: "۱۴۰۲/۰۳/۲۵";
  description: "قرارداد علیرضا";
  suppliersId: 2264;
  suppliersName: "خطیبی";
  dateFrom: "15/06/2023 12:00:00 ق.ظ";
  dateFromShamsi: "۱۴۰۲/۰۳/۲۵";
  dateEnd: "15/06/2023 12:00:00 ق.ظ";
  doingMethodId: 1;
  dateEndShamsi: "۱۴۰۲/۰۳/۲۵";
  amount: 9999999999999;
  surplus: 0;
  final: false;
}

export interface GetSingleSearchContractTaskItemShape {
  id: 0;
  number: "string";
  date: "string";
  dateShamsi: "string";
  description: "string";
  suppliersName: "string";
}

export interface InsertContractTaskItemShape {
  amount: 9999999999999;
  date: "06/06/2023 12:00:00 ق.ظ";
  dateEnd: "29/05/2023 12:00:00 ق.ظ";
  dateEndShamsi: "۱۴۰۲/۰۳/۰۸";
  dateFrom: "22/05/2023 12:00:00 ق.ظ";
  dateFromShamsi: "۱۴۰۲/۰۳/۰۱";
  dateShamsi: "۱۴۰۲/۰۳/۱۶";
  description: "قرارداد علیرضا";
  final: false;
  id: 1;
  number: "111";
  suppliersId: 2264;
  suppliersName: "خطیبی";
  surplus: 0;
}

// area
export interface GetSingleSearchContractTaskAreaItemShape {
  id: number;
  areaId: number;
  shareAmount: number;
  areaName: string;
}
