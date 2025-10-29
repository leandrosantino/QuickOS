import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Preventive } from '../pages/preventive';
import { Historic } from '../pages/corrective/Historic';

export default function AppRoutes() {
  return (
    <PagesContainer className='w-[100%] h-[100%] flex items-center justify-center' >
        {/* <Screen
            name='Dashboard'
            component={Home}
        /> */}
        <Screen
            name='Preventive'
            component={Preventive}
        />
        <Screen
            name='Corrective'
            component={Historic}
        />
        <Screen
            name='Settings'
            component={Historic}
        />
    </PagesContainer>
  )
}
