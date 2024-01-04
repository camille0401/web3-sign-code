
const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// 设置Chrome浏览器选项，使用已登录的谷歌账号


class init {
    constructor(profile) {
        this.profile = profile;
    }

    initDriver() {
        let options = new chrome.Options();
        options.addArguments('--user-data-dir=C:/Users/root/AppData/Local/Google/Chrome/User Data');
        options.addArguments('--profile-directory=' + this.profile);

        console.log(this.profile);

        return new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }
}

// tag_0,小狐狸解锁页
async function unlockWallt(driver, type, extensionId, pwd) {
    try {
        // 导航到谷歌网站并登录
        if (type == 'mateMask') {
            await driver.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#unlock');
            await driver.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#unlock');
            // 等待插件加载完成
            await driver.sleep(10000);
            await driver.findElement(By.id('password')).sendKeys(pwd);

            await driver.findElement(By.xpath('//button[@data-testid="unlock-submit"]')).click();
        } else {
            console.log(type + "钱包未支持，开发中... ...");
        }

    } finally {
        // 关闭浏览器
        //await driver.quit();
    }
}

// tag_0,打开小狐狸切换链
async function changeWalltCln(driver, type, extensionId, pwd) {
    try {
        // 导航到谷歌网站并登录
        if (type == 'mateMask') {
            await driver.get('chrome-extension://' + extensionId + '/home.html');
            // 等待插件加载完成
            await driver.sleep(2000);

            let ele = await driver.findElement(By.id('password'));
            debugger
            console.log(ele);
            if(ele){
                ele.sendKeys(pwd);
            }else{
                await driver.get('chrome-extension://' + extensionId + '/home.html');
                await driver.sleep(2000);
                ele.sendKeys(pwd);
            }
            
            

            await driver.findElement(By.xpath('//button[contains(text(), "登录")]')).click();
        } else {
            console.log(type + "钱包未支持，开发中... ...");
        }

    } finally {
        // 关闭浏览器
        //await driver.quit();
    }
}





//zksync 测试链 bridge
async function task_1(driver) {
    try {

        // 导航到谷歌网站并登录
        console.log("开始连接 zksync bridge")
        await driver.get('https://portal.zksync.io/bridge/');
        console.log("连接 zksync 主网成功，开始查找主测切换按钮！");

        let changeBut = await checkElements(driver, 'id', 'headlessui-listbox-button-6');
        if (changeBut.length > 0) {
            console.log("找到主测切换按钮，点击主测切换按钮！");
            await changeBut[0].click();
            console.log("点击主测切换按钮")
        } else {
            console.error("can not find test or era change button!");
            //await driver.quit();
        }
        console.log("开始查找测试网选项！")


        let testSelect = await checkElements(driver, 'xpath', '//span[contains(text(), "zkSync Era Testnet")]');
        if (testSelect.length > 0) {
            console.log("找到测试网选项，点击！")
            await testSelect[0].click();
            console.log("切换到测试网，开始查找ges标签");
        } else {
            console.error("can not find test select!");
            //await driver.quit();
        }


        let gasSpan = await checkElements(driver, "className", "converted-fee-value");
        if (gasSpan.length > 0) {
            console.log("找到ges标签，判断gas fee");
        } else {
            console.error("can not find gas fee!");
            //await driver.quit();
        }


        console.log("开始查找amount输入标签")
        let amountInput = await checkElements(driver, "className", "balance-input z-10");
        if (amountInput.length > 0) {
            console.log("找到amount输入标签,并赋值0.01");
            amountInput[0].sendKeys('0.01');
        } else {
            console.error("can not find amount input!");
        }


        console.log("Deposit前检查有没有网络切换！");
        await changeMateNet(driver) ;
        await driver.sleep(2000);

        console.log("开始查找Deposit")
        let depositBut = await checkElements(driver, 'xpath', '//button[(text()="Deposit")]');
        if (depositBut.length > 0) {
            console.log("找到Deposit按钮,点击！");
            depositBut[0].click();
        } else {
            console.error("can not find amount input!");
        }

        await confirmMate(driver);

    } finally {
        // 关闭浏览器
        //await driver.quit();
    }
}


async function findElements(driver, byType, value) {

    //return await driver.findElements(By.id('headlessui-listbox-button-6'));
    if (byType == 'id') {
        console.log("findElements.By.id:" + value);
        return await driver.findElements(By.id(value));
    } else if (byType == 'className') {
        return await driver.findElements(By.className(value));
    } else if (byType == 'xpath') {
        return await driver.findElements(By.xpath(value));
    } else {
        return null;
    }
}


async function checkElements(driver, byType, value) {
    let i = 0;
    let ele = null;
    let len = 0;


    console.log("find by " + byType + ":" + value);
    ele = await findElements(driver, byType, value);
    len = ele ? ele.length : 0;

    if (len > 0) {
        console.log('value 元素存在');
    } else {
        console.log('value 元素不存在');
    }

    while (len == 0 && i < 30) {
        console.log("第" + i + "次查找");
        ele = await findElements(driver, byType, value);
        len = ele ? ele.length : 0;
        if (len > 0) {
            console.log('value 元素存在');
        } else {
            console.log('value 元素不存在');
        }
        i++;
        await driver.sleep(1000);
    }

    return ele;
}


async function changeMateNet(driver) {
    let handles = await driver.getAllWindowHandles();
    let w = 0;
    if (handles.length > 1) {
        await driver.switchTo().window(handles[1]);
    } else {
        console.error("切换网络还没出现，后续切换!");
        return;
    }

    let changeNetBut = await checkElements(driver, 'xpath', '//button[(text()="切换网络")]');
    if (changeNetBut.length > 0) {
        console.log("找到切换网络按钮,并点击");
        changeNetBut[0].click();
    } else {
        console.error("can not find change net button!");
    }
}






async function confirmMate(driver) {
    let handles = await driver.getAllWindowHandles();
    let w = 0;
    while (handles.length == 1 && w < 5) {
        await driver.sleep(3000);
        handles = await driver.getAllWindowHandles();
        w++;
    }
    if (handles.length > 1) {
        await driver.switchTo().window(handles[1]);
    } else {
        console.error("等了十五秒没见小狐狸切换网络tab，看是否直接确认!");
    }

    let changeNetBut = await checkElements(driver, 'xpath', '//button[(text()="切换网络")]');
    if (changeNetBut.length > 0) {
        console.log("找到切换网络按钮,并点击");
        changeNetBut[0].click();
    } else {
        console.error("can not find change net button!");
    }

    await driver.sleep(3000);

    handles = await driver.getAllWindowHandles();
    w = 0;
    while (handles.length == 1 && w < 5) {
        await driver.sleep(3000);
        handles = await driver.getAllWindowHandles();
        w++;
    }
    if (handles.length > 1) {
        await driver.switchTo().window(handles[1]);
    } else {
        console.error("等了十五秒没见小狐狸，没见确认tab，任务失败!");
    }

    let confirmBut = await checkElements(driver, 'xpath', '//button[(text()="确认")]');
    if (confirmBut.length > 0) {
        console.log("找到确认按钮,并点击");
        confirmBut[0].click();
    } else {
        console.error("can not find change net button!");
    }
}









const wdr = new init('Profile 2').initDriver();

unlockWallt(wdr, 'mateMask', 'nkbihfbeogaeaoehlefnkodbefgpgknn', 'nsjsjssj520');

// setTimeout(function () {
//     task_1(wdr);
// }, 10000);















