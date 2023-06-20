import Box from "@mui/material/Box";
import iranFlag from "assets/images/logos/iran-flag.png";

function PlaqueMotorBox() {
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
          123
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
        58786
      </Box>
    </Box>
  );
}

export default PlaqueMotorBox;
