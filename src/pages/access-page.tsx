import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AdminLayout from "components/layout/admin-layout";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";

import { grey } from "@mui/material/colors";
import { ACCESS_CONFIG } from "config/access-config";
import { useEffect, useState } from "react";

const formatConfigs = () => {
  let formated: any = {};

  ACCESS_CONFIG.forEach((form: any) => {
    formated[form.name] = false;

    form?.value?.forEach((field: any) => {
      formated[`${form.name}.${field.name}`] = false;

      field?.value?.forEach((fieldItem: any) => {
        formated[`${form.name}.${field.name}.${fieldItem.name}`] = false;
      });
    });
  });

  return formated;
};

function AccessPage() {
  const [formData, setFormData] = useState(formatConfigs());

  const handleSubmit = () => {
    const isOnedItems = Object.keys(formData).filter(
      (item: string) => formData[item]
    );

    console.log(isOnedItems.join("/"));
  };

  const renderItem = (item: any, name: string) => (
    <Stack spacing={1} direction="column" key={name}>
      <Box>
        <CheckboxLabeled
          label={item.label}
          setter={setFormData}
          name={name}
          value={formData[name]}
        />
      </Box>
      {item?.value?.map((subItem: any, i: number) => (
        <Box px={4} borderLeft={1} borderColor={grey[300]} key={i}>
          {renderItem(subItem, `${name}.${subItem.name}`)}
        </Box>
      ))}
    </Stack>
  );
  return (
    <AdminLayout>
      <Stack p={3} spacing={2}>
        {ACCESS_CONFIG.map((item: any, i: number) =>
          renderItem(item, item.name)
        )}
      </Stack>

      <Box p={2}>
        <Button onClick={handleSubmit} variant="contained">
          تایید
        </Button>
      </Box>
    </AdminLayout>
  );
}

export default AccessPage;
