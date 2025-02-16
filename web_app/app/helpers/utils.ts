export function classMixer(...classes: string[]) {
    return classes.join(" ")
}

export function cleanErrors(name?: string, bag?: unknown) {
    if (!name || !bag) return undefined

    let errors: string[] = []

    const keys = Object.keys(bag)

    keys.map((k) => {
        //@ts-ignore
        if (k === name) errors = bag[k]._errors
        return
    })

    return errors
}