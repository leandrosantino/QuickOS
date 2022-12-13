import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Historic } from '../pages/preventive/Historic';
import { Opened } from '../pages/preventive/Opened';
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
            name='Preventive.Actions.NewActions'
            component={()=>(<PreventiveActions showCreationForm />)}
        />
        <Screen 
            name='Preventive.Actions'
            component={PreventiveActions}
        />
        <Screen 
            name='Preventive.RegisterPreventive'
            component={RegisterPreventive}
        />
    </PagesContainer>
  )
}
