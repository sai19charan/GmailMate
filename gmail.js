
let load = "";
const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get([key], function (result) {
            if (result[key] === undefined) {
                resolve("")
            } else {
                resolve(result[key]);
            }
        });
    });
};

const getTextFromEmail = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const emailContents = document.querySelectorAll('.adn.ads');
            const emailContent = emailContents[emailContents.length - 1]
            if (emailContent) {
                const emailText = emailContent.textContent.trim();
                resolve(emailText);
            } else {
                reject("Email content not found");
            }
        }, 250)
    });
};

const sendGPTResponse = async (text,i) => {
    return new Promise((resolve, reject) => {
        const port = chrome.runtime.connect({ name: "emailResponder" });
        port.postMessage({ text: text,first:i });
        port.onMessage.addListener(function (response) {
            if (response) {
                resolve(response);
            } else {
                reject("Error sending message to GPT");
            }
        });
    });
};


async function respondToEmail(resway, sign,i) {
    try {
        const spans = document.querySelectorAll('span');
        for (const span of spans) {
            if (span.classList.contains('ams')) {
                span.click();
            }
        }
        const emailText = await getTextFromEmail();

        const sendingText = `Respond only to the most recent email in a ${resway} way and return only content written by you and sign off with ${sign} at the end:\n${emailText}`;
        const gptResponse = await sendGPTResponse(sendingText,i);
        console.log(gptResponse)
        const gmailBox = document.querySelector('[role="textbox"]');
        if (gmailBox) {
            const cleanedResponse = gptResponse.replace("ChatGPT", "").replace("3.5", "").replace("4o", "").replace("Memory updated", "").replace(`Sure, here's a ${resway} response for you:`, "").replace("Is this conversation helpful so far?","");
            gmailBox.innerText = cleanedResponse;
        }
    } catch (error) {
        alert("GmailMate says: No email is opened to generate reply")
        console.log('Error:', error);
    }
}


async function replyAll(resway, sign) {
    let selectedMails = document.querySelectorAll('.x7');
    if (selectedMails.length == 0) {
        alert("GmailMate says: No emails are selected")
    }
    for (let i = 0; i < selectedMails.length; i++) {
        selectedMails[i].click(); 

        await new Promise((resolve) => {
            let hasExecuted = false;
            document
            const handleHashChange = async () => {
                if (!hasExecuted) {
                    hasExecuted = true;

                    console.log("Processing email #" + i);
                    console.log("hash" + window.location.href)
                    try {
                        await respondToEmail(resway, sign,i);
                    } catch (error) {
                        console.error('Error responding to email:', error);
                    } finally {
                        window.onhashchange = null;
                        resolve();
                    }
                }
            };
            window.onhashchange = handleHashChange;
        });
    }

    console.log("Finished replying to all emails.");
}
chrome.runtime.onMessage.addListener(async function (action, sender, sendResponse) {
    try {
        let sign = await readLocalStorage("sendoff");
        sign = sign||"[Your Name]";
        if (action === "reviewEmail") {
            let resway = "Serious";
            try {
                resway = await readLocalStorage("resType");
                resway=resway||"Professional"
                const gmailbox = document.querySelector('[role="textbox"]');
                if (gmailbox) {
                    const email = gmailbox.textContent;
                    if (email === "") {
                        alert("GmailMate says: Email draft is not written to review email");
                    } else {
                        const sendingtext = `Rewrite the following most recent email in a ${resway} way which conveys the same message and sign off with ${sign} at the end:\n${email}`;
                        const port = chrome.runtime.connect({ name: "emailResponder" });
                        port.postMessage({ text: sendingtext, first: 0 });
                        port.onMessage.addListener(function (response) {
                            let gptres = response;
                            gptres = gptres.replace("ChatGPT", "").replace("3.5", "").replace("4o", "").replace("Memory updated", "").replace(`Sure, here's a ${resway} response for you:`, "").replace
                            ("Is this conversation helpful so far?","");
                            gmailbox.innerText = gptres;
                        });
                    }
                } else {
                    alert("GmailMate says: Email draft is not written to review email");
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else if (action === "replySelected") {
            let resway = "Serious";
            load = "replyAll";
            try {
                resway = await readLocalStorage("resType");
                resway=resway||"Professional"
                await replyAll(resway, sign);
            } catch (error) {
                console.log('Error in replySelected:', error);
            } finally {
                load = "";
            }
        } else {
            try {
                let resway = await readLocalStorage("resType");
                resway=resway||"Professional"
                await respondToEmail(resway, sign, 0);
            } catch (error) {
                console.log('Error:', error);
            }
        }
        sendResponse({ status: 'success' });
    } catch (error) {
        console.log('Error:', error);
        sendResponse({ status: 'error', message: error });
    }
    return true;
});