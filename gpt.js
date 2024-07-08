chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "gptResponder") {
      port.onMessage.addListener(function(request, sender, sendResponse) {
          console.log("cool");
          const textArea = document.querySelector("textarea");
          textArea.value = request.text;

          let button = textArea.parentElement.nextElementSibling;
          textArea.focus();
          document.execCommand('insertText', false, 'new text');
          button.click();
          let c=0;
          let callback8 = function (mutationList, observer) {
              for (let mutation of mutationList) {
                  if (mutation.type === 'attributes') {
                      if (button.dataset.testid === 'fruitjuice-send-button' && button.disabled) {
                        c++;
                        if(c==3){
                            port.postMessage("changetab")
                            setTimeout(()=>{
                              let responses = document.querySelector('#__next > div.relative.z-0.flex.h-full.w-full.overflow-hidden > div.relative.flex.h-full.max-w-full.flex-1.flex-col.overflow-hidden > main > div.flex.h-full.flex-col.focus-visible\\:outline-0 > div.flex-1.overflow-hidden > div > div > div > div');
                              let responsesChild = responses.childNodes;
                              let lastRes = responsesChild[responsesChild.length - 1];
                              if (lastRes.tagName === 'BUTTON') lastRes = responsesChild[responsesChild.length - 2];
                              const lastResText = lastRes.innerText;
                              console.log("dis14please");
                              console.log(lastResText);
                              port.postMessage(lastResText);
                              c=0;
                              observer.disconnect();
                            },400)
                        }
                      }
                  }
              }
          }

          let observer8 = new MutationObserver(callback8);
          observer8.observe(button, { attributes: true });

          return true;
      });
  }
});
