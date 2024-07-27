import AdminLayout from "components/layout/admin-layout";
import CustomCard from "../components/ui/card/custom-card";

function WellcomePage() {
  return (
    <AdminLayout>
        <div className="grid grid-cols-12 p-2 gap-2">
            
            <CustomCard className="col-span-3" title="کارت شماره 1">
                <div className="p-2 min-h-[300px]">
                
                </div>
            </CustomCard>
            
            
            <CustomCard className="col-span-6" title="کارت شماره 2">
                <div className="p-2 min-h-[300px]">aaaaaaaa</div>
            </CustomCard>
            <CustomCard className="col-span-3" title="کارت شماره 3">
                <div className="p-2 min-h-[300px]">aaaaaaaa</div>
            </CustomCard>
            
            <CustomCard className="col-span-4" title="کارت شماره 4">
                <div className="p-2 min-h-[300px]">aaaaaaaa</div>
            </CustomCard>
            <CustomCard className="col-span-5" title="کارت شماره 5">
                <div className="p-2 min-h-[300px]">aaaaaaaa</div>
            </CustomCard>
            <CustomCard className="col-span-3" title="کارت شماره 6">
                <div className="p-2 min-h-[300px]">aaaaaaaa</div>
            </CustomCard>
        </div>
    </AdminLayout>
  );
}

export default WellcomePage;
