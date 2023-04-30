import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import usePermissions from "hooks/permissions-hook";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import defaultProfileImg from "assets/images/default-profile.png";

import { AccessItemShape } from "types/access-type";
import { ChangeEvent } from "react";
import { useState } from "react";
import { UserItemShape } from "types/data/auth/users-type";

const formatConfigsNode = (
  data: AccessItemShape,
  name: string | number
): any => {
  let formated = {
    [name]: false,
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

interface AccessTreeProps {
  user?: UserItemShape;
  onCancel: () => void;
}

function AccessTree(props: AccessTreeProps) {
  const { user, onCancel } = props;

  const { loading, data } = usePermissions();

  const [formData, setFormData] = useState(formatConfigs(data));

  const handleSubmit = () => {
    const isOnedItems = Object.keys(formData).filter(
      (item: string) => formData[item]
    );

    console.log(isOnedItems.join("/"));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
      setFormData((prevSatte: any) => ({ ...prevSatte, [name]: value }));
    }
  };

  const renderItem = (item: any, name: string) => (
    <Stack spacing={1} direction="column" key={name}>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              name={name}
              checked={formData[name]}
              onChange={handleChange}
            />
          }
          label={<Typography variant="body2">{item.label}</Typography>}
        />
      </Box>
      {item.value?.map((subItem: any, i: number) => (
        <Box px={4} borderLeft={1} borderColor={grey[300]} key={i}>
          {renderItem(subItem, `${name}.${subItem.name}`)}
        </Box>
      ))}
    </Stack>
  );

  //   user card
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
            {user?.نام} {user?.["نام خانوادگی"]}
          </Typography>
          <Typography variant="caption" color="GrayText">
            ( {user?.معرفی} )
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

  //   loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          bgcolor: grey[200],
          m: 2,
          borderRadius: 2,
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return (
    <Grid container columnSpacing={3} height="100%" sx={{ overflow: "auto" }}>
      <Grid lg={4}>
        <Box height="100%">{renderUserCard}</Box>
      </Grid>
      <Grid lg={8}>
        <Box height="100%">
          {data.map((item: AccessItemShape, i: number) => (
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
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>فرم {item.label}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ m: 2 }}>
                {renderItem(item, item.name as string)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default AccessTree;
