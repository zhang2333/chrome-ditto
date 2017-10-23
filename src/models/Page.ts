import { DittoOptions } from "./types"

export default abstract class Page {
    ins: any
    options: DittoOptions

    constructor(options: DittoOptions, ins: any) {
        this.options = options
        this.ins = ins
    }

    isClosed(): boolean {
        return !this.ins
    }

    async close() {
        await this.ins.close()
        this.ins = null
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

    abstract html(): Promise<string>
    abstract screenshot(path: string): Promise<any>
}
