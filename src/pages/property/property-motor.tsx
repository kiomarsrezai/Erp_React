import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import PlaqueCarBox from "components/data/plaque-car-box";
import PlaqueMotorBox from "components/data/plaque-motor-box";

function PropertyMotor() {
  return (
    <AdminLayout>
      <Box display={"flex"} justifyContent={"center"} py={30}>
        {/* <PlaqueCarBox /> */}
        <PlaqueMotorBox />
      </Box>
    </AdminLayout>
  );
}

export default PropertyMotor;
