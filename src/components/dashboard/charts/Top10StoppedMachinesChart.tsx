import { useEffect, useState } from 'react';
import { XAxis, YAxis, BarChart, Tooltip, Bar, ResponsiveContainer} from 'recharts';
import theme from '../../../theme'

interface Props {
  filters?: {
    day: number;
    month: number;
    year: number;
  }
}

export function Top10StoppedMachinesChart({filters}:Props) {

  // eslint-disable-next-line
  const [data, setData] = useState([
    {name: 'M1', value: 15,},
    {name: 'M2', value: 12,},
    {name: 'M3', value: 11,},
    {name: 'M4', value: 8,},
    {name: 'M5', value: 8,},
    {name: 'M6', value: 7,},
    {name: 'M7', value: 6,},
    {name: 'M8', value: 6,},
    {name: 'M9', value: 4,},
    {name: 'M10', value: 3,},
  ])

  useEffect(() => {
    
  }, [filters])

  useEffect(() => {
    
  }, [])
  
  return (
    <div 
      className="w-full h-full max-h-[200px]"
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            right: 30,
            top:10,
            bottom: -10,
          }}
        >

          <YAxis type="number"   fontWeight={600} fontSize={12} stroke={theme.gray[900]} />
          <XAxis type="category" fontWeight={600} fontSize={12} stroke={theme.gray[900]}  dataKey="name"/>
          <Tooltip 
            contentStyle={{
              background: theme.gray[100],
              fontWeight: 600,
              border: 'none',
            }} 
          /> 
          <Bar dataKey="value" fill={theme.blue[500]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}