
const { By, Key, until } = require('selenium-webdriver');
const extensionId = 'nkbihfbeogaeaoehlefnkodbefgpgknn';
const tool = require('../tool');

class okxWallat {
    constructor(driver) {
        this.driver = driver;
    }

    //钱包login
    async login(pwd) {

        try {
            //定位密码输入框
            let pwd_input = await tool.reFindElement(this.driver, { type: 'xpath', content: '//input[contains(@class,"okui-input-input")]' });
            if (pwd_input) {
                await tool.oper(pwd_input, "input", pwd);
                await this.driver.sleep(1000);
                //定位登录按钮
                let login_button = await tool.reFindElement(this.driver, { type: 'xpath', content: '//button[contains(@class,"okui-btn btn-xl btn-fill-highlight block mobile")]' });
                if (login_button) {
                    await tool.oper(login_button, "click");
                    await this.driver.sleep(1000);
                    //确认连接账户
                    let confirm_button = await tool.reFindElement(this.driver, { type: 'xpath', content: '//button[contains(@class,"okui-btn btn-lg btn-fill-highlight mobile _action-button_1ntoe_1")]' });
                    if (confirm_button) {
                        await tool.oper(confirm_button, "click");
                        await this.driver.sleep(1000);
                    }
                }
            }
        } catch (e) {
            
        }

    }

    //钱包名称切换账号
    async change_account(account) {
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath('//button[@data-testid="network-display"]')).click();
        await this.driver.findElement(By.xpath('//span[text()="' + account.name + '"]')).click();

    }

    //狐狸钱根据名称切换网络
    async change_chain(chain_name) {
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath('//button[@data-testid="network-display"]')).click();

        let eles = await this.driver.findElements(By.xpath('//div[text()="' + chain_name + '"]'));
        if (eles && eles.length > 0) {
            eles[0].click();
        } else {
            eles = await this.driver.findElements(By.xpath('//span[text()="' + chain_name + '"]'));
            eles[0].click();
        }
    }

    //钱确认操作
    async confirm() {
        try {
            //确认连接账户
            let confirm_button = await tool.reFindElement(this.driver, { type: 'xpath', content: '//button[contains(@class,"okui-btn btn-lg btn-fill-highlight mobile _action-button_1ntoe_1")]' });
            if (confirm_button) {
                await tool.oper(confirm_button, "click");
                await this.driver.sleep(1000);
            }
        } catch (error) {
            
        }
    }

    //钱拒绝操作
    async refused() {
        let handles = await driver.getAllWindowHandles();

        while (handles.length == 1) {
            await driver.sleep(3000);
            handles = await driver.getAllWindowHandles();
        }

        if (handles.length > 1) {
            await driver.switchTo().window(handles[1]);
            await driver.findElement(By.xpath('//button[@data-testid="page-container-footer-cancel]')).click();

        } else {
            console.log("没有钱包弹窗！");
            return null;
        }

    }



}

module.exports = okxWallat