-- ================================================================
--  setup_database.sql
--  Jalankan script ini SATU KALI di SSMS sebelum menjalankan app.py
--  Cara: Buka SSMS → File → Open → pilih file ini → Execute (F5)
-- ================================================================

-- 1. Buat database portfolio_db (lewati jika sudah ada)
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'portfolio_db')
BEGIN
    CREATE DATABASE portfolio_db;
    PRINT '>> Database portfolio_db berhasil dibuat.';
END
ELSE
    PRINT '>> Database portfolio_db sudah ada, dilewati.';
GO

-- 2. Gunakan database portfolio_db
USE portfolio_db;
GO

-- 3. Buat tabel pesan_kontak (lewati jika sudah ada)
IF NOT EXISTS (
    SELECT * FROM sysobjects WHERE name='pesan_kontak' AND xtype='U'
)
BEGIN
    CREATE TABLE pesan_kontak (
        id          INT           IDENTITY(1,1) PRIMARY KEY,
        nama        NVARCHAR(100) NOT NULL,           -- Nama pengirim
        email       NVARCHAR(150) NOT NULL,           -- Email pengirim
        subjek      NVARCHAR(200) NOT NULL,           -- Subjek pesan
        pesan       NVARCHAR(MAX) NOT NULL,           -- Isi pesan lengkap
        ip_pengirim NVARCHAR(50)  NULL,               -- IP address pengirim
        dibaca      BIT           DEFAULT 0,          -- 0=belum dibaca, 1=sudah
        created_at  DATETIME      DEFAULT GETDATE()   -- Waktu kirim (otomatis)
    );
    PRINT '>> Tabel pesan_kontak berhasil dibuat.';
END
ELSE
    PRINT '>> Tabel pesan_kontak sudah ada, dilewati.';
GO

-- 4. Tampilkan struktur tabel sebagai konfirmasi
SELECT
    COLUMN_NAME             AS Kolom,
    DATA_TYPE               AS TipeData,
    CHARACTER_MAXIMUM_LENGTH AS MaksKarakter,
    IS_NULLABLE             AS BolehNull,
    COLUMN_DEFAULT          AS NilaiDefault
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'pesan_kontak'
ORDER BY ORDINAL_POSITION;
GO

PRINT '>> Setup selesai. Siap digunakan.';
GO

-- ================================================================
--  Query monitoring — jalankan kapan saja di SSMS
-- ================================================================

-- Lihat semua pesan (terbaru di atas)
-- SELECT * FROM pesan_kontak ORDER BY created_at DESC;

-- Hanya pesan yang belum dibaca
-- SELECT * FROM pesan_kontak WHERE dibaca = 0 ORDER BY created_at DESC;

-- Tandai semua sebagai sudah dibaca
-- UPDATE pesan_kontak SET dibaca = 1 WHERE dibaca = 0;
