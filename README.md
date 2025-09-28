# Zumba Membership PWA

Bu proje, Zumba dans fitness eğitmeni için üye takip ve bildirim sistemi sağlayan modern bir Progressive Web Uygulaması (PWA)’dır. React, TypeScript, Vite ve Supabase üzerinde kurulmuştur.

## Özellikler

- **Üye yönetimi:** Zumba dersleri ve etkinlikleri için üye kayıt ve takip
- **Kimlik doğrulama:** Supabase ile e‑posta ve parola üzerinden giriş/ kayıt
- **Profil sayfası:** Üyeler kendilerine ait bilgileri görüntüleyebilir ve güncelleyebilir
- **Admin paneli:** Aktif üyeleri listeleyip yönetme yeteneği
- **Bildirim sistemi:** Push bildirimleri ve motivasyon mesajları
- **PWA özellikleri:** Çevrimdışı kullanım, ana ekrana ekleme, push bildirimleri
- **Responsive tasarım:** Mobil uyumlu, modern arayüz

## Kurulum

### Gerekli Yazılımlar

- Node.js (v20 veya üzeri)
- npm veya pnpm paket yöneticisi
- Supabase hesabı ve projesi
- Vercel hesabı (deployment için)

### Yerel Çalıştırma

1. Depoyu klonlayın.
2. Ortam değişkenleri dosyasını kopyalayıp doldurun:

   ```bash
   cp .env.example .env
   ```

   Ardından `.env` dosyasındaki değerleri kendi Supabase projenize göre güncelleyin:

   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

4. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

   Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

### Üretim Derlemesi

Prodüksiyon derlemesi oluşturmak için:

```bash
npm run build
```

Derleme çıktısı `dist/` dizininde oluşur ve Vercel ya da benzeri ortamlarda servis edilebilir.

## Deployment

Bu repo, Vercel’e otomatik deployment için bir GitHub Actions iş akışı içerir. `.github/workflows/deploy.yml` dosyasındaki yapılandırma, `main` dalına yapılan her push’ta uygulamayı derleyip Vercel’e gönderir. Aşağıdaki secret’ları repo ayarlarından eklemeniz gerekir:

- `SUPABASE_URL` ve `SUPABASE_ANON_KEY`: Supabase ortam değişkenleri
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`: Vercel projesi için kimlik bilgileriniz

Daha ayrıntılı bilgi için `VERCEL_DEPLOYMENT.md` dosyasını inceleyebilirsiniz.

## Supabase Kurulumu

`SUPABASE_SETUP.md` dosyasında Supabase şemasının kurulumu, kimlik doğrulama seçenekleri ve ortam değişkenlerinin nasıl ayarlanacağı adım adım anlatılmaktadır.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
