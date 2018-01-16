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

        let launchOptions = {
            headless: !options.show,
            ignoreHTTPSErrors: options.ignoreHTTPSErrors,
            args: []
        }

        let proxy = options.proxy
        if (proxy.host) {
            let proxyUrl = `--proxy-server="http=${proxy.host}:${proxy.port}"`
            launchOptions.args.push(proxyUrl)
            launchOptions.args.push('--proxy-bypass-list="127.0.0.1"')
        }

        if (options.launchArgs.length) {
            launchOptions.args = launchOptions.args.concat(options.launchArgs)
        }

        let browser = await this.model.launch(launchOptions)

        this.browser = browser

        return this
    }

    async newPage(): Promise<PuppeteerPage> {
        let options = this.options
        let page = await this.browser.newPage()
        
        if (!options.showImages) {
            await page.setRequestInterception(true)

            const exts = ['png', 'jpg', 'gif']

            page.on('request', (req) => {
                if (exists(exts, ext => req.url.endsWith('.' + ext))) {
                    req.abort()
                } else {
                    req.continue()
                }
            })
        }

        let proxy = options.proxy
        if (proxy.username) {
            await page.authenticate({
                username: proxy.username,
                password: proxy.password
            })
        }

        return new PuppeteerPage(options, page)
    }

    async close() {
        await this.browser.close()
    }
}
