import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import {GetSingleBeforeProposalItemShape} from "../../../../types/beforeproposal-type";
import {useMutation} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";
import {globalConfig} from "../../../../config/global-config";
import {proposalConfig} from "../../../../config/features/budget/proposal-config";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {proposalBudgetApi} from "../../../../api/budget/proposal-api";

interface setEditModalInitialData {
    onDoneTask: () => void;
    initialData?: GetSingleBeforeProposalItemShape|null;
    formData: any
}

function SuggestedEditEdit(props: setEditModalInitialData) {
    const { onDoneTask, initialData, formData } = props;
    
    const editFormSchema = yup.object({
        [proposalConfig.budgetNext]: yup.number().required(),
        [proposalConfig.description]: yup.string().required(),
    });
    
    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(editFormSchema),
    });
    
    
    const editCodingMutation = useMutation(proposalBudgetApi.editItem, {
        onSuccess: () => {
            enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
                variant: "success",
            });
            onDoneTask();
        },
        onError: () => {},
    });
    
    const onSubmitHandler = (values: any) => {
        if (initialData) {
            const data = {
                [generalFieldsConfig.YEAR]: formData[generalFieldsConfig.YEAR],
                [generalFieldsConfig.AREA]: initialData?.areaId??formData[generalFieldsConfig.AREA],
                [generalFieldsConfig.BUDGET_METHOD]: formData[generalFieldsConfig.BUDGET_METHOD],
                [proposalConfig.coding]: initialData?.codingId,
                ...values,
            }
    
            editCodingMutation.mutate(data);
        }
    };
    return (
        <Box sx={{ width: "80%", mx: "auto", p: 2 }} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <Stack spacing={2}>
                <Grid item sm={12}>
                    <TextField
                        id="budgetNext"
                        label="مبلغ پیشنهادی 1403"
                        variant="outlined"
                        size="small"
                        {...register(proposalConfig.budgetNext)}
                        error={!!errors[proposalConfig.budgetNext]}
                        defaultValue={initialData?.budgetNext || ""}
                        autoComplete="off"
                        fullWidth
                    />
                </Grid>
    
                <Grid item sm={12}>
                    <TextField
                        id="description"
                        label="شرح"
                        variant="outlined"
                        multiline
                        size="small"
                        {...register("description")}
                        error={!!errors["description"]}
                        helperText={(errors.description?.message || "") as any}
                        defaultValue={initialData?.description}
                        autoComplete="off"
                        fullWidth
                    />
                </Grid>
            </Stack>
    
            <br/>
            <Grid item lg={8} >
                <Button variant="contained" type="submit">ثبت</Button>
            </Grid>
        </Box>
    );
}

export default SuggestedEditEdit;
