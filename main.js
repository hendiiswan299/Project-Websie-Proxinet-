// ============================================
// PROXINET - Main JavaScript
// ============================================

// Navigation & Page Routing
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('[data-page]');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
  // Close mobile menu
  document.getElementById('navMenu').classList.remove('open');
  // Close search
  closeSearch();
}

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Navbar scroll effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// ============================================
// SEARCH SYSTEM
// ============================================

const searchData = [
  { title: 'Paket Basic 10 Mbps', desc: 'Rp 150.000/bulan - Internet rumahan 10 Mbps unlimited', page: 'pricing', icon: 'fas fa-wifi', tag: 'Paket' },
  { title: 'Paket Silver 20 Mbps', desc: 'Rp 250.000/bulan - Internet rumahan 20 Mbps unlimited', page: 'pricing', icon: 'fas fa-wifi', tag: 'Paket' },
  { title: 'Paket Gold 50 Mbps', desc: 'Rp 399.000/bulan - Paket paling populer dengan IP statis', page: 'pricing', icon: 'fas fa-star', tag: 'Paket' },
  { title: 'Paket Platinum 100 Mbps', desc: 'Rp 599.000/bulan - Internet premium untuk keluarga', page: 'pricing', icon: 'fas fa-crown', tag: 'Paket' },
  { title: 'Paket Bisnis Warnet 30 Mbps', desc: 'Rp 499.000/bulan - Cocok untuk 10-30 user', page: 'pricing', icon: 'fas fa-store', tag: 'Bisnis' },
  { title: 'Paket Bisnis Kantor 100 Mbps', desc: 'Rp 899.000/bulan - Dedicated untuk 30-100 user', page: 'pricing', icon: 'fas fa-building', tag: 'Bisnis' },
  { title: 'Paket Enterprise Custom', desc: 'Bandwidth custom untuk hotel, sekolah, instansi', page: 'pricing', icon: 'fas fa-server', tag: 'Enterprise' },
  { title: 'Hubungi Kami', desc: 'Kirim pesan atau chat WhatsApp dengan tim kami', page: 'contact', icon: 'fas fa-envelope', tag: 'Kontak' },
  { title: 'Lokasi Kantor Sukabumi', desc: 'Jl. Contoh No. 123, Kota Sukabumi, Jawa Barat', page: 'location', icon: 'fas fa-map-marker-alt', tag: 'Lokasi' },
  { title: 'Profil Perusahaan', desc: 'Sejarah, visi & misi PROXINET Jaringan Nusantara', page: 'about', icon: 'fas fa-building', tag: 'Tentang' },
  { title: 'Area Cakupan', desc: 'Daftar wilayah yang dilayani di Sukabumi', page: 'about', icon: 'fas fa-map', tag: 'Tentang' },
  { title: 'Fiber Optik FTTH', desc: 'Teknologi internet fiber optik langsung ke rumah', page: 'home', icon: 'fas fa-network-wired', tag: 'Layanan' },
  { title: 'Support 24/7', desc: 'Tim teknisi siap membantu kapan saja via WhatsApp', page: 'contact', icon: 'fas fa-headset', tag: 'Layanan' },
  { title: 'Cara Daftar', desc: 'Proses pendaftaran mudah, instalasi gratis di hari yang sama', page: 'contact', icon: 'fas fa-user-plus', tag: 'Info' },
  { title: 'Harga Internet', desc: 'Lihat semua paket dan harga terjangkau PROXINET', page: 'pricing', icon: 'fas fa-tags', tag: 'Harga' },
  { title: 'WhatsApp Admin', desc: '0812-3456-7890 - Chat langsung dengan admin', page: 'contact', icon: 'fab fa-whatsapp', tag: 'Kontak' },
  { title: 'Masuk / Login', desc: 'Login ke portal pelanggan PROXINET', page: 'login', icon: 'fas fa-lock', tag: 'Akun' },
];

function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  overlay.classList.remove('open');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function doSearch(query) {
  const input = document.getElementById('searchInput');
  input.value = query;
  renderResults(query);
}

function renderResults(query) {
  const container = document.getElementById('searchResults');
  const q = query.toLowerCase().trim();

  if (!q) { container.innerHTML = ''; return; }

  const results = searchData.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.desc.toLowerCase().includes(q) ||
    item.tag.toLowerCase().includes(q)
  );

  if (!results.length) {
    container.innerHTML = `<div class="search-empty"><i class="fas fa-search-minus"></i>Tidak ada hasil untuk "<strong>${query}</strong>".<br/><small>Coba kata kunci lain atau hubungi kami via WhatsApp.</small></div>`;
    return;
  }

  container.innerHTML = results.map(r => `
    <div class="search-result-item" onclick="showPage('${r.page}');closeSearch()">
      <div class="search-result-icon"><i class="${r.icon}"></i></div>
      <div class="search-result-content">
        <div class="search-result-title">${r.title}</div>
        <div class="search-result-desc">${r.desc}</div>
      </div>
      <span class="search-result-tag">${r.tag}</span>
    </div>
  `).join('');
}

function initSearch() {
  const btn = document.getElementById('searchToggle');
  const closeBtn = document.getElementById('searchClose');
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');

  btn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  input.addEventListener('input', (e) => renderResults(e.target.value));
}

window.doSearch = doSearch;
window.closeSearch = closeSearch;

// ============================================
// AUTHENTICATION SYSTEM
// ============================================

let currentUser = null;

function updateNavUI(user) {
  const loginBtn = document.getElementById('navLoginBtn');
  const userProfile = document.getElementById('navUserProfile');
  const navUserAvatar = document.getElementById('navUserAvatar');
  const navUserName = document.getElementById('navUserName');
  const dropAvatar = document.getElementById('dropAvatar');
  const dropName = document.getElementById('dropName');
  const dropEmail = document.getElementById('dropEmail');

  if (user) {
    loginBtn.style.display = 'none';
    userProfile.style.display = 'flex';
    navUserAvatar.src = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a6fb5&color=fff&size=64`;
    navUserName.textContent = user.name.split(' ')[0];
    dropAvatar.src = navUserAvatar.src;
    dropName.textContent = user.name;
    dropEmail.textContent = user.email;
  } else {
    loginBtn.style.display = 'flex';
    userProfile.style.display = 'none';
  }
}

function showToast(type, title, desc) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon"><i class="${icons[type] || icons.info}"></i></span>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      ${desc ? `<div class="toast-desc">${desc}</div>` : ''}
    </div>
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Google Sign-In (simulated — replace with real Google OAuth in production)
function handleGoogleSignIn() {
  const btn = document.getElementById('googleSignInBtn');
  btn.innerHTML = `<span style="display:flex;align-items:center;gap:8px"><i class="fas fa-spinner fa-spin"></i> Menghubungkan...</span>`;
  btn.disabled = true;

  // Simulate OAuth flow delay
  setTimeout(() => {
    // In production: use Google Identity Services
    // https://developers.google.com/identity/gsi/web
    const mockUser = {
      name: 'Pengguna Google',
      email: 'pengguna@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=Pengguna+Google&background=4285f4&color=fff&size=64'
    };
    loginSuccess(mockUser);

    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg><span>Masuk dengan Google</span>`;
    btn.disabled = false;
  }, 1800);
}

function handleEmailLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const btn = e.target.querySelector('.btn-login-submit');
  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Memverifikasi...`;
  btn.disabled = true;

  setTimeout(() => {
    const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    loginSuccess({ name, email, avatar: '' });
    btn.innerHTML = `<i class="fas fa-sign-in-alt"></i> Masuk`;
    btn.disabled = false;
  }, 1500);
}

function loginSuccess(user) {
  currentUser = user;
  updateNavUI(user);
  showPage('home');
  setTimeout(() => showToast('success', `Selamat datang, ${user.name.split(' ')[0]}!`, 'Anda berhasil masuk ke portal PROXINET.'), 300);
}

function handleRegister(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.btn-login-submit');
  btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Membuat akun...`;
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = `<i class="fas fa-user-plus"></i> Buat Akun`;
    btn.disabled = false;
    showToast('success', 'Akun berhasil dibuat!', 'Silakan masuk dengan email dan kata sandi Anda.');
    hideRegisterPanel();
  }, 1600);
}

function togglePassword() {
  const input = document.getElementById('loginPassword');
  const icon = document.getElementById('pwdEyeIcon');
  if (input.type === 'password') {
    input.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    input.type = 'password';
    icon.className = 'fas fa-eye';
  }
}

function showRegisterPanel() {
  document.getElementById('registerPanel').style.display = 'block';
  document.getElementById('loginEmailForm').style.display = 'none';
}

function hideRegisterPanel() {
  document.getElementById('registerPanel').style.display = 'none';
  document.getElementById('loginEmailForm').style.display = 'block';
}

function initLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentUser = null;
      updateNavUI(null);
      showToast('info', 'Anda telah keluar', 'Sampai jumpa lagi di PROXINET!');
    });
  }
}

window.handleGoogleSignIn = handleGoogleSignIn;
window.handleEmailLogin = handleEmailLogin;
window.handleRegister = handleRegister;
window.togglePassword = togglePassword;
window.showRegisterPanel = showRegisterPanel;
window.hideRegisterPanel = hideRegisterPanel;

// ============================================
// Hero Particles
// ============================================
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      --drift: ${(Math.random() - 0.5) * 100}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.6 + 0.2};
    `;
    container.appendChild(p);
  }
}

// ============================================
// Counter Animation
// ============================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = Date.now();
  const update = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => observer.observe(el));
}

// Add reveal CSS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
  .reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
  .reveal.revealed { opacity: 1; transform: translateY(0); }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }
`;
document.head.appendChild(revealStyle);

// ============================================
// WhatsApp Messaging
// ============================================
const WA_NUMBER = '6281234567890'; // Ganti dengan nomor WA admin

function sendWhatsApp(packageName) {
  const msg = `Halo Admin PROXINET 👋\n\nSaya tertarik dengan *Paket ${packageName}*.\n\nBoleh minta info lebih lengkap mengenai:\n- Detail spesifikasi paket\n- Cara pendaftaran\n- Promo yang sedang berlaku\n\nTerima kasih 🙏`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

function sendWhatsAppContact(name, subject, message) {
  const msg = `Halo Admin PROXINET 👋\n\nPerkenalkan, saya *${name}*.\n\n*Perihal:* ${subject}\n\n${message}\n\nMohon balasannya. Terima kasih 🙏`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

window.sendWhatsApp = sendWhatsApp;
window.showPage = showPage;

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;
    if (name && subject && message) {
      sendWhatsAppContact(name, subject, message);
    }
  });
}

// ============================================
// Init on DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initParticles();
  initCounters();
  initScrollReveal();
  initContactForm();
  initSearch();
  initLogout();

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(initScrollReveal, 100);
    });
  });
});
