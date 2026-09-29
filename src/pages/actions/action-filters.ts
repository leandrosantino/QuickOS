export type ActionFilters = {
  weekCode: string
  machine: number
  nature: number
  searchText: string
  showIgnore: boolean
}

export type ActionFilterKey = keyof ActionFilters

export const DEFAULT_ACTION_FILTERS: ActionFilters = {
  weekCode: "",
  machine: -1,
  nature: -1,
  searchText: "",
  showIgnore: false,
}
