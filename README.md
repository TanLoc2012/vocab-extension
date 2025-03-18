📌 Chrome Extension - Lưu Từ Vựng

📝 Giới Thiệu

Đây là một extension giúp bạn lưu lại từ vựng nhanh chóng khi đọc nội dung trên web. Khi bạn tô đen một từ hoặc cụm từ, một icon 📌 sẽ xuất hiện. Nhấn vào icon sẽ mở một popup cho phép bạn nhập loại từ, nghĩa và ví dụ minh họa trước khi lưu.

🎯 Tính Năng

Hiển thị icon khi bôi đen từ.

Mở popup nhập thông tin từ vựng.

Lưu dữ liệu vào bộ nhớ Chrome (Local Storage).

Giao diện đẹp, dễ sử dụng.

🚀 Hướng Dẫn Cài Đặt (Chạy Local trên Chrome)

1️⃣ Tải & Giải Nén

Tải source code của extension về máy và giải nén nếu cần.

2️⃣ Mở Trang Quản Lý Extension

Mở Chrome.

Nhập vào thanh địa chỉ: chrome://extensions/

Bật "Chế độ nhà phát triển" (Developer Mode) ở góc trên bên phải.

3️⃣ Tải Extension

Nhấn vào nút "Tải tiện ích đã giải nén" (Load unpacked).

Chọn thư mục chứa source code của extension.

Extension sẽ được thêm vào Chrome.

4️⃣ Kiểm Tra & Sử Dụng

Mở bất kỳ trang web nào.

Tô đen một từ/cụm từ để hiển thị icon 📌.

Nhấn vào icon để mở popup và nhập thông tin.

Nhấn "Lưu" để lưu vào bộ nhớ của Chrome.

🛠 Cấu Trúc Dự Án

📂 chrome-extension/
│── 📄 manifest.json        # Cấu hình extension
│── 📄 background.js        # Xử lý sự kiện nền
│── 📄 content.js           # Xử lý tương tác với trang web
│── 📄 popup.html           # Giao diện popup
│── 📄 popup.js             # Logic của popup
│── 📄 styles.css           # CSS cho popup
│── 📄 README.md            # Hướng dẫn sử dụng

📌 Lưu Ý

Extension này chỉ chạy cục bộ, không thể dùng trên Chrome Web Store nếu chưa đăng ký.

Nếu có lỗi, thử kiểm tra ở Developer Console (Ctrl + Shift + I > Console).

Dữ liệu được lưu trong Chrome Storage (local), sẽ bị mất khi xóa extension.

🚀 Chúc bạn sử dụng hiệu quả! Nếu có vấn đề, vui lòng liên hệ! 😊
