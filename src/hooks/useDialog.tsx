import {useContext} from  'react'

import {DialogContext, DialogContextDataProps} from '../contexts/DialogContext'

export function useDialog() : DialogContextDataProps{
	const context = useContext(DialogContext);
	return context;
}