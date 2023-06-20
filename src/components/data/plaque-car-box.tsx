import Box from "@mui/material/Box";
import iranFlag from "assets/images/logos/iran-flag.png";

function PlaqueCarBox() {
  return (
    <Box
      sx={{
        bgcolor: "#ffffff",
        width: "400px",
        height: "90px",
        border: "3px solid #010000",
        borderRadius: 3,
        display: "flex",
        overflow: "hidden",
      }}
      dir="ltr"
    >
      {/* left */}
      <Box
        sx={{
          bgcolor: "#0042ad",
          width: "10%",
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
      {/* center */}
      <Box
        sx={{
          width: "70%",
          fontSize: 47,
          p: 1,
          //   bgcolor: "yellow",
          // fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="number"
          defaultValue={14}
          style={{
            fontSize: "47px",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
          }}
        />
        <input
          type="text"
          defaultValue={"د"}
          style={{
            fontSize: "47px",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
          }}
        />
        <input
          type="number"
          defaultValue={123}
          style={{
            fontSize: "47px",
            textAlign: "center",
            color: "rgba(0, 0, 0, 0.87)",
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
          }}
        />
      </Box>

      {/* right */}
      <Box
        sx={{
          width: "20%",
          p: 0.5,
          display: "flex",
          flexDirection: "column",
          fontSize: 23,
          fontWeight: "bold",
          borderRight: "3px solid #010000",
          //   justifyContent: "space-between",
          gap: 1,
          alignItems: "center",
          //   bgcolor: "red",
        }}
      >
        <Box>ایران</Box>

        <Box>
          <input
            type="number"
            defaultValue={14}
            style={{
              fontSize: "23px",
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.87)",
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              fontWeight: "bold",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PlaqueCarBox;
