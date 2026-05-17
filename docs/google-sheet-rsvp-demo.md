# Demo RSVP ke Google Sheet

Sistem RSVP membaca nama tamu dari link undangan, lalu mengirim data ke Google Sheet lewat Google Apps Script Web App.

## 1. Siapkan Google Sheet

Buat spreadsheet baru dengan sheet bernama `RSVP`, lalu baris pertama isi header:

```txt
Timestamp | Nama | Kehadiran | Jumlah Tamu | Ucapan | Link Tamu | User Agent
```

## 2. Buat Apps Script

Di Google Sheet: **Extensions → Apps Script**, lalu paste kode ini:

```js
const SHEET_NAME = 'RSVP';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const payload = JSON.parse(e.postData.contents || '{}');

  sheet.appendRow([
    new Date(),
    payload.nama || '',
    payload.kehadiran || '',
    payload.jumlah || '',
    payload.ucapan || '',
    payload.guestLink || '',
    payload.userAgent || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy Web App

Klik **Deploy → New deployment → Web app**:

- Execute as: `Me`
- Who has access: `Anyone`

Copy URL Web App-nya.

## 4. Pasang endpoint di project

Buat file `.env` di root project:

```env
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/ISI_URL_WEB_APP_KAMU/exec
```

Lalu jalankan ulang dev server:

```bash
npm run dev
```

## 5. Test link personal

Contoh:

```txt
http://localhost:8080/?to=Bapak%20Andi%20Saputra
```

Saat tamu submit RSVP, data otomatis masuk ke Google Sheet.

## Catatan demo

Kalau `VITE_RSVP_ENDPOINT` belum diisi, form tetap jalan sebagai mode demo lokal: data disimpan di browser dan ditampilkan di panel “Demo data RSVP terakhir”.
