import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import {checkHavePermission, filedItemsGuard, joinPermissions} from "helper/auth-utils";
import AreaInput from "components/sections/inputs/area-input";
import {
    getGeneralFieldItemArea,
    getGeneralFieldItemProjectScale,
    getGeneralFieldItemYear,
} from "helper/export-utils";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import { requestAnalyzeRead } from "config/features/budget/report/request-analyze-read";
import FlotingLabelSelect from "../../../../ui/inputs/floting-label-select";
import {requestAnalyzeReadApi} from "../../../../../api/report/request-analyze-read-api";
import {budgetAnalyzeKindItems} from "../../../../../config/features/general-fields-config";
import * as moment2 from "jalali-moment";
import moment from "moment";
import {budgetDeviationConfig} from "../../../../../config/features/budget/report/budget-deviation-config";

interface BudgetReportDeviationFormProps {
    formData: any;
    setFormData: (prevState: any) => void;
    inputRender?: ReactNode;
    tabRender?: ReactNode;
    printData: {
        data: any[];
        footer: any[];
    };
}

export default function RequestAnalyzeReadForm(props: BudgetReportDeviationFormProps) {
    const { formData, setFormData, inputRender, tabRender, printData } = props;
    
    const userLicenses = userStore((state) => state.permissions);
    // form
    const queryClient = useQueryClient();
    const submitMutation = useMutation(requestAnalyzeReadApi.getData, {
        onSuccess: (data) => {
            const CurrentDate = moment().format('YYYY/MM/DD');
            data.data.map(item=> {
                const requestDateParts = moment2.from(item.requestDate, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
                var start = moment(requestDateParts, "YYYY-MM-DD");
                var end = moment(CurrentDate, "YYYY-MM-DD");
                item.day = moment.duration(end.diff(start)).asDays()
            });
            queryClient.setQueryData(reactQueryKeys.budget.requestAnalyzeRead, data);
        },
    });
    
    const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // permission
        const havePermission = checkHavePermission(
            userLicenses,
            [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_KIND_ID],
            joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
            ])
        );
        
        if (!havePermission) {
            return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
                variant: "error",
            });
        }
        
        setHaveSubmitedForm(true);
    
        if (
            checkHaveValue(formData, [
                requestAnalyzeRead.kind,
                requestAnalyzeRead.area,
            ])
        ) {
            submitMutation.mutate(formData);
        }
    };
    
    // reset
    useEffect(() => {
        queryClient?.setQueryData(reactQueryKeys.budget.requestAnalyzeRead, {
            data: [],
        });
    }, [
        formData[requestAnalyzeRead.kind],
        formData[requestAnalyzeRead.area],
    ]);
    
    // print
    const handlePrintForm = () => {
        if (printData.data.length) {
            const yearLabel = getGeneralFieldItemYear(formData, 1);
            const areaLabel = getGeneralFieldItemArea(formData, 3);
            const budgetKindLabel = getGeneralFieldItemProjectScale(formData);
            budgetProjectScaleStimul({
                data: printData.data,
                footer: printData.footer,
                year: yearLabel,
                area: areaLabel,
                kind: budgetKindLabel,
                numberShow: "ریال",
            });
        }
    };
    
    const kindPermissionForm = joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
    ]);
    const kindIdItems =  kindPermissionForm ? filedItemsGuard(
            budgetAnalyzeKindItems,
            userLicenses,
            joinPermissions([kindPermissionForm, accessNamesConfig.FIELD_KIND_ID])
        )
        : budgetAnalyzeKindItems;
    
    
    // reset
    useEffect(() => {
        queryClient?.setQueryData(reactQueryKeys.budget.requestAnalyzeRead, {
            data: [],
        });
    }, [
        formData[requestAnalyzeRead.area],
        formData[requestAnalyzeRead.kind],
    ]);
    
    return (
        <Box
            component="form"
            padding={1}
            onSubmit={handleSubmit}
            sx={{ bgcolor: "grey.200" }}
        >
            <Grid container spacing={2}>
                {tabRender && <Grid xs={12}>{tabRender}</Grid>}
                {inputRender && <Grid xs={2}>{inputRender}</Grid>}
                
                
                <SectionGuard
                    permission={joinPermissions([
                        accessNamesConfig.BUDGET__REPORT_PAGE,
                        accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
                        accessNamesConfig.FIELD_AREA,
                    ])}
                >
                    <Grid lg={2}>
                        <AreaInput
                            setter={setFormData}
                            value={formData[requestAnalyzeRead.area]}
                            permissionForm={joinPermissions([
                                accessNamesConfig.BUDGET__REPORT_PAGE,
                                accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
                            ])}
                            level={1}
                            showError={haveSubmitedForm}
                        />
                    </Grid>
                </SectionGuard>
    
    
                <SectionGuard
                    permission={joinPermissions([
                        accessNamesConfig.BUDGET__REPORT_PAGE,
                        accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
                        accessNamesConfig.FIELD_KIND_ID,
                    ])}
                >
                    <Grid lg={2}>
                        <FlotingLabelSelect
                            label="نوع"
                            name="kindId"
                            items={kindIdItems}
                            value={formData[requestAnalyzeRead.kind]}
                            setter={setFormData}
                            showError={haveSubmitedForm}
                        />
                    </Grid>
                </SectionGuard>
                
                <Grid xs={2}>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        loading={submitMutation.isLoading}
                        sx={{ mr: 1 }}
                    >
                        نمایش
                    </LoadingButton>
                    
                    {/*<IconButton color="primary" onClick={handlePrintForm}>*/}
                    {/*    <PrintIcon />*/}
                    {/*</IconButton>*/}
                </Grid>
            </Grid>
        </Box>
    );
}