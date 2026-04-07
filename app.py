# ================================================================
#  app.py  —  Flask Backend | Portfolio Contact Form
#  Stack   :  Python 3.9+ · Flask · pyodbc · SQL Server (SSMS)
# ================================================================

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import pyodbc
import re
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# ── CORS: izinkan semua origin lokal (Live Server, file://, dll) ─
CORS(app, resources={r"/api/*": {"origins": "*"}})


# ================================================================
#  KONFIGURASI DATABASE
#  Edit nilai di file .env, jangan ubah file ini
# ================================================================
def get_connection():
    """
    Membuat koneksi ke SQL Server.
    Mendukung dua mode autentikasi (set lewat DB_AUTH_MODE di .env):
        - 'windows' : Windows Authentication (tanpa username/password)
        - 'sql'     : SQL Server Authentication (default)
    """
    driver   = os.getenv("DB_DRIVER",   "ODBC Driver 17 for SQL Server")
    server   = os.getenv("DB_SERVER",   r"localhost\SQLEXPRESS")
    database = os.getenv("DB_NAME",     "portfolio_db")
    auth     = os.getenv("DB_AUTH_MODE","sql").lower()

    if auth == "windows":
        conn_str = (
            f"DRIVER={{{driver}}};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"Trusted_Connection=yes;"
            f"TrustServerCertificate=yes;"
        )
    else:
        user     = os.getenv("DB_USER",     "sa")
        password = os.getenv("DB_PASSWORD", "")
        conn_str = (
            f"DRIVER={{{driver}}};"
            f"SERVER={server};"
            f"DATABASE={database};"
            f"UID={user};"
            f"PWD={password};"
            f"TrustServerCertificate=yes;"
        )

    return pyodbc.connect(conn_str, timeout=10)


# ================================================================
#  INISIALISASI TABEL
#  Dipanggil sekali saat server start — aman dijalankan berulang
# ================================================================
def init_db():
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            IF NOT EXISTS (
                SELECT * FROM sysobjects
                WHERE name='pesan_kontak' AND xtype='U'
            )
            CREATE TABLE pesan_kontak (
                id          INT           IDENTITY(1,1) PRIMARY KEY,
                nama        NVARCHAR(100) NOT NULL,
                email       NVARCHAR(150) NOT NULL,
                subjek      NVARCHAR(200) NOT NULL,
                pesan       NVARCHAR(MAX) NOT NULL,
                ip_pengirim NVARCHAR(50)  NULL,
                dibaca      BIT           DEFAULT 0,
                created_at  DATETIME      DEFAULT GETDATE()
            )
        """)
        conn.commit()
        conn.close()
        print("✅  Tabel 'pesan_kontak' siap.")
    except Exception as e:
        print(f"❌  Gagal inisialisasi DB: {e}")
        raise


# ================================================================
#  VALIDASI INPUT
# ================================================================
def validate(data: dict) -> list:
    errors = []
    nama   = (data.get("nama")   or "").strip()
    email  = (data.get("email")  or "").strip()
    subjek = (data.get("subjek") or "").strip()
    pesan  = (data.get("pesan")  or "").strip()

    if not nama:
        errors.append("Nama tidak boleh kosong.")
    elif len(nama) > 100:
        errors.append("Nama maksimal 100 karakter.")

    if not email:
        errors.append("Email tidak boleh kosong.")
    elif not re.match(r'^[\w\.\+\-]+@[\w\-]+\.\w{2,}$', email):
        errors.append("Format email tidak valid.")
    elif len(email) > 150:
        errors.append("Email maksimal 150 karakter.")

    if not subjek:
        errors.append("Subjek tidak boleh kosong.")
    elif len(subjek) > 200:
        errors.append("Subjek maksimal 200 karakter.")

    if not pesan:
        errors.append("Pesan tidak boleh kosong.")
    elif len(pesan) < 10:
        errors.append("Pesan minimal 10 karakter.")
    elif len(pesan) > 5000:
        errors.append("Pesan maksimal 5000 karakter.")

    return errors


# ================================================================
#  POST /api/contact
#  Dipanggil oleh form "Hubungi Saya" di index.html
# ================================================================
@app.route("/api/contact", methods=["POST"])
def contact():
    # 1. Parsing JSON
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"success": False,
                        "message": "Request harus berformat JSON."}), 400

    # 2. Validasi
    errors = validate(data)
    if errors:
        return jsonify({"success": False,
                        "message": errors[0],   # tampilkan error pertama
                        "errors":  errors}), 422

    # 3. Bersihkan nilai
    nama   = data["nama"].strip()
    email  = data["email"].strip().lower()
    subjek = data["subjek"].strip()
    pesan  = data["pesan"].strip()
    ip     = (request.headers.get("X-Forwarded-For", "")
            .split(",")[0].strip()) or request.remote_addr or "unknown"

    # 4. Simpan ke SQL Server
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO pesan_kontak (nama, email, subjek, pesan, ip_pengirim)
            VALUES (?, ?, ?, ?, ?)
            """,
            (nama, email, subjek, pesan, ip)
        )
        conn.commit()

        # Ambil ID baru
        cursor.execute("SELECT @@IDENTITY AS id")
        row    = cursor.fetchone()
        new_id = int(row.id) if row else None
        conn.close()

        print(f"[{datetime.now():%Y-%m-%d %H:%M:%S}]  "
              f"✉  Pesan #{new_id} dari {nama} <{email}>")

        return jsonify({
            "success": True,
            "message": "Pesan berhasil dikirim! Saya akan segera membalas.",
            "id":      new_id
        }), 201

    except pyodbc.Error as e:
        print(f"❌  DB error: {e}")
        return jsonify({"success": False,
                        "message": "Gagal menyimpan pesan. Coba lagi nanti."}), 500
    except Exception as e:
        print(f"❌  Server error: {e}")
        return jsonify({"success": False,
                        "message": "Terjadi kesalahan pada server."}), 500


# ================================================================
#  GET /api/messages
#  Lihat semua pesan masuk — buka di browser atau Postman
# ================================================================
@app.route("/api/messages", methods=["GET"])
def get_messages():
    try:
        conn   = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, nama, email, subjek,
                   LEFT(pesan, 120)  AS pesan_preview,
                   ip_pengirim, dibaca,
                   CONVERT(VARCHAR, created_at, 120) AS created_at
            FROM   pesan_kontak
            ORDER  BY created_at DESC
        """)
        cols = [c[0] for c in cursor.description]
        rows = [dict(zip(cols, row)) for row in cursor.fetchall()]
        conn.close()
        return jsonify({"success": True, "total": len(rows), "data": rows}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


# ================================================================
#  GET /api/health
#  Cek status server & koneksi DB
# ================================================================
@app.route("/api/health", methods=["GET"])
def health():
    db_ok = True
    db_info = "connected"
    try:
        conn = get_connection()
        conn.close()
    except Exception as e:
        db_ok   = False
        db_info = str(e)

    return jsonify({
        "status":    "ok" if db_ok else "degraded",
        "database":  db_info,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }), 200 if db_ok else 503


# ================================================================
#  MAIN
# ================================================================
if __name__ == "__main__":
    print("\n" + "=" * 52)
    print("  🚀  Portfolio Backend  —  Flask + SQL Server")
    print("=" * 52)
    default_server = r'localhost\SQLEXPRESS'
    server = os.getenv('DB_SERVER', default_server)
    print(f"  Server DB  : {server}")
    print(f"  Database   : {os.getenv('DB_NAME',   'portfolio_db')}")
    print(f"  Auth Mode  : {os.getenv('DB_AUTH_MODE', 'sql').upper()}")
    print(f"  Port       : {os.getenv('PORT', '5000')}")
    print("=" * 52 + "\n")

    init_db()

    app.run(
        host  = "0.0.0.0",
        port  = int(os.getenv("PORT", 5000)),
        debug = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    )
