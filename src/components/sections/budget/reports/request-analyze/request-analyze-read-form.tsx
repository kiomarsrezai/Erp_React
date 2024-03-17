import { Unstable_Grid2 as Grid } from "@mui/material";
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
    getGeneralFieldItemArea, getGeneralFieldItemBudgetKind, getGeneralFieldItemNumber,
    getGeneralFieldItemProjectScale,
    getGeneralFieldItemYear,
} from "helper/export-utils";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import { requestAnalyzeRead } from "config/features/budget/report/request-analyze-read";
import FlotingLabelSelect from "../../../../ui/inputs/floting-label-select";
import {requestAnalyzeReadApi} from "../../../../../api/report/request-analyze-read-api";
import {budgetAnalyzeKindItems, generalFieldsConfig} from "../../../../../config/features/general-fields-config";
import {budgetDeviationConfig} from "../../../../../config/features/budget/report/budget-deviation-config";
import GetAppIcon from "@mui/icons-material/GetApp";
import {abstructBudgetXlsx} from "../../../../../stimul/budget/report/abstruct/abstruct-budget-xlsx";
import WindowLoading from "../../../../ui/loading/window-loading";
import {proposalBudgetXlsx} from "../../../../../stimul/budget/proposal/budget-proposal-xlsx";
import {requestAnalyzeBudgetXlsx} from "../../../../../stimul/budget/report/request-analyze/request-analyze";
import {abstructBudgetStimul} from "../../../../../stimul/budget/report/abstruct/abstruct-budget-stimul";
import {requestAnalyzeStimul} from "../../../../../stimul/budget/report/request-analyze/request-analyze-stimul";
import {numberOfDaysPassedSinceJalaliDate} from "../../../../../helper/date-utils";

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
    
    
    const submitMutation2 = useMutation(requestAnalyzeReadApi.getData);
    const [excelLodaing, setExcelLodaing] = useState(false);
    
    const handleExcelClick = () => {
        setExcelLodaing(true);
        handleExcelForm();
        
        setTimeout(() => {
            setExcelLodaing(false);
        }, 3000)
    };
    
    const handleExcelForm = async () => {
        let culmnsData: any = {};
        kindIdItems.forEach((item) => {
            culmnsData[item.value] = [];
        });
    

        const culmnKeys = Object.keys(culmnsData);

        try {
            await Promise.all(
                culmnKeys.map(async (item) => {
                    const data = await submitMutation2.mutateAsync({
                        ...formData,
                        [generalFieldsConfig.kind]: item,
                    });

                    culmnsData = {
                        ...culmnsData,
                        [item]: data.data,
                    };
                })
            );
        } catch {}
    
        const areaLabel = getGeneralFieldItemArea(formData, 1);
    
        requestAnalyzeBudgetXlsx({
            culmnsData: culmnsData,
            area: areaLabel,
            setExcelLodaing: setExcelLodaing,
        });
    };
    
    
    // print
    const handlePrintForm = () => {
        if (printData.data.length) {
            const areaLabel = getGeneralFieldItemArea(formData, 1);
           
            requestAnalyzeStimul({
                data: printData.data,
                footer: printData.footer,
                bottomFooter: [],
                area: areaLabel,
                kind: kindIdItems[formData[requestAnalyzeRead.kind] - 1].label,
                numberShow: "ریال",
            });
        }
    };
    
    
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
    
                    <IconButton color="primary" onClick={handlePrintForm}>
                        <PrintIcon />
                    </IconButton>
                    
                    <IconButton color="primary" onClick={handleExcelClick}>
                        <GetAppIcon />
                    </IconButton>
                    <WindowLoading
                        active={
                            excelLodaing
                        }
                    />
                    
                </Grid>
            </Grid>
        </Box>
    );
}
