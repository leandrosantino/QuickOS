import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Preventive } from '../pages/preventive';

export default function AppRoutes() {
  return (
    <PagesContainer className='w-[100%] h-[100%] flex items-center justify-center' >
        <Screen
            name='Preventive'
            component={Preventive}
        />
    </PagesContainer>
  )
}
