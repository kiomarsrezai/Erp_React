import AdminLayout from "components/layout/admin-layout";
import CustomCard from "../components/ui/card/custom-card";
import FullGaugeChart from "../components/ui/chart/full-gauge-chart";
import GaugeChart from "../components/ui/chart/gauge-chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

function WellcomePage() {
    return (
        <AdminLayout>
            {/*<div className="grid grid-cols-12 p-2 gap-2">*/}
            {/*    */}
            {/*    <CustomCard className="col-span-3" title="کارت شماره 1">*/}
            {/*        <div className="p-2 grid grid-cols-2">*/}
            {/*            <div className="flex flex-col border-l border-b border-gray-100 p-2">*/}
            {/*                <h6 className="font-bold text-center">عنوان</h6>*/}
            {/*                <div style={{*/}
            {/*                    width: '100%',*/}
            {/*                    height: '200px',*/}
            {/*                    display: 'flex',*/}
            {/*                    justifyContent: 'center',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    <div style={{width: '100%', height: '100%'}}>*/}
            {/*                        <GaugeChart value={75}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="border-b border-gray-100 p-2"></div>*/}
            {/*            <div className="flex flex-col border-l border-gray-100 p-2">*/}
            {/*                <h6 className="font-bold text-center">عنوان</h6>*/}
            {/*                <div style={{*/}
            {/*                    width: '100%',*/}
            {/*                    height: '200px',*/}
            {/*                    display: 'flex',*/}
            {/*                    justifyContent: 'center',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    <div style={{width: '100%', height: '100%'}}>*/}
            {/*                        <FullGaugeChart value={75}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="flex flex-col p-2">*/}
            {/*                <h6 className="font-bold text-center">عنوان</h6>*/}
            {/*                <div style={{*/}
            {/*                    width: '100%',*/}
            {/*                    height: '200px',*/}
            {/*                    display: 'flex',*/}
            {/*                    justifyContent: 'center',*/}
            {/*                    alignItems: 'center'*/}
            {/*                }}>*/}
            {/*                    <div style={{width: '100%', height: '100%'}}>*/}
            {/*                        <FullGaugeChart value={75}/>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </CustomCard>*/}
            {/*    <CustomCard className="col-span-6" title="کارت شماره 2">*/}
            {/*        <div className="p-2 ">aaaaaaaa</div>*/}
            {/*    </CustomCard>*/}
            {/*    <CustomCard className="col-span-3" title="کارت شماره 3">*/}
            {/*        <div className="p-2 ">aaaaaaaa</div>*/}
            {/*    </CustomCard>*/}
            {/*    */}
            {/*    <CustomCard className="col-span-4" title="کارت شماره 4">*/}
            {/*        <table className="w-full">*/}
            {/*            <tbody className="text-[14px]">*/}
            {/*                <tr className="text-white bg-orange-400">*/}
            {/*                    <th className="py-3">نام</th>*/}
            {/*                    <th className="py-3">نام خانوادگی</th>*/}
            {/*                    <th className="py-3">کد ملی</th>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">1478523695</th>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">1478523695</th>*/}
            {/*                </tr>*/}
            {/*                <tr>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">تست</th>*/}
            {/*                    <th className="py-3">1478523695</th>*/}
            {/*                </tr>*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    </CustomCard>*/}
            {/*    <CustomCard className="col-span-5" title="کارت شماره 5">*/}
            {/*        <ResponsiveContainer width="100%" height={400}>*/}
            {/*            <LineChart data={data}>*/}
            {/*                <XAxis dataKey="name"/>*/}
            {/*                <YAxis style={{color: 'red'}}/>*/}
            {/*                <Tooltip/>*/}
            {/*                <Legend/>*/}
            {/*                <Line type="monotone" dataKey="pv" stroke="#82ca9d"/>*/}
            {/*            </LineChart>*/}
            {/*        </ResponsiveContainer>*/}
            {/*    </CustomCard>*/}
            {/*    <CustomCard className="col-span-3" title="کارت شماره 6">*/}
            {/*        <div className="p-2 ">aaaaaaaa</div>*/}
            {/*    </CustomCard>*/}
            {/*</div>*/}
        </AdminLayout>
    );
}

export default WellcomePage;
