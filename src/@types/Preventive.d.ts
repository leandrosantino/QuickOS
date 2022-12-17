interface AcctionsType {
    id?: number;
    description: string;
    concluded?: boolean;
    tag?: string;
    nature?: string;
    frequency?: number|string;
    nextExecution?: string;
    criticality?: string

}

interface PreventiveType {
    id: number;
    tag: string;
    actions: AcctionsType[],
    responsible?: string,
    date?: string;
    duration?: number;
}