const BrowserUtil = require("./chormeDriverInit.js");

const { By, Key, until } = require('selenium-webdriver');

const tool = require('../tool');

const config = require('./config.js');





async function work() {
    for (let i = 0; i < config.accounts.length; i++) {
        try {
            let browser = new BrowserUtil(config.accounts[i].adsId);

            await browser.init();

            await browser.closeAll();

            await browser.driver.get("https://twitter.com/home");
            // 等待插件加载完成
            await browser.driver.sleep(2000);

            // Scroll down the page
            // 等待页面加载完成
            await browser.driver.wait(until.elementLocated(By.css('body')), 10000);


            //let input_eles = await  browser.driver.findElements(By.xpath("//div[label[text()='推文文本']]"));
            // let input_eles = await browser.driver.findElements(By.className("css-1dbjc4n r-xoduu5 r-xyw6el r-mk0yit r-13qz1uu"));
            // if (input_eles && input_eles.length > 0) {
            //     await input_eles[0].click();
            //     await browser.driver.sleep(2000);

            //     let span_ele = await input_eles[0].findElements(By.css('span'));
            //     if (span_ele && span_ele.length > 0) {
            //         await span_ele[0].sendKeys("下周烧烤，有木有人约起！");
            //         await browser.driver.sleep(2000);
            //         let tui_eles = await browser.driver.findElements(By.xpath("//span[contains(text(), '发推')]"));
            //         if (tui_eles && tui_eles.length > 0) {
            //             if(tui_eles.length ==1 ){
            //                 await tui_eles[0].click();
            //             }else{
            //                 await tui_eles[1].click(); 
            //             }
                        
            //             await browser.driver.sleep(2000);
            //             let profile_eles = await browser.driver.findElements(By.xpath("//span[contains(text(), '个人资料')]"));
            //             if (profile_eles && profile_eles.length > 0) {
            //                 await profile_eles[0].click();
            //                 await browser.driver.sleep(2000);

            //             }
            //         }
            //     }

            // }







            // 模拟人工滚动
            const scrollHeight = await browser.driver.executeScript('return document.body.scrollHeight;');
            for (let i = 0; i < 200; i++) {
                await browser.driver.executeScript(`window.scrollTo(0, ${i * 80});`);
                await browser.driver.sleep(400);
            }


            


            // // Wait for the page to load
            // await browser.driver.sleep(10000);

            // // Scroll up the page
            // await browser.driver.executeScript('window.scrollTo(0, 500);');

            // // Wait for the page to load
            // await browser.driver.sleep(10000);

            console.log(config.accounts[i].adsId + "启动完毕");



        } finally {
            // 关闭浏览器
            //await driver.quit();
        }
    }

}



work();














