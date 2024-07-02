console.log("in gpt")

chrome.runtime.onMessage.addListener(
  function (emailContent, sender, sendResponse) {

    const textArea = document.querySelector("textArea");
    textArea.value =  emailContent;

    let button = textArea.parentElement.nextElementSibling;
    textArea.focus();
    document.execCommand('insertText', false, 'new text');
    button.click()
    let c = 0;
    let callback8 = function (mutationList, observer) {
      for (let mutation of mutationList) {
        if (mutation.type === 'attributes') {
          if (button.dataset.testid === 'fruitjuice-send-button' && button.disabled) {
            let responses = document.querySelector('#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div')
            let responseschild = responses.childNodes
            const lasres = responseschild[responseschild.length - 1];
            const lastresText = lasres.innerText;
            console.log("dis12please")
            c++;
            if (c == 3) { console.log(lastresText);sendResponse(lastresText); c=0; }
            
          }
        }
      }
    }

    let observer8 = new MutationObserver(callback8)
    observer8.observe(button, { attributes: true })


    return true

  }
)