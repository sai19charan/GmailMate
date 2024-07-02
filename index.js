const btn = document.getElementById('reviewButton');
const res=document.getElementById('response');
const saveButton=document.getElementById('save')
const replyAll=document.getElementById('selected')

chrome.storage.sync.get(["resType"],(result)=>{
    console.log(result)
    res.value=result.resType||"Professional";
})

saveButton.addEventListener('click',()=>{
    const resType=res.value
    console.log("clicked")
    chrome.storage.sync.set({resType}, () => {
        console.log(`Response is set to ${resType}`);
    });
})

btn.addEventListener('click',()=>{
    // const resway=res.value
    (async function(){
        const tabs=await chrome.tabs.query({url:"https://mail.google.com/*"})
        const tab=tabs[0]
        chrome.tabs.sendMessage(tab.id,"reviewEmail");
        // console.log(gptres)
        // sendResponse(gptres)
    })()
})

replyAll.addEventListener('click',()=>{
    (async function(){
        const tabs=await chrome.tabs.query({url:"https://mail.google.com/*"})
        const tab=tabs[0]
        chrome.tabs.sendMessage(tab.id,"replySelected");
    })()
})




