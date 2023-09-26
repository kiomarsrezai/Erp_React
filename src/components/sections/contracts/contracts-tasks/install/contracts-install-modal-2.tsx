import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { compareAsc, format, newDate, add } from "date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { creditRequestTableConfig } from "config/features/credit/credit-request-config";
import { CreditReadRequestTableShape } from "types/data/credit/credit-request-type";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import AreaInput from "components/sections/inputs/area-input";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { NumericFormat } from "react-number-format";

interface Props {
  onDoneTask: () => void;
  formData: any;
}

export default function ContractsInstallModal2(props: Props) {
  const { onDoneTask, formData } = props;

  const [modalData, setModalData] = useState({
    date: new Date(),
    count: 0,
    price: 0,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setModalData((state: any) => ({
      ...state,
      [name]: value,
    }));
  };

  // submit

  const submitMutation = useMutation(contractsTasksApi.insertInstall);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const items = [];

    for (let i = 0; i < modalData.count; i++) {
      const initNewDate = add(new Date(modalData.date as any), {
        months: i - 1,
        days: 1,
      });

      const date = format(initNewDate, "yyyy/MM/dd");
      const [year, month, day] = date.split("/");

      items.push(
        submitMutation.mutateAsync({
          contractId: formData.id,
          date: newDate(Number(year), Number(month), Number(day)),
          amount: Number(String(modalData.price).replaceAll(",", "")),
          month: +month,
          yearName: +year,
        })
      );
    }

    await Promise.all(items);
    onDoneTask();
  };
  return (
    <Box p={2} component="form" onSubmit={handleSubmit}>
      <Grid spacing={3} justifyContent={"center"} container>
        <Grid sm={8}>
          <DatePicker
            value={modalData.date}
            label="تاریخ شروع"
            onChange={(newValue: any) =>
              setModalData((state: any) => ({
                ...state,
                date: newValue,
              }))
            }
            slotProps={{
              textField: { size: "small", fullWidth: true },
            }}
          />
        </Grid>

        <Grid sm={8}>
          <TextField
            id="count-input"
            label="تعداد اقساط"
            variant="outlined"
            size="small"
            type="number"
            value={modalData.count}
            name={"count"}
            onChange={onChange}
            fullWidth
          />
        </Grid>

        <Grid sm={8}>
          <NumericFormat
            customInput={TextField}
            id="price-request-input"
            label="مبلغ"
            variant="outlined"
            size="small"
            value={modalData.price}
            name={"price"}
            onChange={onChange}
            allowLeadingZeros
            thousandSeparator=","
            fullWidth
          />
        </Grid>

        <Grid sm={8}>
          <LoadingButton
            loading={false}
            variant="contained"
            color="primary"
            type="submit"
          >
            ثبت
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
