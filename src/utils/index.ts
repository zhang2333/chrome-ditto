export function exists(arr: any[], ite: Function): boolean {
    let flag: boolean = false
    for (let item of arr) {
        if (!!ite(item)) {
            flag = true
            break
        }
    }
    return flag
}

export function timeout(promise: Promise<any>, time: number = 0): Promise<any> {
    return new Promise((res, rej) => {
        promise.then(res)
        setTimeout(() => {
            rej(new Error(`timed out after ${time} msec`))
        }, time)
    })
}
