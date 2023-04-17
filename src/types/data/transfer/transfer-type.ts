export interface GetSingleTransferItemShape {
  description: string;
  code: string;
  mosavab: number;
  codeAcc: number;
  titleAcc: string;
}

export interface GetSingleTransferModalDataItemShape {
  markazHazine: string; // عنوان مرکز هزینه
  idTafsily5: string; // مرکز هزینه
  idMoein: string; // معین
  idKol: string; // کل
  name: string; // نام سرفصل
  expense: number; // عملکرد
}
