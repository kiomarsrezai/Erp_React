import Box from "@mui/material/Box";
import iranFlag from "assets/images/logos/iran-flag.png";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { propertyMotorConfig } from "config/features/property/property-motor-config";
import { onlyNumberKey } from "helper/form-utils";

interface PlaqueMotorBoxProps {
  formData: any;
  setFormData: any;
}
function PlaqueMotorBox(props: PlaqueMotorBoxProps) {
  const { setFormData, formData } = props;

  const inputStyle: any = {
    fontSize: "47px",
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.87)",
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  };

  const [state, setState] = useState(
    formData[propertyMotorConfig.pelak].split("_")
  );

  useEffect(() => {
    setFormData((prevState: any) => ({
      ...prevState,
      [propertyMotorConfig.pelak]: state.join("_"),
    }));
  }, [state]);

  const handleChangeState1 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState: any) => {
      let newState: any = prevState;
      if (value.length < 4) {
        newState = [value, prevState[1]];
      } else if (prevState[0] === "---") {
        newState = [value.replaceAll("-", ""), prevState[1]];
      }

      return newState;
    });
  };

  const handleChangeState2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState: any) => {
      let newState: any = prevState;

      if (value.length < 6) {
        newState = [prevState[0], value];
      } else if (prevState[1] === "-----") {
        newState = [prevState[0], value.replaceAll("-", "")];
      }

      return newState;
    });
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
          <input
            type="text"
            defaultValue={312}
            style={inputStyle}
            value={state[0]}
            onChange={handleChangeState1}
            onKeyPress={onlyNumberKey}
          />
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
        <input
          type="text"
          style={inputStyle}
          value={state[1]}
          onChange={handleChangeState2}
          onKeyPress={onlyNumberKey}
        />
      </Box>
    </Box>
  );
}

export default PlaqueMotorBox;
