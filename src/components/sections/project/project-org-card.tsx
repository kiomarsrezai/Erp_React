import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import Box from "@mui/material/Box";

import { grey } from "@mui/material/colors";

function ProjectOrgCard() {
  return (
    <Box display="flex" justifyContent="center">
      <Card
        variant="outlined"
        sx={{ width: 300, borderColor: grey[300], bgcolor: grey[100] }}
      >
        <CardContent>
          <Typography variant="body1">
            پروژه ساخت شهر بازی علیرضا و برادران به جز برادران و علیرضا
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small">
            <CreateIcon color="primary" />
          </IconButton>
          <IconButton size="small">
            <CreateIcon color="primary" />
          </IconButton>
          <IconButton size="small">
            <CreateIcon color="primary" />
          </IconButton>
          <IconButton size="small">
            <CreateIcon color="primary" />
          </IconButton>
          <IconButton size="small">
            <CreateIcon color="primary" />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ProjectOrgCard;
