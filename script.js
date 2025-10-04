// Translations
const translations = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.process': 'Process',
        'nav.about': 'About',
        'nav.contact': 'Get Started',

        // Hero Section
        'hero.badge': 'MOBILE APP EXPERTS',
        'hero.title.1': 'Building Apps That',
        'hero.title.2': 'Define The Future',
        'hero.description': 'We transform your vision into powerful mobile experiences. Building premium iOS and Android applications that users love and businesses trust.',
        'hero.btn.start': 'Start Your Project',
        'hero.btn.work': 'Our Work',
        'hero.stat.1.number': '50+',
        'hero.stat.1.label': 'Apps Delivered',
        'hero.stat.2.number': '2M+',
        'hero.stat.2.label': 'Active Users',
        'hero.stat.3.number': '98%',
        'hero.stat.3.label': 'Client Satisfaction',

        // Services Section
        'services.badge': 'WHAT WE DO',
        'services.title': 'Mobile Excellence, Guaranteed',
        'services.description': 'End-to-end mobile app development services tailored to your business needs',
        'services.ios.title': 'iOS Development',
        'services.ios.description': 'Native iOS applications built with Swift and SwiftUI for optimal performance and user experience',
        'services.ios.feature.1': 'Swift & SwiftUI',
        'services.ios.feature.2': 'App Store Optimization',
        'services.ios.feature.3': 'iOS Design Guidelines',
        'services.android.title': 'Android Development',
        'services.android.description': 'High-performance Android apps using Kotlin and modern architecture patterns',
        'services.android.feature.1': 'Kotlin & Jetpack Compose',
        'services.android.feature.2': 'Material Design 3',
        'services.android.feature.3': 'Play Store Publishing',
        'services.cross.title': 'Cross-Platform Apps',
        'services.cross.description': 'Fast time-to-market solutions with React Native and Flutter for a single codebase',
        'services.cross.feature.1': 'React Native & Flutter',
        'services.cross.feature.2': 'Code Reusability',
        'services.cross.feature.3': 'Cost-Effective Solutions',
        'services.ui.title': 'UI/UX Design',
        'services.ui.description': 'Beautiful, intuitive interfaces that delight users and drive engagement',
        'services.ui.feature.1': 'User Research',
        'services.ui.feature.2': 'Wireframing & Prototyping',
        'services.ui.feature.3': 'Design Systems',
        'services.backend.title': 'Backend Development',
        'services.backend.description': 'Scalable, secure backend systems and APIs to power your mobile applications',
        'services.backend.feature.1': 'RESTful & GraphQL APIs',
        'services.backend.feature.2': 'Cloud Infrastructure',
        'services.backend.feature.3': 'Database Design',
        'services.support.title': 'Maintenance & Support',
        'services.support.description': 'Ongoing support to keep your app up-to-date, secure, and performing at its best',
        'services.support.feature.1': 'Regular Updates',
        'services.support.feature.2': 'Performance Monitoring',
        'services.support.feature.3': '24/7 Support',

        // Portfolio Section
        'portfolio.badge': 'OUR WORK',
        'portfolio.title': 'Recent Projects',
        'portfolio.description': 'Discover the innovative mobile solutions we\'ve built for our clients',
        'portfolio.uza.title': 'Uza',
        'portfolio.uza.description': 'Innovative mobile app redefining user experience with cutting-edge features',
        'portfolio.uza.tag.1': 'iOS',
        'portfolio.uza.tag.2': 'Android',
        'portfolio.uza.tag.3': 'Coming Soon',
        'portfolio.studix.title': 'StudiX',
        'portfolio.studix.description': 'Revolutionary educational platform designed to transform learning experience',
        'portfolio.studix.tag.1': 'Education',
        'portfolio.studix.tag.2': 'AI-Powered',
        'portfolio.studix.tag.3': 'Coming Soon',
        'portfolio.bilgecan.title': 'Bilgecan',
        'portfolio.bilgecan.description': 'Smart assistant app bringing intelligence and efficiency to daily tasks',
        'portfolio.bilgecan.tag.1': 'AI Assistant',
        'portfolio.bilgecan.tag.2': 'Productivity',
        'portfolio.bilgecan.tag.3': 'Coming Soon',

        // Process Section
        'process.badge': 'HOW WE WORK',
        'process.title': 'Our Development Process',
        'process.description': 'Our proven methodology that ensures successful app delivery',
        'process.step.1.title': 'Discovery & Strategy',
        'process.step.1.description': 'We analyze your business goals, target audience, and market to create a winning strategy',
        'process.step.2.title': 'Design & Prototype',
        'process.step.2.description': 'Creating intuitive user experiences and beautiful interfaces that align with your brand',
        'process.step.3.title': 'Development',
        'process.step.3.description': 'Building your app with clean, scalable code using the latest technologies and best practices',
        'process.step.4.title': 'Testing & QA',
        'process.step.4.description': 'Rigorous testing across all devices to ensure flawless performance and user experience',
        'process.step.5.title': 'Launch & Support',
        'process.step.5.description': 'Smooth deployment to app stores and ongoing support for continued success',

        // About Section
        'about.badge': 'ABOUT US',
        'about.title': 'We Build Digital Excellence',
        'about.description.1': 'At UltasDev, we\'re passionate about building mobile apps that make a difference. With years of experience and a team of talented developers, designers, and strategists, we turn ideas into powerful digital products.',
        'about.description.2': 'We believe in the power of technology to solve real-world problems and enhance human experiences. Every app we build is crafted with precision, creativity, and a deep understanding of user needs.',
        'about.feature.1': 'Agile Development Methodology',
        'about.feature.2': 'Transparent Communication',
        'about.feature.3': 'Post-Launch Support',
        'about.feature.4': 'Security-First Approach',
        'about.stat.1.value': '5+',
        'about.stat.1.label': 'Years Experience',
        'about.stat.2.value': '100%',
        'about.stat.2.label': 'Project Success Rate',
        'about.stat.3.value': '24/7',
        'about.stat.3.label': 'Support Service',
        'about.stat.4.value': '15+',
        'about.stat.4.label': 'Expert Developers',

        // Contact Section
        'contact.badge': 'CONTACT',
        'contact.title': 'Ready to Build Your App?',
        'contact.description': 'Let\'s discuss how we can help bring your vision to life. Our team is ready to create something amazing together.',
        'contact.email': 'ultasdevelopment@gmail.com',
        'contact.location': 'Global - Remote Work',
        'contact.btn.start': 'Start a Project',
        'contact.btn.portfolio': 'View Our Work',

        // Footer
        'footer.tagline': 'Building the future, one app at a time.',
        'footer.company.title': 'Company',
        'footer.company.about': 'About',
        'footer.company.projects': 'Projects',
        'footer.company.process': 'Process',
        'footer.company.contact': 'Contact',
        'footer.services.title': 'Services',
        'footer.services.ios': 'iOS Development',
        'footer.services.android': 'Android Development',
        'footer.services.ui': 'UI/UX Design',
        'footer.services.consulting': 'Consulting',
        'footer.legal.title': 'Legal',
        'footer.legal.privacy': 'Privacy Policy',
        'footer.legal.terms': 'Terms of Service',
        'footer.copyright': '© 2025 UltasDev. All rights reserved.'
    },
    tr: {
        // Navigation
        'nav.home': 'Ana Sayfa',
        'nav.services': 'Hizmetler',
        'nav.portfolio': 'Projeler',
        'nav.process': 'Süreç',
        'nav.about': 'Hakkımızda',
        'nav.contact': 'Başlayalım',

        // Hero Section
        'hero.badge': 'MOBİL UYGULAMA UZMANLARI',
        'hero.title.1': 'Geleceği Tanımlayan',
        'hero.title.2': 'Uygulamalar Geliştiriyoruz',
        'hero.description': 'Vizyonunuzu güçlü mobil deneyimlere dönüştürüyoruz. Kullanıcıların sevdiği ve işletmelerin güvendiği premium iOS ve Android uygulamaları geliştiriyoruz.',
        'hero.btn.start': 'Projenizi Başlatın',
        'hero.btn.work': 'Çalışmalarımız',
        'hero.stat.1.number': '50+',
        'hero.stat.1.label': 'Teslim Edilen Uygulama',
        'hero.stat.2.number': '2M+',
        'hero.stat.2.label': 'Aktif Kullanıcı',
        'hero.stat.3.number': '98%',
        'hero.stat.3.label': 'Müşteri Memnuniyeti',

        // Services Section
        'services.badge': 'NELER YAPIYORUZ',
        'services.title': 'Mobil Mükemmellik, Garantili',
        'services.description': 'İşletmenizin ihtiyaçlarına özel uçtan uca mobil uygulama geliştirme hizmetleri',
        'services.ios.title': 'iOS Geliştirme',
        'services.ios.description': 'Optimal performans ve kullanıcı deneyimi için Swift ve SwiftUI ile geliştirilen native iOS uygulamaları',
        'services.ios.feature.1': 'Swift & SwiftUI',
        'services.ios.feature.2': 'App Store Optimizasyonu',
        'services.ios.feature.3': 'iOS Tasarım Standartları',
        'services.android.title': 'Android Geliştirme',
        'services.android.description': 'Kotlin ve modern mimari desenler kullanarak yüksek performanslı Android uygulamaları',
        'services.android.feature.1': 'Kotlin & Jetpack Compose',
        'services.android.feature.2': 'Material Design 3',
        'services.android.feature.3': 'Play Store Yayınlama',
        'services.cross.title': 'Cross-Platform Uygulamalar',
        'services.cross.description': 'React Native ve Flutter ile tek kod tabanından hızlı pazara sunulan çözümler',
        'services.cross.feature.1': 'React Native & Flutter',
        'services.cross.feature.2': 'Kod Yeniden Kullanımı',
        'services.cross.feature.3': 'Maliyet Etkin Çözümler',
        'services.ui.title': 'UI/UX Tasarım',
        'services.ui.description': 'Kullanıcıları memnun eden ve etkileşimi artıran güzel, sezgisel arayüzler',
        'services.ui.feature.1': 'Kullanıcı Araştırması',
        'services.ui.feature.2': 'Wireframe & Prototipleme',
        'services.ui.feature.3': 'Tasarım Sistemleri',
        'services.backend.title': 'Backend Geliştirme',
        'services.backend.description': 'Mobil uygulamalarınızı destekleyecek ölçeklenebilir, güvenli backend sistemleri ve API\'ler',
        'services.backend.feature.1': 'RESTful & GraphQL API\'ler',
        'services.backend.feature.2': 'Bulut Altyapısı',
        'services.backend.feature.3': 'Veritabanı Tasarımı',
        'services.support.title': 'Bakım & Destek',
        'services.support.description': 'Uygulamanızın güncel, güvenli ve en iyi performansta kalması için sürekli destek',
        'services.support.feature.1': 'Düzenli Güncellemeler',
        'services.support.feature.2': 'Performans İzleme',
        'services.support.feature.3': '7/24 Destek',

        // Portfolio Section
        'portfolio.badge': 'PROJELERİMİZ',
        'portfolio.title': 'Son Projelerimiz',
        'portfolio.description': 'Müşterilerimiz için geliştirdiğimiz yenilikçi mobil çözümleri keşfedin',
        'portfolio.uza.title': 'Uza',
        'portfolio.uza.description': 'Son teknoloji özelliklerle kullanıcı deneyimini yeniden tanımlayan yenilikçi mobil uygulama',
        'portfolio.uza.tag.1': 'iOS',
        'portfolio.uza.tag.2': 'Android',
        'portfolio.uza.tag.3': 'Yakında',
        'portfolio.studix.title': 'StudiX',
        'portfolio.studix.description': 'Öğrenme deneyimini dönüştürmek için tasarlanan devrim niteliğindeki eğitim platformu',
        'portfolio.studix.tag.1': 'Eğitim',
        'portfolio.studix.tag.2': 'Yapay Zeka Destekli',
        'portfolio.studix.tag.3': 'Yakında',
        'portfolio.bilgecan.title': 'Bilgecan',
        'portfolio.bilgecan.description': 'Günlük işlere zeka ve verimlilik getiren akıllı asistan uygulaması',
        'portfolio.bilgecan.tag.1': 'Yapay Zeka Asistanı',
        'portfolio.bilgecan.tag.2': 'Verimlilik',
        'portfolio.bilgecan.tag.3': 'Yakında',

        // Process Section
        'process.badge': 'NASIL ÇALIŞIYORUZ',
        'process.title': 'Geliştirme Sürecimiz',
        'process.description': 'Başarılı uygulama teslimatını garanti eden kanıtlanmış metodolojimiz',
        'process.step.1.title': 'Keşif & Strateji',
        'process.step.1.description': 'İş hedeflerinizi, hedef kitlenizi ve pazarınızı derinlemesine analiz ederek kazanan bir strateji oluşturuyoruz',
        'process.step.2.title': 'Tasarım & Prototip',
        'process.step.2.description': 'Markanızla uyumlu, sezgisel kullanıcı deneyimleri ve güzel arayüzler oluşturuyoruz',
        'process.step.3.title': 'Geliştirme',
        'process.step.3.description': 'En son teknolojileri ve en iyi uygulamaları kullanarak temiz, ölçeklenebilir kod ile uygulamanızı inşa ediyoruz',
        'process.step.4.title': 'Test & Kalite Kontrol',
        'process.step.4.description': 'Kusursuz performans ve kullanıcı deneyimi için tüm cihazlarda kapsamlı testler gerçekleştiriyoruz',
        'process.step.5.title': 'Yayınlama & Destek',
        'process.step.5.description': 'Uygulama mağazalarına sorunsuz yayınlama ve sürekli başarı için devam eden destek',

        // About Section
        'about.badge': 'HAKKIMIZDA',
        'about.title': 'Dijital Mükemmelliyeti İnşa Ediyoruz',
        'about.description.1': 'UltasDev olarak, fark yaratan mobil uygulamalar geliştirme konusunda tutkuluyuz. Yılların deneyimi ve yetenekli geliştiriciler, tasarımcılar ve stratejistlerden oluşan ekibimizle fikirleri güçlü dijital ürünlere dönüştürüyoruz.',
        'about.description.2': 'Teknolojinin gerçek dünya sorunlarını çözme ve insan deneyimlerini geliştirme gücüne inanıyoruz. İnşa ettiğimiz her uygulama, hassasiyet, yaratıcılık ve kullanıcı ihtiyaçlarının derin bir anlayışıyla şekilleniyor.',
        'about.feature.1': 'Çevik Geliştirme Metodolojisi',
        'about.feature.2': 'Şeffaf İletişim',
        'about.feature.3': 'Lansman Sonrası Destek',
        'about.feature.4': 'Güvenlik Odaklı Yaklaşım',
        'about.stat.1.value': '5+',
        'about.stat.1.label': 'Yıllık Deneyim',
        'about.stat.2.value': '100%',
        'about.stat.2.label': 'Proje Başarı Oranı',
        'about.stat.3.value': '7/24',
        'about.stat.3.label': 'Destek Hizmeti',
        'about.stat.4.value': '15+',
        'about.stat.4.label': 'Uzman Geliştirici',

        // Contact Section
        'contact.badge': 'İLETİŞİM',
        'contact.title': 'Uygulamanızı Geliştirmeye Hazır Mısınız?',
        'contact.description': 'Vizyonunuzu gerçeğe dönüştürmek için nasıl yardımcı olabileceğimizi konuşalım. Ekibimiz birlikte harika şeyler yaratmaya hazır.',
        'contact.email': 'ultasdevelopment@gmail.com',
        'contact.location': 'Global - Uzaktan Çalışma',
        'contact.btn.start': 'Proje Başlatın',
        'contact.btn.portfolio': 'Projelerimizi İnceleyin',

        // Footer
        'footer.tagline': 'Geleceği inşa ediyoruz, birer uygulama ile.',
        'footer.company.title': 'Şirket',
        'footer.company.about': 'Hakkımızda',
        'footer.company.projects': 'Projeler',
        'footer.company.process': 'Süreç',
        'footer.company.contact': 'İletişim',
        'footer.services.title': 'Hizmetler',
        'footer.services.ios': 'iOS Geliştirme',
        'footer.services.android': 'Android Geliştirme',
        'footer.services.ui': 'UI/UX Tasarım',
        'footer.services.consulting': 'Danışmanlık',
        'footer.legal.title': 'Yasal',
        'footer.legal.privacy': 'Gizlilik Politikası',
        'footer.legal.terms': 'Kullanım Koşulları',
        'footer.copyright': '© 2025 UltasDev. Tüm hakları saklıdır.'
    }
};

// Language switching functionality
let currentLang = localStorage.getItem('language') || 'tr'; // Default to Turkish

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);

    // Update language toggle button text
    const langToggle = document.getElementById('languageToggle');
    if (langToggle) {
        langToggle.querySelector('.lang-text').textContent = lang === 'en' ? 'TR' : 'EN';
    }

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Check if element has a special attribute to update
            const updateAttr = element.getAttribute('data-i18n-attr');
            if (updateAttr) {
                element.setAttribute(updateAttr, translations[lang][key]);
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language
    setLanguage(currentLang);

    // Language toggle functionality
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            const newLang = currentLang === 'en' ? 'tr' : 'en';
            setLanguage(newLang);
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');

            // Animate hamburger lines
            const lines = this.querySelectorAll('.hamburger-line');
            if (this.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                const lines = mobileToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    });

    // Smooth scroll behavior for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    // Only apply active highlighting on the main page
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '') {
        window.addEventListener('scroll', highlightActiveSection);
        highlightActiveSection();
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    let scrollTimer = null;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add shadow on scroll
        if (scrollTop > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        lastScrollTop = scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-30px)';
        step.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(step);
    });

    // Animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Counter animation for stats
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        };

        updateCounter();
    };

    // Observe stat numbers for counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                entry.target.dataset.suffix = suffix;
                animateCounter(entry.target, number);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    // Removed parallax effect to prevent overlap issues

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const originalText = heroTitle.innerHTML;
        heroTitle.style.opacity = '1'; // Ensure it's visible
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate positions after resize
            highlightActiveSection();
        }, 250);
    });

    // Smooth reveal for footer
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.opacity = '0';
        footer.style.transform = 'translateY(30px)';
        footer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        footerObserver.observe(footer);
    }

    // Add hover effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const x = e.pageX - this.offsetLeft;
            const y = e.pageY - this.offsetTop;

            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple');
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});