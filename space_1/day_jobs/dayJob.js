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

                //打开交互界面
                await driver.get("https://coinmarketcap.com/account/my-diamonds/");
                // 等待插件加载完成
                await driver.sleep(2000);

                //验证领取完成
                await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"sc-f70bb44c-0 iQEJet BaseButton_labelWrapper__wzpX7") and contains(text(),"to collect")]' });

                if (success) {
                    console.log("coinmarketcap:" + e.name + "蓝宝石领取成功！")
                } else {
                    console.error("coinmarketcap:" + e.name + "蓝宝石领取失败！")
                }

            }
        },
        sleeplessai: {
            name: "sleeplessai:每天签到！",
            needWallat: true,//是否需要连接插件钱包
            wallatType: "OKX",//钱包类型
            walletPwd: "nsjsjssj520",//钱包密码
            //工作内容
            work: async function (handle, e) {
                let driver = handle.driver;

                await driver.sleep(1000);
                //打开交互界面
                await driver.get("https://www.sleeplessai.net/chat");
                // 等待插件加载完成
                await driver.sleep(3000);
                //再次清理弹窗
                //await handle.closeAll();

                //记录主窗口句柄
                let mainWindowHandle = await driver.getWindowHandle();
                let allWindowHandles = await driver.getAllWindowHandles();

                //判断有没有弹窗
                if (allWindowHandles.length < 2) {
                    //判断需不需要连接钱包
                    let connect_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"mobile") ]//div[contains(@class,"wallet-connect")]' });
                    if (connect_wallat) {
                        await tool.oper(connect_wallat, "click");
                        await driver.sleep(2000);
                        //判断需不需要连接钱包
                        let select_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"iekbcc0") and contains(text(),"MetaMask")]' });
                        if (select_wallat) {
                            await tool.oper(select_wallat, "click");
                            await driver.sleep(2000);
                        }
                    }
                }

                //判断钱包类型 。目前只支持okx
                let wallet;
                if (this.wallatType = "OKX") {
                    wallet = new okxWallat(driver);
                }

                allWindowHandles = await driver.getAllWindowHandles();
                //钱包登录操作
                if (allWindowHandles.length > 1) {
                    //焦点切换到钱包的弹窗
                    if (allWindowHandles && allWindowHandles.length > 1) {
                        await driver.switchTo().window(allWindowHandles[1]);
                    }
                    // 钱包登录
                    await wallet.login(this.walletPwd);
                    //登录完成切回主界面
                    await driver.switchTo().window(mainWindowHandle);
                    await driver.sleep(2000);

                }
                //钱包签名操作
                allWindowHandles = await driver.getAllWindowHandles();
                if (allWindowHandles.length > 1) {
                    //切到钱包完成签名
                    await driver.switchTo().window(allWindowHandles[1]);
                    await wallet.confirm();
                    //签名完成切到主界面
                    await driver.switchTo().window(mainWindowHandle);
                    await driver.sleep(2000);
                }

                //判断是否需要点击签名
                let sgin_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"mobile") ]//div[contains(@class,"arco-space arco-space-horizontal arco-space-align-center sign-in")]' });
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


                //点击签到
                let claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"mobile") ]//span[contains(@class,"check-in")]' });
                if (claim_button) {
                    await tool.oper(claim_button, "click");
                    await driver.sleep(2000);

                    let success_p = await tool.reFindElement(driver, { type: 'xpath', content: '//span[contains(text(),"Check in successful today")]' });
                    if (success_p) {
                        console.log("sleeplessai:" + e.name + "每天签到成功！");
                        return;
                    }

                    //钱包确认操作
                    allWindowHandles = await driver.getAllWindowHandles();
                    if (allWindowHandles.length > 1) {
                        //切到钱包完成确认
                        await driver.switchTo().window(allWindowHandles[1]);
                        await wallet.confirm();
                        //签名完成切到主界面
                        await driver.switchTo().window(mainWindowHandle);
                        await driver.sleep(2000);
                    }

                }

                //检验钻石是否领取成功
                //刷新界面
                await driver.get("https://www.sleeplessai.net/chat");
                // 等待插件加载完成
                await driver.sleep(3000);
                claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"mobile") ]//span[contains(@class,"check-in")]' });
                if (claim_button) {
                    await tool.oper(claim_button, "click");
                    await driver.sleep(2000);

                    let success_p = await tool.reFindElement(driver, { type: 'xpath', content: '//span[contains(text(),"Check in successful today")]' });
                    if (success_p) {
                        console.log("sleeplessai:" + e.name + "每天签到成功！");
                    } else {
                        console.error("sleeplessai:" + e.name + "每天签到失败！")
                    }
                } else {
                    console.error("sleeplessai:" + e.name + "每天签到失败！")
                }


            }
        },
        qna3: {
            name: "qna3:每天领积分！",
            needWallat: true,//是否需要连接插件钱包
            wallatType: "OKX",//钱包类型
            walletPwd: "nsjsjssj520",//钱包密码
            net: "https://qna3.ai/vote",
            //工作内容
            work: async function (handle, e) {
                let driver = handle.driver;

                await driver.sleep(1000);
                //打开交互界面
                await driver.get(this.net);
                // 等待插件加载完成
                await driver.sleep(3000);
                //再次清理弹窗
                //await handle.closeAll();

                //1.点击登录点击连接钱包
                let login_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@class,"rounded-full bg-primary p-1 px-4 text-sm text-white transition-all")]//span[contains(text(),登录)]' });
                if (login_button) {
                    await tool.oper(login_button, "click");
                    await driver.sleep(2000);
                    //选择连接钱包的方式登录
                    let connect_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"连接钱包")]' });
                    if (connect_wallat) {
                        await tool.oper(connect_wallat, "click");
                        await driver.sleep(2000);

                        //选着使用什么钱包（选择Matemask）
                        let select_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"iekbcc0") and contains(text(),"MetaMask")]' });
                        if (select_wallat) {
                            await tool.oper(select_wallat, "click");
                            await driver.sleep(2000);
                        }
                    }
                }

                //记录主窗口句柄
                let mainWindowHandle = await driver.getWindowHandle();
                let allWindowHandles = await driver.getAllWindowHandles();

                //判断钱包类型 。目前只支持okx
                let wallet;
                if (this.wallatType = "OKX") {
                    wallet = new okxWallat(driver);
                }
                //判断有没有弹窗
                //钱包登录操作
                if (allWindowHandles.length > 1) {
                    //焦点切换到钱包的弹窗
                    if (allWindowHandles && allWindowHandles.length > 1) {
                        await driver.switchTo().window(allWindowHandles[1]);
                    }
                    // 钱包登录
                    await wallet.login(this.walletPwd);
                    //登录完成切回主界面
                    await driver.switchTo().window(mainWindowHandle);
                    await driver.sleep(2000);

                }
                //钱包签名操作
                allWindowHandles = await driver.getAllWindowHandles();
                if (allWindowHandles.length > 1) {
                    //切到钱包完成签名
                    await driver.switchTo().window(allWindowHandles[1]);
                    await wallet.confirm();
                    //签名完成切到主界面
                    await driver.switchTo().window(mainWindowHandle);
                    await driver.sleep(2000);
                }

                //点击签到
                let claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(text(),"每日签到得积分") and contains(@class,"flex items-center gap-2")]' });
                if (claim_button) {
                    await tool.oper(claim_button, "click");
                    await driver.sleep(2000);

                    let success_but = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"去领取积分")]' });
                    if (success_but) {
                        console.log("qna3:" + e.name + "每天领积分成功！");
                        return;
                    } 

                    let claim_button2 = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"点击签到领积分")]' });
                    if (claim_button2) {
                        await tool.oper(claim_button2, "click");
                        await driver.sleep(2000);
                        //钱包确认操作
                        allWindowHandles = await driver.getAllWindowHandles();
                        if (allWindowHandles.length > 1) {
                            //切到钱包完成确认
                            await driver.switchTo().window(allWindowHandles[1]);
                            await wallet.confirm();
                            //签名完成切到主界面
                            await driver.switchTo().window(mainWindowHandle);
                            await driver.sleep(2000);
                        }

                    }
                }

                //打开交互界面
                await driver.get(this.net);
                // 等待插件加载完成
                await driver.sleep(3000);

                //判断是不是签到成功
                claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(text(),"每日签到得积分") and contains(@class,"flex items-center gap-2")]' });
                if (claim_button) {
                    await tool.oper(claim_button, "click");
                    await driver.sleep(2000);

                    let success_but = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"去领取积分")]' });
                    if (success_but) {
                        console.log("qna3:" + e.name + "每天领积分成功！");
                    } else {
                        console.error("qna3:" + e.name + "每天领积分失败！")
                    }
                } else {
                    console.error("qna3:" + e.name + "每天领积分失败！")
                }


            }
        },
        magiceden: {
            name: "magiceden:每天领红钻石！",
            needWallat: true,//是否需要连接插件钱包
            wallatType: "OKX",//钱包类型
            walletPwd: "nsjsjssj520",//钱包密码
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
        // reiki: {
        //     name: "reiki:每天领金叶子！",
        //     needWallat: true,//是否需要连接插件钱包
        //     wallatType: "OKX",//钱包类型
        //     walletPwd: "nsjsjssj520",//钱包密码
        //     net: "https://reiki.web3go.xyz/taskboard",
        //     //工作内容
        //     work: async function (handle, e) {
        //         let driver = handle.driver;

        //         await driver.sleep(1000);
        //         //打开交互界面
        //         await driver.get(this.net);
        //         // 等待插件加载完成
        //         await driver.sleep(3000);
        //         //再次清理弹窗
        //         //await handle.closeAll();

        //         //1.点击登录点击连接钱包
        //         let login_button = await tool.reFindElement(driver, { type: 'xpath', content: '//button[contains(@class,"rounded-full bg-primary p-1 px-4 text-sm text-white transition-all")]//span[contains(text(),登录)]' });
        //         if (login_button) {
        //             await tool.oper(login_button, "click");
        //             await driver.sleep(2000);
        //             //选择连接钱包的方式登录
        //             let connect_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"连接钱包")]' });
        //             if (connect_wallat) {
        //                 await tool.oper(connect_wallat, "click");
        //                 await driver.sleep(2000);

        //                 //选着使用什么钱包（选择Matemask）
        //                 let select_wallat = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"iekbcc0") and contains(text(),"MetaMask")]' });
        //                 if (select_wallat) {
        //                     await tool.oper(select_wallat, "click");
        //                     await driver.sleep(2000);
        //                 }
        //             }
        //         }

        //         //记录主窗口句柄
        //         let mainWindowHandle = await driver.getWindowHandle();
        //         let allWindowHandles = await driver.getAllWindowHandles();

        //         //判断钱包类型 。目前只支持okx
        //         let wallet;
        //         if (this.wallatType = "OKX") {
        //             wallet = new okxWallat(driver);
        //         }
        //         //判断有没有弹窗
        //         //钱包登录操作
        //         if (allWindowHandles.length > 1) {
        //             //焦点切换到钱包的弹窗
        //             if (allWindowHandles && allWindowHandles.length > 1) {
        //                 await driver.switchTo().window(allWindowHandles[1]);
        //             }
        //             // 钱包登录
        //             await wallet.login(this.walletPwd);
        //             //登录完成切回主界面
        //             await driver.switchTo().window(mainWindowHandle);
        //             await driver.sleep(2000);

        //         }
        //         //钱包签名操作
        //         allWindowHandles = await driver.getAllWindowHandles();
        //         if (allWindowHandles.length > 1) {
        //             //切到钱包完成签名
        //             await driver.switchTo().window(allWindowHandles[1]);
        //             await wallet.confirm();
        //             //签名完成切到主界面
        //             await driver.switchTo().window(mainWindowHandle);
        //             await driver.sleep(2000);
        //         }

        //         //点击签到
        //         let claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(text(),"每日签到得积分") and contains(@class,"flex items-center gap-2")]' });
        //         if (claim_button) {
        //             await tool.oper(claim_button, "click");
        //             await driver.sleep(2000);

        //             let success_but = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"去领取积分")]' });
        //             if (success_but) {
        //                 console.log("qna3:" + e.name + "每天领积分成功！");
        //                 return;
        //             } 

        //             let claim_button2 = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"点击签到领积分")]' });
        //             if (claim_button2) {
        //                 await tool.oper(claim_button2, "click");
        //                 await driver.sleep(2000);
        //                 //钱包确认操作
        //                 allWindowHandles = await driver.getAllWindowHandles();
        //                 if (allWindowHandles.length > 1) {
        //                     //切到钱包完成确认
        //                     await driver.switchTo().window(allWindowHandles[1]);
        //                     await wallet.confirm();
        //                     //签名完成切到主界面
        //                     await driver.switchTo().window(mainWindowHandle);
        //                     await driver.sleep(2000);
        //                 }

        //             }
        //         }

        //         //打开交互界面
        //         await driver.get(this.net);
        //         // 等待插件加载完成
        //         await driver.sleep(3000);

        //         //判断是不是签到成功
        //         claim_button = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(text(),"每日签到得积分") and contains(@class,"flex items-center gap-2")]' });
        //         if (claim_button) {
        //             await tool.oper(claim_button, "click");
        //             await driver.sleep(2000);

        //             let success_but = await tool.reFindElement(driver, { type: 'xpath', content: '//div[contains(@class,"flex h-full w-full items-center justify-center")]//button[contains(text(),"去领取积分")]' });
        //             if (success_but) {
        //                 console.log("reiki:" + e.name + "每天领叶子成功！");
        //             } else {
        //                 console.error("reiki:" + e.name + "每天领叶子失败！")
        //             }
        //         } else {
        //             console.error("reiki:" + e.name + "每天领叶子失败！")
        //         }


        //     }
        // },


    }
}
module.exports = dayJobs

