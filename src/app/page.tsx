"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSpring, animated, useInView, config } from '@react-spring/web';
import { 
  FaLinkedin, 
  FaGithub,
  FaPython,
  FaJs,
  FaReact,
  FaCode
} from 'react-icons/fa';
import { 
  MdWork
} from 'react-icons/md';
import { 
  SiTensorflow, 
  SiScikitlearn, 
  SiPandas, 
  SiNumpy, 
  SiPostgresql,
  SiNextdotjs,
  SiGit
} from 'react-icons/si';
import { 
  Brain, 
  Zap, 
  BarChart3,
  Globe,
  Users,
  Award,
  Calendar,
  Download,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Code2,
  Database,
  Bot,
  Layers,
  TrendingUp,
  Rocket,
  GraduationCap,
  Languages,
  CheckCircle,
  Cloud
} from 'lucide-react';

// Define the CV data structure
interface CvData {
  name: string;
  contact: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  skills: {
    programmingLanguages: string[];
    aiMl: string[];
    dataHandling: string[];
    toolsPlatforms: string[];
  };
  experience: JobExperience[];
  projects: Project[];
  education: Education[];
  certificationsCourses: string[];
  languages: string[];
}

interface JobExperience {
  title: string;
  company: string;
  duration: string;
  description: string[];
  link?: string;
  logo?: string;
}

interface Project {
  title: string;
  description: string[];
  link?: string;
  image?: string;
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  coursework?: string[];
}

// Static CV data
const myCvData: CvData = {
  name: "Asadbek Iskandarov",
  contact: {
    phone: "+39 350 857 94 33",
    email: "iskandarov.asadbek26@gmail.com",
    linkedin: "Asadbek Iskandarov",
    github: "asadbek08",
    portfolio: "/",
  },
  skills: {
    programmingLanguages: ["Python", "SQL", "JavaScript", "Java", "C", "R (Basic)", "Bash"],
    aiMl: ["TensorFlow", "Scikit-learn", "LLM Integration", "Prompt Engineering", "Predictive Modeling"],
    dataHandling: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Data Structures & Algorithms", "PostgreSQL", "MySQL"],
    toolsPlatforms: ["Next.js", "React", "Azure Blob Storage", "Google Sheets API", "Apps Script", "n8n", "Git", "REST APIs"],
  },
  experience: [
    {
      title: "AI Software Engineer",
      company: "SAPIENTA SRL",
      duration: "Mar 2025 - Present",
      description: [
        "Designed and implemented end-to-end pipelines to transform unstructured inputs—such as PDFs, spreadsheets, and audio—into structured, actionable data. Created logic for product identification, attribute extraction, and dynamic cost evaluation using LLM-based approaches.",
        "Delivered a responsive, AI-assisted frontend interface to enable real-time feedback, structured editing, and human-in-the-loop control. Focused on creating an intuitive user experience that bridges AI output with manual refinement when needed.",
      ],
      link: "https://sapienta.ai/",
      logo: "/assets/img/sapienza.png",
    },
    {
      title: "Team Member",
      company: "DRones Autonomous Flight Team (DRAFT), Politecnico di Torino",
      duration: "Nov 2024 - Present",
      description: [
        "Collaborated with engineers and researchers to develop and deploy machine learning and computer vision algorithms for autonomous drone navigation, leveraging deep learning (CNNs) and reinforcement learning for real-time decision-making and collision avoidance.",
        "Integrated AI models into embedded drone systems, utilizing Python, TensorFlow, and OpenCV for testing and optimization of flight paths, sensor fusion, and automation in dynamic environments.",
      ],
      link: "https://www.draftpolito.it/",
      logo: "/assets/img/draft.jpeg",
    },
    {
      title: "Data Scientist, Internship",
      company: "Talent Acquisition Partners",
      duration: "Oct 2024 - Dec 2024",
      description: [
        "Automated CRM and data entry operations by integrating Google Sheets, Apps Script, and HubSpot API, synchronizing 1,000+ data points in real time and saving 20+ hours/week with 100% accuracy.",
        "Built and fine-tuned LLM-driven candidate ranking models (LLAMA2, MiniLM) on a 30,000+ CV dataset, improving match accuracy by 40% through score-based recommendation pipelines.",
      ],
      link: "https://tapartners.org/",
      logo: "/assets/img/taporg.jpeg",
    },
  ],
  projects: [
    {
      title: "Multiclass Audio Classification Model",
      description: [
        "Designed and implemented a CNN-based audio classification system with over 50 classes, utilizing 40 MFCC parameters and training on 100 hours of audio (20,000+ files), including noise-augmented data.",
        "Achieved 85% accuracy with a custom model and 98% accuracy using the pre-trained SpeechBrain model, fine-tuned over 50 epochs with 5-fold cross-validation and early stopping",
        "Optimized the system for real-time inference, enabling seamless integration into mobile apps for audio analytics.",
      ],
      image: "/assets/img/aviacompany.jpg",
      link: "#"
    },
    {
      title: "Airplane ticket prediction",
      description: [
        "Conducted exploratory data analysis (EDA) on a 20,000-entry dataset with 12 features using Pandas, Matplotlib, and Seaborn uncovering key distributions, correlations, and outliers.",
        "Developed and evaluated multiple regression models, with Random Forest Regression (RFR) achieving the best performance (RMSE: 4437.30, MAE: 2468.16).",
        "Optimized RFR using 5-fold cross-validation and GridSearchCV, selecting it as the final model for deployment.",
      ],
      image: "/assets/img/aviatickets.jpg",
      link: "#"
    },
  ],
  education: [
    {
      degree: "B.Sc. Computer Engineering",
      institution: "Polytechnic University of Turin",
      duration: "Sep 2020 - Present",
      coursework: ["Data Structures & Algorithms", "Mathematical Methods for Computer Science", "Introduction to Databases and Probability & Statistics"],
    },
  ],
  certificationsCourses: [
    "Machine Learning Specialization, Coursera",
    "SQL For Data Science, University of California Devis",
    "Data Science and Artificial Intelligence, Mohirdev",
  ],
  languages: ["English C1 (IELTS 7)", "Italian B1"],
};

// Simplified animated components to prevent infinite loops
const AnimatedSection = ({ children, className = "", delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const springs = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0px)' : 'translateY(30px)',
    config: config.gentle,
  });

  return (
    <animated.div id={id} style={springs} className={className}>
      {children}
    </animated.div>
  );
};

const SimpleCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({ once: true, amount: 0.2 }); // Trigger once when 20% in view

  const springs = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.95)',
    boxShadow: isHovered 
      ? '0 25px 50px rgba(0, 0, 0, 0.2)' 
      : '0 15px 30px rgba(0, 0, 0, 0.1)',
    config: config.wobbly,
    delay: inView ? delay : 0,
  });

  return (
    <animated.div
      ref={ref}
      style={springs}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  );
};

const SkillBadge = ({ skill, icon: Icon, color, delay = 0 }: { skill: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; color: string; delay?: number }) => {
  const [ref, inView] = useInView();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const badgeSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView 
      ? `translateY(0px) scale(${isHovered ? 1.1 : 1})` 
      : 'translateY(20px) scale(0.9)',
    config: config.wobbly,
    delay: delay,
  });

  return (
    <animated.div
      ref={ref}
      style={badgeSpring}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${color}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon className="w-4 h-4" />
      {skill}
    </animated.div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHireMeDialogOpen, setIsHireMeDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [hireMeCopied, setHireMeCopied] = useState(false);
  const [contactCopied, setContactCopied] = useState(false);
  
  // Email content state
  const [hireMeSubject, setHireMeSubject] = useState("");
  const [hireMeMessage, setHireMeMessage] = useState("");

  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Hero animation
  const heroSpring = useSpring({
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: config.gentle,
    delay: 300,
  });

  const profileSpring = useSpring({
    opacity: 1,
    transform: isProfileHovered ? 'scale(1.05) translateY(-10px) rotate(0deg)' : 'scale(1) translateY(0px) rotate(0deg)',
    from: { opacity: 0, transform: 'scale(0.8) rotate(-10deg)' },
    config: { tension: 400, friction: 15 },
  });

  // Email functions
  const handleHireMe = () => {
    setIsHireMeDialogOpen(true);
    setHireMeCopied(false);
  };

  const handleStartConversation = () => {
    setIsContactDialogOpen(true);
    setContactCopied(false);
  };

  const copyToClipboard = async (text: string, setCopied: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const sendEmail = (subject: string, body: string) => {
    const mailtoLink = `mailto:${myCvData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 z-50 shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.3)]">
                <span className="text-white font-bold text-lg">{myCvData.name.split(" ")[0][0]}</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:text-shadow-[0_0_10px_rgba(59,130,246,0.5),_0_0_20px_rgba(139,92,246,0.3)]">
                {myCvData.name.split(" ")[0]}
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group cursor-pointer"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                onClick={handleHireMe}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.5),_0_0_40px_15px_rgba(139,92,246,0.4)] transition-all duration-300 transform hover:scale-105 px-6 py-2 rounded-full cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                Hire Me
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative w-10 h-10 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="py-4 space-y-4 border-t border-gray-200 mt-4">
              {['About', 'Skills', 'Experience', 'Projects', 'Education', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 py-2 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    handleHireMe();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-300 rounded-full cursor-pointer"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Hire Me
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20 relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <animated.div style={heroSpring} className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700 mb-6 border border-blue-200/50">
                <Sparkles className="w-4 h-4" />
                Available for new opportunities
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Hi, I&apos;m {myCvData.name.split(" ")[0]}
                </span>
              </h1>
              
              <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
                AI Software Engineer & Data Scientist
              </h2>
              
              <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                Passionate about designing intelligent systems that transform data into actionable insights and create seamless user experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  size="lg" 
                  onClick={handleStartConversation}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-full px-8 hover:shadow-blue-500/50 cursor-pointer"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
                <Link href="/assets/pdf/CV_AI.pdf" download>
                  <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 rounded-full px-8 hover:shadow-blue-300/50 hover:shadow-md cursor-pointer">
                    <Download className="w-5 h-5 mr-2" />
                    Download CV
                  </Button>
                </Link>
              </div>
              
              <div className="flex gap-4 justify-center md:justify-start">
                <a href={`mailto:${myCvData.contact.email}`} className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 text-gray-600 hover:text-blue-600 border border-white/50 cursor-pointer">
                  <Mail className="w-6 h-6" />
                </a>
                <a href={`https://linkedin.com/in/${myCvData.contact.linkedin.replace(/\s/g, '-')}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 text-gray-600 hover:text-blue-600 border border-white/50 cursor-pointer">
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a href={`https://github.com/${myCvData.contact.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 text-gray-600 hover:text-blue-600 border border-white/50 cursor-pointer">
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </animated.div>
            
            <animated.div 
              style={profileSpring} 
              className="flex justify-center cursor-pointer"
              onMouseEnter={() => setIsProfileHovered(true)}
              onMouseLeave={() => setIsProfileHovered(false)}
            >
              <div className="relative">
                <div className="w-80 h-80 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1 shadow-[0_0_50px_10px_rgba(59,130,246,0.4),_0_0_100px_30px_rgba(139,92,246,0.3)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/90 to-gray-50/90">
        <Image
                      src="/assets/img/profile.jpg" 
                      alt="Profile" 
                      width={320} 
                      height={320} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </animated.div>
          </div>
        </section>

        {/* About Section */}
        <AnimatedSection id="about" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                I am an AI Software Engineer and Data Scientist passionate about transforming complex data into actionable insights and intelligent systems. My expertise spans machine learning, data analysis, and developing innovative solutions that drive efficiency and impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <SimpleCard className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/50 shadow-xl" delay={100}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MdWork className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-blue-900 mb-2">1+</h3>
                <p className="text-gray-700 font-medium">Years Experience</p>
              </SimpleCard>
              
              <SimpleCard className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/50 shadow-xl" delay={200}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-purple-900 mb-2">{myCvData.projects.length}+</h3>
                <p className="text-gray-700 font-medium">Projects Completed</p>
              </SimpleCard>
              
              <SimpleCard className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/50 shadow-xl" delay={300}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-green-900 mb-2">{myCvData.experience.length}+</h3>
                <p className="text-gray-700 font-medium">Companies</p>
              </SimpleCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" className="py-20 px-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A comprehensive toolkit for building intelligent systems and data-driven solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Programming Languages */}
              <SimpleCard className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl" delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Programming & Languages</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {myCvData.skills.programmingLanguages.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      icon={skill === 'Python' ? FaPython : skill === 'JavaScript' ? FaJs : FaCode}
                      color="bg-blue-200/80 text-blue-900 hover:bg-blue-300/80 backdrop-blur-sm"
                      delay={index * 100}
                    />
                  ))}
                </div>
              </SimpleCard>

              {/* AI & ML */}
              <SimpleCard className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl" delay={200}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">AI & Machine Learning</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {myCvData.skills.aiMl.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      icon={skill === 'TensorFlow' ? SiTensorflow : skill === 'Scikit-learn' ? SiScikitlearn : Bot}
                      color="bg-purple-200/80 text-purple-900 hover:bg-purple-300/80 backdrop-blur-sm"
                      delay={index * 100}
                    />
                  ))}
                </div>
              </SimpleCard>

              {/* Data Handling */}
              <SimpleCard className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl" delay={300}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Data & Analytics</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {myCvData.skills.dataHandling.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      icon={skill === 'Pandas' ? SiPandas : skill === 'NumPy' ? SiNumpy : skill === 'PostgreSQL' ? SiPostgresql : BarChart3}
                      color="bg-green-200/80 text-green-900 hover:bg-green-300/80 backdrop-blur-sm"
                      delay={index * 100}
                    />
                  ))}
                </div>
              </SimpleCard>

              {/* Tools & Platforms */}
              <SimpleCard className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl" delay={400}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Tools & Platforms</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {myCvData.skills.toolsPlatforms.map((skill, index) => (
                    <SkillBadge
                      key={skill}
                      skill={skill}
                      icon={skill === 'Next.js' ? SiNextdotjs : skill === 'React' ? FaReact : skill === 'Azure Blob Storage' ? Cloud : skill === 'Git' ? SiGit : Layers}
                      color="bg-orange-200/80 text-orange-900 hover:bg-orange-300/80 backdrop-blur-sm"
                      delay={index * 100}
                    />
                  ))}
                </div>
              </SimpleCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                Professional Experience
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Building intelligent systems and driving innovation across multiple domains
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {myCvData.experience.map((job, index) => (
                  <SimpleCard key={index} className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100" delay={index * 100}>
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      <div className="flex-shrink-0">
                        {job.logo ? (
                          <Link href={job.link || "#"} target="_blank" rel="noopener noreferrer" className="block">
                            <Image
                              src={job.logo}
                              alt={`${job.company} logo`}
                              width={64} // or desired size
                              height={64} // or desired size
                              className="rounded-2xl object-contain bg-white p-2 shadow-md"
                            />
                          </Link>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                            <MdWork className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h3>
                            {job.link ? (
                              <Link href={job.link} target="_blank" rel="noopener noreferrer" className="text-lg text-blue-600 font-semibold hover:underline">
                                {job.company}
                              </Link>
                            ) : (
                              <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-500 mt-2 md:mt-0">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">{job.duration}</span>
                          </div>
                        </div>
                        <ul className="space-y-3">
                          {job.description.map((desc, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-700">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{desc}</span>
          </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SimpleCard>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Innovative solutions showcasing AI, machine learning, and data science expertise
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {myCvData.projects.map((project, index) => (
                <SimpleCard key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100" delay={index * 150}>
                  {project.image && (
                    <div className="relative h-48 overflow-hidden">
            <Image
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {project.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-700">
                          <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SimpleCard>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection id="education" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-green-900 bg-clip-text text-transparent">
                Education & Learning
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Continuous learning and professional development in technology and AI
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              {/* Education */}
              <SimpleCard className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200" delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Education</h3>
                </div>
                {myCvData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{edu.degree}</h4>
                    <p className="text-blue-600 font-medium mb-2">{edu.institution}</p>
                    <p className="text-sm text-gray-500 mb-3">{edu.duration}</p>
                    {edu.coursework && (
                      <div className="space-y-1">
                        {edu.coursework.map((course, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {course}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </SimpleCard>

              {/* Certifications */}
              <SimpleCard className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl p-8 border border-purple-200" delay={200}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
                </div>
                <div className="space-y-4">
                  {myCvData.certificationsCourses.map((cert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </SimpleCard>

              {/* Languages */}
              <SimpleCard className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200" delay={300}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Languages className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Languages</h3>
                </div>
                <div className="space-y-4">
                  {myCvData.languages.map((lang, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{lang}</span>
                    </div>
                  ))}
                </div>
              </SimpleCard>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact" className="py-20 px-6 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
          <div className="container mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let&apos;s Work Together
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Ready to bring your ideas to life? Let&apos;s discuss how we can create something amazing together.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <SimpleCard className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20" delay={100}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-blue-100 break-all">{myCvData.contact.email}</p>
              </SimpleCard>
              
              <SimpleCard className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20" delay={200}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-blue-100">{myCvData.contact.phone}</p>
              </SimpleCard>
              
              <SimpleCard className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20" delay={300}>
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-blue-100">Italy - Via Torricelli #6</p>
              </SimpleCard>
            </div>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={handleStartConversation}
                className="bg-white text-blue-900 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Mail className="w-5 h-5 mr-2" />
                Start a Conversation
              </Button>
            </div>
        </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">{myCvData.name}</h3>
              <p className="text-gray-400">AI Software Engineer & Data Scientist</p>
            </div>
            <div className="flex gap-6">
              <a href={`https://linkedin.com/in/${myCvData.contact.linkedin.replace(/\s/g, '-')}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href={`https://github.com/${myCvData.contact.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href={`mailto:${myCvData.contact.email}`} className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 cursor-pointer">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {myCvData.name}. Built with Next.js, Tailwind CSS, and React Spring.</p>
          </div>
        </div>
      </footer>

      {/* Hire Me Dialog */}
      <Dialog open={isHireMeDialogOpen} onOpenChange={setIsHireMeDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white hide-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hire Me - AI Software Engineer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Customize Your Message</h3>
              <p className="text-sm text-gray-600 mb-4">Edit the subject and message below, then send or copy the email.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={hireMeSubject}
                    onChange={(e) => setHireMeSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-300 text-gray-900"
                    placeholder="Enter email subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Message
                  </label>
                  <textarea
                    value={hireMeMessage}
                    onChange={(e) => setHireMeMessage(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 shadow-sm hover:border-blue-300 text-gray-900"
                    placeholder="Enter your message"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => {
                  sendEmail(hireMeSubject, hireMeMessage);
                  setIsHireMeDialogOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1 hover:shadow-blue-500/50 hover:shadow-xl cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  copyToClipboard(`To: ${myCvData.contact.email}\nSubject: ${hireMeSubject}\n\n${hireMeMessage}`, setHireMeCopied);
                }} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-gray-300/50 cursor-pointer"
              >
                Copy Email
                {hireMeCopied && <span className="ml-2 text-green-600 font-semibold">Copied!</span>}
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Or contact me directly at: <span className="font-semibold text-blue-600">{myCvData.contact.email}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white hide-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Let&apos;s Start a Conversation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Customize Your Message</h3>
              <p className="text-sm text-gray-600 mb-4">Edit the subject and message below, then send or copy the email.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:border-blue-300 text-gray-900"
                    placeholder="Enter email subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Message
                  </label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 shadow-sm hover:border-blue-300 text-gray-900"
                    placeholder="Enter your message"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => {
                  sendEmail(contactSubject, contactMessage);
                  setIsContactDialogOpen(false);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex-1 hover:shadow-blue-500/50 hover:shadow-xl cursor-pointer"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  copyToClipboard(`To: ${myCvData.contact.email}\nSubject: ${contactSubject}\n\n${contactMessage}`, setContactCopied);
                }} 
                className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-gray-300/50 cursor-pointer"
              >
                Copy Email
                {contactCopied && <span className="ml-2 text-green-600 font-semibold">Copied!</span>}
              </Button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Or contact me directly at: <span className="font-semibold text-blue-600">{myCvData.contact.email}</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
