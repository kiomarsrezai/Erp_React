import {
  Box,
  Card,
  CardContent,
  Unstable_Grid2 as Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import PlaqueCarBox from "components/data/plaque-car-box";
import PlaqueMotorBox from "components/data/plaque-motor-box";
import PropertMotorKindInput from "components/sections/inputs/car/property-motor-kind-input";
import PropertMotorSystemInput from "components/sections/inputs/car/property-motor-system-input";
import PropertMotorTipInput from "components/sections/inputs/car/property-motor-tip-input";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import {
  defaultPlak,
  propertyMotorConfig,
} from "config/features/property/property-motor-config";
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

  const handleKindChange = (value: number) => {
    setFormData((prevState: any) => {
      return {
        ...prevState,
        [propertyMotorConfig.kind_motor]: value,
        [propertyMotorConfig.pelak]:
          value === 1 ? defaultPlak.car : defaultPlak.motor,
      };
    });
  };

  return (
    <Card sx={{ bgcolor: "grey.200" }}>
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
                  manualHandleChange={handleKindChange}
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
                  maxDate={new Date()}
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
            </Grid>
          </Grid>
          <Grid sm={6}>
            <Grid spacing={3} container height={"100%"}>
              <Grid sm={12} height={"100%"}>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                >
                  {formData[propertyMotorConfig.kind_motor] === 1 ? (
                    <PlaqueCarBox
                      formData={formData}
                      setFormData={setFormData}
                      haveSubmitedForm={haveSubmitedForm}
                    />
                  ) : (
                    <PlaqueMotorBox
                      formData={formData}
                      setFormData={setFormData}
                      haveSubmitedForm={haveSubmitedForm}
                    />
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
