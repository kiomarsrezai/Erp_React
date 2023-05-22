import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { memo } from "react";

interface ProposalSearchInputProps {
  text: string;
  setText: (text: string) => void;
}
function ProposalSearchInput(props: ProposalSearchInputProps) {
  const { text, setText } = props;
  return (
    <Box sx={{ width: "80%", mx: "auto" }}>
      <TextField
        size="small"
        label="جستجو"
        value={text}
        variant="filled"
        onChange={(e) => {
          setText(e.target.value);
        }}
        fullWidth
      />
    </Box>
  );
}

export default ProposalSearchInput;
