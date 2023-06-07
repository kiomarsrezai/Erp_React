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
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

interface ProjectMeetingsEditorCardProps {
  commiteDetailItem?: GetSingleCommiteDetailModalShape | any;
  insertMode: boolean;
  setInsertMode: (state: any) => void;
  formData: any;
  maxRow?: number;
}

function ProjectMeetingsEditorCard(props: ProjectMeetingsEditorCardProps) {
  const { commiteDetailItem, insertMode, formData, setInsertMode, maxRow } =
    props;

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

  const insertMutation = useMutation(mettingsProjectApi.insertCommiteDetail, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setInsertMode(false);
      commiteDetailModalMutation.mutate(formData.id);
    },
  });

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
    if (insertMode) {
      // insert
      insertMutation.mutate({
        row: values.row,
        commiteId: formData.id,
        description: description,
        projectId: 6,
      });
    }
  };

  return (
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
                value={commiteDetailItem?.projectName || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
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
              >
                WBS
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={insertMode}
                fullWidth
              >
                تایید کنندگان
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ bgcolor: red[400] }}
                disabled={insertMode}
                fullWidth
              >
                حذف
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProjectMeetingsEditorCard;
