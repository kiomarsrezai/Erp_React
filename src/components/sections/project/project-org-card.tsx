import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { grey } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orgProjectApi } from "api/project/org-project-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { orgProjectConfig } from "config/features/project/org-project-config";
import WindowLoading from "components/ui/loading/window-loading";

interface ProjectOrgCardProps {
  title: string;
  id: number;
  rootId: number;
}
function ProjectOrgCard(props: ProjectOrgCardProps) {
  const { title, id, rootId } = props;

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(orgProjectApi.getProject, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.project.org.getProject, data);
    },
  });

  // add item
  const insertMutation = useMutation(orgProjectApi.addProject, {
    onSuccess: () => {
      getDataMutation.mutate({ [orgProjectConfig.ID]: rootId });
    },
  });

  const handleAddClick = () => {
    insertMutation.mutate({ [orgProjectConfig.ID]: id });
  };

  // delete item
  const deleteMutation = useMutation(orgProjectApi.deleteProject, {
    onSuccess: () => {
      getDataMutation.mutate({ [orgProjectConfig.ID]: rootId });
    },
  });

  const handleDeleteClick = () => {
    deleteMutation.mutate({ [orgProjectConfig.ID]: id });
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Card
          variant="outlined"
          sx={{ width: 300, borderColor: grey[300], bgcolor: grey[100] }}
        >
          <CardContent>
            <Typography variant="body1">{title}</Typography>
          </CardContent>
          <CardActions>
            <IconButton size="small" color="primary" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>

      <WindowLoading
        active={
          insertMutation.isLoading ||
          deleteMutation.isLoading ||
          getDataMutation.isLoading
        }
      />
    </>
  );
}

export default ProjectOrgCard;
