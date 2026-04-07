# Panduan Setup Backend — Portfolio Ilham Hafizt

## Struktur Folder

```
portfolio/
├── index.html          ← Frontend (sudah diupdate)
├── js/
│   └── script.js       ← sudah diupdate: fetch ke Flask API
├── css/
│   └── style.css       ← tidak berubah
├── assets/
│   └── profil.png
│
├── app.py              ← Flask server (file baru)
├── .env                ← Konfigurasi DB (rename dari env.txt)
├── requirements.txt    ← Dependencies Python (file baru)
└── setup_database.sql  ← Script SQL untuk SSMS (file baru)
```

---

## Prasyarat

| Software | Versi | Link |
|---|---|---|
| Python | 3.9+ | https://www.python.org/downloads/ |
| SQL Server | Express / Developer | sudah terinstall (SSMS) |
| ODBC Driver 17 | for SQL Server | https://aka.ms/downloadmsodbcsql |

> Cek ODBC Driver: buka **ODBC Data Sources (64-bit)** → tab **Drivers**

---

## Langkah Setup

### 1 — Buat Database di SSMS

Buka SSMS → connect ke server → buka file `setup_database.sql` → tekan **F5**.

Script akan membuat:
- Database `portfolio_db`
- Tabel `pesan_kontak` dengan kolom: `id, nama, email, subjek, pesan, ip_pengirim, dibaca, created_at`

---

### 2 — Rename & Edit File Konfigurasi

Rename `env.txt` → `.env`, lalu edit isinya:

```env
DB_AUTH_MODE=sql                          # atau "windows" jika pakai Windows Auth
DB_DRIVER=ODBC Driver 17 for SQL Server
DB_SERVER=localhost\SQLEXPRESS            # sesuaikan dengan nama server di SSMS
DB_NAME=portfolio_db
DB_USER=sa
DB_PASSWORD=password_kamu_disini          # kosongkan jika pakai Windows Auth
```

**Tips nama server yang umum:**

| Kondisi | Nilai DB_SERVER |
|---|---|
| SQL Server Express | `localhost\SQLEXPRESS` |
| Nama PC spesifik | `NAMA-PC\SQLEXPRESS` |
| SQL Server Standard/Developer | `localhost` |

---

### 3 — Install Dependencies Python

```bash
# Buat virtual environment (disarankan)
python -m venv venv

# Aktifkan
venv\Scripts\activate       # Windows
source venv/bin/activate    # Mac/Linux

# Install library
pip install -r requirements.txt
```

---

### 4 — Jalankan Flask Server

```bash
python app.py
```

Output sukses:
```
====================================================
  🚀  Portfolio Backend  —  Flask + SQL Server
====================================================
  Server DB  : localhost\SQLEXPRESS
  Database   : portfolio_db
  Auth Mode  : SQL
  Port       : 5000
====================================================

✅  Tabel 'pesan_kontak' siap.
 * Running on http://0.0.0.0:5000
```

---

### 5 — Buka Website & Coba Kirim Pesan

Buka `index.html` di browser (gunakan **Live Server** di VS Code agar CORS tidak bermasalah).

Isi form **"Hubungi Saya"** → klik **Kirim Pesan** → cek di SSMS:

```sql
USE portfolio_db;
SELECT * FROM pesan_kontak ORDER BY created_at DESC;
```

---

## API Endpoints

| Method | URL | Fungsi |
|---|---|---|
| `POST` | `http://localhost:5000/api/contact` | Simpan pesan dari form |
| `GET` | `http://localhost:5000/api/messages` | Lihat semua pesan masuk |
| `GET` | `http://localhost:5000/api/health` | Cek status server & DB |

---

## Troubleshooting

**`pyodbc.InterfaceError: IM002 — Data source name not found`**
→ ODBC Driver belum terinstall atau nama di `.env` salah.
→ Download: https://aka.ms/downloadmsodbcsql

**`Login failed for user 'sa'`**
→ Password salah, atau akun `sa` dinonaktifkan.
→ Coba `DB_AUTH_MODE=windows` jika pakai Windows Auth.

**`Connection refused` di browser (Network Error)**
→ Flask belum dijalankan. Pastikan `python app.py` sudah berjalan.

**Pesan tidak muncul di database tapi form sukses**
→ Buka DevTools (F12) → tab Network → cek response dari `/api/contact`.
