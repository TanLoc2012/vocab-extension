document.addEventListener("mouseup", function (event) {
  let selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    showIcon(selectedText, event.pageX, event.pageY);
  }
});

function showIcon(text, x, y) {
  let existingIcon = document.getElementById("wordIcon");
  if (existingIcon) existingIcon.remove();

  let icon = document.createElement("div");
  icon.id = "wordIcon";
  icon.innerText = "📌";
  icon.style.position = "absolute";
  icon.style.left = `${x}px`;
  icon.style.top = `${y}px`;
  icon.style.cursor = "pointer";
  icon.style.backgroundColor = "#fff";
  icon.style.border = "1px solid #ccc";
  icon.style.borderRadius = "5px";
  icon.style.padding = "5px";
  icon.style.fontSize = "20px";
  icon.style.zIndex = "1000";

  document.body.appendChild(icon);

  icon.addEventListener("click", function (event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    showPopup(text, x, y);
    icon.remove(); // Xóa icon khi popup xuất hiện
  });
}

function showPopup(text) {
  closePopup(); // Đóng popup cũ nếu có

  let popup = document.createElement("div");
  popup.id = "wordPopup";
  popup.innerHTML = `
      <div id="popupContent" style="
        width: 350px;
        padding: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: Arial, sans-serif;
      ">
        <h3 style="margin-top: 0; text-align: center;">Thêm từ vựng</h3>
  
        <label style="font-weight: bold;">Từ:</label>
        <input type="text" id="wordInput" value="${text}" style="
          width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;
        " />
  
        <label style="font-weight: bold;">Loại từ:</label>
        <input type="text" id="wordType" placeholder="Danh từ, động từ..." style="
          width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;
        " />
  
        <label style="font-weight: bold;">Nghĩa:</label>
        <input type="text" id="wordMeaning" placeholder="Nhập nghĩa..." style="
          width: 100%; padding: 8px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 5px;
        " />
  
        <label style="font-weight: bold;">Ví dụ:</label>
        <textarea id="wordExample" placeholder="Nhập câu ví dụ..." style="
          width: 100%; padding: 8px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 5px; height: 60px;
        "></textarea>
  
        <div style="display: flex; justify-content: space-between;">
          <button id="saveBtn" style="
            background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 5px;
            cursor: pointer; flex: 1; margin-right: 5px;
          ">Lưu</button>
  
          <button id="closeBtn" style="
            background-color: #f44336; color: white; padding: 10px; border: none; border-radius: 5px;
            cursor: pointer; flex: 1; margin-left: 5px;
          ">Đóng</button>
        </div>
      </div>
    `;

  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "100vw";
  popup.style.height = "100vh";
  popup.style.backgroundColor = "rgba(0,0,0,0.3)";
  popup.style.display = "flex";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";
  popup.style.zIndex = "1001";

  document.body.appendChild(popup);

  document.getElementById("saveBtn").addEventListener("click", function () {
    let word = document.getElementById("wordInput").value;
    let type = document.getElementById("wordType").value;
    let meaning = document.getElementById("wordMeaning").value;
    let example = document.getElementById("wordExample").value;

    if (word) {
      saveWord({ word, type, meaning, example });
      closePopup();
    }
  });

  document.getElementById("closeBtn").addEventListener("click", function () {
    closePopup();
  });

  setTimeout(() => {
    document.addEventListener("click", handleOutsideClick);
  }, 100);
}

// Đóng popup nếu click ra ngoài
function handleOutsideClick(event) {
  let popup = document.getElementById("wordPopup");
  let popupContent = document.getElementById("popupContent");
  if (popup && popupContent && !popupContent.contains(event.target)) {
    closePopup();
  }
}

function closePopup() {
  let popup = document.getElementById("wordPopup");
  if (popup) popup.remove();
  document.removeEventListener("click", handleOutsideClick);
}

function saveWord(word) {
  chrome.storage.local.get({ words: [] }, function (data) {
    let words = data.words;
    words.push(word);
    chrome.storage.local.set({ words: words }, function () {
      alert("Đã lưu từ: " + word);
    });
  });
}
