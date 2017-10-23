import Page from '../models/Page'
import { DittoOptions } from '../models/types'
import { exists } from '../utils'

export default class PuppeteerPage extends Page {
    name: string = 'puppeteer'

    wait(...args): Promise<void> {
        const firstArg = args[0]

        let timeout

        if (args.length > 1) {
            timeout = this.options.waitTimeout
        }

        let ops = { timeout }

        if (typeof firstArg === 'string') {
            args[1] = ops
        } else if (typeof firstArg === 'function') {
            args.splice(1, 0, ops)
        }

        return this.ins.waitFor(...args)
    }

    html(): Promise<string> {
        return this.ins.content()
    }

    async type(selector: string, text: string) {
        await this.ins.focus(selector)
        await this.ins.type(text)
    }

    async screenshot(path: string) {
        await this.ins.screenshot({ path })
    }

    async setViewport(width: number, height: number) {
        await this.ins.setViewport({ width, height })
    }
}
