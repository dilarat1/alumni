# Alumni

Üniversite mezunlarını takip eden bir web uygulaması. Mezunların iletişim bilgilerini, mezuniyet yıllarını ve kariyer bilgilerini yönetir.

## Sistem Ne Yapar?

- Mezun kayıtlarını oluşturma, listeleme, güncelleme ve silme (CRUD)
- Mezunları bölüm, mezuniyet yılı gibi kriterlere göre filtreleme
- RESTful API üzerinden veri sunumu

## Teknoloji Seçimleri

| Teknoloji | Seçim | Neden? |
|-----------|-------|--------|
| **Back-end Dil** | Node.js (Express) | JavaScript ekosistemi geniş, hızlı prototipleme imkânı sağlıyor, npm ile zengin paket desteği var |
| **Veritabanı** | MySQL | İlişkisel veri yapısına uygun (mezun ↔ bölüm ilişkisi), yaygın ve öğrenmesi kolay |
| **Konteyner** | Docker Compose | Tek komutla tüm sistemi ayağa kaldırmak için |

## Nasıl Çalıştırılır?

Tek komut yeter:

```bash
docker compose up
```

Uygulama `http://localhost:3000` adresinde çalışmaya başlar.

## Proje Yapısı

```
alumni/
├── docker-compose.yml    # Servisleri tanımlar (app + db)
├── Dockerfile            # Node.js uygulama imajı
├── package.json          # Bağımlılıklar
├── .env.example          # Ortam değişkenleri örneği
├── src/
│   ├── index.js          # Express sunucu & API rotaları
│   └── db.js             # MySQL bağlantı ayarları
└── init.sql              # Veritabanı başlangıç şeması
```

## API Endpoints

| Metot  | Yol             | Açıklama              |
|--------|-----------------|------------------------|
| GET    | `/api/alumni`   | Tüm mezunları listele  |
| GET    | `/api/alumni/:id` | Tek mezun getir      |
| POST   | `/api/alumni`   | Yeni mezun ekle        |
| PUT    | `/api/alumni/:id` | Mezun güncelle       |
| DELETE | `/api/alumni/:id` | Mezun sil            |