import Box from "@mui/material/Box";
import iranFlag from "assets/images/logos/iran-flag.png";
import TextField from "@mui/material/TextField";

function PlaqueMotorBox() {
  const inputStyle: any = {
    fontSize: "47px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  };

  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        width: "220px",
        height: "130px",
        border: "3px solid #010000",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
      dir="ltr"
    >
      {/* top */}
      <Box
        sx={{
          display: "flex",
          height: "50%",
        }}
      >
        <Box
          sx={{
            bgcolor: "#0042ad",
            width: "20%",
            p: 0.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={"img"}
            src={iranFlag}
            sx={{
              width: "100%",
            }}
          />

          <Box>
            <Box fontSize={12} color={"white"}>
              I.R.
            </Box>
            <Box fontSize={12} color={"white"}>
              IRAN
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "80%",
            fontSize: 47,
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input type="number" defaultValue={312} style={inputStyle} />
        </Box>
      </Box>
      {/* bottom */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
          fontSize: 47,
        }}
      >
        <input type="number" defaultValue={58786} style={inputStyle} />
      </Box>
    </Box>
  );
}

export default PlaqueMotorBox;
