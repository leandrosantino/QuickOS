
import { TabContainer } from '../../components/Tab/TabContainer'

import PreventiveRoutes from '../../routes/preventive.routes'

export function Preventive() {


  return (
    <div 
        className="
            w-full h-full 
        "
    >
        <TabContainer/>
        <PreventiveRoutes/>
    </div>
  )
}
