import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

import iranFlag from "assets/images/logos/iran-flag.png";
import {
  propertyMotorConfig,
  propertyMotorFormDefaultValue,
} from "config/features/property/property-motor-config";
import { onlyNumberKey } from "helper/form-utils";
import {
  ChangeEvent,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

interface PlaqueCarBoxProps {
  formData: any;
  setFormData: any;
  haveSubmitedForm: boolean;
}
function PlaqueCarBox(props: PlaqueCarBoxProps) {
  const { setFormData, formData, haveSubmitedForm } = props;

  const [state, setState] = useState(
    formData[propertyMotorConfig.pelak].split("_")
  );

  useEffect(() => {
    setFormData((prevState: any) => ({
      ...prevState,
      [propertyMotorConfig.pelak]: state.join("_"),
    }));
  }, [state]);

  useEffect(() => {
    setState(formData[propertyMotorConfig.pelak].split("_"));
  }, [formData[propertyMotorConfig.pelak]]);

  const handleChangeState1 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState: any) => {
      let newState: any = prevState;
      if (value.length < 3) {
        newState = [
          value,
          prevState[1],
          prevState[2],
          prevState[3],
          prevState[4],
        ];
      } else if (prevState[0] === "--") {
        newState = [
          value.replaceAll("-", ""),
          prevState[1],
          prevState[2],
          prevState[3],
          prevState[4],
        ];
      }

      return newState;
    });
  };

  const handleChangeState2 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prevState: any) => {
      let newState: any = prevState;

      if (value.length < 2) {
        newState = [
          prevState[0],
          value,
          prevState[2],
          prevState[3],
          prevState[4],
        ];
      } else if (prevState[1] === "-") {
        newState = [
          prevState[0],
          value.replaceAll("-", ""),
          prevState[2],
          prevState[3],
          prevState[4],
        ];
      }

      return newState;
    });
  };

  const handleChangeState3 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState((prevState: any) => {
      let newState: any = prevState;

      if (value.length < 4) {
        newState = [
          prevState[0],
          prevState[1],
          value,
          prevState[3],
          prevState[4],
        ];
      } else if (prevState[2] === "---") {
        newState = [
          prevState[0],
          prevState[1],
          value.replaceAll("-", ""),
          prevState[3],
          prevState[4],
        ];
      }

      return newState;
    });
  };

  const handleChangeState4 = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setState((prevState: any) => {
      let newState: any = prevState;

      if (value.length < 3) {
        newState = [
          prevState[0],
          prevState[1],
          prevState[2],
          prevState[3],
          value,
        ];
      } else if (prevState[4] === "--") {
        newState = [
          prevState[0],
          prevState[1],
          prevState[2],
          prevState[3],
          value.replaceAll("-", ""),
        ];
      }

      return newState;
    });
  };

  return (
    <Box>
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
            type="text"
            value={state[0]}
            onChange={handleChangeState1}
            onKeyPress={onlyNumberKey}
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
            value={state[1]}
            onChange={handleChangeState2}
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
            onChange={handleChangeState3}
            onKeyPress={onlyNumberKey}
            value={state[2]}
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
              type="text"
              value={state[4]}
              onChange={handleChangeState4}
              onKeyPress={onlyNumberKey}
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

      {(formData[propertyMotorConfig.pelak].includes("-") ||
        formData[propertyMotorConfig.pelak].length < "17") &&
        haveSubmitedForm && (
          <FormHelperText error sx={{ textAlign: "center", mt: 2 }}>
            پلاک معتبر نیست
          </FormHelperText>
        )}
    </Box>
  );
}

export default PlaqueCarBox;
