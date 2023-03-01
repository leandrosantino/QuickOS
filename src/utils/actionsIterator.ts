import { fetch } from './trpc'

type Props = {
    searchText: string;
    machineId: number;
    natureId: number;
    weekCode: string;
    showIgnore: boolean;
}


export async function* actionsIterator(props: Props) {
    const LIMIT = 100
    let done = false
    let cursor = 1
    while (!done) {//
        // console.log(cursor)
        const actions = await fetch.preventive.getActions.query({
            ...props,
            cursor,
            limit: LIMIT
        })
        yield actions;
        if (actions.length < LIMIT) { done = true }
        cursor = actions[actions.length - 1]?.id
    }
}