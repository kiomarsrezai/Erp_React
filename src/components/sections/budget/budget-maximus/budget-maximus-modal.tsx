import Box from "@mui/material/Box";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {proposalConfig} from "../../../../config/features/budget/proposal-config";
import {generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {budgetConnectConfig} from "../../../../config/features/budget/budget-connect-config";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useEffect} from "react";
import {GetSingleBudgetShareAreaItemShape} from "../../../../types/data/budget/budget-share-area-type";
import {useMutation} from "@tanstack/react-query";
import {BaseApiResponseShape} from "../../../../types/base-type";
import {budgetAreaShare} from "../../../../api/budget/budget-area-share";
import {enqueueSnackbar} from "notistack";
import {globalConfig} from "../../../../config/global-config";

interface Props {
    row: GetSingleBudgetShareAreaItemShape,
    afterUpdate: () => void,
}

export default function BudgetMaximusModal({row, afterUpdate}: Props) {
    
    const editFormSchema = yup.object({
        ['shareProcessId1']: yup.number().required(),
        ['shareProcessId2']: yup.number().required(),
        ['shareProcessId3']: yup.number().required(),
        ['shareProcessId4']: yup.number().required(),
    });
    
    const submitMutation = useMutation(budgetAreaShare.update, {
        onSuccess: () => {
            afterUpdate();
        }
    });
    
    const {register, handleSubmit, formState: { errors },} = useForm({
        resolver: yupResolver(editFormSchema),
    });
    
    const onSubmitHandler = (values: any) => {
        submitMutation.mutate({
            id: row.id,
            shareProcessId1: values.shareProcessId1,
            shareProcessId2: values.shareProcessId2,
            shareProcessId3: values.shareProcessId3,
            shareProcessId4: values.shareProcessId4,
        })
    };
    
    return (
        <Box sx={{width: "96%", mx: "auto", p: 2}} component="form" onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
            <TextField
                id="budgetNext"
                label="در آمد"
                variant="outlined"
                size="small"
                {...register('shareProcessId1') as any}
                error={!!errors['shareProcessId1']}
                helperText={(errors['shareProcessId1']?.message || "") as any}
                defaultValue={row?.shareProcessId1}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="هزینه ای"
                variant="outlined"
                size="small"
                {...register('shareProcessId2') as any}
                error={!!errors['shareProcessId2']}
                helperText={(errors['shareProcessId2']?.message || "") as any}
                defaultValue={row?.shareProcessId2}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="تملک سرمایه ای"
                variant="outlined"
                size="small"
                {...register('shareProcessId3') as any}
                error={!!errors['shareProcessId3']}
                helperText={(errors['shareProcessId3']?.message || "") as any}
                defaultValue={row?.shareProcessId3}
                autoComplete="off"
                fullWidth
            />
            
            <TextField
                id="budgetNext"
                label="تملک مالی"
                variant="outlined"
                size="small"
                {...register('shareProcessId4') as any}
                error={!!errors['shareProcessId4']}
                helperText={(errors['shareProcessId4']?.message || "") as any}
                defaultValue={row?.shareProcessId4}
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
