# Zumba PWA – Vercel Deployment

Bu dosya, projenin Vercel'e nasıl deploy edileceğini açıklar.

## 1. Projeyi Vercel'e Bağlama

1. [Vercel](https://vercel.com/) hesabınıza giriş yapın.
2. "New Project" butonuna tıklayın ve GitHub hesabınızı bağlayın.
3. Bu depoyu seçerek yeni bir Vercel projesi oluşturun.

## 2. Ortam Değişkenlerini Tanımlama

Proje ayarları altında **Environment Variables** bölümüne aşağıdaki değişkenleri ekleyin:

| Name                  | Value                        |
| --------------------- | ---------------------------- |
| `SUPABASE_URL`        | Supabase proje URL'niz       |
| `SUPABASE_ANON_KEY`   | Supabase anonim API anahtarınız |
| `VERCEL_TOKEN`        | Vercel kişisel erişim tokenı |
| `VERCEL_ORG_ID`       | Vercel organizasyon kimliği  |
| `VERCEL_PROJECT_ID`   | Vercel proje kimliği         |

> **Not:** `SUPABASE_URL` ve `SUPABASE_ANON_KEY` değerleri, build aşamasında `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` olarak aktarılır. Secret isimlerini değiştirmek isterseniz, GitHub Actions dosyasındaki `env:` bölümünü güncellemeniz gerekir.

## 3. Deployment İş Akışı

Bu projede `.github/workflows/deploy.yml` dosyası Vercel deploy işlemi için yapılandırılmıştır. `main` dalına yapılan her push:

1. Node 20 ortamını hazırlar ve bağımlılıkları yükler.
2. Uygulamayı üretim için derler (`npm run build`).
3. Elde edilen build'i Vercel'e gönderir (`amondnet/vercel-action@v41`).

Herhangi bir hata durumunda Action loglarından detayları görebilirsiniz.

## 4. Alan Adı Ekleme

1. Vercel projenizin "Domains" sekmesine gidin ve `emreeker.com` (veya kullanmak istediğiniz alan adını) ekleyin.
2. Alan adınızın DNS kayıtlarına Vercel'in önerdiği A veya CNAME kayıtlarını girerek yönlendirmeyi tamamlayın.

## 5. PWA Kontrolü

Deployment tamamlandıktan sonra, tarayıcınızda uygulamayı açın ve geliştirici araçlarındaki **Application → Service Workers** bölümünden PWA özelliklerinin (cache, offline, bildirim) düzgün çalıştığını doğrulayın.

Daha fazla bilgi ve örnekler için [Vercel Docs](https://vercel.com/docs) ve [amondnet/vercel-action](https://github.com/amondnet/vercel-action) sayfalarına bakabilirsiniz.
