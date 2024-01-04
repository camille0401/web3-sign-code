const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const logging = require('selenium-webdriver/lib/logging');

// 设置日志级别为 INFO
const prefs = new logging.Preferences();
prefs.setLevel(logging.Type.BROWSER, logging.Level.INFO);


class GooleBrowserUtil {
    constructor(uerDataDir, profile) {
        this.profile = profile;
        this.uerDataDir = uerDataDir;
    }

    //实例化驱动器
    initDriver() {
        try {
            //const service = new chrome.ServiceBuilder('/chrome_driver/120/chromedriver.exe').build();

            let options = new chrome.Options();
            options.addArguments('--user-data-dir=' + this.uerDataDir);
            options.addArguments('--profile-directory=' + this.profile);
            this.driver =  new Builder()
                .forBrowser('chrome')
                .setLoggingPrefs(prefs)
                .setChromeOptions(options)
                //.setChromeService(service)
                .build();
            this.closeAll();
            
            return this.driver;
        } catch (e) {
            console.log(e);
        }
    }

    async quit() {
        while (true) {
            try {
                await this.driver.quit();
                await request.get(this.close_url);
                break;
            } catch {
                // do nothing
            }
        }
    }

    //关闭无用的标签页
    async closeAll() {
        const allHandles = await this.driver.getAllWindowHandles();
        for (let i = 1; i < allHandles.length; i++) {
            await this.driver.switchTo().window(allHandles[i]);
            await this.driver.close();
        }
        console.log('已关闭全部无用标签');
        await this.driver.switchTo().window(allHandles[0]);
    }
}


module.exports = GooleBrowserUtil


