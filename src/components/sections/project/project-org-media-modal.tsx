import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Zoom from "react-medium-image-zoom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { useState } from "react";
import UploadFileDrop from "components/ui/inputs/upload-file-drop";
import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadApi } from "api/general/upload-general-api";
import { GetSingleOrgProjectTableItemShape } from "types/data/project/org-project-type";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { Typography } from "@mui/material";

interface ProjectOrgMediaModalProps {
  project: GetSingleOrgProjectTableItemShape;
}
function ProjectOrgMediaModal(props: ProjectOrgMediaModalProps) {
  const { project } = props;
  // tabs
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // data
  const readMutation = useQuery(["attach file", project.id], () =>
    uploadApi.read(project.id)
  );

  // upload
  const uploadMutation = useMutation(uploadApi.upload, {
    onSuccess() {
      readMutation.refetch();
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  const handleChangeFile = (file: any) => {
    uploadMutation.mutate({
      formFile: file,
      projectId: project.id,
    });
  };

  return (
    <Box p={2}>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="فایل ها" />
        <Tab label="آپلود" />
      </Tabs>
      <Box
        display={tabValue === 0 ? "block" : "none"}
        p={2}
        sx={{ height: "max-content !important" }}
      >
        {!!readMutation.data?.data.length ? (
          <ImageList cols={6}>
            <>
              {readMutation.data?.data.map((item, i) => (
                <ImageListItem key={i}>
                  <Zoom>
                    {item.fileName?.split(".")?.[
                      item.fileName?.split(".").length - 1
                    ] === "mkv" ||
                    item.fileName?.split(".")?.[
                      item.fileName?.split(".").length - 1
                    ] === "mp4" ? (
                      <video
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 2,
                        }}
                      >
                        <source
                          src={`${globalConfig.BASE_MEDIA_URL}Project/${project.id}/${item.fileName}`}
                        />
                      </video>
                    ) : (
                      <img
                        src={`${globalConfig.BASE_MEDIA_URL}Project/${project.id}/${item.fileName}`}
                        srcSet={`${globalConfig.BASE_MEDIA_URL}Project/${project.id}/${item.fileName}`}
                        alt={item.fileName}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </Zoom>
                </ImageListItem>
              ))}
            </>
          </ImageList>
        ) : (
          <Box textAlign={"center"} mt={6}>
            <Typography variant="caption">هیچ فایلی یافت نشد</Typography>
          </Box>
        )}
      </Box>
      <Box
        display={tabValue === 1 ? "block" : "none"}
        p={2}
        sx={{ height: "max-content !important" }}
      >
        <UploadFileDrop onChangeFile={handleChangeFile} />
      </Box>
    </Box>
  );
}

export default ProjectOrgMediaModal;
