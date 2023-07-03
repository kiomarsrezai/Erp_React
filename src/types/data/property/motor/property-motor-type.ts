export interface ReadPopertyMotorItemShape {
  id: 0;
  pelak: "string";
  kindMotorId: 0;
  kindId: 0;
  kindName: "string";
  systemId: 0;
  systemName: "string";
  tipeId: 0;
  tipeName: "string";
  productYear: "string";
  color: "string";
}

export interface SearchPopertyMotorItemShape {
  id: 1;
  pelak: "75 م 166 ایران 16";
  kindMotorId: 1;
  kindId: 1;
  kindName: "پراید";
  systemId: 1;
  systemName: "هاچ بک";
  tipeId: 1;
  tipeName: "فرمان هیدرولیک";
  productYear: "1383";
  color: "سفید";
}

export interface InsertPopertyMotorItemShape {
  pelak: "string";
  kindMotorId: 0;
  kindId: 0;
  systemId: 0;
  tipeId: 0;
  productYear: "string";
  color: "string";
}

export interface GetSingleCarTipComboItemShape {
  tipeName: string;
  id: number;
}

export interface GetSingleCarSystemComboItemShape {
  systemName: string;
  id: number;
}

export interface GetSingleCarKindComboItemShape {
  kindName: string;
  id: number;
}
