# Supabase Kurulum Talimatları

Bu dosya, Supabase projenizi nasıl kuracağınızı ve React uygulamasıyla nasıl entegre edeceğinizi açıklar.

## 1. Supabase Hesabı Oluşturma

1. [Supabase](https://supabase.com/) adresine gidin ve bir hesap oluşturun
2. Yeni bir proje oluşturun
3. Proje oluşturulduktan sonra, proje URL'sini ve anonim API anahtarını not alın

## 2. Veritabanı Şemasını Kurma

1. Supabase projenizin SQL Editörüne gidin
2. Bu projedeki `supabase_schema.sql` dosyasının içeriğini kopyalayın ve SQL Editörüne yapıştırın
3. SQL sorgusunu çalıştırın

## 3. Kimlik Doğrulama Ayarları

1. Supabase projenizin "Authentication" bölümüne gidin
2. "Email Auth" özelliğinin etkin olduğundan emin olun
3. İsterseniz "Email Confirmation" özelliğini devre dışı bırakabilirsiniz (geliştirme aşamasında)

## 4. Ortam Değişkenlerini Ayarlama

1. Bu projedeki `.env` dosyasını açın
2. `VITE_SUPABASE_URL` değerini Supabase proje URL'nizle değiştirin
3. `VITE_SUPABASE_ANON_KEY` değerini Supabase anonim API anahtarınızla değiştirin

## 5. Uygulamayı Çalıştırma

Tüm bu adımları tamamladıktan sonra, uygulamayı çalıştırabilirsiniz:

```
pnpm run dev
```
