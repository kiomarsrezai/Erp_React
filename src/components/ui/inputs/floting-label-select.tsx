import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { globalConfig } from "config/global-config";

interface FlotingLabelTextfieldProps {
  label: string;
  name: string;
  items: FlotingLabelTextfieldItemsShape;
  value: string | number | boolean | undefined | null;
  setter?: (data: any) => void;
  manualHandleChange?: (value: any) => void;
  disabled?: boolean;
  showError?: boolean;
}

function FlotingLabelSelect(props: FlotingLabelTextfieldProps) {
  const {
    label,
    name,
    items,
    value,
    setter,
    manualHandleChange,
    disabled,
    showError,
  } = props;

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    if (manualHandleChange) {
      manualHandleChange(value);
    } else if (setter) {
      setter((prevState: any) => ({ ...prevState, [name]: value }));
    }
  };
  // select items
  const renderItems = items.map((item) => (
    <MenuItem value={item.value} key={item.value}>
      {item.label}
    </MenuItem>
  ));
  return (
    <FormControl fullWidth size="small" error={!value && showError}>
      <InputLabel id={`${name}-floting-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-floting-select-label`}
        id={`${name}-floting-select-input`}
        value={String(value === undefined || value === null ? "" : value)}
        label={label}
        onChange={handleChange}
        MenuProps={{ PaperProps: { sx: { maxHeight: 350 } } }}
        disabled={!!disabled}
      >
        {renderItems}
      </Select>
      {!value && showError && (
        <FormHelperText>{globalConfig.ERROR_NO_EMPTY}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FlotingLabelSelect;
