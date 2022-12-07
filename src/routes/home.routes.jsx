import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Corretivas } from '../pages/corretivas';
import { Preventivas } from '../pages/preventivas';

export default function HomeRoutes() {
  return (
    <PagesContainer className='w-[100%] h-[100%] flex items-center justify-center' >
        <Screen 
            name='preventivas'
            component={Preventivas}
        />
        <Screen 
            name='corretivas'
            component={Corretivas}
        />
    </PagesContainer>
  )
}
