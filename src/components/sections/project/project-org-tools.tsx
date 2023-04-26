import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import { blue } from "@mui/material/colors";

interface ProjectOrgToolsProps {
  handleChangeZoom: (prevState: any) => void;
  zoom: number;
}
function ProjectOrgTools(props: ProjectOrgToolsProps) {
  const { zoom, handleChangeZoom } = props;

  const handleChangeZoomSlider = (
    event: Event,
    newValue: number | number[]
  ) => {
    handleChangeZoom(newValue as number);
  };

  const handleZoomClick = () => {
    if (zoom >= 1.5) {
      return;
    }
    handleChangeZoom((state: number) => state + 0.05);
  };
  const handleZoomOutClick = () => {
    if (zoom <= 0.5) {
      return;
    }
    handleChangeZoom((state: number) => state - 0.05);
  };
  return (
    <Paper
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
        bgcolor: blue[50],
        zIndex: 10,
        width: 300,
        p: 1,
      }}
    >
      <Stack spacing={0} direction="row" alignItems="center">
        <IconButton size="small" color="primary" onClick={handleZoomClick}>
          <ZoomInIcon />
        </IconButton>
        <Slider
          size="small"
          value={zoom}
          onChange={handleChangeZoomSlider}
          min={0.5}
          max={1.5}
          step={0.05}
        />

        <IconButton size="small" color="primary" onClick={handleZoomOutClick}>
          <ZoomOutIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}

export default ProjectOrgTools;
