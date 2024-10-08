import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Unstable_Grid2 as Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import defaultProfileImg from "assets/images/default-profile.png";
import WindowLoading from "components/ui/loading/window-loading";
import AccessTreeControlCheckboxes from "./access-tree-control-checkboxes";
import AccessTreeFormBadge from "./access-tree-form-badge";

import { AccessItemShape } from "types/access-type";
import { ChangeEvent } from "react";
import { useState } from "react";
import { UserItemShape } from "types/data/auth/users-type";
import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "api/auth/auth-api";
import { saveLicenseConfig } from "config/features/auth/auth-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";

interface AccessTreeProps {
  user?: UserItemShape;
  onCancel: () => void;
  permissionsListdata: any;
}

function AccessTree(props: AccessTreeProps) {
  const { user, onCancel, permissionsListdata } = props;

  const formatConfigsNode = (
    data: AccessItemShape,
    name: string | number
  ): any => {
    let formated = {
      [name]: user?.lisence?.split("/").includes(name.toString()),
    };
    data.value?.forEach((item: any) => {
      formated = {
        ...formated,
        ...formatConfigsNode(item, `${name}.${item.name}`),
      };
    });

    return formated;
  };

  const formatConfigs = (data: any) => {
    let formated: any = {};

    data.forEach((form: AccessItemShape) => {
      formated = { ...formated, ...formatConfigsNode(form, form.name) };
    });

    return formated;
  };

  const [formData, setFormData] = useState(formatConfigs(permissionsListdata));

  const changeChildrenFieldsToUnChecked = (
    name: string | number,
    items: AccessItemShape[]
  ) => {
    let changed: any = {};

    items.forEach((item) => {
      changed[`${name}.${item.name}`] = false;
      if (item.value) {
        const sonChanged = changeChildrenFieldsToUnChecked(
          `${name}.${item.name}`,
          item.value
        );
        changed = { ...changed, ...sonChanged };
      }
    });

    return changed;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    items: AccessItemShape[]
  ) => {
    const name = event.target.name;
    const value = event.target.checked;

    if (value) {
      let shouldTurnedItems: any = {};

      const splited: string[] = name.split(".");

      for (let i = 0; i < splited.length; i++) {
        const key = splited.slice(0, i + 1).join(".");
        shouldTurnedItems[key] = true;
      }

      setFormData((prevSatte: any) => ({ ...prevSatte, ...shouldTurnedItems }));
    } else {
      const changed = changeChildrenFieldsToUnChecked(name, items);
      setFormData((prevSatte: any) => ({
        ...prevSatte,
        ...changed,
        [name]: value,
      }));
    }
  };

  // render
  const renderItem = (item: AccessItemShape, name: string) => (
    <Stack spacing={1} direction="column" key={name}>
      <Box display="flex" gap={1} alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={formData[name]}
              onChange={(e) => handleChange(e, item.value || [])}
            />
          }
          label={<Typography variant="body2">{item.label}</Typography>}
        />
        {item.value && name.split(".").length > 1 && (
          <AccessTreeControlCheckboxes
            items={item.value}
            name={name}
            setFormData={setFormData}
          />
        )}
      </Box>
      {item.value?.map((subItem: any, i: number) => (
        <Box px={4} borderLeft={1} borderColor={grey[300]} key={i}>
          {renderItem(subItem, `${name}.${subItem.name}`)}
        </Box>
      ))}
    </Stack>
  );

  //   user card
  const saveLicenseMutation = useMutation(AuthApi.setLicense, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onCancel();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const handleSubmit = () => {
    const isOnedItems = Object.keys(formData).filter(
      (item: string) => formData[item]
    );

    saveLicenseMutation.mutate({
      [saveLicenseConfig.id]: user?.id || 0,
      [saveLicenseConfig.lisence]: isOnedItems.join("/"),
    });
  };

  const renderUserCard = (
    <Card sx={{ bgcolor: grey[200], position: "sticky", top: 0 }}>
      <CardContent>
        <CardMedia
          component="img"
          sx={{ width: "70%", height: "auto", mx: "auto" }}
          image={defaultProfileImg}
          title="user"
        />

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={3}
        >
          <Typography variant="h6">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="caption" color="GrayText">
            ( {user?.bio} )
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mt={2}
        >
          <Button onClick={handleSubmit} variant="contained">
            تایید
          </Button>
          <Button onClick={onCancel} variant="contained" color="error">
            انصراف
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Grid container columnSpacing={3} height="100%" sx={{ overflow: "auto" }}>
        <Grid lg={4}>
          <Box height="100%">{renderUserCard}</Box>
        </Grid>
        <Grid lg={8}>
          <Box height="100%">
            {permissionsListdata.map((item: AccessItemShape, i: number) => (
              <Accordion
                sx={{
                  bgcolor: grey[50],
                  borderBottom: 1,
                  borderColor: grey[100],
                }}
                key={i}
                disableGutters
              >
                <AccordionSummary
                  sx={{
                    bgcolor: grey[200],
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    borderLeft: 2,
                    borderColor: "transparent",
                    "&:hover": {
                      borderColor: grey[400],
                    },
                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width={1}
                    mr={2}
                    alignItems="center"
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <AccessTreeControlCheckboxes
                        items={item.value}
                        name={item.name}
                        setFormData={setFormData}
                        color="grey.300"
                      />

                      <Typography>فرم {item.label}</Typography>
                    </Box>

                    <AccessTreeFormBadge
                      formData={formData}
                      name={item.name}
                      items={item.value}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ m: 2 }}>
                  {renderItem(item, item.name as string)}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>

      <WindowLoading active={saveLicenseMutation.isLoading} />
    </>
  );
}

export default AccessTree;
