"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Award,
  Sparkles,
  Code,
  Database,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Menu,
  X,
  ArrowUpRight,
  Download,
  Send,
  Terminal,
  Layers,
  Globe,
  Star,
  ChevronRight,
  Shield,
  Zap,
  CreditCard,
  Bell,
  Users
} from "lucide-react";

// Local brand icons since newer versions of lucide-react do not export them
const Github = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Types
interface Project {
  name: string;
  url: string;
  image: string;
  description: string;
  tech: string[];
  platform: string
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export default function Portfolio() {
  // Navigation State
  const [navActive, setNavActive] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Typewriter Effect
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "React Native Developer",
    "Mobile App Developer",
    "React & Next.js Developer",
    "Full Stack Learner"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "skills", "experience", "projects", "achievements", "services", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const typeSpeed = isDeleting ? 30 : 80;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 1500); // Wait before delete
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typeSpeed);
    };

    timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  // Download Resume Action (creates a mock file download)
  const handleDownloadResume = () => {
    const resumeText = `JEEVAN BHARGAV - REACT NATIVE DEVELOPER RESUME
Email: jeevanhargav286@gmail.com
Phone: +91 8435689116
Location: Indore, MP, India
Degree: B.Tech (Computer Science) - 2025
Experience: 1+ Year at Ideal IT Techno Pvt Ltd

TECHNICAL SKILLS:
- Mobile Development: React Native, React Native Expo (Core Specialist)
- Web Development: React JS, Next JS, HTML, CSS
- Backend & DB: Node JS, Express JS, Firebase, MongoDB
- APIs & Services: Stripe Payment, Push Notifications, Firebase Chat

For the complete visual profile, visit: https://jeevan-bhargav-portfolio.vercel.app`;

    const blob = new Blob([resumeText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Jeevan_Bhargav_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Portfolio Data
  const skillCategories: SkillCategory[] = [
    {
      title: "Mobile Development & Core",
      icon: <Smartphone className="text-cyan-400 w-5 h-5" />,
      skills: [
        { name: "React Native (Core)", level: 95 },
        { name: "React Native Expo", level: 95 },
        { name: "React JS", level: 85 },
        { name: "Next JS", level: 80 },
      ]
    },
    {
      title: "Backend & Systems",
      icon: <Database className="text-purple-400 w-5 h-5" />,
      skills: [
        { name: "Node JS", level: 70 },
        { name: "Express JS", level: 75 },
        { name: "Firebase (DB/Auth)", level: 85 },
      ]
    },
    {
      title: "Styling & Foundations",
      icon: <Code className="text-cyan-400 w-5 h-5" />,
      skills: [
        { name: "HTML5", level: 90 },
        { name: "CSS3 / Sass", level: 85 },
        { name: "Tailwind CSS", level: 90 },
      ]
    }
  ];

  const projects: Project[] = [
    {
      name: "KickScore",
      url: "https://kickscore.ng/",
      image: "/projects/kickscore.jpg",
      description: "Real-time sports score tracker app and web platform built using Expo Web code, delivering low-latency updates.",
      tech: ["React Native Expo", "Expo Web", "Push Notifications", "Firebase", "API Integration"],
      platform: "iOS, Android & Web"
    },
    {
      name: "Visualible",
      url: "https://play.google.com/store/apps/details?id=com.visualible",
      image: "/projects/visualible.jpg",
      description: "Next-gen immersive visual management application optimized for interactive and highly responsive devices.",
      tech: ["React Native Expo", "Firebase Auth", "Custom UI", "Stripe Payment"],
      platform: "iOS & Android"
    },
    {
      name: "My Fairly",
      url: "https://apps.apple.com/us/app/my-fairly/id6747285778",
      image: "/projects/myfairly.jpg",
      description: "Premium iOS mobile application built to provide specialized concierge and payment management flows.",
      tech: ["React Native", "Stripe payment", "iOS App Support", "Firebase"],
      platform: "iOS"
    },
    {
      name: "IQONS",
      url: "https://play.google.com/store/apps/details?id=com.iqons.app",
      image: "/projects/iqons.jpg",
      description: "Premium social matching and brand display workspace with robust security and fast-loading profiles.",
      tech: ["React Native Expo", "One-to-one chat", "Group Chat", "Firebase Integration"],
      platform: "iOS & Android"
    }
  ];

  const responsibilities = [
    "Mobile app development from scratch, maintaining clean component architecture.",
    "Responsive screen creation and high-fidelity custom UI layout implementation.",
    "Integrated Firebase services including Realtime Database, Firestore, and Authentication.",
    "Implemented real-time chat architecture supporting Group Chat & One-to-One Chat.",
    "Configured custom Push Notifications and Chat Notification listeners.",
    "Configured secure Stripe Payment Gateway integrations for in-app micro-payments.",
    "API integration with secure backend systems and low-latency fetch layers.",
    "Debugging, performance optimization, and app store deployment support."
  ];

  const services = [
    {
      title: "Mobile App Development",
      description: "Creating highly optimized native Android & iOS applications using React Native.",
      icon: <Smartphone className="text-cyan-400 w-8 h-8" />
    },
    {
      title: "React Native Specialist",
      description: "Building responsive screens, customized UI, and complex navigation graphs.",
      icon: <Layers className="text-purple-400 w-8 h-8" />
    },
    {
      title: "Firebase Integration",
      description: "Deploying high-speed backends, cloud database synchronization, and user authorization.",
      icon: <Terminal className="text-cyan-400 w-8 h-8" />
    },
    {
      title: "Payment Gateway Setup",
      description: "Integrating Stripe payment systems with secure checkout and processing flows.",
      icon: <CreditCard className="text-purple-400 w-8 h-8" />
    },
    {
      title: "Push Notifications",
      description: "Configuring real-time alerts, trigger events, and device notification channels.",
      icon: <Bell className="text-cyan-400 w-8 h-8" />
    },
    {
      title: "API Integrations",
      description: "Connecting mobile frontends to REST APIs with secure middleware layers.",
      icon: <Globe className="text-purple-400 w-8 h-8" />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030014] overflow-x-hidden bg-grid text-slate-200">

      {/* Dynamic Backlight Spheres */}
      <div className="absolute top-[-10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-[30%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-800/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "glassmorphism py-4 shadow-lg border-b border-white/5" : "py-6 bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 group">
            <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-brand-bg font-bold text-lg shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-transform duration-300 group-hover:scale-105">
              JB
            </span>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
              Jeevan Bhargav
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {["home", "about", "skills", "experience", "projects", "achievements", "services", "contact"].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className={`text-sm tracking-wider uppercase transition-colors duration-300 relative ${activeSection === sec ? "text-cyan-400 font-medium" : "text-slate-400 hover:text-white"}`}
              >
                {sec}
                {activeSection === sec && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Social Icons (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="mailto:jeevanhargav286@gmail.com" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 text-slate-300 hover:text-cyan-400 transition-all duration-300">
              <Mail size={18} />
            </a>
            <a href="tel:+918435689116" className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-950/20 text-slate-300 hover:text-purple-400 transition-all duration-300">
              <Phone size={18} />
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setNavActive(!navActive)}
            aria-label="Toggle menu"
          >
            {navActive ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {navActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[73px] left-0 w-full z-40 md:hidden glassmorphism py-6 border-b border-white/10 shadow-2xl"
          >
            <div className="flex flex-col space-y-4 px-6">
              {["home", "about", "skills", "experience", "projects", "achievements", "services", "contact"].map((sec) => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  onClick={() => setNavActive(false)}
                  className={`text-base font-medium uppercase tracking-wider transition-colors py-2 border-b border-white/5 ${activeSection === sec ? "text-cyan-400" : "text-slate-300 hover:text-white"}`}
                >
                  {sec}
                </a>
              ))}
              <div className="flex space-x-4 pt-4">
                <a href="mailto:jeevanhargav286@gmail.com" className="flex items-center space-x-2 text-sm text-cyan-400 hover:underline">
                  <Mail size={16} /> <span>Email Me</span>
                </a>
                <a href="tel:+918435689116" className="flex items-center space-x-2 text-sm text-purple-400 hover:underline">
                  <Phone size={16} /> <span>Call Me</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase self-center lg:self-start w-fit shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            >
              <Sparkles size={12} className="animate-spin-slow" />
              <span>Available for Hire & Projects</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white"
              >
                Hi, I'm <br className="sm:hidden" />
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                  Jeevan Bhargav
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-semibold text-slate-300 tracking-wide"
              >
                React Native Application Developer
              </motion.h2>
            </div>

            {/* Typing Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-10 text-lg sm:text-xl text-slate-400 flex items-center justify-center lg:justify-start"
            >
              <span className="font-mono text-cyan-400/90">&gt;&nbsp;</span>
              <span className="font-mono text-slate-200 typing-cursor">{currentText}</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-400 max-w-lg text-base leading-relaxed mx-auto lg:mx-0"
            >
              Specializing in native mobile UI, push notifications, Stripe payments, and backend synchronization. Crafting award-winning apps.
            </motion.p>

            {/* Buttons CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="/resume.jpg"
                download="Jeevan_Bhargav_Resume.jpg"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.02]"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl glassmorphism hover:bg-white/5 border border-white/10 text-white font-semibold text-sm hover:border-cyan-400/50 transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.02]"
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={16} className="text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Image with glowing frame */}
          <div className="lg:col-span-5 flex justify-center items-center z-10 mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl p-1 bg-gradient-to-tr from-cyan-400 via-transparent to-purple-500 glow-cyan animate-float shadow-[0_0_40px_rgba(0,240,255,0.15)]"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0a0718]">
                <Image
                  src="/jeevan_profile.jpg"
                  alt="Jeevan Bhargav"
                  fill
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-700 filter contrast-[1.05]"
                  priority
                />

                {/* Decorative scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 top-0 left-0 w-full h-1/2 pointer-events-none opacity-40 animate-pulse"></div>

                {/* Floating tags */}
                <div className="absolute bottom-4 left-4 right-4 glassmorphism px-4 py-2.5 rounded-2xl flex items-center justify-between border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></div>
                    <span className="text-xs text-slate-300 font-medium">Remote & Onsite</span>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">React Native Expert</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Get to Know Me
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">About Me</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column - Graphic/Highlight card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glassmorphism p-8 rounded-3xl relative border border-white/5 glow-purple"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-400/30">
                  <Briefcase size={22} />
                </div>

                <h4 className="text-xl font-bold text-white mb-6 pl-4">Professional Snapshot</h4>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1 w-6 h-6 rounded bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-mono text-xs">01</div>
                    <div>
                      <h5 className="font-semibold text-slate-200 text-sm">Experience</h5>
                      <p className="text-slate-400 text-sm">1+ Year at Ideal IT Techno Pvt Ltd</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-1 w-6 h-6 rounded bg-purple-400/10 flex items-center justify-center text-purple-400 font-mono text-xs">02</div>
                    <div>
                      <h5 className="font-semibold text-slate-200 text-sm">Specialization</h5>
                      <p className="text-slate-400 text-sm">Cross-platform React Native Mobile Apps</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-1 w-6 h-6 rounded bg-cyan-400/10 flex items-center justify-center text-cyan-400 font-mono text-xs">03</div>
                    <div>
                      <h5 className="font-semibold text-slate-200 text-sm">Education</h5>
                      <p className="text-slate-400 text-sm">B.Tech in Computer Science (2025)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="mt-1 w-6 h-6 rounded bg-purple-400/10 flex items-center justify-center text-purple-400 font-mono text-xs">04</div>
                    <div>
                      <h5 className="font-semibold text-slate-200 text-sm">Location</h5>
                      <p className="text-slate-400 text-sm">Indore, Madhya Pradesh, India</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Text Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h4 className="text-2xl font-bold text-white">
                  Passionate React Native Application Developer
                </h4>

                <p className="text-slate-400 text-base leading-relaxed">
                  I am a passionate React Native Application Developer with 1+ year of professional experience at
                  <strong className="text-cyan-400 font-semibold"> Ideal IT Techno Pvt Ltd</strong>.
                  I specialize in building scalable, high-performance mobile applications and modern web interfaces
                  using React Native, React.js and Next.js. I enjoy creating user-friendly experiences and solving
                  real-world problems through technology.
                </p>

                <p className="text-slate-400 text-base leading-relaxed">
                  My focus is on writing clean, modular, and reusable code, maintaining robust state machines,
                  and optimizing render pipelines for high FPS scrolling on both Android and iOS devices.
                </p>

                {/* Key Highlights grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "1+ Year Professional Experience",
                    "Native Mobile App Architect",
                    "Pixel-Perfect UI Implementation",
                    "Complex Firebase Chat Integrations",
                    "Payment & Subscription Flows",
                    "Store Deployments Support"
                  ].map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2.5">
                      <CheckCircle size={16} className="text-cyan-400 shrink-0" />
                      <span className="text-sm text-slate-300 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Capabilities
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Skills & Expertise</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-cyan-500/20 transition-all duration-300 group hover:glow-cyan"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/40 flex items-center justify-center border border-cyan-400/20 group-hover:border-cyan-400/50 transition-colors">
                    {category.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white">{category.title}</h4>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300 font-medium">{skill.name}</span>
                        <span className="text-cyan-400 font-mono font-medium">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Career Timeline
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Work Experience</h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-purple-500/30 pl-8 ml-4 sm:ml-6 md:pl-12 py-4">

              {/* Timeline dot */}
              <div className="absolute top-6 -left-[11px] w-5 h-5 rounded-full bg-[#030014] border-4 border-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
              </div>

              {/* Timeline Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glassmorphism p-8 rounded-3xl border border-white/5 glow-purple hover:border-purple-400/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-white">React Native Application Developer</h4>
                    <p className="text-purple-400 font-semibold mt-1">Ideal IT Techno Pvt Ltd</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold tracking-wider font-mono">
                      1+ Year Experience
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 mb-6 leading-relaxed">
                  Tasked with spearheading native components, layouts, push alerts, API bridges, payment logic,
                  and high-speed database bindings. Led standard feature creation and bug-fixing phases for Android
                  and iOS deployment.
                </p>

                <h5 className="font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                  <Terminal size={16} className="text-cyan-400" />
                  <span>Key Responsibilities & Deliverables:</span>
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {responsibilities.map((resp, index) => (
                    <div key={index} className="flex items-start space-x-2.5 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-sm text-slate-400 leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* Live Applications Section */}
      <section id="projects" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Portfolio Showcase
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Live Applications</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glassmorphism rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-400/30 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
              >

                {/* Visual Preview / Mobile Mockup Header */}
                <div className="relative h-64 w-full bg-gradient-to-b from-purple-950/20 to-black/40 overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
                  <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

                  {/* Subtle hover zoom image */}
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105 border border-white/10 glow-cyan">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Device Badges */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-semibold tracking-wider uppercase text-slate-300">
                    {project.platform}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.name}
                      </h4>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-400/20 text-cyan-400 font-mono text-[10px] font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Play store link */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 group/btn"
                  >
                    <span>View on Store</span>
                    <ExternalLink size={14} className="text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Recognition
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Achievements & Recognition</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

            {/* Achievement 1: Rising Star */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glassmorphism rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]"
            >
              <div className="relative aspect-[4/3] w-full bg-black overflow-hidden border-b border-white/5">
                <Image
                  src="/rising_star_award.jpg"
                  alt="Rising Star Award 2025 - Ideal IT Techno"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                />
                <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-500/80 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-purple-400/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Award size={12} />
                  <span>Rising Star 2025</span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    Rising Star Award
                  </h4>
                  <h5 className="text-sm text-cyan-400 font-semibold tracking-wider uppercase">
                    Ideal IT Techno Pvt Ltd
                  </h5>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Awarded for demonstrating exceptional growth, technical competency, and ownership in delivering complex React Native application modules. Recognized for driving key project components to successful production deployment ahead of schedule.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Exceptional ownership of modules</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Fast ramp up on Stripe & Push integrations</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-purple-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Consistent output and clean code standards</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Achievement 2: Client Meet & Future Planning */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glassmorphism rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
            >
              <div className="relative aspect-[4/3] w-full bg-black overflow-hidden border-b border-white/5">
                <Image
                  src="/client_meeting.jpg"
                  alt="Client Meeting for Project Future Plans"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                />
                <div className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-cyan-500/80 backdrop-blur-md text-white text-xs font-semibold tracking-wider uppercase border border-cyan-400/30 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <Users size={12} />
                  <span>Client Collaboration</span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    Client Meeting & Strategy
                  </h4>
                  <h5 className="text-sm text-purple-400 font-semibold tracking-wider uppercase">
                    Future Roadmap Alignment
                  </h5>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Collaborated directly with international clients during on-site workshop alignment sessions. Discussed architectural scaling, feature integration roadmaps (including in-app chat, real-time sync, and payments), and upcoming release milestones.
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/5">
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-cyan-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Strategic project roadmap alignment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-cyan-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Architectural scalability & sync planning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star size={14} className="text-cyan-400 shrink-0" />
                    <span className="text-xs text-slate-300 font-medium">Direct stakeholder feedback & requirements gathering</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Offerings
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Services Offered</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-purple-400/20 hover:bg-white/5 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 transition-all duration-300">
                  {service.icon}
                </div>

                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h4>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-[0.2em] font-semibold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Reach Out
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">Get In Touch</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

            {/* Left Side: Contact Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

              <div className="space-y-6">
                <h4 className="text-2xl font-bold text-white">Let's discuss your next app idea</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Whether you are hiring for an open role, seeking freelance consulting, or wanting to integrate
                  features like notifications, chats, or Stripe, feel free to drop me a message.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="space-y-4 pt-4">

                {/* Email Card */}
                <div className="glassmorphism p-5 rounded-2xl flex items-center space-x-4 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-400 font-medium">Email Address</h5>
                    <a href="mailto:jeevanhargav286@gmail.com" className="text-sm font-semibold text-slate-200 hover:text-cyan-400 transition-colors">
                      jeevanhargav286@gmail.com
                    </a>
                  </div>
                </div>

                {/* Call Card */}
                <div className="glassmorphism p-5 rounded-2xl flex items-center space-x-4 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-purple-950/40 border border-purple-400/20 flex items-center justify-center text-purple-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-400 font-medium">Mobile Number</h5>
                    <a href="tel:+918435689116" className="text-sm font-semibold text-slate-200 hover:text-purple-400 transition-colors">
                      +91 8435689116
                    </a>
                  </div>
                </div>

                {/* Location Card */}
                <div className="glassmorphism p-5 rounded-2xl flex items-center space-x-4 border border-white/5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/40 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs text-slate-400 font-medium">Work Location</h5>
                    <p className="text-sm font-semibold text-slate-200">
                      Indore, Madhya Pradesh, India
                    </p>
                  </div>
                </div>

              </div>

              {/* Social Channels placeholder links */}
              <div className="flex items-center space-x-4 pt-6">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/50 hover:bg-purple-950/20 text-slate-300 hover:text-purple-400 text-xs font-semibold transition-all duration-300"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>

            </div>

            {/* Right Side: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glassmorphism p-8 rounded-3xl border border-white/5 h-full flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

                <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Your Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-cyan-950/10 focus:outline-none text-sm text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-cyan-950/10 focus:outline-none text-sm text-white placeholder-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Inquiries / Hiring Proposal"
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-cyan-950/10 focus:outline-none text-sm text-white placeholder-slate-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400/50 focus:bg-cyan-950/10 focus:outline-none text-sm text-white placeholder-slate-500 transition-all resize-none"
                    />
                  </div>

                  <a
                    href="mailto:jeevanhargav286@gmail.com?subject=Portfolio%20Inquiry"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 flex items-center justify-center space-x-2 group hover:scale-[1.01]"
                  >
                    <Send size={16} />
                    <span>Send Message (via Email Client)</span>
                  </a>
                </form>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center text-brand-bg font-bold text-sm shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              JB
            </span>
            <span className="text-sm text-slate-400">
              Jeevan Bhargav © 2026. All Rights Reserved.
            </span>
          </div>

          <p className="text-xs text-slate-500 tracking-wide font-mono">
            React Native Application Developer
          </p>

          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
