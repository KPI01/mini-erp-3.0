export function classMixer(...classes: string[]) {
    return classes.join(" ")
}

export function cleanErrors(name: string, bag?: Record<string, unknown & { _errors: string[] }>) {
    let errors: string[] = []

    if (!bag) return undefined

    const keys = Object.keys(bag)

    keys.map((k) => {
        if (k === name) errors = bag[ k ]._errors
        return
    })

    return errors
}