export const propertyMotorConfig = {
  pelak: "pelak",
  kind_motor: "kindMotorId",
  kind: "kindId",
  kind_name: "kindName",
  system: "systemId",
  system_name: "systemName",
  tip: "tipeId",
  tip_name: "tipeName",
  year: "productYear",
  color: "color",
};

export const propertyMotorUrls = {
  getData: "CarApi/CarRead",
  search: "CarApi/CarSearch",
  insert: "CarApi/CarInsert",
  update: "CarApi/CarUpdate",
  delete: "CarApi/CarDelete",

  // combos
  timCombo: "CarApi/TipeCom",
  systemCombo: "CarApi/CarSystemCom",
  kindCombo: "CarApi/CarKindCom",
};

export const propertyMotorFormDefaultValue = {
  id: undefined,
  [propertyMotorConfig.pelak]: "--_-_---_ایران_--",
  [propertyMotorConfig.kind_motor]: 1,
  [propertyMotorConfig.kind]: undefined,
  [propertyMotorConfig.kind_name]: "",
  [propertyMotorConfig.system]: undefined,
  [propertyMotorConfig.system_name]: "",
  [propertyMotorConfig.tip]: undefined,
  [propertyMotorConfig.tip_name]: "",
  [propertyMotorConfig.year]: new Date(),
  [propertyMotorConfig.color]: "",
};
