# Chrome Ditto

Common API for `Nightmare`, `Puppeteer`

## Install

``` shell
yarn add chrome-ditto

# or npm
npm i chrome-ditto
```

## Usage

``` js
const Ditto = require('chrome-ditto')
const Nightmre = require('nightmare')
// const puppeteer = require('puppeteer')

(async () => {
    const page = await Ditto(Nightmare)
    // const page = Ditto(puppeteer)
    await page.goto('http://www.example.com/')
    await page.wait('h1')
    let content = await page.evaluate(() => {
        return document.querySelector('p').textContent.trim()
    })
    console.log('content:', content)
    await page.screenshot('./example.png')
    await page.close()
})()
```

## API

see `src/browsers` temporary
