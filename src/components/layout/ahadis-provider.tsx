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
    const dayOfWeek = new Date().getDay();

    if (!lastHadisShowed || dayOfWeek !== +lastHadisShowed) {
      setIsOpenHandisModal(true);
      localStorage.setItem("last-hadis-showed", dayOfWeek.toString());
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
        dontCloseWithBox
      >
        <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Box
            component="img"
            src={`/Ahadis/810 Hadis ${
              generateNumber.toString().length === 2 ? "0" : ""
            }${generateNumber}.jpg`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </Box>
      </FixedModal>
    </>
  );
}

export default AhadisProvider;
