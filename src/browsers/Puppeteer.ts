import Base from '../models/Base'
import { DittoOptions } from "../models/types"
import { exists } from '../utils'

export default class Puppeteer extends Base {
    browser: any
    name: string = 'puppeteer'

    constructor (model: any) {
        super(model)
    }

    async init(options: DittoOptions) {
        let browser = await this.model.launch({
            headless: !options.show,
            ignoreHTTPSErrors: options.ignoreHTTPSErrors
        })

        let page = await browser.newPage()

        if (!options.showImages) {
            await page.setRequestInterceptionEnabled(true)

            const exts = ['png', 'jpg', 'gif']
    
            page.on('request', (req) => {
                if (exists(exts, ext => req.url.endsWith('.' + ext))) {
                    req.abort()
                } else {
                    req.continue()
                }
            })
        }

        this.ins = page
        this.browser = browser

        return this
    }

    wait(...args): Promise<void> {
        const firstArg = args[0]

        if (args.length > 1) {
            if (typeof firstArg === 'string') {
                args[1] = { timeout: args[1] }
            } else if (typeof firstArg === 'function') {
                args.splice(1, 0, {})
            }
        }

        return this.ins.waitFor(...args)
    }

    html(): Promise<string> {
        return this.ins.content()
    }

    close(): Promise<void> {
        return this.browser.close()
    }

    async type(selector: string, text: string) {
        await this.ins.focus(selector)
        await this.ins.type(text)
    }

    async screenshot(path: string) {
        await this.ins.screenshot({ path })
    }

    async viewport(width: number, height: number) {
        await this.ins.setViewport({ width, height })
    }
}
