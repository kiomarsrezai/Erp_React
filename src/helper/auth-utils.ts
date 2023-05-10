import { FlotingLabelTextfieldItemsShape } from "types/input-type";

export const joinPermissions = (x: (string | number)[]) => {
  return x.join(".");
};

export const filedItemsGuard = (
  items: FlotingLabelTextfieldItemsShape,
  licenses: string | null,
  permissonBase: string
): FlotingLabelTextfieldItemsShape => {
  return items.filter((item) =>
    licenses?.split("/").includes(`${permissonBase}.${item.value}`)
  );
};

export const gitFirstGoodItem = (
  items: any[],
  licenses: string | null,
  permissonBase: string
): any => {
  return items.filter((item) =>
    licenses?.split("/").includes(`${permissonBase}.${item.id}`)
  )?.[0];
};

export const checkHavePermission = (
  licenses: string | null,
  permissionNames: string[],
  permissonBase: string
) => {
  const havePermissions = permissionNames.filter((name) =>
    licenses?.split("/").includes(`${permissonBase}.${name}`)
  );

  return havePermissions.length === permissionNames.length;
};

export const getPermissionWithLevel = (
  permissionName: string,
  level: number
) => {
  return `${permissionName}-${level}`;
};
