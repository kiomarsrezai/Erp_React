import Chip from "@mui/material/Chip";

import { AccessItemShape } from "types/access-type";

interface AccessTreeFormBadgeProps {
  name: string | number;
  items?: AccessItemShape[];
  formData: any;
}

function AccessTreeFormBadge(props: AccessTreeFormBadgeProps) {
  const { name, items, formData } = props;
  // render
  const checkIsOkaySubItems = (
    subName: string,
    subItems: AccessItemShape[],
    checker: boolean
  ) => {
    let itsOkay: any = formData[name] === checker;

    subItems?.forEach((item: any) => {
      if (formData[`${subName}.${item.name}`] !== checker) {
        itsOkay = false;
      }

      if (item.value) {
        itsOkay = checkIsOkaySubItems(
          `${subName}.${item.name}`,
          item.value,
          checker
        );
      }
    });

    return itsOkay;
  };

  const checkIsOkayItems = (checker: boolean) => {
    let itsOkay: boolean = formData[name] === checker;

    items?.forEach((item: any) => {
      if (formData[`${name}.${item.name}`] !== checker) {
        itsOkay = false;
      }

      if (item.value) {
        itsOkay = checkIsOkaySubItems(
          `${name}.${item.name}`,
          item.value,
          checker
        );
      }
    });

    return itsOkay;
  };

  if (checkIsOkayItems(true)) {
    return (
      <Chip
        label="تمامی دسترسی های ممکن"
        variant="outlined"
        color="primary"
        size="small"
      />
    );
  }

  if (checkIsOkayItems(false)) {
    return <Chip label="بدون هیچ دسترسی" variant="outlined" size="small" />;
  }

  return (
    <Chip
      label="دسترسی خاص"
      variant="outlined"
      size="small"
      color="secondary"
    />
  );
}

export default AccessTreeFormBadge;
