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

chrome.identity.getAuthToken({ interactive: true }, function (token) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  console.log("Token:", token);
  chrome.storage.local.set({ oauth_token: token }, function () {
    console.log("Token saved to chrome.storage");
  });
});
