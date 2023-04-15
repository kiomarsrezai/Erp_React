import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import { ChangeEvent } from "react";

interface CheckboxLabeledProps {
  label: string;
  name: string;
  value: any;
  setter: (data: any) => void;
}
function CheckboxLabeled(props: CheckboxLabeledProps) {
  const { label, name, value, setter } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.checked;

    setter((prevState: any) => ({ ...prevState, [name]: value }));
  };
  return (
    <FormControlLabel
      control={<Checkbox name={name} checked={value} onChange={handleChange} />}
      label={<Typography variant="body2">{label}</Typography>}
    />
  );
}

export default CheckboxLabeled;
