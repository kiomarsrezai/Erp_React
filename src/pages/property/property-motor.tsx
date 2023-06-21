import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import PlaqueCarBox from "components/data/plaque-car-box";
import PlaqueMotorBox from "components/data/plaque-motor-box";
import PropertyMotorForm from "components/property/motor/proppert-motor-form";
import { globalConfig } from "config/global-config";
import { useEffect, useRef, useState } from "react";
import PropertyMotorButtons from "components/property/motor/proppert-motor-buttons";
import { propertyMotorFormDefaultValue } from "config/features/property/property-motor-config";

function PropertyMotor() {
  // forms
  const [formData, setFormData] = useState(propertyMotorFormDefaultValue);
  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  //   ui
  const [formHeight, setFormHeight] = useState(0);
  const boxElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setFormHeight(boxElement.current?.clientHeight || 0);
  }, []);

  return (
    <AdminLayout>
      <Box
        sx={{
          maxHeight: `calc(100vh - ${globalConfig.headerHeight}px)`,
          overflow: "hidden",
        }}
      >
        <Box ref={boxElement}>
          <PropertyMotorButtons
            formData={formData}
            setFormData={setFormData}
            setHaveSubmitedForm={setHaveSubmitedForm}
          />
        </Box>
        <Box
          sx={{
            height: `calc(100vh - ${formHeight}px)`,
            overflow: "auto",
          }}
        >
          <Box p={2}>
            <PropertyMotorForm
              formData={formData}
              setFormData={setFormData}
              haveSubmitedForm={haveSubmitedForm}
            />
          </Box>
        </Box>
      </Box>
      {/* <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={20}
        py={30}
      >
        
      </Box> */}
    </AdminLayout>
  );
}

export default PropertyMotor;
