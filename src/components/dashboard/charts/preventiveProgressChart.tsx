import { useEffect, useState } from 'react';
import { Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import theme from '../../../theme'

interface Props {
  filters?: {
    day: number;
    month: number;
    year: number;
  }
}

export function PreventiveProgressChart({ filters }: Props) {

  const [data, setData] = useState([
    { name: 'Concluído', value: 30, },
    { name: 'Em aberto', value: 70, },
  ])

  useEffect(() => {

  }, [filters])

  useEffect(() => {

  }, [])

  return (
    <div
      className='w-full h-full max-h-[200px]'
    >
      <ResponsiveContainer>
        <PieChart
          width={730}
          height={250}

        >
          <text fontWeight={600} fontSize={24} x={'37%'} y={'50%'} dy={8} textAnchor="middle" >
            {`${data[0].value}%`}
          </text>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            formatter={(value: string)=>(<span className='text-gray-900 font-medium' >{value}</span>)}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={95}
            stroke='none'
            cx={'50%'} cy={'50%'}
          >
            {
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index >= 1 ? theme.gray[500] : theme.green[500]}
                />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )

} 
