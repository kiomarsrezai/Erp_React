import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowLoading from "components/ui/loading/window-loading";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ProjectOrgMediaModal from "./project-org-media-modal";

import { grey } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { orgProjectApi } from "api/project/org-project-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useState, FormEvent } from "react";
import { createPortal } from "react-dom";
import { TextField } from "@mui/material";
import ProjectOrgEditModal from "./project-org-edit-modal";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface ProjectOrgCardProps {
  title: string;
  id: number;
  rootId: number;
  parentId: number;
  code: string;
  item: any;
  drag: {
    id: number | null;
    changeItem: (prevState: any) => void;
    item: any;
    canDrag: (id: number, toId: number) => boolean;
  };
}
function ProjectOrgCard(props: ProjectOrgCardProps) {
  const { title, id, rootId, code, drag, parentId, item: itemData } = props;

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

  // edit modal - update item
  const [updateModal, setUpdateModal] = useState(false);
  const handleOpenUpdateModal = () => {
    setUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModal(false);
  };

  const handleDoneTaskEditModal = () => {
    getDataMutation.mutate({
      [orgProjectConfig.ID]: rootId,
    });
    handleCloseUpdateModal();
  };

  const updateMutation = useMutation(orgProjectApi.updateProject, {
    onSuccess: () => {
      handleDoneTaskEditModal();
    },
    onError: () => {
      enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
        variant: "error",
      });
    },
  });

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
      updateMutation.mutate({
        ...drag.item,
        [orgProjectConfig.ID]: drag.id,
        [orgProjectConfig.parent_ID]: id,
      });
    }
  };

  // media
  const [mediaModal, setMediaModal] = useState(false);
  const handleCloseMediaModal = () => {
    setMediaModal(false);
  };

  const handleOpenMediaModal = () => {
    setMediaModal(true);
  };

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
            <IconButton size="small" color="primary" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>

            <IconButton
              size="small"
              color="primary"
              onClick={handleOpenUpdateModal}
            >
              <EditIcon />
            </IconButton>
            <IconButton size="small" color="primary">
              <FmdGoodIcon />
            </IconButton>
            <IconButton size="small" color="primary">
              <HandshakeIcon />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              onClick={handleOpenMediaModal}
            >
              <PermMediaIcon />
            </IconButton>

            {rootId !== id && (
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

      {/* update data */}
      <FixedModal
        handleClose={handleCloseUpdateModal}
        open={updateModal}
        title="ویرایش پروژه"
      >
        <ProjectOrgEditModal
          onDoneTask={handleDoneTaskEditModal}
          itemData={itemData}
        />
      </FixedModal>

      {/* media */}
      <FixedModal
        handleClose={handleCloseMediaModal}
        open={mediaModal}
        title="رسانه های پروژه"
      >
        <ProjectOrgMediaModal />
      </FixedModal>

      {/* loading */}
      {createPortal(
        <WindowLoading
          active={
            insertMutation.isLoading ||
            deleteMutation.isLoading ||
            updateMutation.isLoading ||
            getDataMutation.isLoading
          }
        />,
        document.body
      )}
    </>
  );
}

export default ProjectOrgCard;
