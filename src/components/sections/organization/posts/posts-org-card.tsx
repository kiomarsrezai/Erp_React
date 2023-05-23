import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import GroupSharpIcon from "@mui/icons-material/GroupSharp";
import FixedModal from "components/ui/modal/fixed-modal";
import OrganizationPostsOrgUserListModal from "./org-users-list-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

import { grey } from "@mui/material/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { orgPostsApi } from "api/organizition/posts-otg-api";
import { orgPostsConfig } from "config/features/orginization/posts-config";
import WindowLoading from "components/ui/loading/window-loading";
import ProjectOrgEditModal from "components/sections/project/project-org-edit-modal";
import PostsOrgEditModal from "./posts-org-edit-modal";

interface OrganizationPostsOrgCardProps {
  title: string;
  id: number;
  rootId: number;
  parentId: number;
  item: any;
  isLastChild: boolean;
  area: number;
  drag: {
    id: number | null;
    changeItem: (prevState: any) => void;
    item: any;
    canDrag: (id: number, toId: number) => boolean;
  };
}
function OrganizationPostsOrgCard(props: OrganizationPostsOrgCardProps) {
  const { title, id, rootId, drag, item: itemData, isLastChild, area } = props;

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(orgPostsApi.getPosts, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.orginization.posts.getPosts,
        data
      );
    },
  });

  // confrim modal
  const [isOpenConfrimRemoveModal, setIsOpenConfrimRemoveModal] =
    useState(false);
  const onConfrimDeleteModal = () => {
    deleteMutation.mutate(id);
    onCancelDeleteModal();
  };
  const onCancelDeleteModal = () => {
    setIsOpenConfrimRemoveModal(false);
  };

  // delete item
  const deleteMutation = useMutation(orgPostsApi.deletePost, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      getDataMutation.mutate(area);
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const handleDeleteClick = () => {
    setIsOpenConfrimRemoveModal(true);
  };

  // add item
  const insertMutation = useMutation(orgPostsApi.insertPost, {
    onSuccess: () => {
      getDataMutation.mutate(area);
    },
  });

  const handleAddClick = () => {
    insertMutation.mutate({
      [orgPostsConfig.parent_ID]: id,
      [orgPostsConfig.area]: area,
    });
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
      updateMutation.mutate({
        ...drag.item,
        [orgPostsConfig.ID]: drag.id,
        [orgPostsConfig.parent_ID]: id,
      });
    }
  };

  // update modal
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const handleDoneTaskEditModal = () => {
    getDataMutation.mutate(area);
    setIsOpenUpdateModal(false);
  };

  const updateMutation = useMutation(orgPostsApi.updateProject, {
    onSuccess: () => {
      handleDoneTaskEditModal();
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

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
            <IconButton size="small" color="primary" onClick={handleAddClick}>
              <AddIcon />
            </IconButton>

            <IconButton
              size="small"
              color="primary"
              onClick={() => setIsOpenUpdateModal(true)}
            >
              <EditIcon />
            </IconButton>

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

      {/* confrim modal */}
      <ConfrimProcessModal
        text={`آیا مایل به حذف کردن  ${title} هستید ؟`}
        open={isOpenConfrimRemoveModal}
        onCancel={onCancelDeleteModal}
        onConfrim={onConfrimDeleteModal}
      />

      {/* persons */}
      <FixedModal
        open={isOpenUserListModal}
        handleClose={() => setIsOpenUserListModal(false)}
        title={`لیست اشخاص - ${title}`}
      >
        <OrganizationPostsOrgUserListModal title={title} />
      </FixedModal>

      {/* update data */}
      <FixedModal
        handleClose={() => setIsOpenUpdateModal(false)}
        open={isOpenUpdateModal}
        title="ویرایش سمت"
      >
        <PostsOrgEditModal
          onDoneTask={handleDoneTaskEditModal}
          itemData={itemData}
        />
      </FixedModal>

      {/* loading */}
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

export default OrganizationPostsOrgCard;
