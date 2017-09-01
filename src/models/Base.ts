import { DittoOptions } from "./types"

export default abstract class Base {
    model: any
    ins: any

    constructor (model: any) {
        this.model = model
    }

    async goto(url: string) {
        await this.ins.goto(url)
    }

    async wait(...args) {
        await this.ins.wait(...args)
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

    evaluate(...args): Promise<any> {
        return this.ins.evaluate(...args)
    }

    html(): Promise<string> {
        return this.ins.html()
    }

    abstract close(): Promise<void>
    abstract init(options: DittoOptions): Promise<any>
    abstract screenshot(path: string): Promise<any>
}
