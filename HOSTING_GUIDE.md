# 🚀 Ultastech.com Web Sitesi Yayınlama Rehberi

## Hızlı Başlangıç (GitHub Pages - Önerilen)

### 1. GitHub Hesabı Oluştur
- [github.com](https://github.com) adresine git
- Sign up ile ücretsiz hesap oluştur

### 2. Yeni Repository Oluştur
- Sağ üstte **+** > **New repository**
- Repository name: `ultastech.com` (veya `yourusername.github.io`)
- Public seç
- Create repository

### 3. Dosyaları Yükle - Yöntem A (GitHub Web Arayüzü)
- Repository'de **uploading an existing file** linkine tıkla
- ultastech.com klasöründeki TÜM dosyaları seç ve sürükle:
  - index.html
  - style.css
  - script.js
  - privacy-policy.html
  - terms-of-service.html
- Commit changes

### 3. Dosyaları Yükle - Yöntem B (Terminal)
```bash
cd ~/Desktop/ultastech.com

# Git başlat
git init

# Tüm dosyaları ekle
git add .

# Commit yap
git commit -m "Initial website upload"

# GitHub'a bağla (USERNAME'i değiştir)
git remote add origin https://github.com/USERNAME/ultastech.com.git

# Yükle
git push -u origin main
```

### 4. GitHub Pages'i Aktifleştir
1. Repository'de **Settings** sekmesine git
2. Sol menüden **Pages** bul
3. **Source** altında:
   - Deploy from a branch seç
   - Branch: main
   - Folder: / (root)
   - Save

### 5. Siteniz Hazır! 🎉
- 2-5 dakika bekle
- Siteniz şu adreste yayında:
  - `https://USERNAME.github.io/ultastech.com`

## Custom Domain Bağlama (Opsiyonel)

### 1. Domain Satın Al
**Önerilen Firmalar:**
- **Namecheap.com** - $10/yıl
- **Natro.com** - ₺150/yıl
- **Turhost.com** - ₺180/yıl

### 2. GitHub'a Custom Domain Ekle
Repository Settings > Pages > Custom domain:
- `ultastech.com` yaz
- Save

### 3. DNS Ayarları (Domain Panelinde)
```
A Kayıtları:
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

CNAME Kaydı:
www -> USERNAME.github.io
```

### 4. CNAME Dosyası Oluştur
ultastech.com klasöründe `CNAME` dosyası oluştur (uzantısız):
```
ultastech.com
```

## Alternatif: Netlify ile Hosting (Daha da Kolay!)

### 1. Netlify.com'a Git
- Sign up (GitHub ile giriş yap)

### 2. Drag & Drop
- [app.netlify.com/drop](https://app.netlify.com/drop) adresine git
- ultastech.com klasörünü sürükle bırak
- Otomatik URL alırsın

### 3. Custom Domain (Opsiyonel)
- Site settings > Domain management
- Add custom domain

## Güncelleme Yapmak

### GitHub Pages için:
```bash
cd ~/Desktop/ultastech.com
git add .
git commit -m "Update website"
git push
```

### Netlify için:
- Yeni klasörü tekrar sürükle bırak

## SSL Sertifikası
- GitHub Pages: Otomatik (Let's Encrypt)
- Netlify: Otomatik
- Custom domain: 24-48 saat sürebilir

## Sorun Giderme

**Site görünmüyor:**
- 5-10 dakika bekle
- GitHub Pages status: github.com/USERNAME/ultastech.com/settings/pages
- Doğru branch seçili mi kontrol et

**404 Hatası:**
- index.html dosyası root klasörde mi?
- Repository public mi?

**SSL Hatası:**
- Custom domain için 48 saat bekle
- Settings > Pages > Enforce HTTPS kutucuğu işaretli mi?

## İletişim & Destek
- GitHub Pages Docs: https://pages.github.com
- Netlify Docs: https://docs.netlify.com
- Sorun olursa: GitHub Issues veya Stack Overflow

---
✨ **İpucu:** İlk deneme için GitHub Pages + GitHub'ın verdiği subdomain ile başla. Çalıştıktan sonra custom domain ekle.