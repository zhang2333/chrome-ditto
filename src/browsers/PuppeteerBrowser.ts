import Browser from '../models/Browser'
import PuppeteerPage from '../pages/PuppeteerPage'
import { DittoOptions } from '../models/types'
import { exists } from '../utils'

export default class PuppeteerBrowser extends Browser<PuppeteerPage> {
    name: string = 'puppeteer'
    browser: any

    async init(options: DittoOptions): Promise<PuppeteerBrowser> {
        options = options || this.options
        this.options = options

        let browser = await this.model.launch({
            headless: !options.show,
            ignoreHTTPSErrors: options.ignoreHTTPSErrors
        })

        this.browser = browser

        return this
    }

    async newPage(): Promise<PuppeteerPage> {
        let options = this.options
        let page = await this.browser.newPage()
        
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

        return new PuppeteerPage(options, page)
    }

    async close() {
        await this.browser.close()
    }
}
