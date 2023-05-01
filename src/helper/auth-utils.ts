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
