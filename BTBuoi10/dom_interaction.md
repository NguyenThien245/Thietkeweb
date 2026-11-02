# dom_interaction.md – Các sự kiện (event) đã sử dụng

**Bài:** Nút "Liên hệ" + Modal form đăng ký (không tải lại trang)
**Repo:** https://github.com/NguyenThien245/Thietkeweb.git
**File liên quan:** `index.html`, `style.css`, `contact-modal.js` (trong thư mục BTBuoi10)

## 1. Mô tả chức năng
Trong mục Liên hệ của Portfolio có nút **"Liên hệ"**. Khi nhấn, một Modal (hộp thoại) hiện lên chứa form đăng ký gồm họ tên, email, số điện thoại và lời nhắn. Toàn bộ thao tác mở/đóng/gửi form đều do JavaScript xử lý nên **trang không bị tải lại**.

## 2. Bảng các sự kiện đã dùng

| # | Sự kiện | Gắn vào phần tử | Mục đích |
|---|---------|-----------------|----------|
| 1 | `DOMContentLoaded` | `document` | Chờ HTML tải xong rồi mới lấy phần tử và gắn sự kiện, tránh lỗi `null`. |
| 2 | `click` | Nút `#openContactBtn` ("Liên hệ") | Mở modal: đặt `modal.hidden = false`, khóa cuộn nền, đưa focus vào ô đầu tiên. |
| 3 | `click` | Nút `#closeContactBtn` (dấu ×) | Đóng modal: đặt `modal.hidden = true`, mở khóa cuộn, trả focus về nút Liên hệ. |
| 4 | `click` | Vùng nền mờ `#contactModal` | Đóng modal khi bấm ra ngoài hộp thoại. Dùng `event.target === modal` để chỉ đóng khi bấm đúng vùng nền, không đóng khi bấm bên trong form. |
| 5 | `keydown` | `document` | Nhấn phím **Esc** (`event.key === 'Escape'`) để đóng modal khi modal đang mở. |
| 6 | `submit` | Form `#contactForm` | Gọi `event.preventDefault()` để **chặn tải lại trang**, tự kiểm tra dữ liệu, hiện thông báo thành công rồi đóng modal. |
| 7 | `input` | Form `#contactForm` | Xóa thông báo lỗi ngay khi người dùng gõ lại vào ô bị lỗi. Dùng event delegation: gắn 1 listener ở form thay vì gắn riêng cho từng ô. |
| 8 | `setTimeout` (timer) | `window` | Chờ 1,5 giây sau khi gửi thành công rồi tự đóng modal. (Không phải event DOM, nhưng điều khiển luồng giao diện.) |

## 3. Các thao tác DOM đã dùng
- **Chọn phần tử:** `document.getElementById()`.
- **Đổi hiển thị:** `modal.hidden = true/false`, `classList.add()`, `classList.remove()`, `classList.toggle()` với class `modal-open`, `is-invalid` và thuộc tính `hidden`.
- **Đổi nội dung:** `textContent` để hiện thông báo lỗi.
- **Đọc dữ liệu form:** `.value.trim()`.
- **Reset form:** `form.reset()`.
- **Quản lý focus:** `element.focus()` và `document.activeElement`.

## 4. Luồng hoạt động
1. Trang tải xong (`DOMContentLoaded`) → JS gắn tất cả sự kiện.
2. Người dùng **click** "Liên hệ" → modal hiện.
3. Người dùng điền form, có thể đóng modal bằng **click ×**, **click nền**, hoặc **phím Esc**.
4. Người dùng bấm "Gửi đăng ký" → sự kiện **submit** → `preventDefault()` → kiểm tra dữ liệu.
5. Nếu sai → hiện lỗi dưới từng ô; sửa lại thì lỗi tự mất nhờ sự kiện **input**.
6. Nếu đúng → hiện "Đăng ký thành công", reset form, tự đóng modal sau 1,5 giây.

## 5. Vì sao trang không tải lại?
Form mặc định sẽ gửi dữ liệu và tải lại trang khi submit. Trong handler `submit` mình gọi `event.preventDefault()` để hủy hành vi mặc định đó, sau đó xử lý hoàn toàn bằng JavaScript. Ngoài ra nút mở/đóng dùng `type="button"` nên cũng không kích hoạt submit.
