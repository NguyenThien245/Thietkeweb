// =====================================================================
// THỬ THÁCH BUỔI 10 - NÚT "LIÊN HỆ" MỞ MODAL FORM ĐĂNG KÝ (không tải lại trang)
// =====================================================================
document.addEventListener('DOMContentLoaded', function () {
  // 1. Lấy các phần tử cần dùng
  var openBtn = document.getElementById('openContactBtn');
  var closeBtn = document.getElementById('closeContactBtn');
  var modal = document.getElementById('contactModal');
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('cmSuccess');
  if (!openBtn || !modal || !form) return; // thiếu phần tử thì dừng, tránh lỗi console

  var lastFocused = null; // nhớ nút đã bấm để trả focus khi đóng
  var closeTimer = null;  // timer tự đóng sau khi gửi thành công

  // 2. Mở modal
  function openModal() {
    lastFocused = document.activeElement;
    modal.hidden = false;                       // hiện modal
    document.body.classList.add('modal-open');  // khóa cuộn nền
    document.getElementById('cmFullName').focus();
  }

  // 3. Đóng modal
  function closeModal() {
    clearTimeout(closeTimer);
    modal.hidden = true;
    successMsg.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocused) lastFocused.focus();
  }

  // 4. Hiện / xóa lỗi của một ô (fieldId là id của input)
  function setError(fieldId, text) {
    var field = document.getElementById(fieldId).parentElement;
    document.getElementById(fieldId + 'Error').textContent = text;
    field.classList.toggle('is-invalid', text !== '');
  }

  // 5. Kiểm tra dữ liệu, trả về true nếu hợp lệ
  function validateForm() {
    var ok = true;
    var name = document.getElementById('cmFullName').value.trim();
    var email = document.getElementById('cmEmail').value.trim();
    var phone = document.getElementById('cmPhone').value.trim();
    var message = document.getElementById('cmMessage').value.trim();

    if (name.length < 2) { setError('cmFullName', 'Vui lòng nhập họ tên (ít nhất 2 ký tự).'); ok = false; }
    else { setError('cmFullName', ''); }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('cmEmail', 'Email không hợp lệ.'); ok = false; }
    else { setError('cmEmail', ''); }

    if (!/^(0|\+84)\d{9,10}$/.test(phone)) { setError('cmPhone', 'Số điện thoại không hợp lệ (VD: 0901234567).'); ok = false; }
    else { setError('cmPhone', ''); }

    if (message.length < 5) { setError('cmMessage', 'Lời nhắn cần ít nhất 5 ký tự.'); ok = false; }
    else { setError('cmMessage', ''); }

    return ok;
  }

  // ===== Gắn sự kiện =====

  // click nút "Liên hệ" -> mở modal
  openBtn.addEventListener('click', openModal);

  // click nút X -> đóng modal
  closeBtn.addEventListener('click', closeModal);

  // click vùng nền mờ (ngoài hộp thoại) -> đóng modal
  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });

  // nhấn Esc -> đóng modal khi đang mở
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });

  // submit form -> chặn tải lại trang, tự kiểm tra bằng JS
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (validateForm()) {
      successMsg.hidden = false;
      form.reset();
      closeTimer = setTimeout(closeModal, 1500); // tự đóng sau 1,5 giây
    }
  });

  // input -> xóa lỗi ngay khi người dùng sửa lại ô đó
  form.addEventListener('input', function (event) {
    if (event.target.id) setError(event.target.id, '');
  });
});
