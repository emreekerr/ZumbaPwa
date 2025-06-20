# Zumba PWA - Vercel Deployment

Bu dosya, projenin Vercel'e nasıl deploy edileceğini açıklar.

## Vercel'e Deployment Adımları

1. [Vercel](https://vercel.com/) hesabınıza giriş yapın
2. "New Project" butonuna tıklayın
3. GitHub, GitLab veya Bitbucket hesabınızı bağlayın veya bu projeyi yükleyin
4. Proje ayarlarında aşağıdaki ortam değişkenlerini ekleyin:
   - `REACT_APP_SUPABASE_URL`: Supabase proje URL'niz
   - `REACT_APP_SUPABASE_ANON_KEY`: Supabase anonim API anahtarınız
5. "Deploy" butonuna tıklayın

## Önemli Notlar

- Bu proje, Vercel'in sıfır yapılandırma ile React uygulamalarını desteklemesi sayesinde doğrudan deploy edilebilir
- Supabase kurulumu için `SUPABASE_SETUP.md` dosyasındaki talimatları izleyin
- Deployment sonrası, PWA özelliklerinin düzgün çalıştığından emin olmak için tarayıcınızın geliştirici araçlarını kullanarak kontrol edin

## PWA Özellikleri

Bu uygulama aşağıdaki PWA özelliklerini içerir:

- Çevrimdışı çalışma
- Ana ekrana eklenebilme
- Web Push bildirimleri
- Duyarlı tasarım (Responsive design)

## Bildirim Sistemi

Web Push bildirimleri için:

1. Kullanıcılar uygulamaya giriş yaptıklarında bildirim izni istenir
2. Admin panelinden toplu bildirimler gönderilebilir
3. Gerçek bir uygulamada, bildirim gönderme işlemi için bir backend servisi gereklidir
