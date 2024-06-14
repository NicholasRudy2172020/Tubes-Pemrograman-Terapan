# Tugas Besar Pemrograman Terapan // CRUD-REST_API

### 2172020 - Nicholas Christopher Rudy


## Penjelasan
Proyek ini dikerjakan menggunakan Python & REST API sebagai backend, serta HTML, CSS, dan JavaScript sebagai frontend.
Backend python memiliki fungsionalitas CRUD (Create, Read, Update, Delete).
Frontend HTML menggunakan template Bootstrap untuk menampilkan konten dari database yang digunakan (videogames.db), JavaScript untuk menjalankan fungsi AJAX (fetch data), dan CSS untuk style.


## Database videogame.db
Database ini memiliki 2 tabel, yaitu:

- Games (id (primary key), title, dev_studio, publisher_id)
- Publishers (publisher_id (primary key), name)

Saat fungsi get dijalankan, kolom publisher_id pada games akan langsung menampilkan nama publisher dengan publisher_id yang sama.

![image](https://github.com/NicholasRudy2172020/CRUD-REST_API/assets/91111940/ff1ada7d-24c4-4284-bbe4-6b1347cd50a7)


Backend proyek dibantu menggunakan geeksforgeeks, stackoverflow, dan github.

Frontend proyek dibuat menggunakan struktur dan pengetahuan dari tugas mandiri semester 4 (Pemrograman Web Lanjut - Bootstrap & Database), dan github copilot (plugin VSCode) untuk memberikan bantuan keterangan dari kode yang dirancang (terutama bagian style.css & AJAX index.js)
