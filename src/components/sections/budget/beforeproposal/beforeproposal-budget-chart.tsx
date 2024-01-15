import {GetSingleBeforeProposalItemShape} from "../../../../types/beforeproposal-type";
import {useQuery} from "@tanstack/react-query";
import {proposalBudgetApi} from "../../../../api/budget/proposal-api";
import {reactQueryKeys} from "../../../../config/react-query-keys-config";
import FixedChart from "../../../data/chart/fixed-chart";
import Box from "@mui/material/Box";
import {useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import FixedModal from "../../../ui/modal/fixed-modal";
import BeforeproposalBudgetAmountsTable from "./beforeproposal-budget-amounts-table";
import {downloadImage} from "../../../../helper/form-utils";

interface BeforeproposalBudgetTableReadProps{
    initialData?: GetSingleBeforeProposalItemShape|null;
}

export default function BeforeproposalBudgetChart({initialData}: BeforeproposalBudgetTableReadProps) {
    
    const [amountsModal, setAmountsModal] = useState<boolean>(false);
    
    const chartModalQuery = useQuery(reactQueryKeys.budget.proposal.getChartModelData, () =>
        proposalBudgetApi.budgetProposalModalChart({codingId: initialData?.codingId})
    );
    

    const formatChatData = (
        unFormatData: any[]
    ): any[] => {
        const length = unFormatData[0].length;
        const formatedData: any[] = [];
        
        for (let i = 0; i < length; i++) {
            const dataItem: any = {
                AreaName: unFormatData[0][i],
                Mosavab: unFormatData[1][i],
                PercentMosavab: unFormatData[4][i],
            };
            
            if(unFormatData[3][i] !== 0){
                dataItem.Function = unFormatData[3][i]
            }
            formatedData.push(dataItem);
        }
        return formatedData;
    };
    
    const chartData = chartModalQuery.data
        ? formatChatData(chartModalQuery.data.data)
        : [];
    
    return(
        <>
            <Box style={{height: '60px'}}>
                <Box
                    padding={2}
                    sx={{ bgcolor: "grey.200" }}
                >
                    <div style={{display: 'flex'}}>
                        {!!chartModalQuery.data?.data?.[0]?.length && (
                            <>
                                <LoadingButton
                                    variant="contained"
                                    onClick={() => setAmountsModal(true)}
                                >
                                    مقادیر
                                </LoadingButton>
                                <div style={{paddingLeft: '8px'}}></div>
                                <LoadingButton
                                    variant="contained"
                                    onClick={() => downloadImage('chart', 'chart')}
                                >
                                    دانلود نمودار
                                </LoadingButton>
                            </>
                        )}
                    </div>
                </Box>
            </Box>
            
            <Box
                style={{height: `calc(88%)`, overflow: 'hidden'}}
                sx={{
                    width: "100%",
                    direction: "rtl",
                    margin: "auto",
                }}
            >
                {!!chartModalQuery.data?.data?.[0]?.length && (
                    <FixedChart
                        id="chart"
                        lineName="Function"
                        barName="Mosavab"
                        lineLabel="عملکرد"
                        barLabel="مصوب"
                        data={chartData}
                    />
                )}
            </Box>
    
            <FixedModal
                open={amountsModal}
                handleClose={() => {
                    setAmountsModal(false)
                }}
                title="مقادیر"
                maxWidth="50%"
                maxHeight="50%"
            >
                
                <BeforeproposalBudgetAmountsTable data={chartModalQuery.data?.data}/>
            </FixedModal>
        </>
    );
}
