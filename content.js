document.addEventListener("mouseup", function (event) {
  let selectedText = window.getSelection().toString().trim();
  console.log(selectedText);

  // Nếu click vào icon, bỏ qua sự kiện mouseup
  if (event.target.id === "iconSpan") {
    return;
  }

  if (selectedText.length > 0) {
    showIcon(selectedText, event.pageX, event.pageY);
  } else {
    let popup = document.getElementById("wordIcon");
    if (popup) popup.remove();
  }
});

function showIcon(text, x, y) {
  let existingIcon = document.getElementById("wordIcon");
  if (existingIcon) existingIcon.remove();

  let selection = window.getSelection();
  if (!selection.rangeCount) return;

  let range = selection.getRangeAt(0);
  let rect = range.getBoundingClientRect(); // Lấy vị trí của từ được chọn

  let icon = document.createElement("div");
  icon.id = "wordIcon";
  icon.style.position = "absolute";
  icon.style.left = `${rect.right + window.scrollX + 5}px`;
  icon.style.top = `${rect.top + window.scrollY}px`;
  icon.style.cursor = "pointer";
  icon.style.backgroundColor = "#fff";
  icon.style.border = "1px solid #ccc";
  icon.style.borderRadius = "5px";
  icon.style.padding = "5px";
  icon.style.fontSize = "20px";
  icon.style.zIndex = "1000";
  icon.style.display = "flex"; // Fix lỗi click
  icon.style.alignItems = "center";
  icon.style.justifyContent = "center";

  // Thêm emoji vào span
  let iconSpan = document.createElement("img");
  iconSpan.id = "iconSpan";
  iconSpan.src = "chrome-extension://" + chrome.runtime.id + "/icon1.png";
  iconSpan.width = 24;
  iconSpan.height = 24;
  icon.appendChild(iconSpan);

  document.body.appendChild(icon);

  icon.addEventListener("click", function (event) {
    event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
    console.log("Icon clicked!"); // Kiểm tra xem có nhận click không
    showPopup(text, rect.right + 10, rect.top);
    icon.remove(); // Xóa icon khi popup xuất hiện
  });

  setTimeout(() => {
    if (existingIcon) existingIcon.remove();
  }, 100);
}

function showPopup(text) {
  closePopup(); // Đóng popup cũ nếu có

  let popup = document.createElement("div");
  popup.id = "wordPopup";
  popup.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">

    <div id="popupContent" class="card shadow-lg p-3 bg-white rounded" style="width: 400px;">
      <div class="card-body">
        <h5 class="card-title text-center">Thêm từ mới</h5>

        <label class="form-label">Từ:</label>
        <input type="text" class="form-control" id="wordInput" value="${text}">

        <label class="form-label mt-2">Loại từ:</label>
        <input type="text" class="form-control" id="wordTypeSelect">

        <label class="form-label mt-2">Nghĩa:</label>
        <input type="text" class="form-control" id="wordMeaning">

        <label class="form-label mt-2">Ví dụ:</label>
        <textarea class="form-control" id="wordExample" rows="3"></textarea>

        <div class="d-flex justify-content-between mt-3">
          <button class="btn btn-primary" id="saveBtn">Lưu</button>
          <button class="btn btn-secondary" id="closeBtn">Đóng</button>
        </div>
      </div>
    </div>
  `;

  popup.style.position = "absolute";
  popup.style.left = "50%";
  popup.style.top = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.zIndex = "1001";

  document.body.appendChild(popup);

  document.getElementById("saveBtn").addEventListener("click", function () {
    let word = document.getElementById("wordInput").value;
    let type = document.getElementById("wordTypeSelect").value;
    let meaning = document.getElementById("wordMeaning").value;
    let example = document.getElementById("wordExample").value;

    if (word) {
      saveWord(word.toLowerCase().trim(), type, meaning, example);
      closePopup();
    }
  });

  document.getElementById("closeBtn").addEventListener("click", function () {
    closePopup();
  });

  // setTimeout(() => {
  //   document.addEventListener("click", handleOutsideClick);
  // }, 100);
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

function saveWord(word, type, meaning, example) {
  const spreadsheetId = "1UM9_8V74tR2oTu1It4IT1Jq6jmro_7ArMCqYs5qGxi0";
  const sheetName = "vocab-extension";
  const range = `${sheetName}!A:D`; // Cột A: Từ vựng, Cột B: Nghĩa

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

  chrome.storage.local.get("oauth_token", function (data) {
    if (!data.oauth_token) {
      console.error("Không tìm thấy token OAuth!");
      return;
    }

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.oauth_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [[word, type, meaning, example]],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data saved:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
