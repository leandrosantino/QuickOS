import { YearContext } from '../contexts/yearContext';
import {useContext} from  'react'

export function useYear(){
	const context = useContext(YearContext);
	return context
}
