import IconButton from "@mui/material/IconButton";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import Box from "@mui/material/Box";

import { AccessItemShape } from "types/access-type";

interface AccessTreeControlCheckboxesProps {
  setFormData: (state: any) => void;
  name: string | number;
  items?: AccessItemShape[];
  color?: string;
}

function AccessTreeControlCheckboxes(props: AccessTreeControlCheckboxesProps) {
  const { setFormData, name, items, color } = props;
  //   render
  const changeFieldsCheckedItems = (
    subName: string,
    subItems: AccessItemShape[],
    check: boolean
  ) => {
    let changed: any = {};

    subItems.forEach((item: any) => {
      changed[`${subName}.${item.name}`] = check;
      if (item.value) {
        changed = {
          ...changed,
          ...changeFieldsCheckedItems(
            `${subName}.${item.name}`,
            item.value,
            check
          ),
        };
      }
    });

    return changed;
  };

  const changeFieldsChecked = (check: boolean) => {
    let changed: any = {
      [name]: check,
    };

    items?.forEach((item: any) => {
      changed[`${name}.${item.name}`] = check;
      if (item.value) {
        changed = {
          ...changed,
          ...changeFieldsCheckedItems(
            `${name}.${item.name}`,
            item.value,
            check
          ),
        };
      }
    });

    setFormData((state: any) => ({
      ...state,
      ...changed,
    }));
  };

  return (
    <Box
      display="flex"
      gap={1}
      alignItems="center"
      sx={{ bgcolor: color || "grey.200", borderRadius: 2 }}
    >
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          changeFieldsChecked(true);
        }}
      >
        <PlaylistAddCheckIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          changeFieldsChecked(false);
        }}
      >
        <PlaylistRemoveIcon />
      </IconButton>
    </Box>
  );
}

export default AccessTreeControlCheckboxes;
