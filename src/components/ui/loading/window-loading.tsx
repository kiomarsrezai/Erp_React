import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

interface WindowLoadingProps {
  active: boolean;
}
function WindowLoading(props: WindowLoadingProps) {
  const { active } = props;

  return (
    <Backdrop open={active} sx={{ zIndex: 100000 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default WindowLoading;
