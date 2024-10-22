import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import YearInput from "../../../inputs/year-input";
import {TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {useMutation} from "@tanstack/react-query";
import {sepratorBudgetApi} from "../../../../../api/budget/seprator-api";
import {enqueueSnackbar} from "notistack";
import {globalConfig} from "../../../../../config/global-config";

interface Props {
    initialData: any,
    coding: any,
    yearId: any,
    areaId: any,
    afterUpdate: () => void,
}
export default function SepratorSetYearModal({initialData, coding, yearId, areaId, afterUpdate}: Props) {
    
    const [modalFormData, setModalFormData] = useState({
        areaId: '',
        yearId: '',
        codingId: '',
        description: '',
        mosavab: '',
        programOperationDetailsId: '',
        code: '',
    });
    
    const submitMutation = useMutation(sepratorBudgetApi.modalUpdate, {
        onSuccess: () => {
            enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
                variant: "success",
            });
            afterUpdate();
        }
    });
    
    useEffect(() => {
        
        setModalFormData((prevState: any) => ({
            ...prevState,
            mosavab: initialData.expense,
            programOperationDetailsId: parseInt(initialData.programOperationDetailsId),
            description: initialData.description,
            codingId: coding,
            yearId: parseInt(yearId) + 1,
            areaId: areaId,
        }));
    }, []);
    
    const onSubmitHandler = () => {
        submitMutation.mutate(modalFormData);
    };
    
    return (
        <Box sx={{width: "96%", mx: "auto", p: 2}} className="flex flex-col gap-4">
            <YearInput setter={setModalFormData} value={modalFormData.yearId as any}/>
            
            <TextField
                id="budgetNext"
                label="هزینه ای"
                variant="outlined"
                size="small"
                defaultValue={initialData?.expense}
                autoComplete="off"
                fullWidth
                onChange={(e) => setModalFormData((prevState:any) => ({
                    ...prevState,
                    mosavab: parseInt(e.target.value),
                }))}
            />
            
            <LoadingButton
                fullWidth
                onClick={onSubmitHandler}
                variant="contained"
                size="large"
                loading={false}
            >
                ثبت
            </LoadingButton>
        
        </Box>
    );
}
