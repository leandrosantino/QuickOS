import { useEffect, useState } from 'react';
import { XAxis, YAxis, BarChart, Tooltip, Bar, ResponsiveContainer, Cell, Legend } from 'recharts';
import theme from '../../../theme'

interface Props {
  filters?: {
    day: number;
    month: number;
    year: number;
  }
}

export function MTBFandMTTRbyTecChart({filters}:Props) {

  const [data, setData] = useState([
    {name: 'TEC 1', MTBF: 250, MTTR: 36,},
    {name: 'TEC 2', MTBF: 200, MTTR: 45,},
    {name: 'TEC 3', MTBF: 300, MTTR: 52,},
    {name: 'TEC 4', MTBF: 220, MTTR: 26,},
  ])

  const [goals, setGoals] = useState({mtbf: 220, mttr: 45})

  useEffect(() => {
    
  }, [filters])

  useEffect(() => {
    
  }, [])
  
  return (
    <div 
      className="w-full h-full max-h-[430px]"
    >
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            right: 30,
            left: 10
          }}
        >

          <XAxis type="number"   fontWeight={600} fontSize={12} stroke={theme.gray[900]} />
          <YAxis type="category" fontWeight={600} fontSize={12} stroke={theme.gray[900]}  dataKey="name"/>
          <Tooltip 
            contentStyle={{
              background: theme.gray[100],
              fontWeight: 600,
              border: 'none',
            }} 
          /> 
          <Legend
            formatter={(value: string)=>(<span className='text-gray-900 font-medium' >{value}</span>)}
          />
          <Bar dataKey="MTTR" fill={theme.green[500]}>
            {
              data.map((entry, index)=> (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.MTTR>goals.mttr?theme.red[500]:theme.green[500]} 
                />
              ))
            }
          </Bar>
          <Bar dataKey="MTBF" fill={theme.green[600]}>
            {
              data.map((entry, index)=> (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.MTBF>goals.mtbf?theme.red[600]:theme.green[700]} 
                />
              )) 
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
//1DA39A