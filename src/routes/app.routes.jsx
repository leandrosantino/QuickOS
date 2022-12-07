import {PagesContainer, Screen} from '../contexts/PagesContext';

import { Home } from '../pages/Home';
import { Send } from '../pages/send';

export default function AppRoutes() {
  return (
    <PagesContainer className='w-[100%] h-[100%] flex items-center justify-center' >
        <Screen 
            name='Dashboard'
            component={Home}
        />
        <Screen 
            name='Send'
            component={Send}
        />
    </PagesContainer>
  )
}
