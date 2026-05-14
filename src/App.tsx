import { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Star,
  Zap,
  Droplets,
  Paintbrush,
  Wrench,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Instagram,
  Facebook,
  MessageCircle,
  Upload,
  Clock,
  Shield,
  TrendingUp,
  Hammer,
  Home as HomeIcon,
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Por qué nosotros', href: '#porquenos' },
  { label: 'Reseñas', href: '#resenas' },
  { label: 'Contacto', href: '#contacto' },
];

const SERVICES = [
  {
    icon: Zap,
    title: 'Electricidad',
    desc: 'Instalaciones, reparaciones y mantenimiento eléctrico seguro y confiable.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: Droplets,
    title: 'Plomería',
    desc: 'Tuberías, grifos, desagües y sistemas de agua potable en perfecto estado.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Paintbrush,
    title: 'Pintura',
    desc: 'Pintura interior y exterior con acabados profesionales de alta calidad.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Wrench,
    title: 'Reparaciones Generales',
    desc: 'Todo tipo de reparaciones del hogar con atención al detalle.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Hammer,
    title: 'Instalaciones',
    desc: 'Muebles, puertas, ventanas y otros elementos en tu hogar.',
    color: 'from-gray-600 to-slate-500',
  },
  {
    icon: Clock,
    title: 'Mantenimiento Preventivo',
    desc: 'Mantenimiento regular para evitar problemas mayores en el futuro.',
    color: 'from-green-500 to-emerald-500',
  },
];

const PROJECTS = [
  {
    title: 'Reparación de Pared',
    category: 'Reparaciones',
    before: 'https://images.pexels.com/photos/1454496/pexels-photo-1454496.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Pintura Interior',
    category: 'Pintura',
    before: 'https://images.pexels.com/photos/1707823/pexels-photo-1707823.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Instalación de Grifo',
    category: 'Plomería',
    before: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=600',
    after: 'https://images.pexels.com/photos/3584705/pexels-photo-3584705.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

const WHY_US = [
  { icon: Shield, text: 'Trabajo limpio y profesional' },
  { icon: Clock, text: 'Atención rápida en Xela' },
  { icon: TrendingUp, text: 'Precios transparentes' },
  { icon: CheckCircle, text: 'Garantía de servicio' },
  { icon: Star, text: 'Materiales de calidad' },
  { icon: Hammer, text: 'Experiencia residencial' },
];

const TESTIMONIALS = [
  {
    name: 'Juan García',
    text: 'Excelente servicio, llegaron a tiempo y dejaron todo perfecto. Muy profesionales.',
    stars: 5,
    img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'María López',
    text: 'Repararon la fuga en mi baño rápidamente. Recomiendo ampliamente su trabajo.',
    stars: 5,
    img: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Carlos Sánchez',
    text: 'Presupuesto justo y sin sorpresas. Muy satisfecho con el mantenimiento de mi hogar.',
    stars: 5,
    img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const EMERGENCY_SERVICES = [
  { title: 'Fugas de agua', icon: Droplets },
  { title: 'Problemas eléctricos', icon: Zap },
  { title: 'Daños estructurales', icon: AlertCircle },
  { title: 'Filtraciones de agua', icon: Droplets },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ nombre: '', telefono: '', correo: '', servicio: '', mensaje: '' });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingSent, setRatingSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImages((prev) => [...prev, event.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (fileInputRef.current) {
      fileInputRef.current.files = files;
      handleImageUpload({ target: { files } } as any);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setFormSent(true);
    setFormLoading(false);
    setFormData({ nombre: '', telefono: '', correo: '', servicio: '', mensaje: '' });
    setUploadedImages([]);
  };

  const whatsappMessage = `Hola, necesito una cotización para mantenimiento residencial. Mi problema es: ${formData.mensaje || 'Por favor, contáctenme'}`;

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    await new Promise((r) => setTimeout(r, 1000));
    setRatingSent(true);
    setTimeout(() => {
      setRatingOpen(false);
      setRating(0);
      setRatingComment('');
      setRatingSent(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-950 text-white overflow-x-hidden font-sans">
      {/* RATING MODAL */}
      {ratingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-amber-500/50 rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-2">Califica nuestro servicio</h3>
            <p className="text-gray-400 text-sm mb-6">Tu opinión es importante para nosotros</p>

            {ratingSent ? (
              <div className="text-center py-8">
                <CheckCircle size={40} className="text-green-400 mx-auto mb-3" />
                <p className="font-semibold">¡Gracias por tu reseña!</p>
              </div>
            ) : (
              <>
                <div className="flex justify-center gap-3 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`transition-all transform hover:scale-125 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-600 hover:text-amber-300'
                      }`}
                    >
                      <Star size={32} />
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Comparte tu experiencia (opcional)"
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4 resize-none"
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setRatingOpen(false)}
                    className="flex-1 px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleRatingSubmit}
                    disabled={rating === 0}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 disabled:from-gray-600 disabled:to-gray-700 text-gray-900 font-bold rounded-lg transition-all"
                  >
                    Enviar reseña
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FLOATING BUTTONS CONTAINER */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button
          onClick={() => setRatingOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/80 transition-all hover:scale-110 hover:from-yellow-300 hover:to-yellow-500"
          title="Calificar"
        >
          <Star size={24} className="fill-white text-white" />
        </button>
        <a
          href={`https://wa.me/50247338991?text=${encodeURIComponent(whatsappMessage)}`}
          className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 hover:shadow-green-500/80 transition-all hover:scale-110 animate-pulse"
          title="WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-gray-950/95 backdrop-blur-md shadow-lg shadow-amber-500/10 py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo('#inicio')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center font-bold text-lg text-gray-900">
              <HomeIcon size={20} />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              MANTENIMIENTO RESIDENCIAL MORAN-XELA
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-amber-400 bg-white/10'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contacto')}
              className="ml-4 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-900 font-bold rounded-lg text-sm transition-all shadow-lg shadow-amber-500/30"
            >
              Cotizar
            </button>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-gray-950 border-t border-amber-500/20 px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-amber-400 hover:bg-white/10 rounded-lg text-sm"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contacto')}
              className="w-full mt-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold rounded-lg text-sm"
            >
              Cotizar
            </button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/image.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-2 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <a
  href="https://www.google.com/maps/place/14%C2%B050'52.1%22N+91%C2%B032'54.5%22W/@14.8478043,-91.5491241,192m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d14.847803!4d-91.548479?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D"
  target="_blank"
  rel="noopener noreferrer"
            >
            <div className="inline-flex items-center gap-1 bg-green-400 backdrop-blur-md border border-black rounded-full px-4 py-1.5 text-gray-700 text-sm font-bold mb-6">
              <MapPin size={14} />
              Xela, Quetzaltenango
            </div>
            </a>
            <h1 className="text-5xl md:text-5xl font-black leading-tight mb-3 tracking-tight">
            <span className="text-gray-200 drop-shadow-2xl">Mantenimiento</span>
            <br />
            <span className="text-gray-300 drop-shadow-2xl">Residencial</span>
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
            MORAN-XELA
            </span>
            </h1>
            <p 
              onClick={() => scrollTo('#proyectos')}
              className="flex flex-wrap items-center justify-center gap-1 max-w-xl bg-amber-500 backdrop-blur-md border border-amber-400 rounded-full px-4 py-2 text-gray-800 text-xl font-bold mb-3 text-center transition-all duration-300 hover:scale-105 hover:bg-amber-400 hover:shadow-2xl hover:shadow-amber-500 cursor-pointer">
              Mantenimiento, reparaciones, pintura, plomería y electricidad. Atención rápida, trabajo profesional y precios justos.
              <ArrowRight size={18} />
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo('#contacto')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-200 text-gray-900 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-1"
              >
                Solicitar cotización
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('#contacto')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-400 hover:to-blue-200 text-gray-900 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-1"
              >
                <Upload size={18} />
                Enviar fotos
              </button>
              <a
                href="https://wa.me/50247338991"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-400 hover:from-green-400 hover:to-green-300 text-gray-900 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/40 hover:shadow-green-200/60 hover:-translate-y-1"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="relative hidden md:flex justify-center items-center"></div>
        </div>

        <button
          onClick={() => scrollTo('#servicios')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400 hover:text-amber-300 transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* SERVICES */}
      <section id="servicios" className="py-24 relative bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Nuestros servicios</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-2 mb-4">
              Soluciones completas para <br /> tu hogar
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Desde reparaciones urgentes hasta mantenimiento preventivo, nos encargamos de todo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.title}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-amber-400/60 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-500/30 cursor-pointer hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${svc.color} mb-6 transition-all group-hover:scale-125 group-hover:rotate-12 shadow-lg`}>
                  <svc.icon size={28} className="text-white drop-shadow" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-amber-300 transition-colors">{svc.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMERGENCY SECTION */}
      <section className="py-24 relative bg-gradient-to-b from-gray-950 to-red-950/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-red-600/30 to-orange-600/20 border border-red-500/50 rounded-3xl p-12 backdrop-blur-lg shadow-2xl shadow-red-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-red-500/40 hover:border-red-400/70">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-red-400 text-sm font-medium mb-6">
                  <AlertCircle size={14} />
                  Emergencias 24/7
                </div>
                <h2 className="text-5xl font-extrabold mb-4">
                  Servicios de <span className="text-red-400">emergencia</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Fugas, apagones, daños estructurales y filtraciones. Respuesta rápida en Xela.
                </p>
                <a
                  href="https://wa.me/50247338991?text=EMERGENCIA:%20necesito%20asistencia%20inmediata"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/40"
                >
                  <Phone size={18} />
                  Llamar ahora
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {EMERGENCY_SERVICES.map((svc) => (
                  <div key={svc.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-red-500/50 transition-all hover:bg-red-500/10">
                    <svc.icon size={28} className="text-red-400 mb-3" />
                    <p className="font-semibold text-sm">{svc.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE AFTER PROJECTS */}
      <section id="proyectos" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Nuestro trabajo</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-2 mb-4">
              Transformaciones que inspiran
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <div key={project.title} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative overflow-hidden rounded-lg h-48">
                      <img
                        src={project.before}
                        alt="Antes"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-gray-900/80 px-3 py-1 rounded-full text-xs font-semibold text-gray-300">
                        Antes
                      </span>
                    </div>
                    <div className="relative overflow-hidden rounded-lg h-48">
                      <img
                        src={project.after}
                        alt="Después"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 bg-amber-500/90 px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                        Después
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-1">{project.title}</h3>
                <p className="text-amber-400 text-sm">{project.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="porquenos" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Por qué nosotros</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-2 mb-4">
              Confianza con resultados
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item) => (
              <div key={item.text} className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/50 rounded-2xl p-8 transition-all hover:bg-amber-500/10">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon size={24} className="text-white" />
                </div>
                <p className="font-semibold text-lg">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4">
              Cómo funciona
            </h2>
            <p className="text-gray-400 text-lg">Tres sencillos pasos para tu cotización</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Envíanos fotos', desc: 'Comparte imágenes del problema o área a reparar.' },
              { step: '02', title: 'Recibe cotización', desc: 'Te enviamos presupuesto detallado sin costo.' },
              { step: '03', title: 'Agendamos visita', desc: 'Coordinamos fecha y hora que te convenga.' },
            ].map((item) => (
              <div key={item.step} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-gray-900 font-extrabold text-2xl mb-6 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & RATINGS */}
      <section id="resenas" className="py-24 relative bg-gradient-to-b from-gray-950 via-blue-950/20 to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Lo que dicen</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-2 mb-4">
              Testimonios de clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-amber-400/60 rounded-2xl p-8 transition-all hover:bg-gradient-to-br hover:from-white/15 hover:to-white/10 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-2">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/40 group-hover:border-amber-400/80 transition-all" />
                  <div>
                    <p className="font-bold text-white">{t.name}</p>
                    <p className="text-gray-400 text-xs">Cliente verificado</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => setRatingOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60 hover:-translate-y-1"
            >
              <Star size={20} className="fill-current" />
              Califica nuestro servicio
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-24 relative bg-gradient-to-b from-gray-950 to-blue-950/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-widest">Contacto</span>
            <h2 className="text-5xl md:text-6xl font-extrabold mt-2 mb-4">
              Solicita tu cotización
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Información de contacto</h3>
                {[
                  { icon: Phone, label: 'Teléfono', value: '+502 4733 8991', href: 'tel:' },
                  { icon: MessageCircle, label: 'WhatsApp', value: '+502 4733 8991', href: 'https://wa.me/50247338991' },
                  { icon: Mail, label: 'Correo', value: 'moranworkemail@gmail.com', href: 'mailto:' },
                  { icon: MapPin, label: 'Ubicación', value: 'Xela, Quetzaltenango', href: '#' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <a href={item.href + item.value} className="font-semibold text-lg hover:text-amber-400 transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-gray-300 mb-4">Horarios de atención:</p>
                <div className="space-y-2 text-sm">
                  <p><span className="text-amber-400">Lunes - Viernes:</span> 7:00 AM - 6:00 PM</p>
                  <p><span className="text-amber-400">Sábado:</span> 8:00 AM - 4:00 PM</p>
                  <p><span className="text-amber-400">Emergencias:</span> 24/7</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Envíanos tu solicitud</h3>

              {formSent ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-500/20 border border-green-500/50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Solicitud enviada</h4>
                  <p className="text-gray-400 mb-6">Nos pondremos en contacto pronto. Gracias!</p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="px-6 py-2 border border-amber-500/50 text-amber-400 rounded-lg hover:bg-amber-500/10 transition-all"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                    <input
                      type="tel"
                      placeholder="Tu teléfono"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  />
                  <select
                    required
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                    className="w-full bg-gray-500 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="electricidad">Electricidad</option>
                    <option value="plomeria">Plomería</option>
                    <option value="pintura">Pintura</option>
                    <option value="reparaciones">Reparaciones Generales</option>
                    <option value="instalaciones">Instalaciones</option>
                    <option value="mantenimiento">Mantenimiento Preventivo</option>
                    <option value="emergencia">Emergencia</option>
                  </select>
                  <textarea
                    placeholder="Describe tu problema o necesidad"
                    required
                    rows={4}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition resize-none"
                  />

                  {/* Image Upload */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="border-2 border-dashed border-amber-500/50 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500 hover:bg-amber-500/5 transition-all"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <div onClick={() => fileInputRef.current?.click()}>
                      <Upload size={24} className="mx-auto mb-2 text-amber-400" />
                      <p className="text-sm font-medium">Arrastra fotos o haz clic aquí</p>
                      <p className="text-xs text-gray-500 mt-1">Envíanos fotos del problema para cotización más rápida</p>
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden border border-white/10">
                          <img src={img} alt={`Preview ${idx}`} className="w-full h-20 object-cover" />
                          <button
                            type="button"
                            onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== idx))}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={formLoading}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:from-amber-600 disabled:to-orange-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/60"
                  >
                    {formLoading ? 'Enviando...' : 'Enviar solicitud'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center font-bold">
                  M
                </div>
                <span className="font-bold">Mantenimiento Xela</span>
              </div>
              <p className="text-gray-400 text-sm">Servicio profesional de mantenimiento y reparación residencial en Xela.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Electricidad', 'Plomería', 'Pintura', 'Reparaciones'].map((s) => (
                  <li key={s} className="hover:text-amber-400 transition-colors"><button onClick={() => scrollTo('#servicios')}>{s}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => scrollTo('#porquenos')} className="hover:text-amber-400 transition-colors">Por qué nosotros</button></li>
                <li><button onClick={() => scrollTo('#proyectos')} className="hover:text-amber-400 transition-colors">Nuestros proyectos</button></li>
                <li><button onClick={() => scrollTo('#contacto')} className="hover:text-amber-400 transition-colors">Contacto</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Phone size={14} /> +502 4733 8991</li>
                <li className="flex items-center gap-2"><Mail size={14} /> moranworkemail@gmail.com</li>
                <li className="flex items-center gap-2"><MapPin size={14} /><a href="https://www.google.com/maps/place/14%C2%B050'52.1%22N+91%C2%B032'54.5%22W/@14.8478043,-91.5491241,192m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d14.847803!4d-91.548479?entry=ttu&g_ep=EgoyMDI2MDUxMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">9na Calle y 8va Avenida 7A-89, Colonia Los Cerezales, Zona 9 Xela.</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 Mantenimiento Xela. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-300 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Términos</a>
              <div className="flex gap-3">
                <a href="#" className="hover:text-amber-300 transition-colors"><Facebook size={18} /></a>
                <a href="#" className="hover:text-amber-300 transition-colors"><Instagram size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
