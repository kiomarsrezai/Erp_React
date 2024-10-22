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
import ProctorInput from "../../inputs/proctor-input";
import ts from "typescript";
import ProjectInfoTelemetryEvent = ts.server.ProjectInfoTelemetryEvent;
import ProjectNatureInput from "../../inputs/project-nature-input";
import {useState} from "react";
import {abstructBudgetConfig} from "../../../../config/features/report/budget/abstruct-budget-config";
import {budgetConnectConfig} from "../../../../config/features/budget/budget-connect-config";

interface setEditModalInitialData {
    onDoneTask: () => void;
    initialData?: GetSingleBeforeProposalItemShape|null;
    formData: any
}

function SuggestedEditEdit(props: setEditModalInitialData) {
    const { onDoneTask, initialData, formData } = props;
    
    const editFormSchema = yup.object({
        [proposalConfig.budgetNext]: yup.number().min(initialData?.supply, "مبلغ پیشنهادی نباید کمتر از مبلغ تامین اعتبار باشد.").required(),
        [proposalConfig.description]: yup.string().required(),
        [proposalConfig.code]: yup.number().required(),
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
    
    const [modalFormData, setModalFormData] = useState({
        [budgetConnectConfig.proctor]: initialData?.motavalli,
        [budgetConnectConfig.coding_nature]: initialData?.mojri,
    });
    
    const onSubmitHandler = (values: any) => {
        if (initialData) {
            const data = {
                [generalFieldsConfig.YEAR]: formData[generalFieldsConfig.YEAR],
                [generalFieldsConfig.AREA]: initialData?.areaId??formData[generalFieldsConfig.AREA],
                [generalFieldsConfig.BUDGET_METHOD]: formData[generalFieldsConfig.BUDGET_METHOD],
                [proposalConfig.coding]: initialData?.codingId,
                [proposalConfig.proctorId]: modalFormData[budgetConnectConfig.proctor]??0,
                [proposalConfig.executionId]: modalFormData[budgetConnectConfig.coding_nature]??0,
                ...values,
            }
    
            editCodingMutation.mutate(data);
        }
    };
    return (
        <Box sx={{ width: "80%", mx: "auto", p: 2 }} component="form" onSubmit={handleSubmit(onSubmitHandler)}>
            <p style={{color: 'orange', fontSize: 12}} className="pb-3">مبلغ پیشنهادی نباید کمتر از مبلغ تامین اعتبار({initialData?.supply}) باشد</p>
            <Stack spacing={2}>
                <Grid item sm={12}>
                    <TextField
                        id="budgetNext"
                        label="مبلغ اصلاح پیشنهادی "
                        variant="outlined"
                        size="small"
                        {...register(proposalConfig.budgetNext)}
                        error={!!errors[proposalConfig.budgetNext]}
                        helperText={(errors.budgetNext?.message || "") as any}
                        defaultValue={initialData?.supply}
                        autoComplete="off"
                        fullWidth
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField
                        id="code"
                        label="کد"
                        variant="outlined"
                        size="small"
                        {...register("code")}
                        error={!!errors["code"]}
                        helperText={(errors.code?.message || "") as any}
                        defaultValue={initialData?.code}
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
                <ProctorInput
                    setter={setModalFormData}
                    value={modalFormData[budgetConnectConfig.proctor] as any}
                />
                <ProjectNatureInput
                    setter={setModalFormData}
                    value={modalFormData[budgetConnectConfig.coding_nature] as any}
                />
            </Stack>
    
            <br/>
            <Grid item lg={8} >
                <Button variant="contained" type="submit">ثبت</Button>
            </Grid>
        </Box>
    );
}

export default SuggestedEditEdit;
