# Supabase Kurulum Talimatları

Bu dosya, Supabase projenizi nasıl kuracağınızı ve React uygulamasıyla nasıl entegre edeceğinizi açıklar.

## 1. Supabase Hesabı Oluşturma

1. [Supabase](https://supabase.com/) adresine gidin ve bir hesap oluşturun.
2. Yeni bir proje oluşturun.
3. Proje oluşturulduktan sonra, proje URL'sini ve anonim API anahtarını not alın.

## 2. Veritabanı Şemasını Kurma

1. Supabase projenizin **SQL Editor** bölümüne gidin.
2. Bu depodaki `supabase_schema.sql` dosyasının içeriğini kopyalayıp SQL Editor'e yapıştırın.
3. Sorguyu çalıştırarak gerekli tabloları oluşturun.

## 3. Kimlik Doğrulama Ayarları

1. Supabase projenizin **Authentication** bölümüne gidin.
2. **Email Auth** özelliğinin etkin olduğundan emin olun.
3. Geliştirme aşamasında isterseniz **Email Confirmation** özelliğini devre dışı bırakabilirsiniz.

## 4. Ortam Değişkenlerini Ayarlama

1. Proje kökündeki `.env.example` dosyasını `.env` olarak kopyalayın:

   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasındaki değerleri kendi Supabase projenize göre güncelleyin:

   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

Bu değişkenler Vite aracılığıyla hem istemci hem de build sırasında kullanılacaktır.

## 5. Uygulamayı Çalıştırma

Tüm bu adımları tamamladıktan sonra, uygulamayı geliştirme modunda başlatabilirsiniz:

```bash
npm install
npm run dev
```

Sunucu varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.
