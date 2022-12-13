interface AcctionsType {
    description: string;
    concluded?: boolean;
}

interface PreventiveType {
    id: number;
    tag: string;
    actions: AcctionsType[],
    responsible?: string,
    date?: string;
    duration?: number;
}