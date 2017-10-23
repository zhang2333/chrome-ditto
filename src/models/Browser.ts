import { DittoOptions } from "./types"
import Page from './Page'

export default abstract class Browser<P extends Page> {
    name: string
    model: any
    options: DittoOptions

    constructor(model: any) {
        this.model = model
    }

    abstract init(options: DittoOptions): Promise<Browser<P>>
    abstract newPage(): Promise<P>
    abstract close(): Promise<void>
}
