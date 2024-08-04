import React, {useEffect} from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import {getRangeColor} from "../../../helper/calculate-utils";

interface Props {
    value: any,
    color?: string|undefined
}

const GaugeChart = ({value, color}: Props) => {
    const data = [
        //@ts-ignore
        { name: 'Value', value: value - 0},
        //@ts-ignore
        { name: 'Rest', value: 100 - value }
    ];
    
    const COLORS = [color?? '#8884d8', '#e0e0e0'];
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="70%"
                    outerRadius="100%"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="progress-label"
                    color="red"
                    fill="#fff"
                    style={{ fontSize: '21px', fontWeight: 'bold'}}>
                    {`${value}%`}
                </text>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default GaugeChart;

