const { By, Key, until } = require('selenium-webdriver');

const matemask = require('../web3_tool/wallets/matemask');
const okxWallat = require('../web3_tool/wallets/okx');
const tool = require('../web3_tool/tool');
//candy 每日糖果任务，每天签到
const dayJobs = {
    //描述信息
    desc: {
        name: "每日签到，搞钻石，挖叶子，领积分。"
    },
    //dapp列表
    dapps: {
        //candy,每日吃糖果，goole 账号必须先登录
        candy: {
            name: "candy:每天领取糖果！",
            needWallat: false,//是否需要连接插件钱包
            wallatType: "",//钱包类型
            //工作内容
            work: async function (handle, e) {
                let driver = handle.driver;

                await driver.sleep(1000);
                //打开交互界面
                await driver.get("https://www.coingecko.com/account/candy");
                // 等待插件加载完成
                await driver.sleep(2000);

                //点击领取糖果
                let collect_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@class,"btn btn-primary col-12 collect-candy-button")]' });
                if (collect_button) {
                    await tool.oper(collect_button, "click");
                } else {
                    //验证糖果收集完成
                    let success = await tool.reFindElement(driver, { type: 'xpath', content: '//span[ contains(@id, "next-daily-reward-countdown-timer")]' });
                    if (!success) {
                        //判断是否需要真人验证
                        let checkhuman = await tool.reFindElement(driver, { type: 'xpath', content: '//span[contains(@class, "ctp-lable") ]' });
                        if (checkhuman) {
                            await tool.oper(checkhuman, "click");
                        }
                        // //打开交互界面
                        // await driver.get("https://www.coingecko.com/account/candy");
                        // // 等待插件加载完成
                        // await driver.sleep(2000);

                        //查看是否需要登陆，如果需要则使用goole 登录
                        let goole_login = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(text(), "Continue with Google")]' });
                        if (goole_login) {
                            await tool.oper(goole_login, "click");
                        }

                        //点击领取糖果
                        collect_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@class,"btn btn-primary col-12 collect-candy-button")]' });
                        if (collect_button) {
                            await tool.oper(collect_button, "click");
                        }
                    }
                }

                //验证糖果收集完成
                let success = await tool.reFindElement(driver, { type: 'xpath', content: '//span[ contains(@id, "next-daily-reward-countdown-timer")]' });
                if (success) {
                    console.log("candy:" + e.name + "糖果领取成功！")
                } else {
                    console.error("candy:" + e.name + "糖果领取失败！")
                }
            }

        },
        magiceden: {
            name: "magiceden:每天领红钻石！",
            needWallat: true,//是否需要连接插件钱包
            wallatType: "OKX",//钱包类型
            walletPwd: "nsjsjssj520",
            //工作内容
            work: async function (handle, e) {
                let driver = handle.driver;

                await driver.sleep(1000);
                //打开交互界面
                await driver.get("https://magiceden.io/rewards/quests");
                // 等待插件加载完成
                await driver.sleep(5000);
                //再次清理弹窗
                //await handle.closeAll();

                //记录主窗口句柄
                let mainWindowHandle = await driver.getWindowHandle();

                let allWindowHandles = await driver.getAllWindowHandles();

                if (allWindowHandles.length > 1) {
                    //焦点切换到钱包的弹窗
                    if (allWindowHandles && allWindowHandles.length > 1) {
                        await driver.switchTo().window(allWindowHandles[1]);
                    }

                    //判断钱包类型 。目前只支持okx
                    let wallet;
                    if (this.wallatType = "OKX") {
                        wallet = new okxWallat(driver);
                    }
                    //  else if (this.wallatType = "matemask") {
                    //     wallet = new matemask(driver);
                    // }

                    // 钱包登录
                    await wallet.login(this.walletPwd);
                    //登录完成切回主界面
                    await driver.switchTo().window(mainWindowHandle);
                    await driver.sleep(2000);

                }

                //点击签名
                let sgin_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@class,"tw-inline-flex tw-justify-center tw-items-center tw-rounded tw-text-white-1 tw-h-[40px] tw-py-0 tw-px-3 hover:tw-opacity-80 tw-transition tw-duration-300 tw-ease-in-out tw-bg-pink-primary tw-w-[160px] tw-text-[14px]")]' });
                if (sgin_button) {
                    await tool.oper(sgin_button, "click");
                    await driver.sleep(4000);
                    allWindowHandles = await driver.getAllWindowHandles();

                    if (allWindowHandles.length > 1) {
                        //切到钱包完成签名
                        await driver.switchTo().window(allWindowHandles[1]);
                        await wallet.confirm();
                        //签名完成切到主界面
                        await driver.switchTo().window(mainWindowHandle);
                        await driver.sleep(2000);
                    }
                }


                //点击领取钻石
                let claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//P[text()="Claim"]' });
                if (claim_button) {
                    await tool.oper(claim_button, "click");
                }

                //检验钻石是否领取成功
                let success_p = await tool.reFindElement(driver, { type: 'xpath', content: '//P[contains(@class,"tw-ml-2 tw-text-white-1 tw-text-base tw-font-bold")]' });
                if (success_p) {
                    console.log("magiceden:" + e.name + "每天领红钻石成功！");
                } else {
                    console.error("magiceden:" + e.name + "每天领红钻石失败！")
                }

            }
        },
        coinmarketcap: {
            name: "coinmarketcap:每天领钻石！",
            needWallat: false,//是否需要连接插件钱包
            wallatType: "",//钱包类型
            //工作内容
            work: async function (handle, e) {
                let driver = handle.driver;

                await driver.sleep(1000);
                //打开交互界面
                await driver.get("https://coinmarketcap.com/account/my-diamonds/");
                // 等待插件加载完成
                await driver.sleep(2000);

                //点击领取钻石
                let collect_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@data-btnname,"Log In to Collect")]' });
                if (collect_button) {
                    await tool.oper(collect_button, "click");
                }

                //验证是否收集完成
                let success = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"sc-f70bb44c-0 iQEJet BaseButton_labelWrapper__wzpX7") and contains(text(),"to collect")]' });
                if (!success) {

                    //判断是否需要真人验证
                    let checkhuman = await tool.reFindElement(driver, { type: 'xpath', content: '//span[contains(@class, "ctp-lable") ]' });
                    if (checkhuman) {
                        await tool.oper(checkhuman, "click");
                    }
                    //查看是否需要登陆，如果需要则使用goole 登录
                    let goole_login = await tool.reFindElement(driver, { type: 'xpath', content: '//span[contains(@class,"sc-f70bb44c-0 nuTW el-item") and contains(text(),"Continue with Google")]' });
                    if (goole_login) {
                        await tool.oper(goole_login, "click");
                    }

                    //点击领取
                    collect_button = collect_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@data-btnname,"Log In to Collect")]' });
                    if (collect_button) {
                        await tool.oper(collect_button, "click");
                    }

                    
                }

                //验证领取完成
                await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"sc-f70bb44c-0 iQEJet BaseButton_labelWrapper__wzpX7") and contains(text(),"to collect")]' });
                
                if (success) {
                    console.log("coinmarketcap:" + e.name + "蓝宝石领取成功！")
                } else {
                    console.error("coinmarketcap:" + e.name + "蓝宝石领取失败！")
                }

            }
        },


    }
}
module.exports = dayJobs

