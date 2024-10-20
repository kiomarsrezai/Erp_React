import AdminLayout from "../../components/layout/admin-layout";
import FixedTable from "../../components/data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../../types/table-type";
import React, {useState} from "react";
import {generalFieldsConfig} from "../../config/features/general-fields-config";
import FixedModal from "../../components/ui/modal/fixed-modal";
import BudgetMaximusModal from "../../components/sections/budget/budget-maximus/budget-maximus-modal";
import Box from "@mui/material/Box";
import SectionGuard from "../../components/auth/section-guard";
import {joinPermissions} from "../../helper/auth-utils";
import {accessNamesConfig} from "../../config/access-names-config";
import YearInput from "../../components/sections/inputs/year-input";
import {beforeproposalConfig} from "../../config/features/budget/beforeproposal-config";
import LoadingButton from "@mui/lab/LoadingButton";
import {useMutation} from "@tanstack/react-query";
import {budgetAreaShare} from "../../api/budget/budget-area-share";
import {BaseApiResponseShape} from "../../types/base-type";
import {GetSingleBudgetShareAreaItemShape} from "../../types/data/budget/budget-share-area-type";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

export default function BudgetAreaSharePage() {
    const [formData, setFormData] = useState({
        [generalFieldsConfig.YEAR]: undefined,
    });
    
    const [data, setData] = useState<GetSingleBudgetShareAreaItemShape[]>();
    
    const submitMutation = useMutation<BaseApiResponseShape<GetSingleBudgetShareAreaItemShape[]>>(budgetAreaShare.getData, {
        onSuccess(data) {
            setData(data.data);
        }
    });
    
    const tableHeads: TableHeadShape = [
        {
            title: "منطقه",
            name: "area",
            width: "50px",
        },
        {
            title: "در آمد",
            name: "shareProcessId1",
            width: "110px",
        },
        {
            title: "هزینه ای",
            name: "shareProcessId2",
            width: "110px",
        },
        {
            title: "تملک سرمایه ای",
            name: "shareProcessId3",
            width: "110px",
        },
        {
            title: "تملک مالی",
            name: "shareProcessId4",
            width: "110px",
        },
        {
            title: "عملیات",
            name: "actions",
            width: "80px",
        },
    ];
    
    function search(e: any){
        e.preventDefault();
        
        // @ts-ignore
        submitMutation.mutate(formData);
    }
    
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: (
                <>
                    <Box component="form" onSubmit={search}>
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
                                    />
                                </SectionGuard>
                            </div>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={submitMutation.isLoading}
                            >
                                نمایش
                            </LoadingButton>
                        </div>
                    </Box>
                </>
            ),
            colspan: tableHeads.filter((item) => !item.hidden).length,
        },
    ];
    
    
    const [editModal, setEditModal] = useState(false);
    const [row, setRow] = useState<GetSingleBudgetShareAreaItemShape|undefined>();
    
    function handleClickEditBtn(row:GetSingleBudgetShareAreaItemShape ){
        setRow(row);
        setEditModal(true);
    }
    function actionButtons(row: GetSingleBudgetShareAreaItemShape){
        return(
            <div>
                <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleClickEditBtn(row)}
                >
                    <EditIcon />
                </IconButton>
            </div>
        )
    }
    
    
    const formatTableData = (
        unFormatData: GetSingleBudgetShareAreaItemShape[]
    ): any[] => {
        const formatedData: GetSingleBudgetShareAreaItemShape[] | any = unFormatData.map(
            (item, i) => ({
                area: item.area.areaName,
                shareProcessId1: item.shareProcessId1,
                shareProcessId2: item.shareProcessId2,
                shareProcessId3: item.shareProcessId3,
                shareProcessId4: item.shareProcessId4,
                actions: () => actionButtons(item),
            })
        );
        
        return formatedData;
    };
    
    const tableData = data
        ? formatTableData(data)
        : [];
    
    
    function afterUpdate(){
        // @ts-ignore
        submitMutation.mutate(formData);
        setEditModal(false);
    }
    
    return (
        <AdminLayout>
            <FixedTable
                heads={tableHeads}
                headGroups={tableHeadGroups}
                data={tableData}
                // footer={tableFooter}
                // bottomFooter={tableBottomFooter}
                // enableVirtual
                // tableLayout="auto"
            />
            
            <FixedModal
                open={editModal}
                handleClose={() => {
                    setEditModal(false);
                }}
                title="ویرایش"
                maxWidth="600px"
                maxHeight="200px"
            >
                <BudgetMaximusModal row={row} afterUpdate={afterUpdate}/>
            </FixedModal>
            
            
        </AdminLayout>
    );
}
