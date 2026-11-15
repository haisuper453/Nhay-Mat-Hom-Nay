# Mắt Nháy Hôm Nay

Vietnamese iPhone-friendly offline PWA for fixed eye-twitch fortune interpretations.

## Fortune data
Edit `fortunes.json`. Each entry must include `startTime`, `endTime` (24-hour HH:MM), `eye` (`left` or `right`), `gender` (`female` or `male`), and `fortune` (Vietnamese text). Start is inclusive, end exclusive. Midnight-crossing intervals such as 23:00 to 01:00 are supported. The sample entries are NOT real predictions.

## Local testing
Run `python3 -m http.server 8000` in this folder and open http://localhost:8000. Do not open index.html directly as a file.

## iPhone installation
Publish this folder on an HTTPS static host (e.g., GitHub Pages). Open the hosted URL in iPhone Safari, tap Share, then Add to Home Screen. Open once online to cache the files. History and gender settings are saved locally on the device, not synced or backed up.

## Updating predictions
Edit `fortunes.json` and change the `CACHE` version in `service-worker.js` (e.g. `mat-nhay-v2`) before redeploying, to refresh the offline cache. Do not change the history key unless you intentionally want to reset saved history.

## Dữ liệu phiên bản 2
48 điềm báo đã được nhập: 12 khung giờ × 2 mắt × 2 giới tính. Nội dung được biên tập gọn từ thông tin người dùng cung cấp, không phải dự báo khoa học. Để cập nhật bản đã cài, triển khai lại toàn bộ thư mục trên HTTPS, mở app trực tuyến một lần rồi tải lại.

Phiên bản 3: 48 lời giải đoán đầy đủ theo nguyên văn người dùng cung cấp, không rút gọn.
