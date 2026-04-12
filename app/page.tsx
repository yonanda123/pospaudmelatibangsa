"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NewsItem {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
}

interface Facility {
  icon: string;
  name: string;
  desc: string;
}

interface Teacher {
  name: string;
  role: string;
  emoji: string;
  color: string;
}

interface GalleryItem {
  url: string;
  caption: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    date: "10 April 2026",
    title: "Pentas Seni Akhir Tahun: Sang Bintang Cilik 2026",
    excerpt:
      "Ratusan wali murid hadir menyaksikan penampilan memukau anak-anak Pos PAUD Melati Bangsi dalam acara pentas seni tahunan yang digelar di halaman sekolah.",
    category: "Kegiatan",
    emoji: "🎭",
  },
  {
    id: 2,
    date: "25 Maret 2026",
    title: "Kunjungan Belajar ke Kebun Binatang Surabaya",
    excerpt:
      "Anak-anak Pos PAUD Melati Bangsi berkunjung ke Kebun Binatang Surabaya sebagai bagian dari program belajar sambil bermain di alam terbuka.",
    category: "Wisata Edukasi",
    emoji: "🦁",
  },
  {
    id: 3,
    date: "15 Maret 2026",
    title: "Pelatihan Parenting: Mendidik Anak di Era Digital",
    excerpt:
      "Sekolah mengadakan seminar parenting bagi orang tua murid dengan narasumber dari psikolog anak terkemuka di Malang.",
    category: "Seminar",
    emoji: "👩‍👧",
  },
  {
    id: 4,
    date: "1 Maret 2026",
    title: "Penerimaan Peserta Didik Baru Tahun Ajaran 2026/2027",
    excerpt:
      "Pos PAUD Melati Bangsi membuka pendaftaran peserta didik baru. Kuota terbatas, segera daftarkan putra-putri Anda.",
    category: "Pengumuman",
    emoji: "📝",
  },
];

const FACILITIES: Facility[] = [
  { icon: "🏫", name: "Ruang Kelas Nyaman", desc: "Ruang belajar ber-AC dengan dekorasi edukatif dan warna cerah yang merangsang kreativitas anak." },
  { icon: "🛝", name: "Area Bermain Outdoor", desc: "Taman bermain dengan perosotan, ayunan, dan arena pasir yang aman dan terawat." },
  { icon: "📚", name: "Perpustakaan Mini", desc: "Koleksi buku cerita bergambar, buku edukasi, dan media pembelajaran interaktif." },
  { icon: "🎨", name: "Ruang Seni & Kreativitas", desc: "Studio khusus untuk menggambar, mewarnai, prakarya, dan mengekspresikan imajinasi." },
  { icon: "🍽️", name: "Kantin Sehat", desc: "Menyediakan makanan bergizi, bebas pengawet dan pewarna buatan untuk tumbuh kembang optimal." },
  { icon: "🚿", name: "Toilet Bersih & Aman", desc: "Kamar mandi ramah anak, bersih, dan dilengkapi perlengkapan keselamatan." },
  { icon: "🏥", name: "UKS & P3K", desc: "Unit Kesehatan Sekolah lengkap dengan peralatan pertolongan pertama dan tenaga terlatih." },
  { icon: "📹", name: "CCTV 24 Jam", desc: "Sistem keamanan CCTV menyeluruh untuk memastikan keselamatan anak selama di sekolah." },
];

const TEACHERS: Teacher[] = [
  { name: "Siti Nurhaliza, S.Pd.", role: "Kepala Sekolah", emoji: "👩‍🏫", color: "from-pink-400 to-rose-500" },
  { name: "Dewi Rahayu, S.Pd.", role: "Guru Kelas A", emoji: "🌸", color: "from-fuchsia-400 to-pink-500" },
  { name: "Rina Marlina, S.Pd.", role: "Guru Kelas B", emoji: "🌺", color: "from-pink-300 to-fuchsia-400" },
  { name: "Yuni Astuti", role: "Guru Pendamping", emoji: "🌷", color: "from-rose-400 to-pink-500" },
];

const GALLERY: GalleryItem[] = [
  { url: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=600&auto=format&fit=crop", caption: "Kegiatan Belajar Bersama" },
  { url: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&auto=format&fit=crop", caption: "Bermain Sambil Belajar" },
  { url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop", caption: "Seni & Kreativitas" },
  { url: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=600&auto=format&fit=crop", caption: "Ceria di Taman Bermain" },
  { url: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?w=600&auto=format&fit=crop", caption: "Hari Spesial Bersama" },
  { url: "https://images.unsplash.com/photo-1484820987561-2591cae35e03?w=600&auto=format&fit=crop", caption: "Aktivitas Musik" },
];

const PROGRAMS = [
  { emoji: "🧩", title: "Stimulasi Kognitif", desc: "Permainan puzzle, berhitung dasar, dan pengenalan huruf melalui pendekatan bermain yang menyenangkan." },
  { emoji: "🎵", title: "Seni & Musik", desc: "Menyanyi, menari, bermain alat musik sederhana untuk mengembangkan ekspresi dan kreativitas." },
  { emoji: "⚽", title: "Motorik & Fisik", desc: "Senam pagi, permainan fisik, dan olahraga ringan untuk mendukung tumbuh kembang anak." },
  { emoji: "🙏", title: "Karakter & Agama", desc: "Penanaman nilai moral, etika, dan spiritual melalui cerita, doa bersama, dan pembiasaan sehari-hari." },
  { emoji: "🤝", title: "Sosial Emosional", desc: "Membangun kemampuan bersosialisasi, bekerja sama, dan mengelola emosi dengan tepat." },
  { emoji: "🌿", title: "Cinta Lingkungan", desc: "Berkebun mini, mengenal alam, dan membiasakan perilaku ramah lingkungan sejak dini." },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Page() {
  const [activeNav, setActiveNav] = useState("beranda");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const navLinks = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang" },
    { id: "program", label: "Program" },
    { id: "fasilitas", label: "Fasilitas" },
    { id: "berita", label: "Berita" },
    { id: "galeri", label: "Galeri" },
    { id: "kontak", label: "Kontak" },
  ];

  const scrollTo = (id: string) => {
    setActiveNav(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveNav(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden" style={{ fontFamily: "'Nunito', 'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;900&display=swap');
        
        * { box-sizing: border-box; }
        
        :root {
          --pink-50: #fff0f6;
          --pink-100: #ffe0ee;
          --pink-200: #ffc0db;
          --pink-300: #ff91be;
          --pink-400: #ff5fa0;
          --pink-500: #f72585;
          --pink-600: #d91a70;
          --pink-700: #b5135c;
          --rose-400: #fb7185;
          --fuchsia-400: #e879f9;
          --fuchsia-500: #d946ef;
        }

        html { scroll-behavior: smooth; }
        
        .hero-bg {
          background: linear-gradient(135deg, #fff0f6 0%, #fce7f3 30%, #fdf2f8 60%, #fff5f7 100%);
        }
        
        .nav-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(247, 37, 133, 0.12);
        }
        
        .card-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 60px rgba(247, 37, 133, 0.18);
        }
        
        .petal-float {
          animation: petalFloat 6s ease-in-out infinite;
        }
        .petal-float:nth-child(2) { animation-delay: -2s; }
        .petal-float:nth-child(3) { animation-delay: -4s; }
        
        @keyframes petalFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(5deg); }
          66% { transform: translateY(-8px) rotate(-3deg); }
        }
        
        .slide-up {
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #f72585 0%, #e879f9 50%, #d91a70 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .blob-bg {
          background: radial-gradient(ellipse at 20% 50%, rgba(247,37,133,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 20%, rgba(232,121,249,0.1) 0%, transparent 50%),
                      radial-gradient(ellipse at 60% 80%, rgba(251,113,133,0.08) 0%, transparent 50%);
        }
        
        .section-divider {
          height: 80px;
          background: linear-gradient(180deg, #fff0f6, white);
        }
        
        .tag-pill {
          background: linear-gradient(135deg, rgba(247,37,133,0.12), rgba(232,121,249,0.12));
          border: 1px solid rgba(247,37,133,0.2);
          color: #d91a70;
        }
        
        .pink-ring:focus { outline: none; box-shadow: 0 0 0 3px rgba(247,37,133,0.3); }
        
        .gallery-img {
          transition: transform 0.4s ease;
        }
        .gallery-img:hover { transform: scale(1.05); }
        
        .scroll-x {
          scrollbar-width: thin;
          scrollbar-color: #f72585 #ffe0ee;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #f72585, #e879f9);
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(247,37,133,0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(247,37,133,0.45);
        }
        
        .btn-outline {
          border: 2px solid #f72585;
          color: #f72585;
          transition: all 0.3s ease;
        }
        .btn-outline:hover {
          background: #f72585;
          color: white;
          transform: translateY(-2px);
        }
        
        .wavy-border {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        }
        
        .stat-card {
          background: linear-gradient(135deg, #fff0f6, #fce7f3);
          border: 1px solid rgba(247,37,133,0.15);
        }
        
        .news-card {
          border-left: 4px solid #f72585;
        }
      `}</style>

      {/* ─── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #f72585, #e879f9)" }}>
              🌸
            </div>
            <div>
              <div className="font-black text-sm leading-tight gradient-text">POS PAUD</div>
              <div className="font-black text-sm leading-tight" style={{ color: "#f72585" }}>MELATI BANGSI</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-700 transition-all duration-300 ${
                  activeNav === link.id
                    ? "text-white shadow-lg"
                    : "text-gray-600 hover:text-pink-600"
                }`}
                style={
                  activeNav === link.id
                    ? { background: "linear-gradient(135deg, #f72585, #e879f9)" }
                    : {}
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("kontak")}
              className="hidden md:block btn-primary px-5 py-2 rounded-full text-sm font-bold"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(247,37,133,0.1)", color: "#f72585" }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100 px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-bold"
                style={
                  activeNav === link.id
                    ? { background: "linear-gradient(135deg,#f72585,#e879f9)", color: "white" }
                    : { color: "#666" }
                }
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section id="beranda" className="hero-bg min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: "radial-gradient(circle, #f72585, transparent)" }} />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(circle, #e879f9, transparent)" }} />

        {/* Floating petals */}
        <div className="absolute top-32 left-1/4 text-3xl petal-float opacity-30">🌸</div>
        <div className="absolute top-48 right-1/3 text-2xl petal-float opacity-25">🌺</div>
        <div className="absolute bottom-40 right-1/4 text-3xl petal-float opacity-20">🌷</div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="slide-up">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5 tracking-wider">
              🌸 PENDIDIKAN ANAK USIA DINI TERPERCAYA
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Tumbuh,{" "}
              <span className="gradient-text">Bermain,</span>
              <br />& Berkembang
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              Pos PAUD Melati Bangsi hadir untuk mendampingi si kecil dalam masa emas tumbuh kembangnya. Kami percaya setiap anak adalah bintang yang menunggu untuk bersinar. 💖
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo("kontak")} className="btn-primary px-7 py-3.5 rounded-2xl font-bold text-base">
                🌺 Daftar Sekarang
              </button>
              <button onClick={() => scrollTo("tentang")} className="btn-outline px-7 py-3.5 rounded-2xl font-bold text-base">
                Pelajari Lebih →
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { val: 120, suf: "+", label: "Murid Aktif" },
                { val: 10, suf: "+", label: "Tahun Berdiri" },
                { val: 8, suf: "", label: "Tenaga Pengajar" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-black gradient-text">
                    <AnimatedCounter target={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image collage */}
          <div className="relative hidden md:block">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1587691592099-24045742c181?w=700&auto=format&fit=crop"
                alt="Anak belajar"
                className="w-full h-80 object-cover rounded-3xl shadow-2xl"
                style={{ boxShadow: "0 24px 60px rgba(247,37,133,0.25)" }}
              />
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-4 shadow-xl border border-pink-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)" }}>
                  ⭐
                </div>
                <div>
                  <div className="font-black text-sm" style={{ color: "#f72585" }}>Terakreditasi</div>
                  <div className="text-xs text-gray-500">Kemendikbud RI</div>
                </div>
              </div>
              <div className="absolute -top-6 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-pink-100 text-center">
                <div className="text-2xl font-black gradient-text">100%</div>
                <div className="text-xs text-gray-500 font-semibold">Anak Bahagia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TENTANG ──────────────────────────────────────────────── */}
      <section id="tentang" className="py-20 bg-white relative overflow-hidden">
        <div className="blob-bg absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              TENTANG KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Mengenal{" "}
              <span className="gradient-text">Pos PAUD Melati Bangsi</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Lembaga pendidikan anak usia dini yang berkomitmen menghadirkan pengalaman belajar menyenangkan dan bermakna bagi setiap anak.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&auto=format&fit=crop"
                alt="Kelas PAUD"
                className="w-full h-72 object-cover rounded-3xl shadow-xl"
              />
            </div>
            <div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl card-hover" style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)", border: "1px solid rgba(247,37,133,0.15)" }}>
                  <h3 className="font-black text-lg mb-2" style={{ color: "#f72585" }}>🎯 Visi Kami</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Menjadi lembaga PAUD unggulan yang mencetak generasi berkarakter, cerdas, dan berakhlak mulia dengan pendekatan holistik berbasis bermain.
                  </p>
                </div>
                <div className="p-5 rounded-2xl card-hover" style={{ background: "linear-gradient(135deg,#fdf4ff,#fce7f3)", border: "1px solid rgba(232,121,249,0.2)" }}>
                  <h3 className="font-black text-lg mb-2" style={{ color: "#d946ef" }}>🌸 Misi Kami</h3>
                  <ul className="text-gray-600 text-sm space-y-1.5 leading-relaxed">
                    <li>✨ Menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan</li>
                    <li>✨ Mengembangkan seluruh aspek perkembangan anak secara holistik</li>
                    <li>✨ Memberdayakan orang tua sebagai mitra utama pendidikan</li>
                    <li>✨ Menerapkan kurikulum berbasis budaya dan nilai-nilai Islami</li>
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: "📅", label: "Berdiri", val: "2009" },
                    { icon: "🏫", label: "Status", val: "Swasta" },
                    { icon: "🌅", label: "Jam Belajar", val: "07:30–10:30" },
                  ].map((item) => (
                    <div key={item.label} className="stat-card p-3 rounded-xl text-center">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="font-black text-xs" style={{ color: "#f72585" }}>{item.val}</div>
                      <div className="text-gray-500 text-xs">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: "👧", num: 120, suf: "+", label: "Peserta Didik" },
              { icon: "👩‍🏫", num: 8, suf: "", label: "Pendidik Berpengalaman" },
              { icon: "🏆", num: 15, suf: "+", label: "Penghargaan" },
              { icon: "📆", num: 10, suf: "+", label: "Tahun Pengalaman" },
            ].map((s) => (
              <div key={s.label} className="stat-card p-6 rounded-2xl text-center card-hover">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-3xl font-black gradient-text">
                  <AnimatedCounter target={s.num} suffix={s.suf} />
                </div>
                <div className="text-gray-500 text-sm font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAM ──────────────────────────────────────────────── */}
      <section id="program" className="py-20" style={{ background: "linear-gradient(180deg,white,#fff0f6)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              PROGRAM UNGGULAN
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Program{" "}
              <span className="gradient-text">Pembelajaran Kami</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Dirancang oleh para ahli untuk mengoptimalkan masa emas tumbuh kembang anak 0–6 tahun.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.title}
                className="bg-white p-6 rounded-2xl card-hover"
                style={{
                  border: "1px solid rgba(247,37,133,0.12)",
                  boxShadow: "0 4px 24px rgba(247,37,133,0.06)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)" }}
                >
                  {prog.emoji}
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: "#1a1a2e" }}>
                  {prog.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>

          {/* Tab: Jadwal */}
          <div className="mt-16 bg-white rounded-3xl p-8 shadow-xl" style={{ border: "1px solid rgba(247,37,133,0.12)" }}>
            <h3 className="font-black text-xl mb-6 text-center" style={{ color: "#1a1a2e" }}>
              📅 Jadwal Kegiatan Mingguan
            </h3>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scroll-x">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day, i) => (
                <button
                  key={day}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    activeTab === i ? "text-white shadow-lg" : "text-gray-500 bg-gray-50"
                  }`}
                  style={activeTab === i ? { background: "linear-gradient(135deg,#f72585,#e879f9)" } : {}}
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { time: "07:30 – 08:00", act: "Penyambutan & Doa Pagi", emoji: "🌅" },
                { time: "08:00 – 08:30", act: "Senam & Motorik Kasar", emoji: "⚽" },
                { time: "08:30 – 09:30", act: "Kegiatan Inti Belajar", emoji: "📚" },
                { time: "09:30 – 10:00", act: "Istirahat & Makan Sehat", emoji: "🍱" },
                { time: "10:00 – 10:30", act: "Bermain Bebas & Kreatif", emoji: "🎨" },
                { time: "10:30 – 11:00", act: "Evaluasi & Penutupan", emoji: "🌸" },
              ].map((sched) => (
                <div key={sched.time} className="p-4 rounded-xl flex gap-3 items-start" style={{ background: "#fff0f6" }}>
                  <span className="text-xl">{sched.emoji}</span>
                  <div>
                    <div className="text-xs font-black" style={{ color: "#f72585" }}>{sched.time}</div>
                    <div className="text-gray-700 text-sm font-semibold">{sched.act}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FASILITAS ──────────────────────────────────────────────── */}
      <section id="fasilitas" className="py-20" style={{ background: "#fff0f6" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              FASILITAS & SARANA
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Fasilitas{" "}
              <span className="gradient-text">Lengkap & Modern</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kami menyediakan sarana prasarana terbaik untuk mendukung proses belajar dan bermain yang optimal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FACILITIES.map((fac) => (
              <div
                key={fac.name}
                className="bg-white p-6 rounded-2xl text-center card-hover"
                style={{ border: "1px solid rgba(247,37,133,0.1)", boxShadow: "0 4px 20px rgba(247,37,133,0.06)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4"
                  style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)" }}
                >
                  {fac.icon}
                </div>
                <h3 className="font-black text-sm mb-2" style={{ color: "#1a1a2e" }}>{fac.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature banner */}
          <div
            className="mt-12 p-8 rounded-3xl flex flex-wrap items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,#f72585,#e879f9)", color: "white" }}
          >
            <div>
              <h3 className="font-black text-2xl mb-2">🌟 Lingkungan Belajar Terbaik</h3>
              <p className="opacity-90 max-w-lg text-sm leading-relaxed">
                Setiap sudut sekolah kami dirancang dengan penuh kasih sayang untuk mendukung tumbuh kembang si kecil. Keamanan, kebersihan, dan kenyamanan adalah prioritas utama kami.
              </p>
            </div>
            <button
              onClick={() => scrollTo("kontak")}
              className="bg-white font-bold px-7 py-3.5 rounded-2xl text-sm transition-all hover:scale-105"
              style={{ color: "#f72585" }}
            >
              Kunjungi Sekolah →
            </button>
          </div>
        </div>
      </section>

      {/* ─── GURU / TIM ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              TIM PENDIDIK
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Para{" "}
              <span className="gradient-text">Pendidik Berdedikasi</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHERS.map((teacher) => (
              <div key={teacher.name} className="text-center card-hover">
                <div
                  className={`w-24 h-24 rounded-2xl mx-auto flex items-center justify-center text-5xl mb-4 bg-linear-to-br ${teacher.color}`}
                >
                  {teacher.emoji}
                </div>
                <div className="font-black text-sm" style={{ color: "#1a1a2e" }}>{teacher.name}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "#f72585" }}>{teacher.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BERITA ──────────────────────────────────────────────────── */}
      <section id="berita" className="py-20" style={{ background: "linear-gradient(180deg,white,#fff0f6)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              BERITA & ARTIKEL
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Kabar Terbaru{" "}
              <span className="gradient-text">Dari Sekolah</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Ikuti perkembangan kegiatan dan program terbaru dari Pos PAUD Melati Bangsi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS_ITEMS.map((news, i) => (
              <div
                key={news.id}
                className={`bg-white p-6 rounded-2xl card-hover news-card ${i === 0 ? "md:col-span-2" : ""}`}
                style={{ boxShadow: "0 4px 20px rgba(247,37,133,0.06)" }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)" }}
                  >
                    {news.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag-pill text-xs px-3 py-1 rounded-full font-bold">{news.category}</span>
                      <span className="text-gray-400 text-xs">{news.date}</span>
                    </div>
                    <h3 className="font-black text-base mb-2" style={{ color: "#1a1a2e" }}>{news.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{news.excerpt}</p>
                    <button className="mt-3 text-sm font-bold" style={{ color: "#f72585" }}>
                      Baca Selengkapnya →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERI ──────────────────────────────────────────────────── */}
      <section id="galeri" className="py-20" style={{ background: "#fff0f6" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              GALERI FOTO
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Momen Berharga{" "}
              <span className="gradient-text">Si Kecil</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} style={{ aspectRatio: i === 0 ? "auto" : "1/1", height: i === 0 ? "400px" : "190px" }}>
                <img
                  src={item.url}
                  alt={item.caption}
                  className="gallery-img w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-bold text-sm">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONI ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              TESTIMONI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Kata Orang Tua{" "}
              <span className="gradient-text">Murid Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ibu Sari W.", child: "Mama dari Nafisa (4 thn)", text: "Anak saya sangat senang bersekolah di sini. Guru-gurunya sabar dan kreatif. Perkembangan anak saya sangat terasa sejak masuk PAUD Melati!", stars: 5 },
              { name: "Bapak Ahmad R.", child: "Ayah dari Raihan (3 thn)", text: "Fasilitas lengkap, kebersihan terjaga, dan pengajaran berbasis karakter. Sangat merekomendasikan untuk para orang tua di sekitar Bangsi.", stars: 5 },
              { name: "Ibu Dewi K.", child: "Mama dari Laila (5 thn)", text: "Program parenting-nya sangat membantu kami memahami cara mendidik anak yang benar. Terima kasih Pos PAUD Melati Bangsi! 💖", stars: 5 },
            ].map((testi) => (
              <div
                key={testi.name}
                className="p-6 rounded-2xl card-hover"
                style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)", border: "1px solid rgba(247,37,133,0.12)" }}
              >
                <div className="flex mb-3">
                  {Array(testi.stars).fill(0).map((_, i) => (
                    <span key={i} style={{ color: "#f72585" }}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">{testi.text}</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "linear-gradient(135deg,#f72585,#e879f9)", color: "white" }}
                  >
                    👩
                  </div>
                  <div>
                    <div className="font-black text-sm" style={{ color: "#1a1a2e" }}>{testi.name}</div>
                    <div className="text-xs text-gray-400">{testi.child}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PENDAFTARAN ─────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: "linear-gradient(135deg,#f72585,#e879f9,#fb7185)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🌸 Tahun Ajaran Baru 2026/2027
          </h2>
          <p className="opacity-90 text-lg mb-8 max-w-xl mx-auto">
            Penerimaan Peserta Didik Baru (PPDB) segera dibuka. Kuota sangat terbatas — segera daftarkan si kecil!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("kontak")}
              className="bg-white font-black px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 hover:shadow-xl"
              style={{ color: "#f72585" }}
            >
              📝 Daftar Sekarang
            </button>
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 border-2 border-white text-white font-black px-8 py-4 rounded-2xl text-base transition-all hover:bg-white/30 hover:scale-105 no-underline inline-block"
            >
              💬 Hubungi Kami
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8 opacity-80 text-sm">
            <span>✅ Usia 2–6 Tahun</span>
            <span>✅ Biaya Terjangkau</span>
            <span>✅ Gratis Seragam</span>
            <span>✅ Konsultasi Bebas</span>
          </div>
        </div>
      </section>

      {/* ─── KONTAK ──────────────────────────────────────────────────── */}
      <section id="kontak" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="tag-pill inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider">
              KONTAK & LOKASI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a1a2e" }}>
              Temukan &{" "}
              <span className="gradient-text">Hubungi Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: "📍", label: "Alamat", val: "Dusun Bangsi, Kelurahan Tanjungtirto, Kecamatan Singosari, Kabupaten Malang, Jawa Timur" },
                { icon: "📞", label: "Telepon / WhatsApp", val: "+62 812-3456-7890" },
                { icon: "📧", label: "Email", val: "pospaudmelati.bangsi@gmail.com" },
                { icon: "🕐", label: "Jam Operasional", val: "Senin – Sabtu, 07:00 – 12:00 WIB" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "#fff0f6", border: "1px solid rgba(247,37,133,0.12)" }}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "linear-gradient(135deg,#f72585,#e879f9)", color: "white" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black mb-1" style={{ color: "#f72585" }}>{item.label}</div>
                    <div className="text-gray-700 text-sm font-semibold">{item.val}</div>
                  </div>
                </div>
              ))}

              {/* Social Media */}
              <div className="p-5 rounded-2xl" style={{ background: "#fff0f6", border: "1px solid rgba(247,37,133,0.12)" }}>
                <div className="text-xs font-black mb-3" style={{ color: "#f72585" }}>MEDIA SOSIAL</div>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "YouTube"].map((sm) => (
                    <button
                      key={sm}
                      className="btn-primary px-4 py-2 rounded-xl text-xs font-bold"
                    >
                      {sm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 rounded-3xl" style={{ background: "linear-gradient(135deg,#fff0f6,#fce7f3)", border: "1px solid rgba(247,37,133,0.15)" }}>
              <h3 className="font-black text-xl mb-6" style={{ color: "#1a1a2e" }}>📬 Kirim Pesan / Daftar</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold block mb-1.5" style={{ color: "#d91a70" }}>Nama Orang Tua *</label>
                    <input
                      type="text"
                      placeholder="Nama lengkap"
                      className="w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium pink-ring"
                      style={{ borderColor: "rgba(247,37,133,0.25)" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold block mb-1.5" style={{ color: "#d91a70" }}>Nama Anak *</label>
                    <input
                      type="text"
                      placeholder="Nama anak"
                      className="w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium pink-ring"
                      style={{ borderColor: "rgba(247,37,133,0.25)" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: "#d91a70" }}>Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium pink-ring"
                    style={{ borderColor: "rgba(247,37,133,0.25)" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: "#d91a70" }}>Usia Anak</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium pink-ring"
                    style={{ borderColor: "rgba(247,37,133,0.25)" }}
                  >
                    <option>Pilih usia anak</option>
                    <option>2 – 3 tahun</option>
                    <option>3 – 4 tahun</option>
                    <option>4 – 5 tahun</option>
                    <option>5 – 6 tahun</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5" style={{ color: "#d91a70" }}>Pesan / Pertanyaan</label>
                  <textarea
                    placeholder="Tulis pertanyaan atau pesan Anda..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white border text-sm font-medium pink-ring resize-none"
                    style={{ borderColor: "rgba(247,37,133,0.25)" }}
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-3.5 rounded-xl font-black text-sm">
                  🌸 Kirim & Daftar Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ background: "#1a1a2e" }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg,#f72585,#e879f9)" }}>
                  🌸
                </div>
                <div>
                  <div className="font-black gradient-text text-lg">POS PAUD</div>
                  <div className="font-black" style={{ color: "#f72585" }}>MELATI BANGSI</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Mendidik generasi penerus bangsa dengan penuh kasih sayang, kreativitas, dan nilai-nilai luhur sejak dini.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-4" style={{ color: "#f72585" }}>Menu Cepat</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className="text-gray-400 hover:text-pink-400 text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4" style={{ color: "#f72585" }}>Informasi</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📍 Bangsi, Singosari, Malang</li>
                <li>📞 +62 812-3456-7890</li>
                <li>🕐 Sen–Sab, 07:00–12:00</li>
                <li>📧 melati.bangsi@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-500 text-xs">
              © 2026 Pos PAUD Melati Bangsi. Hak cipta dilindungi. Dibuat dengan 💖 untuk pendidikan anak Indonesia.
            </p>
            <p className="text-gray-600 text-xs">
              Di bawah naungan Kemendikbud RI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
