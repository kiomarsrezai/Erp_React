import AdminLayout from "components/layout/admin-layout";
import CustomCard from "../components/ui/card/custom-card";
import FixedTable from "../components/data/table/fixed-table";
import {TableHeadGroupShape, TableHeadShape} from "../types/table-type";
import {
    getPercent,
    getRangeColor,
    priceFormat,
    reFormatAmount,
    sumFieldsInSingleItemData
} from "../helper/calculate-utils";
import GaugeChart from "../components/ui/chart/gauge-chart";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "../components/sections/inputs/year-input";
import {FormEvent, useEffect, useState} from "react";
import MonthInput from "../components/sections/inputs/month-input";
import Box from "@mui/material/Box";
import {useMutation} from "@tanstack/react-query";
import {mainRequestApi} from "../api/dashboard/main";
import {DashboardApiRead} from "../types/beforeproposal-type";

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

function DashboardPage() {
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
    
    const [formData, setFormData] = useState({
        yearId: 34,
        monthId: 1,
    });
    
    useEffect(() => {
        callData();
    }, [formData]);
    
    const [res, setRes] = useState<DashboardApiRead[]>([]);
    const [res2, setRes2] = useState<DashboardApiRead[]>([]);
    
    
    const percentTaminEtebarCurrentAction = (value: number) => {
        return (
            <div className="relative">
                <div className="h-full top-0 left-0 absolute" style={{width: `${value}%`, backgroundColor: getRangeColor(value, formData.monthId)}}></div>
                <span className="relative">{value}%</span>
            </div>
        );
    }
    // @ts-ignore
    const formatTableData = (
        unFormatData: DashboardApiRead[]
    ): DashboardApiRead [] => {
        // @ts-ignore
        const formatedData: DashboardApiRead[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            // @ts-ignore
            percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarCurrent),
            // @ts-ignore
            percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarTamalokSarmaye),
            bgcolor: '#1f2125',
            
            mosavabCurrent: reFormatAmount(item.mosavabCurrent),
            taminEtebarCurrent: reFormatAmount(item.taminEtebarCurrent),
            mosavabTamalokSaramye: reFormatAmount(item.mosavabTamalokSaramye),
            taminEtebarAmountTamalokSarmaye: reFormatAmount(item.taminEtebarAmountTamalokSarmaye),
            manabe: reFormatAmount(item.manabe),
            
            "textcolor-areaName": "#fff",
            "textcolor-mosavabCurrent": "#fff",
            "textcolor-taminEtebarCurrent": "#fff",
            "textcolor-percentTaminEtebarCurrentAction": "#fff",
            "textcolor-mosavabTamalokSaramye": "#fff",
            "textcolor-taminEtebarAmountTamalokSarmaye": "#fff",
            "textcolor-percentTaminEtebarTamalokSarmayeAction": "#fff",
            "textcolor-manabe": "#fff",
        }));
        
        return formatedData;
    };
    
    const formatTableData2 = (
        unFormatData: DashboardApiRead[]
    ): DashboardApiRead [] => {
        // @ts-ignore
        const formatedData: DashboardApiRead[] = unFormatData.map((item, i) => ({
            ...item,
            number: i + 1,
            // @ts-ignore
            percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarCurrent),
            // @ts-ignore
            percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(item.percentTaminEtebarTamalokSarmaye),
            bgcolor: '#1f2125',
            
            mosavabCurrent: reFormatAmount(item.mosavabCurrent),
            taminEtebarCurrent: reFormatAmount(item.taminEtebarCurrent),
            mosavabTamalokSaramye: reFormatAmount(item.mosavabTamalokSaramye),
            taminEtebarAmountTamalokSarmaye: reFormatAmount(item.taminEtebarAmountTamalokSarmaye),
            manabe: reFormatAmount(item.manabe),
            "textcolor-areaName": "#fff",
            "textcolor-mosavabCurrent": "#fff",
            "textcolor-taminEtebarCurrent": "#fff",
            "textcolor-percentTaminEtebarCurrentAction": "#fff",
            "textcolor-mosavabTamalokSaramye": "#fff",
            "textcolor-taminEtebarAmountTamalokSarmaye": "#fff",
            "textcolor-percentTaminEtebarTamalokSarmayeAction": "#fff",
            "textcolor-manabe": "#fff",
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
    
    const tableFooter: DashboardApiRead | any = {
        areaName: "جمع کل",
        "colspan-number": 1,
        mosavabCurrent: reFormatAmount(sumMosavabCurrent),
        taminEtebarCurrent: reFormatAmount(sumTaminEtebarCurrent),
        // @ts-ignore
        percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarCurrent.toFixed(2)  as number),
        mosavabTamalokSaramye: reFormatAmount(sumMosavabTamalokSaramye),
        taminEtebarAmountTamalokSarmaye: reFormatAmount(sumTaminEtebarAmountTamalokSarmaye),
        // @ts-ignore
        percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarTamalokSarmaye.toFixed(2) as number),
        manabe: reFormatAmount(sumManabe),
    };
    
    // @ts-ignore
    const tableData2 = formatTableData2(res2);
    const sumMosavabCurrent2 = sumFieldsInSingleItemData(res2, "mosavabCurrent",);
    const sumTaminEtebarCurrent2 = sumFieldsInSingleItemData(res2, "taminEtebarCurrent");
    const sumPercentTaminEtebarCurrent2 = sumFieldsInSingleItemData(res2, "percentTaminEtebarCurrent") / res2.length;
    
    const sumMosavabTamalokSaramye2 = sumFieldsInSingleItemData(res2, "mosavabTamalokSaramye");
    const sumTaminEtebarAmountTamalokSarmaye2 = sumFieldsInSingleItemData(res2, "taminEtebarAmountTamalokSarmaye");
    const sumPercentTaminEtebarTamalokSarmaye2 = sumFieldsInSingleItemData(res2, "percentTaminEtebarTamalokSarmaye") / res2.length;
    
    const sumManabe2 = sumFieldsInSingleItemData(res2, "manabe");
    
    const tableFooter2: DashboardApiRead | any = {
        areaName: "جمع کل",
        "colspan-number": 1,
        mosavabCurrent: reFormatAmount(sumMosavabCurrent2),
        taminEtebarCurrent: reFormatAmount(sumTaminEtebarCurrent2),
        // @ts-ignore
        percentTaminEtebarCurrentAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarCurrent2.toFixed(2)  as number),
        mosavabTamalokSaramye: reFormatAmount(sumMosavabTamalokSaramye2),
        taminEtebarAmountTamalokSarmaye: reFormatAmount(sumTaminEtebarAmountTamalokSarmaye2),
        // @ts-ignore
        percentTaminEtebarTamalokSarmayeAction: percentTaminEtebarCurrentAction(sumPercentTaminEtebarTamalokSarmaye2.toFixed(2) as number),
        manabe: reFormatAmount(sumManabe2),
    };
    
    const submitMutation = useMutation(mainRequestApi.getData, {
        onSuccess: (data) => {
            // @ts-ignore
            setRes(data.data.response);
        },
    });
    const submitMutation2 = useMutation(mainRequestApi.getData2, {
        onSuccess: (data) => {
            // @ts-ignore
            setRes2(data.data.response);
        },
    });
    
    function fetchData(event: FormEvent){
        event.preventDefault();
        callData();
    }
    
    function callData() {
        submitMutation.mutate(formData);
        submitMutation2.mutate(formData);
    }
    
    function percentTamalokSarmaye() {
        return (sumFieldsInSingleItemData(res, 'taminEtebarAmountTamalokSarmaye') / sumFieldsInSingleItemData(res, 'mosavabTamalokSaramye') * 100).toFixed(1);
    }
    
    function percentCurrent() {
        return (sumFieldsInSingleItemData(res, 'taminEtebarCurrent') / sumFieldsInSingleItemData(res, 'mosavabCurrent') * 100).toFixed(1)
    }
    
    function percentDramad() {
        return (sumFieldsInSingleItemData(res, 'expenseMonthDramad') / sumFieldsInSingleItemData(res, 'manabe') * 100).toFixed(1);
    }
    function percentTamalokMali() {
        return (sumFieldsInSingleItemData(res, 'taminEtebarTamalokMali') / sumFieldsInSingleItemData(res, 'mosavabTamalokMali') * 100).toFixed(1);
    }
    
    useEffect(() => {
        callData();
    }, []);
    
    function dashBoardData(){
        if(res.length !== 0 && !submitMutation.isLoading) {
            return (
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
                            <div className="p-2 grid grid-cols-2 ">
                                <div className="flex flex-col border-l border-b border-gray-200">
                                    <h6 className="font-bold text-center">درصد حضور پرسنل</h6>
                                    <div style={{
                                        width: '200px',
                                        height: '120px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{width: '100%', height: '100%'}}>
                                            <GaugeChart value={75}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-200">
                                    <h6 className="font-bold text-center pb-3">بیشترین میزان حضور</h6>
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
                                        <span>4</span>
                                    </div>
                                </div>
                                <div className="flex flex-col border-l border-gray-200">
                                    <h6 className="font-bold text-center">بیشترین میزان حضور</h6>
                                    <div style={{
                                        width: '200px',
                                        height: '120px',
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
                                    <h6 className="font-bold text-center">کمترین میزان حضور</h6>
                                    <div style={{
                                        width: '200px',
                                        height: '120px',
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
                        <CustomCard title="وضعیت تملک مالی" className="h-[245px]">
                            <div className="pt-4 px-4 flex flex-col items-center relative">
                                <h6 className="font-bold text-center pb-4">درصد تحقق تملک مالی</h6>
                                <div style={{
                                    width: '200px',
                                    height: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{width: '200px', height: '120px'}}>
                                        <GaugeChart color={getRangeColor(percentTamalokMali(), formData.monthId)} value={percentTamalokMali()}/>
                                    </div>
                                </div>
                                <div className="relative top-[-40px] w-full">
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center pb-4">فعلی</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'taminEtebarTamalokMali')))}</div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center">مصوب</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'mosavabTamalokMali')))}</div>
                                    </div>
                                </div>
                                    {/*<div className="flex py-4">*/}
                                    {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                                    {/*</div>*/}
                                </div>
                        </CustomCard>
                    </div>
                    
                    <div className="flex flex-col gap-2 col-span-6">
                        <CustomCard title="مناطق">
                            <div>
                                <FixedTable
                                    heads={tableHeads}
                                    headGroups={tableHeadGroups}
                                    data={tableData}
                                    footer={tableFooter}
                                    padding={0.5}
                                    bgFooterAndHeader="#2e3036"
                                    colorFooterAndHeader="#fff"
                                    notFixed
                                />
                            </div>
                        </CustomCard>
                        <CustomCard title="سازمان ها">
                            <div>
                                <FixedTable
                                    heads={tableHeads}
                                    headGroups={tableHeadGroups}
                                    data={tableData2}
                                    footer={tableFooter2}
                                    padding={0.5}
                                    bgFooterAndHeader="#2e3036"
                                    colorFooterAndHeader="#fff"
                                    notFixed
                                />
                            </div>
                        </CustomCard>
                    </div>
                    
                    
                    <div className="col-span-3 flex flex-col gap-2">
                        <CustomCard title="وضعیت منابع درآمدی" className="h-[245px]">
                            <div className="pt-4 px-4 flex flex-col items-center relative">
                                <h6 className="font-bold text-center pb-4">درصد تحقق منابع درآمدی</h6>
                                <div style={{
                                    width: '200px',
                                    height: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{width: '200px', height: '120px'}}>
                                        <GaugeChart color={getRangeColor(percentDramad(), formData.monthId)} value={percentDramad()}/>
                                    </div>
                                </div>
                                <div className="relative top-[-40px] w-full">
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center pb-4">فعلی</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'expenseMonthDramad')))}</div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center">مصوب</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'manabe')))}</div>
                                    </div>
                                </div>
                                    {/*<div className="flex py-4">*/}
                                    {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                                    {/*</div>*/}
                                </div>
                        </CustomCard>
                        <CustomCard title="وضعیت اعتبارات هزینه ای" className="h-[245px]">
                            <div className="pt-4 px-4 flex flex-col items-center relative">
                                <h6 className="font-bold text-center pb-4">درصد تحقق اعتبارات هزینه ای</h6>
                                <div style={{
                                    width: '200px',
                                    height: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{width: '200px', height: '120px'}}>
                                        <GaugeChart color={getRangeColor(percentCurrent(), formData.monthId)} value={percentCurrent()}/>
                                    </div>
                                </div>
                                <div className="relative top-[-40px] w-full">
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center pb-4">فعلی</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'taminEtebarCurrent')))}</div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center">مصوب</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'mosavabCurrent')))}</div>
                                    </div>
                                </div>
                                    {/*<div className="flex py-4">*/}
                                    {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                                    {/*</div>*/}
                                </div>
                        </CustomCard>
                        <CustomCard title="وضعیت تملک سرمایه ای" className="h-[245px]">
                            <div className="p-4 flex flex-col items-center relative">
                                <h6 className="font-bold text-center pb-4">درصد تحقق تملک سرمایه ای</h6>
                                <div style={{
                                    width: '200px',
                                    height: '120px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <div style={{width: '200px', height: '120px'}}>
                                        <GaugeChart color={getRangeColor(percentTamalokSarmaye(), formData.monthId)} value={percentTamalokSarmaye()}/>
                                    </div>
                                </div>
                                <div className="relative top-[-40px] w-full">
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center pb-4">فعلی</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'taminEtebarAmountTamalokSarmaye')))}</div>
                                    </div>
                                    <div className="flex justify-between w-full">
                                        <h6 className="font-bold text-center">مصوب</h6>
                                        <div>{priceFormat(reFormatAmount(sumFieldsInSingleItemData(res, 'mosavabTamalokSaramye')))}</div>
                                    </div>
                                </div>
                                {/*<div className="flex py-4">*/}
                                {/*    <LoadingButton variant="contained" type="button">جزئیات بیشتر</LoadingButton>*/}
                                {/*</div>*/}
                            </div>
                        </CustomCard>
                    </div>
                </div>
            );
        }
        return <div></div>;
    }
    
    return (
        <AdminLayout>
            <div className="w-full bg-dark min-h-screen">
                <Box component="form" onSubmit={fetchData}>
                    <div className="w-full grid grid-cols-12 pb-2 bg-gray-300">
                        <div className="col-span-3 px-2 pt-2">
                            <YearInput setter={setFormData} value={formData.yearId}/>
                        </div>
                        <div className="col-span-3 px-2 pt-2">
                            <MonthInput title="از فروردین الی" setter={setFormData} value={formData.monthId}/>
                        </div>
                        <div className="col-span-3 px-2 pt-2">
                            <LoadingButton variant="contained" type="submit" loading={submitMutation.isLoading}>نمایش</LoadingButton>
                        </div>
                        <div className="col-span-3 px-2 pt-2 flex items-center text-[14px]">
                            <p>تمامی مبالغ ها به هزار ریال میباشد.</p>
                        </div>
                    </div>
                </Box>
                
                {dashBoardData()}
            </div>
        </AdminLayout>
    );
}

export default DashboardPage;
