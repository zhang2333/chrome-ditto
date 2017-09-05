const Nightmare = require('nightmare')
const Puppeteer = require('puppeteer')

const Ditto = require('../dist').default

const crawl = async (browser) => {
    let page
    const selInput = '#translateContent'
    const selPara = '#phrsListTab > .trans-container li'
    let timeStart = Date.now()

    try {
        page = await Ditto(browser, { show: false })
        console.log(page.name, 'started')

        await page.goto('http://dict.youdao.com/')
        await page.wait(selInput, 5e3)
        await page.type(selInput, 'browser')
        await page.click('button')

        const waitings = ['.aaa', '#hohwpekm', '.gewagheaw', '.xyz', selPara]
        let index = await page.waitOne(waitings)
        console.assert(4 === index, 'result of waitOne() should be 4')

        let paraphrasing = await page.evaluate((sel) => {
            let ele = document.querySelector(sel)
            return ele.textContent.trim()
        }, waitings[index])

        console.log(page.name, paraphrasing)
    } catch (err) {
        console.error(err)
    } finally {
        await page.close()
        console.log(page.name, `${(Date.now() - timeStart) / 1000}s`)
    }
}

crawl(Nightmare)
crawl(Puppeteer)
