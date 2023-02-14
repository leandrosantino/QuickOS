import {
	createContext,
	ReactNode,
	useState,
	useEffect,
	ReactComponentElement,
	JSXElementConstructor,
	useContext
} from "react";
 

export type Pages =
	'Dashboard' |
	'Preventive' |
	'Preventive.Plan' |
	'Preventive.Plan.Calendar.ServiceOrders' |
	'Preventive.Plan.Calendar' |
	'Preventive.Opened' |
	'Preventive.Actions' |
	'Preventive.Actions.NewActions' |
	'Preventive.Actions.EditActions' |
	'Preventive.RegisterPreventive' |
	'Corrective' |
	'Settings'

type GoToPageType = <T>(name: Pages, props: T) => void
type PageNamesLinkProps = { page: Pages | any }
type PageNameLinkType = (props: PageNamesLinkProps) => JSX.Element

export interface PageContextDataProps {
	goToPage: GoToPageType;
	backPage: ()=>void;
	currentPage: string;
	currentPageProps: any;
	sideMenuIsReduce: boolean;
	changeSideMenu: (value: boolean) => void,
	PageNameLink: PageNameLinkType,
}

interface PagesContextProviderProps {
	children: ReactNode;
}

export const PagesContext = createContext({} as PageContextDataProps);

export function PagesContextProvider({ children }: PagesContextProviderProps) {

	const [currentPage, setcurrentPage] = useState<string>('Dashboard')
	const [lastPage, setlastPage] = useState<string>('Dashboard')
	const [currentPageProps, setCurrentPageProps] = useState<any>()
	const [sideMenuIsReduce, setSideMenuIsReduce] = useState<boolean>(false)

	const goToPage: GoToPageType = (name, props) => {
		setlastPage(currentPage)
		setcurrentPage(name)
		setCurrentPageProps(props)
	}

	function backPage(){
		setcurrentPage(lastPage)
	}

	function changeSideMenu(value: boolean) {
		setSideMenuIsReduce(value)
	}

	function PageNameLink({ page }: PageNamesLinkProps) {
		const names = {
			'Plan': 'Plano Anual',
			'ServiceOrders': 'Ordem de Serviço',
			'Calendar': 'Calendário',
			'Dashboard': 'Dashboard',
			'Preventive': 'Preventiva',
			'Opened': 'Em Aberto',
			'NewActions': 'Nova Ação',
			'EditActions': 'Editar Ação',
			'Actions': 'Ações',
			'RegisterPreventive': 'Lançamento',
			'Corrective': 'Corretiva',
			'Settings': 'Configurações'
		}
		const pageNames: typeof names | any = { ...names }

		const pageNameSplit: string[] = page.split('.')
		const [Routes, setRoutes] = useState<string[]>([])

		useEffect(() => {
			let routeArray: string[] = []
			let route: string = ''
			pageNameSplit.forEach((entry, index) => {
				if (index > 0) {
					route += `.${entry}`
					routeArray.push(route)
					return
				}
				route = entry
				routeArray.push(route)
				return
			})
			setRoutes(routeArray)

			// eslint-disable-next-line
		}, [page])

		return (
			<div>
				{
					pageNameSplit.map((entry, index) => (
						<button
							key={index}
							onClick={() => goToPage(`${Routes[index]}` as Pages, {})}
							className="hover:text-gray-300 h-full"
						>
							{pageNames[entry] + (index === pageNameSplit.length - 1 ? '' : ' > ')}
						</button>
					))
				}
			</div>
		)
	}


	return (
		<PagesContext.Provider value={{
			goToPage,
			currentPage,
			currentPageProps,
			sideMenuIsReduce,
			changeSideMenu,
			PageNameLink,
			backPage

		}}>
			{children}
		</PagesContext.Provider>
	)
}

interface ScreenProps {
	name: Pages;
	component: () => JSX.Element
}

interface PagesProviderProps {
	children: ReactComponentElement<JSXElementConstructor<any>, ScreenProps>[];
	className: string;
}

export function Screen({ name, component }: ScreenProps) {
	return (<>{name}{component}</>)
}

export function PagesContainer({ children, className }: PagesProviderProps) {

	const { currentPage, currentPageProps, goToPage } = useContext(PagesContext)
	const [pageComponent, setPageComponent] = useState<JSX.Element>()

	useEffect(() => {
		goToPage(children[0].props.name, {})
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		children.forEach(({ props }) => {
			if (props.name === currentPage) {
				setPageComponent(<props.component {...currentPageProps} />)
			}
		})
		// eslint-disable-next-line
	}, [currentPage, currentPageProps])

	return (
		<div className={className}>
			{pageComponent}
		</div>
	)
}




