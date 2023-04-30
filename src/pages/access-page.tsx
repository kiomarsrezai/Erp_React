import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import AdminLayout from "components/layout/admin-layout";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import grey from "@mui/material/colors/grey";
import usePermissions from "hooks/permissions-hook";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { ChangeEvent } from "react";
import { useState } from "react";
import { AccessItemShape } from "types/access-type";
import { globalConfig } from "config/global-config";

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

function AccessPage() {
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

  return (
    <AdminLayout>
      {loading ? (
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
      ) : (
        <></>
        // <Box p={2} height={`calc(100vh - ${globalConfig.headerHeight}px)`}>
        //   <Box height="100%" overflow="auto">
        //     {data.map((item: AccessItemShape, i: number) => (
        //       <Accordion
        //         sx={{
        //           bgcolor: grey[50],
        //           borderBottom: 1,
        //           borderColor: grey[100],
        //         }}
        //         key={i}
        //         disableGutters
        //       >
        //         <AccordionSummary
        //           sx={{
        //             bgcolor: grey[200],
        //             position: "sticky",
        //             top: 0,
        //             zIndex: 10,
        //           }}
        //           expandIcon={<ExpandMoreIcon />}
        //         >
        //           <Typography>فرم {item.label}</Typography>
        //         </AccordionSummary>
        //         <AccordionDetails sx={{ m: 2 }}>
        //           {renderItem(item, item.name as string)}
        //         </AccordionDetails>
        //       </Accordion>
        //     ))}

        //     <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
        //       تایید
        //     </Button>
        //   </Box>
        // </Box>
      )}
    </AdminLayout>
  );
}

export default AccessPage;
