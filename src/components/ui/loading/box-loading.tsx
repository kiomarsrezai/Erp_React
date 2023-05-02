import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function BoxLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        bgcolor: "grey.200",
        m: 2,
        borderRadius: 2,
      }}
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}

export default BoxLoading;
