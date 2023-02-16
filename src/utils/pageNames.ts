export const pageNames = {
    'Dashboard': {},
    'Preventive': {},
    'Preventive.Plan': {},
    'Preventive.Plan.Calendar.ServiceOrders': {},
    'Preventive.Plan.Calendar.ServiceOrders.Execute': {},
    'Preventive.Plan.Calendar': {},
    'Preventive.Opened': {},
    'Preventive.Actions': {},
    'Preventive.Actions.NewActions': {},
    'Preventive.Actions.EditActions': {},
    'Preventive.RegisterPreventive': {},
    'Corrective': {},
    'Settings': {},
}

export type Pages = keyof typeof pageNames


export const translatedPageNames = {
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
    'Settings': 'Configurações',
    'Execute': 'Execultar'
}