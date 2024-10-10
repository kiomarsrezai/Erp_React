import AdminLayout from "../../components/layout/admin-layout";
import FixedTable from "../../components/data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../../types/table-type";
import {useState} from "react";
import {generalFieldsConfig} from "../../config/features/general-fields-config";
import BudgetMaximusForm from "../../components/sections/budget/budget-maximus/budget-maximus-form";
import FixedModal from "../../components/ui/modal/fixed-modal";
import BudgetMaximusModal from "../../components/sections/budget/budget-maximus/budget-maximus-modal";

export default function BudgetMaximusPage() {
    
    const [formData, setFormData] = useState({
        [generalFieldsConfig.YEAR]: undefined,
    });

    
    const tableHeads: TableHeadShape = [
        {
            title: "منطقه",
            name: "area",
            width: "50px",
        },
        {
            title: "در آمد",
            name: "aaaa",
            width: "110px",
        },
        {
            title: "هزینه ای",
            name: "aaaa",
            width: "110px",
        },
        {
            title: "تملک سرمایه ای",
            name: "aaaa",
            width: "110px",
        },
        {
            title: "تملک مالی",
            name: "aaaa",
            width: "110px",
        },
    ];
    
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: (
                <BudgetMaximusForm
                    formData={formData}
                    setFormData={setFormData}
                />
            ),
            colspan: tableHeads.filter((item) => !item.hidden).length,
        },
    ];
    
    return (
        <AdminLayout>
            <FixedTable
                heads={tableHeads}
                headGroups={tableHeadGroups}
                data={[{}]}
                // footer={tableFooter}
                // bottomFooter={tableBottomFooter}
                // enableVirtual
                // tableLayout="auto"
            />
            
            <FixedModal
                open={false}
                handleClose={() => {
                
                }}
                title="تست"
                maxWidth="600px"
                maxHeight="200px"
            >
                <BudgetMaximusModal/>
            </FixedModal>
            
            
        </AdminLayout>
    );
}
