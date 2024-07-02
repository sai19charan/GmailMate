console.log("cool");
// chrome.tabs.create({
//     url: "https://chatgpt.com/" 
// });

chrome.runtime.onMessage.addListener(
    function(emailContent,sender,sendResponse){
        console.log(emailContent);
        (async function(){
            const tabs=await chrome.tabs.query({url:'https://chatgpt.com/*'})
            const tab=tabs[0]
            const gptres=await chrome.tabs.sendMessage(tab.id,emailContent);
            console.log(gptres)
            sendResponse(gptres)
        })()
        return true
    }
)