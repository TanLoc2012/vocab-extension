chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.text) {
    chrome.storage.local.get({ words: [] }, (data) => {
      let words = data.words;
      words.push(message.text);
      chrome.storage.local.set({ words: words }, () => {
        console.log("Đã lưu từ:", message.text);
      });
    });
  }
});
