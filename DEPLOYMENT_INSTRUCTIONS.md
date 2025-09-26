# 🚀 Ultastech.com Deployment Talimatları

## 📋 Yapılacaklar Listesi

### ✅ Tamamlananlar:
- [x] Gizlilik Politikası oluşturuldu (privacy-policy.html)
- [x] Kullanım Koşulları oluşturuldu (terms-of-service.html)
- [x] Ana sayfa politika linkleri eklendi
- [x] CNAME dosyası oluşturuldu
- [x] Tüm dosyalar hazır

### 📝 Yarın Yapılacaklar:

## 1️⃣ GitHub Hesabı ve Repository

### GitHub Hesabı:
```
1. github.com adresine git
2. Sign up (yoksa) veya Sign in
3. E-mail doğrulaması yap
```

### Repository Oluştur:
```
Repository adı: ultastech.github.io (veya sadece ultastech)
Visibility: Public (ÖNEMLİ!)
Initialize: Hiçbir şey seçme (boş repo)
Create repository
```

## 2️⃣ Dosyaları GitHub'a Yükleme

### Yöntem A: Web Arayüzünden (Kolay)
```
1. Repository'de "uploading an existing file" linkine tıkla
2. ultastech.com klasöründeki TÜM dosyaları seç:
   - index.html
   - style.css
   - script.js
   - privacy-policy.html
   - terms-of-service.html
   - CNAME
3. Commit message: "Initial website deployment"
4. Commit changes
```

### Yöntem B: Terminal'den (Profesyonel)
```bash
# Terminal'i aç
cd ~/Desktop/ultastech.com

# Git başlat
git init

# Tüm dosyaları ekle
git add .

# Commit yap
git commit -m "Initial website deployment"

# GitHub'a bağla (USERNAME'i değiştirmeyi unutma!)
git branch -M main
git remote add origin https://github.com/USERNAME/ultastech.git

# Yükle
git push -u origin main
```

## 3️⃣ GitHub Pages'i Aktifleştirme

```
1. Repository'de Settings sekmesine git
2. Sol menüden "Pages" bul
3. Source:
   - Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Save
4. 2-5 dakika bekle
5. Sitenin URL'i görünecek: https://username.github.io/ultastech
```

## 4️⃣ Custom Domain Satın Alma

### Önerilen Firmalar ve Fiyatlar:

#### Türkiye'den:
- **Natro.com**: ~150₺/yıl (.com)
- **Turhost.com**: ~180₺/yıl (.com)
- **Niobe.com.tr**: ~160₺/yıl (.com)

#### Yurtdışından:
- **Namecheap.com**: $8-12/yıl (.com)
- **Google Domains**: $12/yıl (.com)
- **GoDaddy**: $10-15/yıl (.com)

### Domain Alırken Dikkat:
```
✅ Whois Protection (gizlilik koruması) ücretsizse al
✅ Auto-renew (otomatik yenileme) kapat (istemiyorsan)
✅ İlk yıl indirimli olabilir, 2. yıl fiyatına bak
❌ Ekstra hosting, SSL, e-mail almana gerek yok
```

## 5️⃣ Domain DNS Ayarları

### Domain Panelinde DNS Ayarları:

#### A Kayıtları (4 tane ekle):
```
Type: A    Name: @    Value: 185.199.108.153
Type: A    Name: @    Value: 185.199.109.153
Type: A    Name: @    Value: 185.199.110.153
Type: A    Name: @    Value: 185.199.111.153
```

#### CNAME Kaydı:
```
Type: CNAME    Name: www    Value: username.github.io
```

### GitHub'da Custom Domain:
```
1. Settings → Pages
2. Custom domain: ultastech.com
3. Save
4. ✅ Enforce HTTPS (24 saat sonra işaretle)
```

## 6️⃣ SSL Sertifikası

```
✅ Otomatik: GitHub Let's Encrypt sağlar
⏱️ Süre: 24-48 saat içinde aktif olur
🔒 Settings → Pages → Enforce HTTPS kutucuğunu işaretle
```

## 7️⃣ Site Güncellemeleri

### Dosya değişikliği yaptıktan sonra:
```bash
cd ~/Desktop/ultastech.com
git add .
git commit -m "Update: açıklama yaz"
git push
```

## 📱 App Store & Play Store Linkleri

### Uza uygulaması yayınlandığında eklenecek:
```html
<!-- index.html'de Uza project card'ına ekle -->
<div class="app-links" style="margin-top: 15px;">
    <a href="APP_STORE_LINK" class="app-badge">
        <img src="app-store-badge.png" alt="App Store'dan İndir">
    </a>
    <a href="PLAY_STORE_LINK" class="app-badge">
        <img src="google-play-badge.png" alt="Google Play'den İndir">
    </a>
</div>
```

## 🔍 Kontrol Listesi

### Yayın Öncesi:
- [ ] CNAME dosyası var mı?
- [ ] Tüm linkler çalışıyor mu?
- [ ] Politika sayfaları açılıyor mu?
- [ ] E-posta adresleri doğru mu?

### Yayın Sonrası:
- [ ] https://username.github.io/ultastech çalışıyor mu?
- [ ] Custom domain çalışıyor mu? (DNS 48 saat sürebilir)
- [ ] SSL sertifikası aktif mi? (yeşil kilit)
- [ ] Mobilde düzgün görünüyor mu?

## 🆘 Sorun Giderme

### Site görünmüyor:
```
- 5-10 dakika bekle
- Repository public mi kontrol et
- GitHub Pages aktif mi kontrol et
- index.html root klasörde mi kontrol et
```

### 404 Hatası:
```
- Branch doğru mu? (main olmalı)
- Folder doğru mu? (/ root olmalı)
- CNAME dosyası yüklendi mi?
```

### SSL çalışmıyor:
```
- 24-48 saat bekle
- DNS ayarları doğru mu kontrol et
- Enforce HTTPS işaretli mi?
```

## 📞 Destek

### GitHub Pages Sorunları:
- https://www.githubstatus.com (sistem durumu)
- https://docs.github.com/en/pages

### DNS Sorunları:
- https://www.whatsmydns.net (DNS kontrolü)
- Domain firmasının desteği

## 💡 İpuçları

1. **İlk önce** GitHub subdomain ile test et
2. **Sonra** custom domain bağla
3. **E-posta için** Zoho Mail veya Forward Email kullan (ücretsiz)
4. **Analytics için** Google Analytics ekle (ücretsiz)
5. **Form için** Formspree veya Netlify Forms kullan

## 🎯 Bugünün Özeti

### Tamamlanan İşler:
✅ Uza uygulaması için Gizlilik Politikası hazırlandı
✅ Uza uygulaması için Kullanım Koşulları hazırlandı
✅ ultastech.com web sitesine politikalar eklendi
✅ CNAME dosyası oluşturuldu
✅ Deployment talimatları hazırlandı

### Yarın Yapılacaklar:
1. GitHub hesabı aç/gir
2. Repository oluştur
3. Dosyaları yükle
4. GitHub Pages'i aktifleştir
5. Domain satın al (opsiyonel)
6. DNS ayarlarını yap
7. Test et ve yayınla! 🚀

---

**Not:** Bu dosya yarın adım adım takip edilecek. Her adımı tamamladıktan sonra ✅ işaretle.

**Başarılar!** 🎉