document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    document.getElementById("wordInput").value = message.text;
  });

  document.getElementById("saveBtn").addEventListener("click", function () {
    let word = document.getElementById("wordInput").value;
    if (word) {
      saveWord(word);
    }
  });
});

function saveWord(word) {
  chrome.storage.local.get({ words: [] }, function (data) {
    let words = data.words;
    words.push(word);
    chrome.storage.local.set({ words: words }, function () {
      alert("Đã lưu từ: " + word);
    });
  });
}
