import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { grey, blue, red } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { mettingsProjectConfig } from "config/features/project/meetings-project-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import {
  GetSingleCommiteDetailModalShape,
  GetSingleCommiteDetailProjectModalShape,
} from "types/data/project/commite-project-type";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import CommiteMettingsProject from "./commite-mettings-project";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import CommiteWbsModal1 from "./wbs/commite-wbs-modal1";
import CommiteConfirmationModal1 from "./confirmation/commite-confirmation-modal1";

interface ProjectMeetingsEditorCardProps {
  commiteDetailItem?: GetSingleCommiteDetailModalShape | any;
  insertMode: boolean;
  setInsertMode: (state: any) => void;
  formData: any;
  maxRow?: number;
  checkUnickRow: (
    row: number,
    commiteDetailItem: GetSingleCommiteDetailModalShape
  ) => boolean;
}

function ProjectMeetingsEditorCard(props: ProjectMeetingsEditorCardProps) {
  const {
    commiteDetailItem,
    insertMode,
    formData,
    setInsertMode,
    maxRow,
    checkUnickRow,
  } = props;

  // refresh base data mutation
  const queryClient = useQueryClient();
  const commiteDetailModalMutation = useMutation(
    mettingsProjectApi.getCommiteDetail,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          reactQueryKeys.project.mettings.getCommitesDetailModal,
          data
        );
      },
    }
  );

  // form manage
  const formSchema = yup.object({
    [mettingsProjectConfig.row]: yup.number().required(),
  });

  const [description, setDescription] = useState(
    commiteDetailItem?.description || ""
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitHandler = (values: any) => {
    const isUnick = checkUnickRow(values.row, commiteDetailItem);
    if (!isUnick) {
      return enqueueSnackbar("بند انتخاب شده تکراری است", {
        variant: "error",
      });
    }

    if (insertMode) {
      // insert
      insertMutation.mutate({
        row: values.row,
        commiteId: formData.id,
        description: description,
        projectId: activeProjectId,
      });
    } else {
      updateMutation.mutate({
        row: values.row,
        id: commiteDetailItem.id,
        description: description,
        projectId: activeProjectId,
      });
    }
  };

  // project
  const [isOpenProjectList, setIsOpenProjectList] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(
    commiteDetailItem?.projectId || null
  );
  const [activeProjectName, setActiveProjectName] = useState(
    commiteDetailItem?.projectName || ""
  );

  const handleClickSearchProject = () => {
    projectDataMutation.mutate();
    setIsOpenProjectList(true);
  };

  const handleDoneSelectProject = (
    project: GetSingleCommiteDetailProjectModalShape
  ) => {
    setIsOpenProjectList(false);
    setActiveProjectId(project.id);
    setActiveProjectName(project.projectName);
  };

  const projectDataMutation = useMutation(
    mettingsProjectApi.dataProjectCommiteDetail
  );

  // insert
  const insertMutation = useMutation(mettingsProjectApi.insertCommiteDetail, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setInsertMode(false);
      commiteDetailModalMutation.mutate(formData.id);
    },
  });

  // update
  const updateMutation = useMutation(mettingsProjectApi.updateCommiteDetail, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      commiteDetailModalMutation.mutate(formData.id);
    },
  });

  // delete
  const [isOpenConfrimDelete, setIsOpenConfrimDelete] = useState(false);

  const deleteMutation = useMutation(mettingsProjectApi.deleteCommiteDetail, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      commiteDetailModalMutation.mutate(formData.id);
    },
  });

  const handleConfrimDelete = () => {
    deleteMutation.mutate({
      id: commiteDetailItem.id,
    });
  };

  const handleDeleteClick = () => {
    setIsOpenConfrimDelete(true);
  };

  // wbs
  const [isOpenWbsModal, setIsOpenWbsModal] = useState(false);
  const handleClickWbs = () => {
    wbsDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    setIsOpenWbsModal(true);
  };

  const wbsDataMutation = useMutation(mettingsProjectApi.wbsDataModal);

  // confirmation
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);
  const handleClickConfirmation = () => {
    confirmationDataMutation.mutate({ commiteDetailId: commiteDetailItem.id });
    setIsOpenConfirmationModal(true);
  };

  const confirmationDataMutation = useMutation(
    mettingsProjectApi.confirmationDataModal
  );

  return (
    <>
      <Card
        sx={{ bgcolor: grey[100] }}
        elevation={0}
        component={"form"}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid lg={8}>
              <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "heading",
                    "|",
                    "bold",
                    "italic",
                    "|",
                    "numberedList",
                    "|",
                    "undo",
                    "redo",
                  ],
                  language: "fa",
                }}
                data={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  // console.log({ event, editor, data });
                  setDescription(data);
                }}
              />
            </Grid>

            <Grid lg={4}>
              <Stack spacing={1}>
                <TextField
                  id="row-input"
                  label="بند"
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register(mettingsProjectConfig.row)}
                  error={!!errors[mettingsProjectConfig.row]}
                  helperText={
                    (errors[mettingsProjectConfig.row]?.message || "") as any
                  }
                  defaultValue={
                    (commiteDetailItem?.[mettingsProjectConfig.row] ||
                      maxRow) as any
                  }
                  autoComplete="off"
                />

                <TextField
                  id="username-input"
                  label="پروژه"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled
                  value={activeProjectName}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickSearchProject}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleSaveClick}
                  fullWidth
                  type="submit"
                >
                  ثبت
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={insertMode}
                  fullWidth
                  onClick={handleClickWbs}
                >
                  WBS
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={insertMode}
                  fullWidth
                  onClick={handleClickConfirmation}
                >
                  تایید کنندگان
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ bgcolor: red[400] }}
                  disabled={insertMode}
                  onClick={handleDeleteClick}
                  fullWidth
                >
                  حذف
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* wbs */}
      <FixedModal
        handleClose={() => setIsOpenWbsModal(false)}
        // maxWidth="sm"
        // maxHeight="70%"
        // loading={projectDataMutation.isLoading}
        open={isOpenWbsModal}
        loading={wbsDataMutation.isLoading}
        title={`wbs - بند ${
          commiteDetailItem?.[mettingsProjectConfig.row] || maxRow
        }`}
      >
        <CommiteWbsModal1
          data={wbsDataMutation.data?.data || []}
          commiteDetailItem={commiteDetailItem}
        />
      </FixedModal>

      {/* confrmition */}
      <FixedModal
        handleClose={() => setIsOpenConfirmationModal(false)}
        open={isOpenConfirmationModal}
        loading={confirmationDataMutation.isLoading}
        title={`تاییدکنندگان - بند ${
          commiteDetailItem?.[mettingsProjectConfig.row] || maxRow
        }`}
      >
        <CommiteConfirmationModal1
          data={confirmationDataMutation.data?.data || []}
          commiteDetailItem={commiteDetailItem}
        />
      </FixedModal>

      {/* delete */}
      <ConfrimProcessModal
        onCancel={() => setIsOpenConfrimDelete(false)}
        onConfrim={handleConfrimDelete}
        open={isOpenConfrimDelete}
        text={`آیا مایل به حذف بند ${
          commiteDetailItem?.[mettingsProjectConfig.row] || maxRow
        } هستید ؟`}
      />

      {/* select project */}
      <FixedModal
        handleClose={() => setIsOpenProjectList(false)}
        maxWidth="sm"
        maxHeight="70%"
        loading={projectDataMutation.isLoading}
        open={isOpenProjectList}
      >
        <CommiteMettingsProject
          data={projectDataMutation.data?.data || []}
          onDoneTask={handleDoneSelectProject}
        />
      </FixedModal>
    </>
  );
}

export default ProjectMeetingsEditorCard;
