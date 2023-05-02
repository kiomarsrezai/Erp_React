import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupSharpIcon from "@mui/icons-material/GroupSharp";
import FixedModal from "components/ui/modal/fixed-modal";
import OrganizationPostsOrgUserListModal from "./org-users-list-modal";

import { grey } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orgProjectApi } from "api/project/org-project-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useState } from "react";

interface OrganizationPostsOrgCardProps {
  title: string;
  id: number;
  rootId: number;
  parentId: number;
  item: any;
  isLastChild: boolean;
  drag: {
    id: number | null;
    changeItem: (prevState: any) => void;
    item: any;
    canDrag: (id: number, toId: number) => boolean;
  };
}
function OrganizationPostsOrgCard(props: OrganizationPostsOrgCardProps) {
  const { title, id, rootId, drag, item: itemData, isLastChild } = props;

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(orgProjectApi.getProject, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.project.org.getProject, data);
    },
  });

  // delete item
  const deleteMutation = useMutation(orgProjectApi.deleteProject, {
    onSuccess: () => {
      getDataMutation.mutate({ [orgProjectConfig.ID]: rootId });
    },
  });

  const handleDeleteClick = () => {
    deleteMutation.mutate({ [orgProjectConfig.ID]: id });
  };

  // drag
  const [dragEntered, setDragEntered] = useState(false);

  const handleDragStart = (e: any) => {
    drag.changeItem(itemData);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (drag.canDrag(drag.id || 0, id)) {
      setDragEntered(true);
    }
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEntered(false);
  };

  const handleDrop = (e: any) => {
    setDragEntered(false);
    drag.changeItem(itemData);

    if (drag.canDrag(drag.id || 0, id)) {
    }
  };

  // user list modal
  const [isOpenUserListModal, setIsOpenUserListModal] = useState(false);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Card
          draggable={true}
          variant="outlined"
          sx={{
            width: 300,
            borderColor: grey[400],
            borderWidth: 1,
            bgcolor: dragEntered && drag.id !== id ? grey[400] : grey[200],
            "&:hover": {
              borderColor: grey[600],
            },
          }}
          onDragStart={handleDragStart}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CardContent onDragEnter={(e) => e.stopPropagation()}>
            <Typography variant="body1">{title}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setIsOpenUserListModal(true)}
            >
              <GroupSharpIcon />
            </IconButton>

            {rootId !== id && isLastChild && (
              <IconButton
                size="small"
                color="error"
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </Box>

      <FixedModal
        open={isOpenUserListModal}
        handleClose={() => setIsOpenUserListModal(false)}
        title={`لیست اشخاص - ${title}`}
      >
        <OrganizationPostsOrgUserListModal title={title} />
      </FixedModal>
    </>
  );
}

export default OrganizationPostsOrgCard;
