"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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
  { name: "Siti Nurhaliza, S.Pd.", role: "Kepala Sekolah", emoji: "👩‍🏫" },
  { name: "Dewi Rahayu, S.Pd.", role: "Guru Kelas A", emoji: "🌸" },
  { name: "Rina Marlina, S.Pd.", role: "Guru Kelas B", emoji: "🌺" },
  { name: "Yuni Astuti", role: "Guru Pendamping", emoji: "🌷" },
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
    <div className="min-h-screen bg-white overflow-x-hidden" style={{ fontFamily: "'Nunito', 'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Montserrat:wght@700;800;900&display=swap');

        * { box-sizing: border-box; }

        :root {
          --blue-darkest: #0a1628;
          --blue-dark: #0d2149;
          --blue-mid: #1a3a7c;
          --blue-main: #1e4fc2;
          --blue-light: #2563eb;
          --blue-pale: #dbeafe;
          --blue-50: #eff6ff;
          --orange: #f97316;
          --orange-dark: #ea6800;
          --orange-light: #fdba74;
          --gold: #fbbf24;
          --white: #ffffff;
        }

        html { scroll-behavior: smooth; }

        .nav-blur {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(13, 33, 73, 0.95);
          border-bottom: 2px solid rgba(249,115,22,0.4);
        }

        .hero-bg {
          background: linear-gradient(135deg, #0a1628 0%, #0d2149 40%, #1a3a7c 70%, #0d2149 100%);
          position: relative;
        }

        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 70% 50%, rgba(30,79,194,0.3) 0%, transparent 60%),
                      radial-gradient(ellipse at 20% 80%, rgba(249,115,22,0.15) 0%, transparent 50%);
          pointer-events: none;
        }

        .diagonal-chevron {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 120px;
          background: rgba(249,115,22,0.08);
          clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(13,33,73,0.18);
        }

        .slide-up {
          animation: slideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-up-delay-1 { animation-delay: 0.15s; }
        .slide-up-delay-2 { animation-delay: 0.3s; }
        .slide-up-delay-3 { animation-delay: 0.45s; }

        .gradient-text {
          background: linear-gradient(135deg, #f97316 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blue-gradient-text {
          background: linear-gradient(135deg, #1e4fc2 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-blue {
          background: linear-gradient(180deg, #0d2149 0%, #1a3a7c 100%);
        }

        .btn-orange {
          background: linear-gradient(135deg, #f97316, #ea6800);
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(249,115,22,0.4);
        }
        .btn-orange:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.5);
        }

        .btn-white-outline {
          border: 2px solid rgba(255,255,255,0.6);
          color: white;
          transition: all 0.3s ease;
        }
        .btn-white-outline:hover {
          background: rgba(255,255,255,0.15);
          border-color: white;
          transform: translateY(-2px);
        }

        .tag-blue {
          background: rgba(30,79,194,0.12);
          border: 1px solid rgba(30,79,194,0.25);
          color: #1e4fc2;
        }

        .tag-orange {
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.3);
          color: #ea6800;
        }

        .card-blue {
          background: linear-gradient(135deg, rgba(13,33,73,0.04), rgba(30,79,194,0.06));
          border: 1px solid rgba(30,79,194,0.15);
        }

        .stat-card-blue {
          background: linear-gradient(135deg, #0d2149, #1a3a7c);
          color: white;
          border: 1px solid rgba(249,115,22,0.2);
        }

        .chevron-decor {
          display: inline-block;
          width: 12px; height: 12px;
          border-right: 3px solid #f97316;
          border-top: 3px solid #f97316;
          transform: rotate(45deg);
        }

        .news-card-blue {
          border-left: 4px solid #1e4fc2;
        }

        .gallery-img {
          transition: transform 0.4s ease;
        }
        .gallery-img:hover { transform: scale(1.05); }

        .school-photo-frame {
          border: 3px solid rgba(249,115,22,0.5);
          box-shadow: 0 0 0 6px rgba(30,79,194,0.15), 0 24px 60px rgba(13,33,73,0.35);
        }

        .float-badge {
          background: white;
          border: 2px solid rgba(249,115,22,0.3);
          box-shadow: 0 8px 30px rgba(13,33,73,0.25);
        }

        .orange-line {
          display: inline-block;
          width: 48px; height: 4px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
          border-radius: 2px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .grid-pattern {
          background-image: linear-gradient(rgba(30,79,194,0.06) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(30,79,194,0.06) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .scroll-x {
          scrollbar-width: thin;
          scrollbar-color: #1e4fc2 #dbeafe;
        }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-anim { animation: floatY 4s ease-in-out infinite; }
        .float-anim-slow { animation: floatY 6s ease-in-out infinite; }
      `}</style>

      {/* ─── NAVBAR ──────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
              <Image src="/logo.png" alt="Logo Pos PAUD" width={40} height={40} className="object-contain mt-0.5 mr-0.5" />
            </div>
            <div>
              <div className="font-black text-sm leading-tight text-white">POS PAUD</div>
              <div className="font-black text-sm leading-tight" style={{ color: "#f97316" }}>MELATI BANGSI</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-700 transition-all duration-300 ${activeNav === link.id
                  ? "text-white"
                  : "text-blue-200 hover:text-white"
                  }`}
                style={activeNav === link.id ? { background: "linear-gradient(135deg, #f97316, #ea6800)" } : {}}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("kontak")}
              className="hidden md:block btn-orange px-5 py-2 rounded-lg text-sm font-bold"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-white"
              style={{ background: "rgba(249,115,22,0.2)" }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 py-4 flex flex-col gap-1" style={{ background: "#0a1628" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-4 py-2.5 rounded-lg text-sm font-bold"
                style={
                  activeNav === link.id
                    ? { background: "linear-gradient(135deg,#f97316,#ea6800)", color: "white" }
                    : { color: "#93c5fd" }
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
        {/* Diagonal chevrons decoration */}
        <div className="absolute top-24 left-6 opacity-20">
          <div className="w-8 h-8 border-r-4 border-t-4 border-orange-400 rotate-45 mb-2" />
          <div className="w-8 h-8 border-r-4 border-t-4 border-orange-400 rotate-45 mb-2 ml-2" />
          <div className="w-8 h-8 border-r-4 border-t-4 border-orange-400 rotate-45 ml-4" />
        </div>
        <div className="absolute bottom-32 right-8 opacity-15">
          <div className="w-10 h-10 border-r-4 border-t-4 border-orange-300 rotate-45 mb-3" />
          <div className="w-10 h-10 border-r-4 border-t-4 border-orange-300 rotate-45 mb-3 ml-3" />
          <div className="w-10 h-10 border-r-4 border-t-4 border-orange-300 rotate-45 ml-6" />
          <div className="w-10 h-10 border-r-4 border-t-4 border-orange-300 rotate-45 ml-9" />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left content */}
          <div>
            <div className="slide-up">
              <span className="inline-flex items-center gap-2 tag-orange px-4 py-1.5 rounded-full section-label mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
                PENDIDIKAN ANAK USIA DINI TERPERCAYA
              </span>
            </div>
            <h1
              className="slide-up slide-up-delay-1 text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-white"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <span className="text-white">Tumbuh,</span>{" "}
              <span className="gradient-text">Bermain,</span>
              <br />
              <span className="text-white">& Berkembang</span>
            </h1>
            <p className="slide-up slide-up-delay-2 text-blue-200 text-lg leading-relaxed mb-8 max-w-lg">
              Pos PAUD Melati Bangsi hadir untuk mendampingi si kecil dalam masa emas tumbuh kembangnya. Kami percaya setiap anak adalah bintang yang menunggu untuk bersinar.
            </p>
            <div className="slide-up slide-up-delay-3 flex flex-wrap gap-4">
              <button onClick={() => scrollTo("kontak")} className="btn-orange px-7 py-3.5 rounded-xl font-bold text-base">
                📝 Daftar Sekarang
              </button>
              <button onClick={() => scrollTo("tentang")} className="btn-white-outline px-7 py-3.5 rounded-xl font-bold text-base">
                Pelajari Lebih →
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[
                { val: 120, suf: "+", label: "Murid Aktif" },
                { val: 10, suf: "+", label: "Tahun Berdiri" },
                { val: 8, suf: "", label: "Tenaga Pengajar" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black gradient-text">
                    <AnimatedCounter target={s.val} suffix={s.suf} />
                  </div>
                  <div className="text-xs text-blue-300 font-semibold mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — school photo */}
          <div className="relative hidden md:flex justify-center">
            <div className="relative float-anim-slow">
              <img
                src="/screenshot_3.jpg"
                alt="Pos PAUD Melati Bangsi"
                className="w-full max-w-md h-72 object-cover rounded-2xl school-photo-frame"
              />
              {/* Floating badges */}
              <div className="float-badge absolute -bottom-5 -left-8 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: "linear-gradient(135deg,#0d2149,#1a3a7c)" }}>
                  ⭐
                </div>
                <div>
                  <div className="font-black text-sm" style={{ color: "#0d2149" }}>Terakreditasi</div>
                  <div className="text-xs text-gray-500">Kemendikbud RI</div>
                </div>
              </div>
              <div className="float-badge absolute -top-5 -right-4 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black blue-gradient-text">100%</div>
                <div className="text-xs text-gray-500 font-semibold">Anak Bahagia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TENTANG ──────────────────────────────────────────────── */}
      <section id="tentang" className="py-20 bg-white relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 tag-blue px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              TENTANG KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Mengenal{" "}
              <span className="blue-gradient-text">Pos PAUD Melati Bangsi</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Lembaga pendidikan anak usia dini yang berkomitmen menghadirkan pengalaman belajar menyenangkan dan bermakna bagi setiap anak.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/screenshot_1.jpg"
                alt="Kelas PAUD Melati Bangsi"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
                style={{ border: "3px solid rgba(30,79,194,0.2)" }}
              />
              {/* Orange accent strip */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl" style={{ background: "linear-gradient(135deg,#f97316,#fbbf24)", opacity: 0.15 }} />
              <div className="absolute -top-3 -left-3 w-16 h-16 rounded-xl" style={{ background: "linear-gradient(135deg,#0d2149,#1e4fc2)", opacity: 0.1 }} />
            </div>
            <div>
              <div className="space-y-5">
                <div className="p-5 rounded-2xl card-hover card-blue">
                  <h3 className="font-black text-lg mb-2" style={{ color: "#0d2149" }}>
                    <span className="orange-line" />🎯 Visi Kami
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Menjadi lembaga PAUD unggulan yang mencetak generasi berkarakter, cerdas, dan berakhlak mulia dengan pendekatan holistik berbasis bermain.
                  </p>
                </div>
                <div className="p-5 rounded-2xl card-hover" style={{ background: "linear-gradient(135deg,rgba(13,33,73,0.06),rgba(30,79,194,0.08))", border: "1px solid rgba(30,79,194,0.2)" }}>
                  <h3 className="font-black text-lg mb-2" style={{ color: "#1e4fc2" }}>
                    <span className="orange-line" />🌸 Misi Kami
                  </h3>
                  <ul className="text-gray-600 text-sm space-y-1.5 leading-relaxed">
                    <li>✦ Menciptakan lingkungan belajar yang aman, nyaman, dan menyenangkan</li>
                    <li>✦ Mengembangkan seluruh aspek perkembangan anak secara holistik</li>
                    <li>✦ Memberdayakan orang tua sebagai mitra utama pendidikan</li>
                    <li>✦ Menerapkan kurikulum berbasis budaya dan nilai-nilai Islami</li>
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: "📅", label: "Berdiri", val: "2009" },
                    { icon: "🏫", label: "Status", val: "Swasta" },
                    { icon: "🌅", label: "Jam Belajar", val: "07:30–10:30" },
                  ].map((item) => (
                    <div key={item.label} className="stat-card-blue p-3 rounded-xl text-center card-hover">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <div className="font-black text-xs gradient-text">{item.val}</div>
                      <div className="text-blue-300 text-xs mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">
            {[
              { icon: "👧", num: 120, suf: "+", label: "Peserta Didik" },
              { icon: "👩‍🏫", num: 8, suf: "", label: "Pendidik Berpengalaman" },
              { icon: "🏆", num: 15, suf: "+", label: "Penghargaan" },
              { icon: "📆", num: 10, suf: "+", label: "Tahun Pengalaman" },
            ].map((s) => (
              <div key={s.label} className="stat-card-blue p-6 rounded-2xl text-center card-hover">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-3xl font-black gradient-text">
                  <AnimatedCounter target={s.num} suffix={s.suf} />
                </div>
                <div className="text-blue-300 text-sm font-semibold mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAM ──────────────────────────────────────────────── */}
      <section id="program" className="py-20" style={{ background: "linear-gradient(180deg,#f0f7ff,white)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 tag-orange px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              PROGRAM UNGGULAN
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Program{" "}
              <span className="blue-gradient-text">Pembelajaran Kami</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Dirancang oleh para ahli untuk mengoptimalkan masa emas tumbuh kembang anak 0–6 tahun.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROGRAMS.map((prog, i) => (
              <div
                key={prog.title}
                className="bg-white p-6 rounded-2xl card-hover"
                style={{
                  border: "1px solid rgba(30,79,194,0.12)",
                  boxShadow: "0 4px 20px rgba(13,33,73,0.06)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)" }}
                >
                  {prog.emoji}
                </div>
                <h3 className="font-black text-base mb-2" style={{ color: "#0d2149" }}>{prog.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>

          {/* Weekly schedule tab */}
          <div className="mt-14 bg-white rounded-3xl p-8 shadow-xl" style={{ border: "1px solid rgba(30,79,194,0.12)" }}>
            <h3 className="font-black text-xl mb-6 text-center" style={{ color: "#0d2149", fontFamily: "'Montserrat', sans-serif" }}>
              📅 Jadwal Kegiatan Mingguan
            </h3>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scroll-x">
              {["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].map((day, i) => (
                <button
                  key={day}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${activeTab === i ? "text-white" : "text-gray-500 bg-gray-50"
                    }`}
                  style={activeTab === i ? { background: "linear-gradient(135deg,#0d2149,#1e4fc2)" } : {}}
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
                <div key={sched.time} className="p-4 rounded-xl flex gap-3 items-start" style={{ background: "#eff6ff" }}>
                  <span className="text-xl">{sched.emoji}</span>
                  <div>
                    <div className="text-xs font-black" style={{ color: "#1e4fc2" }}>{sched.time}</div>
                    <div className="text-gray-700 text-sm font-semibold">{sched.act}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FASILITAS ──────────────────────────────────────────────── */}
      <section id="fasilitas" className="py-20" style={{ background: "#eff6ff" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 tag-blue px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              FASILITAS & SARANA
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Fasilitas{" "}
              <span className="blue-gradient-text">Lengkap & Modern</span>
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
                style={{ border: "1px solid rgba(30,79,194,0.1)", boxShadow: "0 4px 20px rgba(13,33,73,0.06)" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4"
                  style={{ background: "linear-gradient(135deg,#dbeafe,#eff6ff)" }}
                >
                  {fac.icon}
                </div>
                <h3 className="font-black text-sm mb-2" style={{ color: "#0d2149" }}>{fac.name}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{fac.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature banner */}
          <div
            className="mt-10 p-8 rounded-3xl flex flex-wrap items-center justify-between gap-6"
            style={{ background: "linear-gradient(135deg,#0d2149,#1a3a7c)" }}
          >
            <div>
              <h3 className="font-black text-2xl mb-2 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                🌟 Lingkungan Belajar Terbaik
              </h3>
              <p className="text-blue-200 max-w-lg text-sm leading-relaxed">
                Setiap sudut sekolah kami dirancang dengan penuh kasih sayang. Keamanan, kebersihan, dan kenyamanan adalah prioritas utama kami.
              </p>
            </div>
            <button
              onClick={() => scrollTo("kontak")}
              className="btn-orange font-bold px-7 py-3.5 rounded-xl text-sm"
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
            <span className="inline-flex items-center gap-2 tag-orange px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              TIM PENDIDIK
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Para{" "}
              <span className="blue-gradient-text">Pendidik Berdedikasi</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEACHERS.map((teacher) => (
              <div key={teacher.name} className="text-center card-hover">
                <div
                  className="w-24 h-24 rounded-2xl mx-auto flex items-center justify-center text-5xl mb-4"
                  style={{ background: "linear-gradient(135deg,#0d2149,#1a3a7c)" }}
                >
                  {teacher.emoji}
                </div>
                <div className="font-black text-sm" style={{ color: "#0d2149" }}>{teacher.name}</div>
                <div className="text-xs font-semibold mt-1" style={{ color: "#f97316" }}>{teacher.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BERITA ──────────────────────────────────────────────────── */}
      <section id="berita" className="py-20" style={{ background: "linear-gradient(180deg,white,#eff6ff)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 tag-blue px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              BERITA & ARTIKEL
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Kabar Terbaru{" "}
              <span className="blue-gradient-text">Dari Sekolah</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {NEWS_ITEMS.map((news, i) => (
              <div
                key={news.id}
                className={`bg-white p-6 rounded-2xl card-hover news-card-blue ${i === 0 ? "md:col-span-2" : ""}`}
                style={{ boxShadow: "0 4px 20px rgba(13,33,73,0.06)" }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: "linear-gradient(135deg,#dbeafe,#eff6ff)" }}
                  >
                    {news.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="tag-blue text-xs px-3 py-1 rounded-full font-bold section-label">{news.category}</span>
                      <span className="text-gray-400 text-xs">{news.date}</span>
                    </div>
                    <h3 className="font-black text-base mb-2" style={{ color: "#0d2149" }}>{news.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{news.excerpt}</p>
                    <button className="mt-3 text-sm font-bold" style={{ color: "#1e4fc2" }}>
                      Baca Selengkapnya →
                    </button>
                  </div>
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
            <span className="inline-flex items-center gap-2 tag-blue px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
              TESTIMONI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Kata Orang Tua{" "}
              <span className="blue-gradient-text">Murid Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ibu Sari W.", child: "Mama dari Nafisa (4 thn)", text: "Anak saya sangat senang bersekolah di sini. Guru-gurunya sabar dan kreatif. Perkembangan anak saya sangat terasa sejak masuk PAUD Melati!", stars: 5 },
              { name: "Bapak Ahmad R.", child: "Ayah dari Raihan (3 thn)", text: "Fasilitas lengkap, kebersihan terjaga, dan pengajaran berbasis karakter. Sangat merekomendasikan untuk para orang tua di sekitar Bangsi.", stars: 5 },
              { name: "Ibu Dewi K.", child: "Mama dari Laila (5 thn)", text: "Program parenting-nya sangat membantu kami memahami cara mendidik anak yang benar. Terima kasih Pos PAUD Melati Bangsi!", stars: 5 },
            ].map((testi) => (
              <div
                key={testi.name}
                className="p-6 rounded-2xl card-hover"
                style={{ background: "linear-gradient(135deg,#eff6ff,#dbeafe)", border: "1px solid rgba(30,79,194,0.15)" }}
              >
                <div className="flex mb-3">
                  {Array(testi.stars).fill(0).map((_, i) => (
                    <span key={i} style={{ color: "#f97316" }}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">&ldquo;{testi.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: "linear-gradient(135deg,#0d2149,#1e4fc2)", color: "white" }}
                  >
                    👩
                  </div>
                  <div>
                    <div className="font-black text-sm" style={{ color: "#0d2149" }}>{testi.name}</div>
                    <div className="text-xs text-gray-400">{testi.child}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PENDAFTARAN CTA ─────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a1628,#0d2149,#1a3a7c)" }}>
        {/* Chevron decorations */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center gap-3 pr-8 opacity-10">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="w-16 h-16 border-r-4 border-t-4 border-orange-300 rotate-45" />
          ))}
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            📚 Tahun Ajaran Baru <span className="gradient-text">2026/2027</span>
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Penerimaan Peserta Didik Baru (PPDB) segera dibuka. Kuota sangat terbatas — segera daftarkan si kecil!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollTo("kontak")}
              className="btn-orange font-black px-8 py-4 rounded-xl text-base"
            >
              📝 Daftar Sekarang
            </button>
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white-outline font-black px-8 py-4 rounded-xl text-base no-underline inline-block"
            >
              💬 Hubungi Kami
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-blue-300 text-sm">
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
            <span className="inline-flex items-center gap-2 tag-orange px-4 py-1.5 rounded-full section-label mb-5">
              <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
              KONTAK & LOKASI
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Montserrat', sans-serif", color: "#0d2149" }}>
              Temukan &{" "}
              <span className="blue-gradient-text">Hubungi Kami</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-4">
              {[
                { icon: "📍", label: "Alamat", val: "Dusun Bangsi, Kelurahan Tanjungtirto, Kecamatan Singosari, Kabupaten Malang, Jawa Timur" },
                { icon: "📞", label: "Telepon / WhatsApp", val: "+62 812-3456-7890" },
                { icon: "📧", label: "Email", val: "pospaudmelati.bangsi@gmail.com" },
                { icon: "🕐", label: "Jam Operasional", val: "Senin – Sabtu, 07:00 – 12:00 WIB" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: "#eff6ff", border: "1px solid rgba(30,79,194,0.12)" }}>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "linear-gradient(135deg,#0d2149,#1e4fc2)", color: "white" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black mb-1 section-label" style={{ color: "#1e4fc2" }}>{item.label}</div>
                    <div className="text-gray-700 text-sm font-semibold">{item.val}</div>
                  </div>
                </div>
              ))}

              <div className="p-5 rounded-2xl" style={{ background: "#eff6ff", border: "1px solid rgba(30,79,194,0.12)" }}>
                <div className="text-xs font-black mb-3 section-label" style={{ color: "#1e4fc2" }}>MEDIA SOSIAL</div>
                <div className="flex gap-3">
                  {["Instagram", "Facebook", "YouTube"].map((sm) => (
                    <button key={sm} className="btn-orange px-4 py-2 rounded-xl text-xs font-bold">
                      {sm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 rounded-3xl" style={{ background: "linear-gradient(135deg,#0d2149,#1a3a7c)" }}>
              <h3 className="font-black text-xl mb-6 text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                📬 Kirim Pesan / Daftar
              </h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold block mb-1.5 section-label" style={{ color: "#fdba74" }}>Nama Orang Tua *</label>
                    <input
                      type="text"
                      placeholder="Nama lengkap"
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold block mb-1.5 section-label" style={{ color: "#fdba74" }}>Nama Anak *</label>
                    <input
                      type="text"
                      placeholder="Nama anak"
                      className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5 section-label" style={{ color: "#fdba74" }}>Nomor WhatsApp *</label>
                  <input
                    type="tel"
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5 section-label" style={{ color: "#fdba74" }}>Usia Anak</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                  >
                    <option value="" style={{ color: "#0d2149" }}>Pilih usia anak</option>
                    <option style={{ color: "#0d2149" }}>2 – 3 tahun</option>
                    <option style={{ color: "#0d2149" }}>3 – 4 tahun</option>
                    <option style={{ color: "#0d2149" }}>4 – 5 tahun</option>
                    <option style={{ color: "#0d2149" }}>5 – 6 tahun</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1.5 section-label" style={{ color: "#fdba74" }}>Pesan / Pertanyaan</label>
                  <textarea
                    placeholder="Tulis pertanyaan atau pesan Anda..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm font-medium outline-none resize-none"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}
                  />
                </div>
                <button type="submit" className="btn-orange w-full py-3.5 rounded-xl font-black text-sm">
                  📨 Kirim & Daftar Sekarang
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <footer style={{ background: "#0a1628" }} className="text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                  <Image src="/logo.png" alt="Logo" width={48} height={48} className="object-contain mt-0.5 mr-0.5" />
                </div>
                <div>
                  <div className="font-black text-lg text-white">POS PAUD</div>
                  <div className="font-black gradient-text">MELATI BANGSI</div>
                </div>
              </div>
              <p className="text-blue-300 text-sm leading-relaxed max-w-xs">
                Mendidik generasi penerus bangsa dengan penuh kasih sayang, kreativitas, dan nilai-nilai luhur sejak dini.
              </p>
            </div>
            <div>
              <h4 className="font-black mb-4 gradient-text section-label">MENU CEPAT</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button onClick={() => scrollTo(link.id)} className="text-blue-300 hover:text-orange-300 text-sm transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-black mb-4 gradient-text section-label">INFORMASI</h4>
              <ul className="space-y-2 text-blue-300 text-sm">
                <li>📍 Bangsi, Singosari, Malang</li>
                <li>📞 +62 812-3456-7890</li>
                <li>🕐 Sen–Sab, 07:00–12:00</li>
                <li>📧 melati.bangsi@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-900/60 pt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-blue-500 text-xs">
              © 2026 Pos PAUD Melati Bangsi. Hak cipta dilindungi. Dibuat dengan 💙 untuk pendidikan anak Indonesia.
            </p>
            <p className="text-blue-600 text-xs">Di bawah naungan Kemendikbud RI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
