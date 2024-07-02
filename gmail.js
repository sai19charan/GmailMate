
let load="";
const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function (result) {
            if (result[key] === undefined) {
                reject();
            } else {
                resolve(result[key]);
            }
        });
    });
};

// let gettext = (resway)=>{
//     return new Promise((resolve, reject) => {
//         const email = document.querySelector('.adn.ads');
//         // span.click()
//         let sendingtext = `Respond to the most recent email in a ${resway} way and sign off with my name(Sai Charan) at the end:\n` + email.textContent
//         console.log(sendingtext);
//         if(sendingtext){
//             resolve(sendingtext)
//         }else{
//             reject("error")
//         }
//     });
// }

// async function getres(sendingtext) {
//     // console.log("resway"+resway)
//     console.log(sendingtext);
//     let gptres = await chrome.runtime.sendMessage(sendingtext);
//     return new Promise((resolve,reject)=>{
//         const gmailbox = document.querySelector('[role=textbox]')
//         gptres = gptres.replace("ChatGPT", "");
//         gptres = gptres.replace("3.5", "");
//         gptres = gptres.replace("4", "");
//         console.log(gptres)
//         gmailbox.innerText = gptres
//         if(gptres){
//             resolve(gptres)
//         }else{
//             reject("error");
//         }
//     })
// }
// function replyAll(resway) {
//     let selectedMails = document.querySelectorAll('.x7');
//     console.log("into reply all")
//     // let i=0;
//     // while(i<selectedMails.length){
//     //     selectedMails[i].click();
//     //     window.onhashchange = () => {
//             // const spans = document.querySelectorAll('span');
//             // for (const span of spans) {
//             //     if (span.classList.contains('ams')) {
//             //         span.click()
//             //     }
//             // }
//     //         gettext(resway).then(function(sendingtext){
//     //             console.log(sendingtext);
//     //             getres(sendingtext).then(()=>{
//     //                 i++;
//     //             })
//     //         }).catch(function(error){
//     //             console.log(error)
//     //         })
//     //     }
        
//     // }
//     // for(let i=0;i<selectedMails.length;i++){
//     //     selectedMails[i].click()
//     //     // window.onhashchange=()=>{
//     //         const spans = document.querySelectorAll('span');
//     //         for (const span of spans) {
//     //             if (span.classList.contains('ams')) {
//     //                 span.click()
//     //             }
//     //         }
//     //         gettext(resway).then(function(sendingtext){
//     //             console.log(sendingtext)
//     //             getres(sendingtext)

//     //         })
//     //     // }
//     // }
// }

let gettext = (resway) => {
    return new Promise((resolve, reject) => {
        const email = document.querySelector('.adn.ads');
        let sendingtext = `Respond only to the most recent email in a ${resway} way and return only the content written by you and sign off with my name (Sai Charan) at the end:\n` + email.textContent;
        console.log(sendingtext);
        if (sendingtext) {
            resolve(sendingtext);
        } else {
            reject("error");
        }
    });
}

async function getres(sendingtext) {
    console.log(sendingtext);
    let gptres = await chrome.runtime.sendMessage(sendingtext);
    return new Promise((resolve, reject) => {
        const gmailbox = document.querySelector('[role=textbox]');
        gptres = gptres.replace("ChatGPT", "").replace("3.5", "").replace("4", "");
        console.log(gptres);
        gmailbox.innerText = gptres;
        if (gptres) {
            resolve(gptres);
        } else {
            reject("error");
        }
    });
}


async function replyAll(resway) {
    let selectedMails = document.querySelectorAll('.x7');
    console.log("Into reply all");

    for (let i = 0; i < selectedMails.length; i++) {
        selectedMails[i].click();

        await new Promise((resolve) => {
            window.onhashchange = async () => {
                console.log("Hash changed");
                
                // Perform operations related to hash change
                const spans = document.querySelectorAll('span');
                for (const span of spans) {
                    if (span.classList.contains('ams')) {
                        span.click();
                    }
                }
                
                try {
                    const sendingtext = await gettext(resway);
                    console.log(sendingtext);
                    await getres(sendingtext);
                    resolve();
                } catch (error) {
                    console.log(error);
                    resolve(); // Resolve to continue to next email even if there's an error
                } finally {
                    window.onhashchange = null; // Remove the event listener after use
                }
            };
        });

        // Optional: Wait a bit for onhashchange to complete its operations
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // window.location.replace("https://mail.google.com/mail/u/0/#inbox");
    }
    firstgo()
    console.log("Finished");
    // Optional: Navigate back to inbox or perform any final actions
    // window.location.replace("https://mail.google.com/mail/u/0/#inbox");
}



// window.onload = function () { 
    // if(load===""){
        // window.onhashchange = () => {
        //     console.log("new hash")
        //     if (window.location.hash.startsWith('#inbox/')) {
        //         const spans = document.querySelectorAll('span');
        //         console.log("window.loading")
        //         for (const span of spans) {
        //             if (span.classList.contains('ams')) {
        //                 span.addEventListener('click', function () {
        //                     let resway = "Serious"
        //                     prom = readLocalStorage("resType")
        //                     Promise.all([prom]).then(values => {
        //                         resway = values[0];
        //                         console.log("rresway2" + resway)
        //                         const email = document.querySelector('.adn.ads');
        //                         (async function () {
        //                             console.log("resway" + resway)
        //                             let sendingtext = `Respond to the most recent email in a ${resway} way and sign off with my name(Sai Charan) at the end:\n` + email.textContent
        //                             let gptres = await chrome.runtime.sendMessage(sendingtext);
        //                             const gmailbox = document.querySelector('[role=textbox]')
        //                             gptres = gptres.replace("ChatGPT", "");
        //                             gptres = gptres.replace("3.5", "");
        //                             gptres = gptres.replace("4", "");
        //                             console.log(gptres)
        //                             gmailbox.innerText = gptres
        //                         })()
        //                     })
        //                 })
        //             }
        //         }
        //     }
        // }
    // } 
// }
function firstgo(){
    // window.onload = function() {
        window.onhashchange = () => {
            console.log("Hash changed");
            if (window.location.hash.startsWith('#inbox/')) {
                const spans = document.querySelectorAll('span.ams');
                spans.forEach(span => {
                    span.addEventListener('click', async () => {
                        try {
                            let resway = await readLocalStorage("resType");
                            const email = document.querySelector('.adn.ads');
                            if (email) {
                                let sendingtext = `Respond only to the most recent email in a ${resway} way and return only content written by you and sign off with my name(Sai Charan) at the end:\n${email.textContent}`;
                                let gptres = await chrome.runtime.sendMessage(sendingtext);
                                const gmailbox = document.querySelector('[role=textbox]');
                                gptres = gptres.replace("ChatGPT", "").replace("3.5", "").replace("4", "");
                                console.log(gptres);
                                gmailbox.innerText = gptres;
                            }
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    });
                });
            }
        };
    // };
}

firstgo()

chrome.runtime.onMessage.addListener(function (action, sender, sendResponse) {
    if (action === "reviewEmail") {
        let resway = "Serious";
        let prom = readLocalStorage("resType");

        Promise.all([prom]).then(values => {
            resway = values[0];
            console.log("resway: " + resway);
            const gmailbox = document.querySelector('[role="textbox"]');

            (async function () {
                console.log("action: " + action);
                const email = gmailbox.textContent;
                let sendingtext = `Rewrite the following most recent email in a ${resway} way which conveys the same message and sign off with my name (Sai Charan) at the end:\n${email}`;
                console.log("Email: " + email);
                let gptres = await chrome.runtime.sendMessage(sendingtext);
                gptres = gptres.replace("ChatGPT", "");
                gptres = gptres.replace("3.5", "");
                gptres = gptres.replace("4", "");
                gmailbox.innerText = gptres;
            })();
        });
    } else {
        let resway = "Serious";
        console.log("replyAll")
        load="replyAll"
        let prom = readLocalStorage("resType");
        Promise.all([prom]).then(values => {
            resway = values[0];
            replyAll(resway)
        })
        load="";
    }

    load="";
    return true;
});



// sel[0].click()
// window.onhashchange=()=>{
//     const spans = document.querySelectorAll('span');
//         console.log("window.loadomg")
//         for (const span of spans) {
//             if (span.classList.contains('ams')) {
//                span.click()
//             }
//         }
//         setTimeout(function(){
//             window.history.back()
//             window.onhashchange=()=>{
//                 sel[1].click()
//                 window.onhashchange=()=>{
//                     const spans = document.querySelectorAll('span');
//                     console.log("window.load")
//                     for (const span of spans) {
//                         if (span.classList.contains('ams')) {
//                            span.click()
//                         }
//                     }
//                     setTimeout(function(){
//                         window.history.back()
//                     },2000)
//                 }
//             }
//         },2000)
// }


// async function replyAll(resway) {
//     let selectedMails = document.querySelectorAll('.x7');
//     console.log("into reply all");

//     for (let i = 0; i < selectedMails.length; i++) {
//         selectedMails[i].click();

//         await new Promise((resolve) => {
//             window.onhashchange = async () => {
//                 console.log("hash changed")
//                 const spans = document.querySelectorAll('span');
//                 for (const span of spans) {
//                     if (span.classList.contains('ams')) {
//                         span.click();
//                     }
//                 }
                
//                 try {
//                     const sendingtext = await gettext(resway);
//                     console.log(sendingtext);
//                     await getres(sendingtext);
//                     resolve();
//                 } catch (error) {
//                     console.log(error);
//                     resolve(); // resolve to continue to next email even if there's an error
//                 }
//             };
//         });

//         // Wait a bit for onhashchange to complete its operations
//         // await new Promise(resolve => setTimeout(resolve, 1000));
//         // window.location.replace("https://mail.google.com/mail/u/0/#inbox");
//     }
//     console.log("finished")
//     // window.location.replace("https://mail.google.com/mail/u/0/#inbox");
// }

// Usage
// replyAll('respectful');


// async function replyAll(resway) {
//     let selectedEmail = document.querySelector('.x7'); // Assuming this selects the latest email
//     console.log("Into reply to email");

//     const handleEmailReply = async () => {
//         try {
//             selectedEmail.click(); // Click on the selected email
            
//             // Simulate clicking on the reply button
//             const spans = document.querySelectorAll('span');
//             for (const span of spans) {
//                 if (span.classList.contains('ams')) {
//                     span.click();
//                 }
//             }

//             // Assuming some asynchronous task to get email content
//             const emailContent = await gettext(resway); // Replace with your actual method to get email content
//             const sendingtext = `Respond to the most recent email in a ${resway} way and sign off with my name (Sai Charan) at the end:\n${emailContent}`;
//             console.log(sendingtext);

//             // Assuming sendingtext is sent to another function or API
//             await getres(sendingtext); // Replace with your actual method to send email response
//             console.log("Email response sent successfully");

//             // Navigate back to inbox or another page after all operations are complete
//             await new Promise(resolve => {
//                 window.location.href = "https://mail.google.com/mail/u/0/#inbox";
//                 resolve();
//             });
//         } catch (error) {
//             console.error("Error handling email:", error);
//             // Handle errors as needed
//         }
//     };

//     handleEmailReply(); // Start handling the email
// }




