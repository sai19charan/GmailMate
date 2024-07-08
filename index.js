document.addEventListener('DOMContentLoaded', () => {
const btn = document.getElementById('reviewButton');
const res=document.getElementById('response');
const saveButton=document.getElementById('save')
const replyAll=document.getElementById('selected')
const reply=document.getElementById('reply')
const sign = document.getElementById('sign')
const signoff = document.getElementById('signoff')
sign.addEventListener('click',()=>{
    const sendoff=signoff.value;
    console.log("clicked")
    chrome.storage.sync.set({sendoff}, () => {
        console.log(`signature is set to ${sendoff}`);
    });
})

saveButton.addEventListener('click',()=>{
    const resType=res.value
    console.log("clicked")
    chrome.storage.sync.set({resType}, () => {
        console.log(`Response is set to ${resType}`);
    });
})

btn.addEventListener('click',()=>{
    (async function(){
        const tabs=await chrome.tabs.query({url:"https://mail.google.com/*"})
        const tab=tabs[0]
        chrome.tabs.sendMessage(tab.id,"reviewEmail");
    })()
})

replyAll.addEventListener('click',()=>{
    (async function(){
        const tabs=await chrome.tabs.query({url:"https://mail.google.com/*"})
        const tab=tabs[0]
        chrome.tabs.sendMessage(tab.id,"replySelected");
    })()
})

reply.addEventListener('click',()=>{
    (async function(){
        const tabs=await chrome.tabs.query({url:"https://mail.google.com/*"})
        const tab=tabs[0]
        chrome.tabs.sendMessage(tab.id,"reply");
    })()
})


chrome.storage.sync.get(["resType"],(result)=>{
    console.log(result)
    res.value=result.resType||"Professional";
})

chrome.storage.sync.get(["sendoff"],(result)=>{
    console.log(result)
    signoff.value=result.sendoff?result.sendoff:"";
})

})

