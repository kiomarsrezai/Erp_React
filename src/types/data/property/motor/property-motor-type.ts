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
