import Box from "@mui/material/Box";
import {GetSingleSepratorItemShape} from "../../../../../types/data/budget/seprator-type";
import {useState} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import YearInput from "../../../inputs/year-input";
import {beforeproposalConfig} from "../../../../../config/features/budget/beforeproposal-config";
import {accessNamesConfig} from "../../../../../config/access-names-config";
import {budgetConnectConfig} from "../../../../../config/features/budget/budget-connect-config";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

interface Props {
    initialData: any,
}
export default function SepratorSetYearModal({initialData}: Props) {

    const editFormSchema = yup.object({
        year: yup.number().required(),
    });

    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(editFormSchema),
    });

    const [modalFormData, setModalFormData] = useState({
        [budgetConnectConfig.YEAR]: '',
    });

    const onSubmitHandler = (values: any) => {

    };

    return (
        <Box sx={{width: "80%", mx: "auto", p: 2}} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <YearInput
                setter={setModalFormData}
                value={modalFormData[budgetConnectConfig.YEAR] as any}
            />

            <br/>
            <br/>
            <Grid item lg={8}>
                <Button variant="contained" type="submit">ثبت</Button>
            </Grid>
        </Box>
    );
}
