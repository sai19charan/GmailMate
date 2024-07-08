function chromeTabsCreateAsync(createProperties) {
    return new Promise((resolve, reject) => {
        chrome.tabs.create(createProperties, tab => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError));
            } else {
                resolve(tab);
            }
        });
    });
}

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "emailResponder") {
        port.onMessage.addListener(async function(emailContent, sender) {
            console.log(emailContent);
            let tabs = await chrome.tabs.query({ url: 'https://chatgpt.com/*' });
            let tab;
            if (tabs.length === 0) {
                chromeTabsCreateAsync({ url: "https://chatgpt.com", active: false }).then(async (tab) => {
                    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
                        if (tabId === tab.id && changeInfo.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener);
                            const port2 = chrome.tabs.connect(tab.id, { name: "gptResponder" });
                            port2.postMessage({ text: emailContent.text });
                            port2.onMessage.addListener(async function(response) {
                                if(response==="changetab"){
                                    let queryOptions = { active: true, lastFocusedWindow: true };
                                    let [tabd] = await chrome.tabs.query(queryOptions);
                                    await chrome.tabs.update(tab.id, { active: true });
                                    setTimeout(async()=>{
                                        await chrome.tabs.update(tabd.id, { active: true });
                                    },400)
                                }else{
                                    port2.disconnect(); 
                                    port.postMessage(response); 
                                    return true;
                                }
                        });
                        }
                    });
                    await chrome.tabs.update(tab.id, { active: true });
                });
            } else {
                tab = tabs[0];
                if(emailContent.first==0) await chrome.tabs.update(tab.id, { active: true });
                const port2 = chrome.tabs.connect(tab.id, { name: "gptResponder" });
                port2.postMessage({ text: emailContent.text });
                port2.onMessage.addListener(async function(response) {
                    if(response==="changetab"){
                        let queryOptions = { active: true, lastFocusedWindow: true };
                        let [tabd] = await chrome.tabs.query(queryOptions);
                        await chrome.tabs.update(tab.id, { active: true });
                        setTimeout(async()=>{
                            await chrome.tabs.update(tabd.id, { active: true });
                        },400)
                    }else{
                        port2.disconnect(); 
                        port.postMessage(response); 
                        return true;
                    }
            });
            }
        });
    }
});

