import { DittoOptions } from "./types"

export default abstract class Base {
    name: string
    model: any
    ins: any
    options: DittoOptions

    constructor(model: any, options: DittoOptions) {
        this.model = model
        this.options = options
    }

    isClosed(): boolean {
        return !!this.ins
    }

    async goto(url: string) {
        await this.ins.goto(url)
    }

    async type(selector: string, text: string) {
        await this.ins.type(selector, text)
    }

    async click(selector: string) {
        await this.ins.click(selector)
    }

    async setViewport(width: number, height: number) {
        await this.ins.setViewport(width, height)
    }

    async setUserAgent(ua: string) {
        await this.ins.setUserAgent(ua)
    }

    async wait(...args: any[]) {
        await this.ins.wait(...args)
    }

    async waitOne(waitings: Array<any>, timeout: number) {
        timeout = timeout >= 0 ? timeout : this.options.waitTimeout

        const promises = waitings.map((w, i) => {
            return this.wait(w, timeout).then(() => i)
        })

        let index = await Promise.race(promises)

        return index
    }

    evaluate(...args): Promise<any> {
        return this.ins.evaluate(...args)
    }

    abstract close(): Promise<void>
    abstract html(): Promise<string>
    abstract init(options: DittoOptions): Promise<any>
    abstract screenshot(path: string): Promise<any>
}
