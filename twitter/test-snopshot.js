// (async ()=>{
// 	//require('chromedriver'); //导入chrome浏览器 driver，不是npm安装驱动不需要导入chromedriver
// 	//导入selenium 库

// 	const {Builder, By, Key, until,Button } = require('selenium-webdriver');
//   const chrome = require('selenium-webdriver/chrome');

//     var options = new chrome.Options();
//     //# 步骤1获取到的User Data路径
//     options.addArguments('--user-data-dir=C:/Users/root/AppData/Local/Google/Chrome/User Data')
//     //# 步骤2获取到的--profile-directory值
//     options.addArguments("--profile-directory=Profile 2")


//     try {
//         const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build() ;
//         await driver.get("https://www.baidu.com/");
//         // await driver.findElement(By.className("s_ipt")).sendKeys("selenium"); // 找到输入框，填充内容
//         // await driver.findElement(By.className("s_btn")).sendKeys(Key.ENTER); // 触发enter键，执行搜索
//         // await driver.wait(until.titleIs("百度一下，你就知道"), 1000); // 判断title是否为“百度一下，你就知道”，不是则报错，是则继续执行
//         console.log(222)
//       } finally {
//         // await driver.quit(); // 退出浏览器
//       }
// })()



const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// 设置Chrome浏览器选项，使用已登录的谷歌账号
const options = new chrome.Options();
options.addArguments('--user-data-dir=C:/Users/root/AppData/Local/Google/Chrome/User Data');
options.addArguments('--profile-directory=Profile 2');

(async function () {
  // 启动Chrome浏览器
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    // 导航到谷歌网站并登录
    await driver.get('https://snapshot.mirror.xyz/-C3bd5TI3XEbPRt_FIBB97fkhwXk-81w59CMcoofWUk/');

    //  let loginBtn = await driver.findElements(By.className('login-btn'));

    // if(loginBtn.length>0){
    //   console.log('Found login button.');
    // }else{
    //   console.log('Could not find login button. Reloading page...');
    //   await driver.navigate().refresh();
    //   // 继续等待页面加载完成
    //   await driver.wait(until.elementLocated(By.className('login-btn')), 10000);
    //    // 点击 login button
    //    loginBtn = await driver.findElements(By.className('login-btn'));
    //    await loginBtn[0].click();
    //    console.log('Clicked login button.');
    //   console.log('Found login button after refreshing page.');
    // }


    //await driver.get('https://portal.zksync.io/');

    //await driver.findElement(By.id("mui-6")).sendKeys(Key.ENTER);
    //driver.wait(By.className("login-btn"),10000).sendKeys(Key.ENTER); // 找到输入框，填充内容
    // await driver.findElement(By.className("s_btn")).sendKeys(Key.ENTER); // 触发enter键，执行搜索
    // await driver.wait(until.titleIs("百度一下，你就知道"), 1000); // 判断title是否为“百度一下，你就知道”，不是则报错，是则继续执行

    // const searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);
    // await searchBox.sendKeys('Selenium', Key.RETURN);
  } finally {
    // 关闭浏览器
    //await driver.quit();
  }
})();

// const { Builder, By, Key, until } = require('selenium-webdriver');

// (async function example() {
//   let driver = await new Builder().forBrowser('chrome').build();
//   try {
//     // 访问 Google 登录页面
//     await driver.get('https://accounts.google.com');
//     await driver.wait(until.elementLocated(By.id('identifierId')), 10000);

//     // 填写用户名并点击下一步
//     await driver.findElement(By.id('identifierId')).sendKeys('wangdery819@gmail.com', Key.RETURN);

//     await driver.wait(until.elementLocated(By.name('password')), 10000);

//     // 填写密码并点击下一步
//     await driver.findElement(By.name('password')).sendKeys('0819wdr0401lhy', Key.RETURN);

//     await driver.wait(until.urlContains('https://myaccount.google.com/'), 10000);

//     // 获取登录后的 cookies
//     const cookies = await driver.manage().getCookies();
//     console.log('Login cookies:', cookies);

//     // 打开新的浏览器窗口并访问 Google 首页
//     driver = await new Builder().forBrowser('chrome').build();
//     await driver.get('https://www.google.com');

//     // 设置 cookies
//     await driver.manage().deleteAllCookies();
//     for (const cookie of cookies) {
//       await driver.manage().addCookie(cookie);
//     }

//     // 刷新页面并检查是否已登录
//     await driver.navigate().refresh();
//     const profileButton = await driver.wait(until.elementLocated(By.css('[aria-label="Google Account"]')), 10000);
//     console.log('Logged in:', Boolean(profileButton));
//   } finally {
//     await driver.quit();
//   }
// })();


