interface ActionsType {
    id?: number;
    description: string;
    concluded?: boolean;
    tag?: string;
    nature?: string;
    frequency?: number|string;
    nextExecution?: string;
}

interface PreventiveType {
    id: number;
    tag: string;
    actions: ActionsType[],
    responsible?: string,
    date?: string;
    duration?: number;
}