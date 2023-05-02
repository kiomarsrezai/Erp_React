import Box from "@mui/material/Box";
import FixedModal from "components/ui/modal/fixed-modal";
import { ReactNode, useEffect, useState } from "react";

interface AhadisProviderProps {
  children: ReactNode;
}
function AhadisProvider(props: AhadisProviderProps) {
  const { children } = props;

  const [isOpenHadisModal, setIsOpenHandisModal] = useState(false);

  useEffect(() => {
    const lastHadisShowed = localStorage.getItem("last-hadis-showed");
    const date = new Date();

    if (
      !lastHadisShowed ||
      date.getTime() - +lastHadisShowed > 24 * 60 * 60 * 1000
    ) {
      setIsOpenHandisModal(true);
      localStorage.setItem("last-hadis-showed", date.getTime().toString());
    }
  }, []);

  const generateNumber = Math.floor(Math.random() * (810 - 29)) + 29;

  return (
    <>
      {children}

      <FixedModal
        open={isOpenHadisModal}
        handleClose={() => setIsOpenHandisModal(false)}
        title="حدیت امروز"
      >
        <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Box
            component="img"
            src={`/Ahadis/810 Hadis ${
              generateNumber.toString().length === 2 ? "0" : ""
            }${generateNumber}.jpg`}
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>
      </FixedModal>
    </>
  );
}

export default AhadisProvider;
