import {useContext} from  'react'

import {DialogContext, UseDialogProps} from '../contexts/DialogContext'

export function useDialog() : UseDialogProps{
	const context = useContext(DialogContext);
	const {dialogAlert, dialogError, dialogQuestion} = context
	return {dialogAlert, dialogError, dialogQuestion};
}