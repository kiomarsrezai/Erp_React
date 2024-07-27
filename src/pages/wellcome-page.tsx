import AdminLayout from "components/layout/admin-layout";
import CustomCard from "../components/ui/card/custom-card";
import FullGaugeChart from "../components/ui/chart/full-gauge-chart";
import GaugeChart from "../components/ui/chart/gauge-chart";

function WellcomePage() {
    
    return (
        <AdminLayout>
            <div className="grid grid-cols-12 p-2 gap-2">
                
                <CustomCard className="col-span-3" title="کارت شماره 1">
                    <div className="p-2 grid grid-cols-2 gap-x-3">
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <GaugeChart value={75}/>
                                </div>
                            </div>
                        </div>
                        <div className="">
                        
                        </div>
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <FullGaugeChart value={75}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <FullGaugeChart value={75}/>
                                </div>
                            </div>
                        </div>
                        
                        
                        {/*<h6 className="font-bold text-center">عنوان</h6>*/}
                        {/*<div style={{width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>*/}
                        {/*    <div style={{width: '100%', height: '100%'}}>*/}
                        {/*        <GaugeChart value={75}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    
                    
                    </div>
                </CustomCard>
                <CustomCard className="col-span-6" title="کارت شماره 2">
                    <div className="p-2 ">aaaaaaaa</div>
                </CustomCard>
                <CustomCard className="col-span-3" title="کارت شماره 3">
                    <div className="p-2 ">aaaaaaaa</div>
                </CustomCard>
                
                <CustomCard className="col-span-4" title="کارت شماره 4">
                    <div className="p-2 ">aaaaaaaa</div>
                </CustomCard>
                <CustomCard className="col-span-5" title="کارت شماره 5">
                    <div className="p-2 ">aaaaaaaa</div>
                </CustomCard>
                <CustomCard className="col-span-3" title="کارت شماره 6">
                    <div className="p-2 ">aaaaaaaa</div>
                </CustomCard>
            </div>
        </AdminLayout>
    );
}

export default WellcomePage;
