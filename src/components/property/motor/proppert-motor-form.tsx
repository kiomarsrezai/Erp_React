import {
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PlaqueCarBox from "components/data/plaque-car-box";
import PlaqueMotorBox from "components/data/plaque-motor-box";
import PropertMotorKindInput from "components/sections/inputs/car/property-motor-kind-input";
import PropertMotorSystemInput from "components/sections/inputs/car/property-motor-system-input";
import PropertMotorTipInput from "components/sections/inputs/car/property-motor-tip-input";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { propertyMotorConfig } from "config/features/property/property-motor-config";
import { globalConfig } from "config/global-config";
import { changeInputHandler } from "helper/form-utils";
import { ChangeEvent } from "react";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";

interface PropertyMotorFormProps {
  haveSubmitedForm: boolean;
  formData: any;
  setFormData: any;
}

function PropertyMotorForm(props: PropertyMotorFormProps) {
  const { haveSubmitedForm, formData, setFormData } = props;

  // combos
  const kindMotorItems: FlotingLabelTextfieldItemsShape = [
    {
      label: "ماشین",
      value: 1,
    },
    {
      label: "موتور",
      value: 2,
    },
  ];

  //   form
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputHandler(e, setFormData);
  };

  return (
    <Card sx={{ bgcolor: "grey.200", "&:hover": { bgcolor: "grey.300" } }}>
      <CardContent sx={{ padding: "16px !important" }}>
        <Grid spacing={3} container>
          <Grid sm={6}>
            <Grid spacing={3} container>
              <Grid sm={6}>
                <TextField
                  id="number-input"
                  label="رنگ"
                  variant="outlined"
                  size="small"
                  value={formData[propertyMotorConfig.color]}
                  name={propertyMotorConfig.color}
                  onChange={onChange}
                  error={
                    !formData[propertyMotorConfig.color] && haveSubmitedForm
                  }
                  helperText={
                    !formData[propertyMotorConfig.color] &&
                    haveSubmitedForm &&
                    globalConfig.ERROR_NO_EMPTY
                  }
                  fullWidth
                />
              </Grid>
              <Grid sm={6}>
                <FlotingLabelSelect
                  items={kindMotorItems}
                  label="نوع وسیله"
                  name={propertyMotorConfig.kind_motor}
                  value={formData[propertyMotorConfig.kind_motor]}
                  setter={setFormData}
                  showError={haveSubmitedForm}
                />
              </Grid>
              <Grid sm={6}>
                <DatePicker
                  value={new Date(formData[propertyMotorConfig.year])}
                  label="مدل"
                  openTo="year"
                  format="yyyy"
                  views={["year"]}
                  onChange={(newValue) =>
                    setFormData((state: any) => ({
                      ...state,
                      [propertyMotorConfig.year]: newValue,
                    }))
                  }
                  slotProps={{
                    textField: { size: "small", fullWidth: true },
                  }}
                />
              </Grid>
              <Grid sm={6}>
                <PropertMotorTipInput
                  setter={setFormData}
                  value={formData[propertyMotorConfig.tip] as any}
                  showError={haveSubmitedForm}
                />
              </Grid>
              <Grid sm={6}>
                <PropertMotorSystemInput
                  setter={setFormData}
                  value={formData[propertyMotorConfig.system] as any}
                  showError={haveSubmitedForm}
                />
              </Grid>
              <Grid sm={6}>
                <PropertMotorKindInput
                  setter={setFormData}
                  value={formData[propertyMotorConfig.kind] as any}
                  showError={haveSubmitedForm}
                />
              </Grid>

              {/* <Grid sm={6}>
                <TextField
                  id="amount-input"
                  label="مبلغ"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={formData[propertyMotorConfig.amount]}
                  name={propertyMotorConfig.amount}
                  onChange={onChange}
                  error={
                    !formData[propertyMotorConfig.amount] && haveSubmitedForm
                  }
                  helperText={
                    !formData[propertyMotorConfig.amount] &&
                    haveSubmitedForm &&
                    globalConfig.ERROR_NO_EMPTY
                  }
                  fullWidth
                />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid sm={6}>
            <Grid spacing={3} container>
              <Grid sm={12}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {formData[propertyMotorConfig.kind_motor] === 1 ? (
                    <PlaqueCarBox />
                  ) : (
                    <PlaqueMotorBox />
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default PropertyMotorForm;
