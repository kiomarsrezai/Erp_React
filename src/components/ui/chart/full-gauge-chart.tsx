import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const FullGaugeChart = ({ value }) => {
    const data = [
        { name: 'Value', value },
        { name: 'Rest', value: 100 - value }
    ];
    
    const COLORS = ['#8884d8', '#e0e0e0'];
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    startAngle={90}
                    endAngle={-270}
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
                    style={{ fontSize: '24px', fontWeight: 'bold' }}
                >
                    {`${value}%`}
                </text>
            </PieChart>
        </ResponsiveContainer>
    );
};

export default FullGaugeChart;


