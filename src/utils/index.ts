export function exists (arr: any[], ite: Function): boolean {
    let flag: boolean = false
    for (let item of arr) {
        if (!!ite(item)) {
            flag = true
            break
        }
    }
    return flag
}
