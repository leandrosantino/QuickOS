import { XAxis, YAxis, BarChart, Tooltip, Bar } from 'recharts';
import theme from '../../../theme'

const data = [
    {name: 'TEC 1', MTBF: 250, MTTR: 36,},
    {name: 'TEC 2', MTBF: 200, MTTR: 45,},
    {name: 'TEC 3', MTBF: 300, MTTR: 52,},
    {name: 'TEC 4', MTBF: 220, MTTR: 26,},
];

export function DashLineChart() {
  return (
    <BarChart
        layout="vertical"
        width={380}
        height={550}
        data={data}
        margin={{
            left: 10,
            right: 40,
            top: 10,
        }}
    >

        <XAxis type="number"   fontWeight={600} stroke='#13181d' />
        <YAxis type="category" fontWeight={600} stroke='#13181d' dataKey="name"/>
        <Tooltip 
            contentStyle={{
                background: theme.gray[100],
                fontWeight: 600,
                border: 'none',
            }} 
        /> 

        <Bar dataKey="MTTR" fill={theme.green[500]} />
        <Bar dataKey="MTBF" fill={theme.blue[500]} />
    </BarChart>
  )
}
//1DA39A