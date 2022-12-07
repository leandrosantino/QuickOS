import {useContext} from  'react'

import {PageContextDataProps, PagesContext} from '../contexts/PagesContext'

export function usePages() : PageContextDataProps{
	const context = useContext(PagesContext);
	return context;
}