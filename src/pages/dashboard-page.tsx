import AdminLayout from "components/layout/admin-layout";
import CustomCard from "../components/ui/card/custom-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FixedTable from "../components/data/table/fixed-table";
import {BudgetProposalModalRead} from "../types/data/budget/proposal-type";
import {TableHeadGroupShape, TableHeadShape} from "../types/table-type";
import {getPercent, sumFieldsInSingleItemData} from "../helper/calculate-utils";
import {GetSingleBudgetExpenseReportItemShape} from "../types/data/budget/budget-report-expense-type";
import GaugeChart from "../components/ui/chart/gauge-chart";
import LoadingButton from "@mui/lab/LoadingButton";
import FullGaugeChart from "../components/ui/chart/full-gauge-chart";

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

interface TableDataItemShape {
    id: number,
    areaName: string,
    mosavabDramad: number,
    expenseMonthDramad: number,
    percentDramad: number,
    mosavabCurrent: number,
    taminEtebarCurrent: number,
    percentTaminEtebarCurrent: number,
    expenseMonthCurrent: number,
    percentCurrent: number,
    mosavabTamalokSaramye: number,
    taminEtebarAmountTamalokSarmaye: number,
    percentTaminEtebarTamalokSarmaye: number,
    expenseTamalokSarmaye: number,
    percentExpenseTamalokSarmaye: number,
    percentTamalokSarmaye: number,
    mosavabTamalokMali: number,
    taminEtebarTamalokMali: number,
    percentTaminEtebarTamalokMali: number,
    expenseTamalokMali: number,
    percentExpenseTamalokMali: number,
    percentTamalokMali: number,
    manabe: number,
}

const res = [
    {
        "id": 1,
        "areaName": "01",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 4214630000000,
        "taminEtebarCurrent": 1825034710380,
        "percentTaminEtebarCurrent": 43,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2410820000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 6675450000000
    },
    {
        "id": 2,
        "areaName": "02",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 4159730000000,
        "taminEtebarCurrent": 2100753419308,
        "percentTaminEtebarCurrent": 51,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 3831870000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 8041600000000
    },
    {
        "id": 3,
        "areaName": "03",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 3775310000000,
        "taminEtebarCurrent": 2263925674368,
        "percentTaminEtebarCurrent": 60,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2365110000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 6191720000000
    },
    {
        "id": 4,
        "areaName": "04",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 3184670000000,
        "taminEtebarCurrent": 1801339770036,
        "percentTaminEtebarCurrent": 57,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2472560000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 5707230000000
    },
    {
        "id": 5,
        "areaName": "05",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 2717610000000,//2
        "taminEtebarCurrent": 1516925027978,//3
        "percentTaminEtebarCurrent": 56,//6 درصد تحقق هزنه ای
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2202390000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,//7 درصد تحقق سزمایه ای
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,//4
        "taminEtebarTamalokMali": 0,//5
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 4970000000000//1
    },
    {
        "id": 6,
        "areaName": "06",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 2755920000000,
        "taminEtebarCurrent": 640000694955,
        "percentTaminEtebarCurrent": 23,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2244080000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 5050000000000
    },
    {
        "id": 7,
        "areaName": "07",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 3055525000000,
        "taminEtebarCurrent": 1660035632082,
        "percentTaminEtebarCurrent": 54,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2324475000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 5430000000000
    },
    {
        "id": 8,
        "areaName": "08",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 3300765000000,
        "taminEtebarCurrent": 1797406957792,
        "percentTaminEtebarCurrent": 54,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 2284235000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 50000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 5635000000000
    },
    {
        "id": 9,
        "areaName": "مرکز",
        "mosavabDramad": 0,
        "expenseMonthDramad": 0,
        "percentDramad": 0,
        "mosavabCurrent": 16044395000000,
        "taminEtebarCurrent": 4940454390159,
        "percentTaminEtebarCurrent": 31,
        "expenseMonthCurrent": 0,
        "percentCurrent": 0,
        "mosavabTamalokSaramye": 60745730000000,
        "taminEtebarAmountTamalokSarmaye": 0,
        "percentTaminEtebarTamalokSarmaye": 0,
        "expenseTamalokSarmaye": 0,
        "percentExpenseTamalokSarmaye": 0,
        "percentTamalokSarmaye": 0,
        "mosavabTamalokMali": 1800000000000,
        "taminEtebarTamalokMali": 0,
        "percentTaminEtebarTamalokMali": 0,
        "expenseTamalokMali": 0,
        "percentExpenseTamalokMali": 0,
        "percentTamalokMali": 0,
        "manabe": 80088825000000
    }
]
function DashboardPage() {
    
    // const tableHeads: TableHeadShape = [
    //     {
    //         title: "ردیف",
    //         name: "number",
    //         width: "30px",
    //     },
    //     {
    //         title: "کد منطقه",
    //         name: "areaName",
    //         align: "left",
    //         width: "30px",
    //     },
    // ];
    
    const tableHeadGroups: TableHeadGroupShape = [
        {
            title: "کد منطقه",
            colspan: 1,
            rowspan: 2,
            align: "center",
        },
        {
            title: "اعتبارات هزینه ای",
            colspan: 3,
            align: "center",
        },
        {
            title: "تملک سرمایه ای",
            colspan: 3,
            align: "center",
        },
        // resources
        {
            title: "منابع",
            colspan: 1,
            rowspan: 2,
            align: "center",
        },
    ];
    
    const tableHeads: TableHeadShape = [
        {
            title: "کد منطقه",
            name: "areaName",
            align: "left",
            split: true,
            hiddenSelf: true,
        },
        // اعتبارات هزینه ای
        {
            title: "مصوب",
            topTitle: "اعتبارات هزینه ای",
            name: "mosavabCurrent",
            split: true,
            align: "left",
        },
        {
            title: "ت اعتبار",
            name: "taminEtebarCurrent",
            topTitle: "اعتبارات هزینه ای",
            split: true,
            align: "left",
        },
        {
            title: "%تحقق",
            name: "percentTaminEtebarCurrentAction",
            topTitle: "اعتبارات هزینه ای",
            percent: true,
        },
        // تملک سرمایه ای
        {
            title: "مصوب",
            topTitle: "تملک سرمایه ای",
            name: "mosavabTamalokSaramye",
            split: true,
            align: "left",
        },
        {
            title: "ت اعتبار",
            name: "taminEtebarAmountTamalokSarmaye",
            topTitle: "تملک سرمایه ای",
            split: true,
            align: "left",
        },
        {
            title: "%تحقق",
            name: "percentTaminEtebarTamalokSarmayeAction",
            topTitle: "تملک سرمایه ای",
            percent: true,
        },
        // resources
        {
            title: "منابع",
            name: "manabe",
            align: "left",
            split: true,
            hiddenSelf: true,
        },
    ];
    
    
    const percentTaminEtebarCurrentAction = (value: number) => {
        return (
            <div className="relative">
                <div className="bg-blue-400 h-full top-0 left-0 absolute" style={{width: `${value}%`}}></div>
                <span className="relative">{value}%</span>
            </div>
        );
    }
    // @ts-ignore
    const formatTableData = (
        unFormatData: BudgetProposalModalRead[]
    ): TableDataItemShape[] => {
        // @ts-ignore
        const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            // @ts-ignore
            percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarCurrent),
            // @ts-ignore
            percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarTamalokSarmaye)
        }));
        
        return formatedData;
    };
    
    // @ts-ignore
    const tableData = formatTableData(res);
    
    const sumMosavabCurrent = sumFieldsInSingleItemData(res, "mosavabCurrent",);
    const sumTaminEtebarCurrent = sumFieldsInSingleItemData(res, "taminEtebarCurrent");
    const sumPercentTaminEtebarCurrent = sumFieldsInSingleItemData(res, "percentTaminEtebarCurrent") / res.length;
    
    const sumMosavabTamalokSaramye = sumFieldsInSingleItemData(res, "mosavabTamalokSaramye");
    const sumTaminEtebarAmountTamalokSarmaye = sumFieldsInSingleItemData(res, "taminEtebarAmountTamalokSarmaye");
    const sumPercentTaminEtebarTamalokSarmaye = sumFieldsInSingleItemData(res, "percentTaminEtebarTamalokSarmaye") / res.length;
    
    const sumManabe = sumFieldsInSingleItemData(res, "manabe");
    
    const tableFooter: TableDataItemShape | any = {
        areaName: "جمع کل",
        "colspan-number": 1,
        mosavabCurrent: sumMosavabCurrent,
        taminEtebarCurrent: sumTaminEtebarCurrent,
        // @ts-ignore
        percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarCurrent.toFixed(2)  as number),
        mosavabTamalokSaramye: sumMosavabTamalokSaramye,
        taminEtebarAmountTamalokSarmaye: sumTaminEtebarAmountTamalokSarmaye,
        // @ts-ignore
        percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarTamalokSarmaye.toFixed(2) as number),
        manabe: sumManabe,
    };
    
    return (
        <AdminLayout>
            <div className="grid grid-cols-12 p-2 gap-2 w-full">
                {/*<CustomCard title="جداول" className="h-full">*/}
                {/*    <h1 className="text-center pt-4 font-bold text-[20px]">درآمد</h1>*/}
                {/*    <ResponsiveContainer width="100%" height={280}>*/}
                {/*        <LineChart data={res}>*/}
                {/*            <XAxis dataKey=""/>*/}
                {/*            <YAxis tick={false}/>*/}
                {/*            /!*<YAxis style={{color: 'red'}}/>*!/*/}
                {/*            <Tooltip/>*/}
                {/*            <Legend/>*/}
                {/*            <Line type="monotone" dataKey="manabe" stroke="#3498db" name="منابع"/>*/}
                {/*        </LineChart>*/}
                {/*    </ResponsiveContainer>*/}
                {/*    <h1 className="text-center pt-4 font-bold text-[20px]">اعتبار هزینه ای</h1>*/}
                {/*    <ResponsiveContainer width="100%" height={280}>*/}
                {/*        <LineChart data={res}>*/}
                {/*            <XAxis dataKey=""/>*/}
                {/*            <YAxis tick={false}/>*/}
                {/*            /!*<YAxis style={{color: 'red'}}/>*!/*/}
                {/*            <Tooltip/>*/}
                {/*            <Legend/>*/}
                {/*            <Line type="monotone" dataKey="mosavabCurrent" stroke="#3498db" name="مصوب"/>*/}
                {/*            <Line type="monotone" dataKey="taminEtebarCurrent" stroke="#2ecc71" name="تامین اعتبار"/>*/}
                {/*            <Line type="monotone" dataKey="expenseMonthCurrent" stroke="#e67e22" name="عمکرد"/>*/}
                {/*        </LineChart>*/}
                {/*    </ResponsiveContainer>*/}
                {/*    */}
                {/*    <h1 className="text-center pt-4 font-bold text-[20px]">تملک سرمایه ای</h1>*/}
                {/*    <ResponsiveContainer width="100%" height={280}>*/}
                {/*        <LineChart data={res}>*/}
                {/*            <XAxis dataKey=""/>*/}
                {/*            <YAxis tick={false}/>*/}
                {/*            /!*<YAxis style={{color: 'red'}}/>*!/*/}
                {/*            <Tooltip/>*/}
                {/*            <Legend/>*/}
                {/*            <Line type="monotone" dataKey="mosavabTamalokSaramye" stroke="#3498db" name="مصوب"/>*/}
                {/*            <Line type="monotone" dataKey="taminEtebarAmountTamalokSarmaye" stroke="#2ecc71"*/}
                {/*                  name="تامین اعتبار"/>*/}
                {/*            <Line type="monotone" dataKey="expenseTamalokMali" stroke="#e67e22" name="عمکرد"/>*/}
                {/*        </LineChart>*/}
                {/*    </ResponsiveContainer>*/}
                {/*</CustomCard>*/}
                
                
            <div className="col-span-3 flex flex-col gap-2">
                <CustomCard className="col-span-3" title="حضور غیاب پرسنل">
                    <div className="p-2 grid grid-cols-2 gap-x-3">
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '200px',
                                height: '160px',
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
                            <h6 className="font-bold text-center pb-3">حضور 96 نفر</h6>
                            <div className="px-4">
                                <hr/>
                            </div>
                            <div className="w-full flex justify-between p-2">
                                <span>مرخصی ساعتی</span>
                                <span>5</span>
                            </div>
                            <div className="w-full flex justify-between p-2">
                                <span>مرخصی روزانه</span>
                                <span>10</span>
                            </div>
                            <div className="w-full flex justify-between p-2">
                                <span>ماموریت</span>
                                <span>تست</span>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '200px',
                                height: '160px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <GaugeChart value={75}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="font-bold text-center">عنوان</h6>
                            <div style={{
                                width: '200px',
                                height: '160px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '100%', height: '100%'}}>
                                    <GaugeChart value={75}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </CustomCard>
                <CustomCard title="وضعیت تملک مالی">
                    <div className="pt-4 px-4 flex flex-col items-center">
                        <h6 className="font-bold text-center pb-4">درصد تحقق تملک مالی</h6>
                        <div style={{
                            width: '200px',
                            height: '160px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <div style={{width: '200px', height: '160px'}}>
                                <GaugeChart value={(sumFieldsInSingleItemData(res, 'taminEtebarTamalokMali') / sumFieldsInSingleItemData(res, 'mosavabTamalokMali')).toFixed(1)}/>
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold text-center pb-4">فعلی</h6>
                            <div>{sumFieldsInSingleItemData(res, 'taminEtebarTamalokMali')}</div>
                        </div>
                        <div className="flex justify-between w-full">
                            <h6 className="font-bold text-center">مصوب</h6>
                            <div>{sumFieldsInSingleItemData(res, 'mosavabTamalokMali')}</div>
                        </div>
                        {/*<div className="flex py-4">*/}
                        {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                        {/*</div>*/}
                    </div>
                </CustomCard>
            </div>
                
                <div className="flex flex-col gap-2 col-span-6">
                    <CustomCard title="مناطق">
                        <div style={{height: 400}}>
                            <FixedTable
                                heads={tableHeads}
                                headGroups={tableHeadGroups}
                                data={tableData}
                                footer={tableFooter}
                                notFixed
                            />
                        </div>
                    </CustomCard>
                    <CustomCard title="سازمان ها">
                        <div style={{height: 400}}>
                            <FixedTable
                                heads={tableHeads}
                                headGroups={tableHeadGroups}
                                data={tableData}
                                footer={tableFooter}
                                notFixed
                            />
                        </div>
                    </CustomCard>
                </div>
                
                
                <div className="col-span-3 flex flex-col gap-2">
                    <CustomCard title="وضعیت منابع درآمدی">
                        <div className="pt-4 px-4 flex flex-col items-center">
                            <h6 className="font-bold text-center pb-4">درصد تحقق منابع درآمدی</h6>
                            <div style={{
                                width: '200px',
                                height: '160px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '200px', height: '160px'}}>
                                    <GaugeChart
                                        value={(sumFieldsInSingleItemData(res, 'expenseMonthDramad') / sumFieldsInSingleItemData(res, 'manabe')).toFixed(1)}/>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center pb-4">فعلی</h6>
                                <div>{sumFieldsInSingleItemData(res, 'expenseMonthDramad')}</div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center">مصوب</h6>
                                <div>{sumFieldsInSingleItemData(res, 'manabe')}</div>
                            </div>
                            {/*<div className="flex py-4">*/}
                            {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                            {/*</div>*/}
                        </div>
                    </CustomCard>
                    <CustomCard title="وضعیت اعتبارات هزینه ای">
                        <div className="pt-4 px-4 flex flex-col items-center">
                            <h6 className="font-bold text-center pb-4">درصد تحقق اعتبارات هزینه ای</h6>
                            <div style={{
                                width: '200px',
                                height: '160px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '200px', height: '160px'}}>
                                    <GaugeChart
                                        value={(sumFieldsInSingleItemData(res, 'taminEtebarCurrent') / sumFieldsInSingleItemData(res, 'mosavabCurrent')).toFixed(1)}/>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center pb-4">فعلی</h6>
                                <div>{sumFieldsInSingleItemData(res, 'taminEtebarCurrent')}</div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center">مصوب</h6>
                                <div>{sumFieldsInSingleItemData(res, 'mosavabCurrent')}</div>
                            </div>
                            {/*<div className="flex py-4">*/}
                            {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                            {/*</div>*/}
                        </div>
                    </CustomCard>
                    <CustomCard title="وضعیت منابع درآمدی">
                        <div className="p-4 flex flex-col items-center">
                            <h6 className="font-bold text-center pb-4">درصد تحقق منابع درآمدی</h6>
                            <div style={{
                                width: '180px',
                                height: '120px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <div style={{width: '180px', height: '120px'}}>
                                    <GaugeChart
                                        value={(sumFieldsInSingleItemData(res, 'taminEtebarAmountTamalokSarmaye') / sumFieldsInSingleItemData(res, 'mosavabTamalokSaramye')).toFixed(1)}/>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center pb-4">فعلی</h6>
                                <div>{sumFieldsInSingleItemData(res, 'taminEtebarAmountTamalokSarmaye')}</div>
                            </div>
                            <div className="flex justify-between w-full">
                                <h6 className="font-bold text-center">مصوب</h6>
                                <div>{sumFieldsInSingleItemData(res, 'mosavabTamalokSaramye')}</div>
                            </div>
                            {/*<div className="flex py-4">*/}
                            {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                            {/*</div>*/}
                        </div>
                    </CustomCard>
                </div>
            </div>
        </AdminLayout>
    );
}

export default DashboardPage;
