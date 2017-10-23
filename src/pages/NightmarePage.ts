import * as path from 'path'

import Page from '../models/Page'
import { DittoOptions } from '../models/types'
import * as utils from '../utils'

export default class NightmarePage extends Page {
    ins: any

    html(): Promise<string> {
        return this.evaluate(() => {
            return document.documentElement.outerHTML
        })
    }

    async close() {
        await this.ins.end()
        this.ins = null
    }

    async wait(...args) {
        const firstArg = args[0]

        if (typeof firstArg === 'function') {
            let timeout = args[1] >= 0 ? args[1] : this.options.waitTimeout
            args.splice(1, 1)
            await utils.timeout(this.ins.wait(...args), timeout)
        } else {
            await this.ins.wait(...args)
        }
    }

    async waitOne(waitings: Array<any>, timeout: number) {
        timeout = timeout >= 0 ? timeout : this.options.waitTimeout

        let waitingsString = waitings.map((w) => {
            let ret
            if (typeof w === 'string') {
                ret = `!!document.querySelector('${w}')`
            } else if (typeof w === 'function') {
                ret = `(${w.toString()})()`
            } else {
                throw new Error('Wrong type param in waitOne')
            }
            return ret
        })

        let waitFuncContent = `return ${waitingsString.join('||')}`

        await this.wait(new Function(waitFuncContent), timeout)

        let evalFuncContent = waitingsString.map((w, i) => `if(${w}){return ${i}}`).join('\n')

        let index = await this.evaluate(new Function(evalFuncContent))

        return index
    }

    async screenshot(filePath: string) {
        await this.ins.screenshot(path.resolve(process.cwd(), filePath))
    }

    async setUserAgent(ua: string) {
        await this.ins.useragent(ua)
    }

    async setViewport(width: number, height: number) {
        await this.ins.viewport(width, height)
    }
}
