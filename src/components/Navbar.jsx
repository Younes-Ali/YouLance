import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase, Menu, X, ChevronDown,
  Zap, Clock, DollarSign, BarChart2, Shield, Users,
  Target, Rocket, Heart, Award,
  LayoutDashboard, PieChart, ListChecks, FileText,
  Mail, MessageCircle, Twitter, HelpCircle,
  FolderKanban,
} from "lucide-react";
import { glass } from "../../public/styles/PublicStyles";
import useGetUser from "../hooks/useGetUser";


/* ─────────────────────────── NAV CONFIG ─────────────────────────── */
const navLinks = [
  {
    label: "Home",
    to: "/",
    dropdown: [
      { icon: <Zap size={15} />, label: "Features", desc: "Everything FreeLance offers", to: "/#features", color: "text-indigo-400" },
      { icon: <DollarSign size={15} />, label: "Pricing", desc: "Plans for every freelancer", to: "/#pricing", color: "text-violet-400" },
      { icon: <Clock size={15} />, label: "How It Works", desc: "Get started in minutes", to: "/#how-it-works", color: "text-cyan-400" },
      { icon: <Users size={15} />, label: "Testimonials", desc: "What our users say", to: "/#testimonials", color: "text-pink-400" },
    ],
  },
  {
    label: "About",
    to: "/about",
    dropdown: [
      { icon: <Target size={15} />, label: "Our Mission", desc: "Why we built FreeLance", to: "/about#mission", color: "text-indigo-400" },
      { icon: <Rocket size={15} />, label: "Our Story", desc: "From side project to platform", to: "/about#story", color: "text-violet-400" },
      { icon: <Heart size={15} />, label: "The Team", desc: "Meet the people behind it", to: "/about#team", color: "text-pink-400" },
      { icon: <Award size={15} />, label: "Recognition", desc: "Press & investors", to: "/about#recognition", color: "text-amber-400" },
    ],
  },
  {
    label: "Dashboard",
    to: "/dashboard",
    dropdown: [
      { icon: <LayoutDashboard size={15} />, label: "Overview", desc: "Your freelance at a glance", to: "/dashboard", color: "text-blue-400" },
      { icon: <FolderKanban size={15} />, label: "Projects", desc: "Track all active work", to: "/dashboard/projects", color: "text-violet-400" },
      { icon: <Users size={15} />, label: "Clients", desc: "Earnings & performance", to: "/dashboard/clients", color: "text-cyan-400" },
      { icon: <FileText size={15} />, label: "Invoices", desc: "Create & manage invoices", to: "/dashboard/invoices", color: "text-emerald-400" },
      { icon: <Clock size={15} />, label: "Time", desc: "Save your time", to: "/dashboard/time", color: "text-amber-400" },
      { icon: <PieChart size={15} />, label: "Analytics", desc: "Earnings & performance", to: "/dashboard/analytics", color: "text-pink-400" },
    ],
  },
  {
    label: "Contact Us",
    to: "/contact",
    dropdown: [
      { icon: <Mail size={15} />, label: "Email", desc: "hello@freelanceapp.io", to: "/contact#email", color: "text-indigo-400" },
      { icon: <MessageCircle size={15} />, label: "Live Chat", desc: "We reply in under 2 hours", to: "/contact#chat", color: "text-emerald-400" },
      { icon: <Twitter size={15} />, label: "Twitter / X", desc: "@freelanceapp", to: "/contact#getintoutch", color: "text-cyan-400" },
      { icon: <HelpCircle size={15} />, label: "Help Center", desc: "Browse docs & guides", to: "/contact#getintoutch", color: "text-violet-400" },
    ],
  },
];


const token = localStorage.getItem('token') || sessionStorage.getItem('token');

/* ─────────────────────────── SMART NAVIGATE HOOK ─────────────────────────── */
// Handles both plain routes (/dashboard) and hash routes (/#features, /about#team)
function useSmartNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (to, onDone) => {
    const hashIndex = to.indexOf("#");

    // No hash → normal navigation
    if (hashIndex === -1) {
      navigate(to);
      onDone?.();
      return;
    }

    const path   = to.slice(0, hashIndex) || "/";   // e.g. "/" or "/about"
    const hash   = to.slice(hashIndex + 1);          // e.g. "features"

    const scrollToHash = () => {
      // Small delay so page renders before we scroll
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    };

    if (location.pathname === path) {
      // Already on the right page → just scroll
      scrollToHash();
    } else {
      // Navigate first, then scroll after render
      navigate(path);
      // Wait for React to paint the new page
      setTimeout(scrollToHash, 300);
    }

    onDone?.();
  };
}

/* ─────────────────────────── DROPDOWN ITEM ─────────────────────────── */
function DropdownItem({ item, onNavigate }) {
  return (
    <button
      onClick={() => onNavigate(item.to)}
      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/6 group transition-all duration-150 text-left"
    >
      <div className={`w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center shrink-0 ${item.color} group-hover:bg-white/10 transition-all duration-150`}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/90 text-sm font-semibold leading-none mb-0.5">{item.label}</p>
        <p className="text-white/35 text-xs truncate">{item.desc}</p>
      </div>
      <ChevronDown size={12} className="text-white/20 -rotate-90 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
    </button>
  );
}

/* ─────────────────────────── DROPDOWN MENU ─────────────────────────── */
function DropdownMenu({ items, visible, onNavigate }) {
  return (
    <div
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 rounded-2xl bg-[#080820]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-200 overflow-hidden
        ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
    >
      {/* Top shine */}
      <div className="absolute top-0 left-4 right-4 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
      <div className="p-2">
        {items.map((item) => (
          <DropdownItem key={item.label} item={item} onNavigate={onNavigate} />
        ))}
      </div>
      {/* Bottom glow */}
      <div className="h-px mx-4 bg-linear-to-r from-transparent via-indigo-500/20 to-transparent" />
    </div>
  );
}

/* ─────────────────────────── MAIN NAVBAR ─────────────────────────── */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();
  const smartNavigate = useSmartNavigate();

  const { user, loading, error } = useGetUser();



  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close mobile menu on route change
  useEffect(() => { setOpen(false); setMobileExpanded(null); }, [location]);

  const handleMouseEnter = (label) => {
    clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (link) =>
    location.pathname === link.to || location.pathname.startsWith(link.to + "/");

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050510]/85 backdrop-blur-2xl border-b border-white/10 py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.9)] transition-all duration-300">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">
            You<span className="text-indigo-400">Lance</span>
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(link.label)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={link.to}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 tracking-wide
                  ${isActive(link) && link.to !== "/"
                    ? "text-white bg-white/8"
                    : location.pathname === "/" && link.to === "/"
                    ? "text-white bg-white/8"
                    : "text-white/55 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180 text-indigo-400" : "text-white/30"}`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {link.dropdown && (
                <DropdownMenu
                  items={link.dropdown}
                  visible={activeDropdown === link.label}
                  onNavigate={(to) => {
                    setActiveDropdown(null);
                    smartNavigate(to);
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ── */}

        {
          !user?(
              <div className="hidden md:flex items-center gap-3 shrink-0">
                <Link to={"/signin"} className="text-white/60 hover:text-white text-sm font-medium transition-colors px-4 py-2">
                  Sign In
                </Link>
                <Link to={"/signup"} className="relative px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group">
                  <span className="absolute inset-0 bg-linear-to-r from-indigo-600 to-violet-600 group-hover:from-indigo-500 group-hover:to-violet-500 transition-all duration-300" />
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15),transparent_70%)] transition-opacity duration-300" />
                  <span className="relative">Get Started Free</span>
                </Link>
              </div>
          ):(
                  <div className="hidden pt-2 pb-1 px-1 md:flex flex-col gap-2">
                    <span className="bg-linear-to-r from-indigo-600 to-violet-600 text-white text-center flex-1 py-3 px-3 rounded-xl border border-white/10 text-lg font-semibold transition-colors">
                      {loading ? "Loading..." : error ? "Error loading user" : `Hello, ${user.username.split(" ")[0].charAt(0).toUpperCase() + user.username.split(" ")[0].slice(1) || "User"}`}
                    </span>
                    <span className="text-white/50 text-center flex-1 py-3 px-3 text-sm font-semibold transition-colors">
                      {loading ? "Loading..." : error ? "Error loading user" : `${user.email || "User@gmail.com"}`}
                    </span>
                  </div>
                )
        }
        

        {/* ── Mobile Toggle ── */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ══ Mobile Menu ══ */}
      {open && (
        <div className={`md:hidden mt-3 mx-4 rounded-2xl ${glass} overflow-hidden`}>
          <div className="p-3">
            {navLinks.map((link) => (
              <div key={link.label}>
                {/* Main link row */}
                <div className="flex items-center justify-between">
                  <Link
                    to={link.to}
                    className={`flex-1 py-3 px-3 text-sm font-semibold rounded-xl transition-colors duration-150 ${
                      isActive(link) ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <button
                      className="p-3 text-white/30 hover:text-white/70 transition-colors"
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                      }
                    >
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${mobileExpanded === link.label ? "rotate-180 text-indigo-400" : ""}`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile dropdown items */}
                {link.dropdown && mobileExpanded === link.label && (
                  <div className="mb-2 mx-1 rounded-xl bg-white/3 border border-white/6 overflow-hidden">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setOpen(false);
                          setMobileExpanded(null);
                          smartNavigate(item.to);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 text-left"
                      >
                        <span className={item.color}>{item.icon}</span>
                        <div>
                          <p className="text-white/80 text-xs font-semibold">{item.label}</p>
                          <p className="text-white/30 text-xs">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            {
              !user ? (
              <div className="pt-2 pb-1 px-1 flex gap-2">
                <Link 
                  to={"/signin"}
                  className="text-center flex-1 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white text-sm font-semibold transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to={"/signup"}
                  className="text-center flex-1 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(99,102,241,0.3)]"
                >
                    Get Started
                </Link>
              </div>

              ):(
                  <div className="pt-2 pb-1 px-1 flex flex-col gap-2">
                    <span className="bg-linear-to-r from-indigo-600 to-violet-600 text-white text-center flex-1 py-3 rounded-xl border border-white/10 text-sm font-semibold transition-colors">
                      {loading ? "Loading..." : error ? "Error loading user" : `Hello, ${user.username.split(" ")[0].charAt(0).toUpperCase() + user.username.split(" ")[0].slice(1) || "User"}`}
                    </span>
                    <span className="text-white/50 text-center flex-1 py-3 px-3 text-sm font-semibold transition-colors">
                      {loading ? "Loading..." : error ? "Error loading user" : `${user.email || "User@gmail.com"}`}
                    </span>
                  </div>
                )
            }
          </div>
        </div>
      )}
    </nav>
  );
}