export function splitWorkerName(name: string | null | undefined) {
    // const allName = name?.split(' ')
    // if (allName) {
    //     const fistName = allName[0]
    //     const secondName = allName[1].length <= 3 ? allName[2] : allName[1]
    //     return `${fistName} ${secondName}`
    // }
    return name ?? 'Não encontrado!'
}
