import React, {FormEvent} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import YearInput from "../../inputs/year-input";
import {beforeproposalConfig} from "../../../../config/features/budget/beforeproposal-config";
import {accessNamesConfig} from "../../../../config/access-names-config";
import SectionGuard from "../../../auth/section-guard";
import {joinPermissions} from "../../../../helper/auth-utils";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
    formData: any;
    setFormData: any;
}
export default function BudgetMaximusForm({formData, setFormData}: Props) {
    
    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();
    };
    return (
        <>
            <Box component="form" onSubmit={handleFormSubmit}>
                <div className="flex justify-start gap-2">
                    <div className="w-[200px]">
                        <SectionGuard
                            permission={joinPermissions([
                                accessNamesConfig.BUDGET_MAXIMUS,
                                accessNamesConfig.FIELD_YEAR,
                            ])}
                        >
                            
                            <YearInput
                                setter={setFormData}
                                value={formData[beforeproposalConfig.YEAR]}
                                permissionForm={accessNamesConfig.BUDGET_MAXIMUS}
                                // showError={haveSubmitedForm}
                            />
                        </SectionGuard>
                    </div>
                    <LoadingButton
                        variant="contained"
                        type="submit"
                        // loading={submitMutation.isLoading}
                    >
                        نمایش
                    </LoadingButton>
                </div>
            </Box>
        </>
    )
}
