import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface FlotingLabelTextfieldProps {
  label: string;
  name: string;
  items: FlotingLabelTextfieldItemsShape;
  value: string | number | boolean;
  setter: (data: any) => void;
  disabled?: boolean;
}

function FlotingLabelSelect(props: FlotingLabelTextfieldProps) {
  const { label, name, items, value, setter, disabled } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    setter((prevState: any) => ({ ...prevState, [name]: value }));
  };
  // select items
  const renderItems = items.map((item) => (
    <MenuItem value={item.value} key={item.value}>
      {item.label}
    </MenuItem>
  ));
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-floting-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-floting-select-label`}
        id={`${name}-floting-select-input`}
        value={value?.toString()}
        label={label}
        onChange={handleChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
        disabled={!!disabled}
      >
        {renderItems}
      </Select>
    </FormControl>
  );
}

export default FlotingLabelSelect;
