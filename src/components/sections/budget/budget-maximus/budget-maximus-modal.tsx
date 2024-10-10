import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {proposalConfig} from "../../../../config/features/budget/proposal-config";
import {generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {budgetConnectConfig} from "../../../../config/features/budget/budget-connect-config";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

export default function BudgetMaximusModal() {
    
    const editFormSchema = yup.object({
        // [proposalConfig.budgetNext]: yup.number().min(initialData?.supply, "مبلغ پیشنهادی نباید کمتر از مبلغ تامین اعتبار باشد.").required(),
        // [proposalConfig.description]: yup.string().required(),
        // [proposalConfig.code]: yup.number().required(),
    });
    
    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(editFormSchema),
    });
    
    const onSubmitHandler = (values: any) => {
    
    };
    
    return (
        <Box sx={{width: "96%", mx: "auto", p: 2}} component="form" onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
            <TextField
                id="budgetNext"
                label="در آمد"
                variant="outlined"
                size="small"
                {...register(proposalConfig.budgetNext)}
                error={!!errors[proposalConfig.budgetNext]}
                helperText={(errors.budgetNext?.message || "") as any}
                // defaultValue={initialData?.supply}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="هزینه ای"
                variant="outlined"
                size="small"
                {...register(proposalConfig.budgetNext)}
                error={!!errors[proposalConfig.budgetNext]}
                helperText={(errors.budgetNext?.message || "") as any}
                // defaultValue={initialData?.supply}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="تملک سرمایه ای"
                variant="outlined"
                size="small"
                {...register(proposalConfig.budgetNext)}
                error={!!errors[proposalConfig.budgetNext]}
                helperText={(errors.budgetNext?.message || "") as any}
                // defaultValue={initialData?.supply}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="تملک مالی"
                variant="outlined"
                size="small"
                {...register(proposalConfig.budgetNext)}
                error={!!errors[proposalConfig.budgetNext]}
                helperText={(errors.budgetNext?.message || "") as any}
                // defaultValue={initialData?.supply}
                autoComplete="off"
                fullWidth
            />
            
            <LoadingButton
                variant="contained"
                type="submit"
                // loading={submitMutation.isLoading}
            >
                ثبت
            </LoadingButton>
        </Box>
    );
}
