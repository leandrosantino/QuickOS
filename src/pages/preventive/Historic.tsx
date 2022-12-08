import { BalanceCards } from "../../components/cards/BalanceCards";

import { IoBarChartSharp } from 'react-icons/io5'

export function Historic() {
  return (
    <div>  
    
      <BalanceCards
        Icon={IoBarChartSharp}
        color='green'
        title="MTBF"
        value="250"
        clickable
        
      />


    </div>
  )
}
