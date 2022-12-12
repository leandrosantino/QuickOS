import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Historic } from '../pages/preventive/Historic';
import { Opened } from '../pages/preventive/Opened';
import { NewPreventiveActions } from '../pages/preventive/NewPreventiveActions'
import { PreventiveActions } from '../pages/preventive/PreventiveActions'
import { RegisterPreventive } from '../pages/preventive/RegisterPreventive'

export default function PreventiveRoutes() {
  return (
    <PagesContainer className='w-[100%] h-tabPage flex items-center justify-center' >
        <Screen 
            name='Preventive.Historic'
            component={Historic}
        />
        <Screen 
            name='Preventive.Opened'
            component={Opened}
        />
        <Screen 
            name='Preventive.NewPreventiveActions'
            component={NewPreventiveActions}
        />
        <Screen 
            name='Preventive.PreventiveActions'
            component={PreventiveActions}
        />
        <Screen 
            name='Preventive.RegisterPreventive'
            component={RegisterPreventive}
        />
    </PagesContainer>
  )
}
