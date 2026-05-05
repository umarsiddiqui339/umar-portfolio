import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

// Types
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

// FadeIn Component
const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.7, 
  x = 0, 
  y = 30, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Magnet Component
const Magnet: React.FC<MagnetProps> = ({ 
  children, 
  padding = 150, 
  strength = 3, 
  className = "" 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [isActive, setIsActive] = useState(false);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const distX = Math.abs(mouseX - centerX);
    const distY = Math.abs(mouseY - centerY);
    const withinPadding = distX < rect.width/2 + padding && distY < rect.height/2 + padding;
    
    if (withinPadding) {
      setIsActive(true);
      let moveX = (mouseX - centerX) / strength;
      let moveY = (mouseY - centerY) / strength;
      moveX = Math.min(Math.max(moveX, -40), 40);
      moveY = Math.min(Math.max(moveY, -40), 40);
      setTransform(`translate3d(${moveX}px, ${moveY}px, 0px)`);
    } else if (isActive) {
      setIsActive(false);
      setTransform(`translate3d(0px, 0px, 0px)`);
    }
  };
  
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <motion.div 
      ref={ref} 
      style={{ 
        transform, 
        transition: isActive ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out", 
        willChange: "transform" 
      }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Contact Button
// Contact Button - Fixed for mobile
const ContactButton: React.FC = () => {
  return (
    <a 
      href="mailto:umisid339@gmail.com" 
      style={{ 
        display: 'inline-block',
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
        border: "none",
        borderRadius: "9999px",
        padding: "0.6rem 1.5rem",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontSize: "clamp(0.7rem, 3vw, 0.85rem)",
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      Contact Me
    </a>
  );
};

// Hero Section
// Hero Section - Fixed for mobile
const HeroSection: React.FC = () => {
  return (
    <section style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem'
    }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'relative',
        top: 0, 
        left: 0, 
        right: 0, 
        padding: '1rem',
        display: 'flex', 
        justifyContent: 'center',
        gap: '1rem',
        alignItems: 'center',
        zIndex: 20,
        flexWrap: 'wrap'
      }}>
        {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
          <a 
            key={item}
            href={`#${item.toLowerCase()}`} 
            style={{ 
              color: '#D7E2EA', 
              fontWeight: '500', 
              textTransform: 'uppercase', 
              textDecoration: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              padding: '0.4rem 0.8rem',
              borderRadius: '2rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#BBCCD7';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#D7E2EA';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Main Content - Split Layout (Left Text, Right Portrait) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem 5%',
        gap: '3rem',
        flex: 1,
        flexWrap: 'wrap'
      }}>
        
        {/* Left Side - Text Content */}
        <div style={{ 
          flex: 1,
          minWidth: '280px',
          textAlign: 'left',
          zIndex: 10
        }}>
          <h1 className="hero-heading" style={{ 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            Muhammad Umar Sohail
          </h1>
          
          <p style={{ 
            color: '#BBCCD7', 
            fontSize: 'clamp(1rem, 2vw, 1.3rem)', 
            fontWeight: 300,
            marginBottom: '1.5rem',
            lineHeight: 1.5
          }}>
            Mobile Communication & Security Engineer | Backend Developer
          </p>
          
          {/* Short Bio */}
          <p style={{ 
            color: '#D7E2EA', 
            fontSize: '0.9rem', 
            opacity: 0.8,
            maxWidth: '500px',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            Highly motivated graduate with a firm background in software development, 
            networking, and IT systems. Skilled in backend development and full-stack 
            application design.
          </p>
          
          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <ContactButton />
            <a href="#projects" style={{
              display: 'inline-block',
              border: '2px solid #D7E2EA',
              borderRadius: '9999px',
              padding: '0.6rem 1.5rem',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#D7E2EA',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              fontSize: '0.75rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(215, 226, 234, 0.1)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              View Projects
            </a>
          </div>
        </div>

        {/* Right Side - Portrait */}
        <motion.div
          whileHover={{ y: -5 }}
          animate={{ y: [0, -3, 0] }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            flex: 1,
            minWidth: '200px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <img 
            src="/bitmoji.jpeg" 
            alt="Cartoon Avatar"
            style={{ 
              width: 'min(35vw, 300px)',
              height: 'auto',
              display: 'block',
              borderRadius: '1.5rem',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
            }}
          />
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ 
        position: 'relative',
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: '1rem 5%',
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        zIndex: 20,
        borderTop: '1px solid rgba(215, 226, 234, 0.1)'
      }}>
        <p style={{ color: '#D7E2EA', fontSize: '0.7rem', opacity: 0.7 }}>
          CGPA 3.68 | Backend Developer | Full-Stack Engineer
        </p>
        <p style={{ color: '#D7E2EA', fontSize: '0.7rem', opacity: 0.7 }}>
          Available for work
        </p>
      </div>
    </section>
  );
};

// About Section
const AboutSection: React.FC = () => {
  const skills = {
    programming: ['Java', 'Python', 'PHP', 'SQL', 'JavaScript', 'HTML', 'CSS', 'Kotlin', 'jQuery'],
    technologies: ['REST APIs', 'Web Development', 'Database Design', 'WordPress'],
    tools: ['Git', 'Firebase', 'Android Studio', 'Docker'],
    coreAreas: ['Software Development', 'Networking Basics', 'IT Operations']
  };

  return (
    <section id="about" style={{ 
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="hero-heading" style={{ 
            fontSize: 'clamp(2rem, 8vw, 4rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            About Me
          </h2>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #BBCCD7, transparent)',
            margin: '1rem auto 0'
          }} />
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '1.5rem',
              padding: '2rem',
              height: '100%',
              border: '1px solid rgba(187, 204, 215, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 700, 
                color: '#BBCCD7',
                marginBottom: '1.5rem'
              }}>
                Who Am I?
              </h3>
              <p style={{ 
                color: '#D7E2EA', 
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                Highly motivated graduate <span style={{ color: '#BBCCD7', fontWeight: 600 }}>(CGPA: 3.68)</span> with a firm background in software development, networking, and IT systems.
              </p>
              <p style={{ 
                color: '#D7E2EA', 
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontSize: '1rem'
              }}>
                Skilled in backend development, database management, and full-stack application design. 
                Experienced in developing real-world projects including mobile applications, automated systems, 
                and web platforms with a focus on performance optimization and user-centric solutions.
              </p>
              <p style={{ 
                color: '#D7E2EA', 
                lineHeight: 1.8,
                fontSize: '1rem'
              }}>
                Known for strong analytical thinking, adaptability, and the ability to work collaboratively 
                in team environments.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Stats or Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1.5rem',
              height: '100%'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.1), rgba(187, 204, 215, 0.02))',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(187, 204, 215, 0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#BBCCD7' }}>3.68</div>
                <div style={{ color: '#D7E2EA', fontSize: '0.875rem', marginTop: '0.5rem' }}>CGPA</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.1), rgba(187, 204, 215, 0.02))',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(187, 204, 215, 0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#BBCCD7' }}>5+</div>
                <div style={{ color: '#D7E2EA', fontSize: '0.875rem', marginTop: '0.5rem' }}>Projects</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.1), rgba(187, 204, 215, 0.02))',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(187, 204, 215, 0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#BBCCD7' }}>3</div>
                <div style={{ color: '#D7E2EA', fontSize: '0.875rem', marginTop: '0.5rem' }}>Years Exp</div>
              </div>
              <div style={{
                background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.1), rgba(187, 204, 215, 0.02))',
                borderRadius: '1rem',
                padding: '1.5rem',
                textAlign: 'center',
                border: '1px solid rgba(187, 204, 215, 0.1)'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#BBCCD7' }}>∞</div>
                <div style={{ color: '#D7E2EA', fontSize: '0.875rem', marginTop: '0.5rem' }}>Learning</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section - Programming */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2rem' }}
        >
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#BBCCD7',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>💻</span> Programming Languages
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {skills.programming.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.03 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(187, 204, 215, 0.1)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  color: '#D7E2EA',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  background: 'rgba(187, 204, 215, 0.2)',
                  scale: 1.05,
                  color: '#BBCCD7'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills Section - Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2rem' }}
        >
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#BBCCD7',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>⚙️</span> Technologies
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {skills.technologies.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(187, 204, 215, 0.1)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  color: '#D7E2EA',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  background: 'rgba(187, 204, 215, 0.2)',
                  scale: 1.05,
                  color: '#BBCCD7'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills Section - Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ marginBottom: '2rem' }}
        >
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#BBCCD7',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🛠️</span> Tools & Environment
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {skills.tools.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                style={{
                  background: 'rgba(187, 204, 215, 0.1)',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '2rem',
                  color: '#D7E2EA',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                whileHover={{ 
                  background: 'rgba(187, 204, 215, 0.2)',
                  scale: 1.05,
                  color: '#BBCCD7'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skills Section - Core Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: '#BBCCD7',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ fontSize: '2rem' }}>🎯</span> Core Areas
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            {skills.coreAreas.map((skill, idx) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.08 }}
                viewport={{ once: true }}
                style={{
                  background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.15), rgba(187, 204, 215, 0.05))',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  color: '#BBCCD7',
                  fontSize: '1rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(187, 204, 215, 0.2)'
                }}
                whileHover={{ 
                  background: 'rgba(187, 204, 215, 0.2)',
                  scale: 1.05,
                  borderColor: '#BBCCD7'
                }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <ContactButton />
        </motion.div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection: React.FC = () => {
  const experiences = [
    { 
      company: "Ora-Tech", 
      role: "Backend Developer", 
      period: "2025", 
      location: "Karachi, Pakistan",
      type: "Full-time",
      icon: "🚀",
      description: [
        "Developed RESTful APIs and backend systems for web-based applications",
        "Optimized relational databases for efficient data storage and retrieval",
        "Implemented business logic, data validation, and secure data handling",
        "Worked with Docker-based environments for consistent deployment"
      ] 
    },
    { 
      company: "Bank Islami Pakistan", 
      role: "IT Intern", 
      period: "2024", 
      location: "Karachi, Pakistan",
      type: "Internship",
      icon: "🏦",
      description: [
        "Assisted in IT operations, documentation, and system support",
        "Monitored system errors, logs, and security alerts",
        "Worked with email security systems and CRM tools",
        "Supported VAPT and SOC team workflows"
      ] 
    },
    { 
      company: "Karachi Metropolitan Corporation", 
      role: "IT Intern", 
      period: "2023", 
      location: "Karachi, Pakistan",
      type: "Internship",
      icon: "🏛️",
      description: [
        "Provided technical support for IT systems and hardware/software troubleshooting",
        "Assisted in diagnosing and resolving system and network issues",
        "Supported installation and configuration of operating systems",
        "Gained practical exposure to IT infrastructure and system administration"
      ] 
    }
  ];

  return (
    <section id="experience" style={{
      padding: '6rem 2rem',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="hero-heading" style={{ 
            fontSize: 'clamp(2rem, 8vw, 4rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            Professional Journey
          </h2>
          <p style={{
            color: '#D7E2EA',
            opacity: 0.7,
            marginTop: '1rem',
            fontSize: '1rem'
          }}>
            My work experience and professional growth
          </p>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #BBCCD7, transparent)',
            margin: '1rem auto 0'
          }} />
        </motion.div>

        {/* Timeline Experience */}
        <div style={{ position: 'relative' }}>
          {/* Central Timeline Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '100%',
            background: 'linear-gradient(180deg, #BBCCD7, transparent)',
            display: 'block'
          }} />

          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                display: 'flex',
                justifyContent: idx % 2 === 0 ? 'flex-end' : 'flex-start',
                marginBottom: '3rem',
                position: 'relative'
              }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                background: '#BBCCD7',
                borderRadius: '50%',
                border: '3px solid #0C0C0C',
                outline: '2px solid rgba(187, 204, 215, 0.3)',
                zIndex: 2
              }} />

              {/* Content Card */}
              <div style={{
                width: 'calc(50% - 2rem)',
                marginRight: idx % 2 === 0 ? '2rem' : 0,
                marginLeft: idx % 2 !== 0 ? '2rem' : 0
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '1.5rem',
                  padding: '1.75rem',
                  border: '1px solid rgba(187, 204, 215, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.3)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}>
                  
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div>
                      <span style={{
                        fontSize: '2rem',
                        marginRight: '0.5rem'
                      }}>
                        {exp.icon}
                      </span>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#BBCCD7',
                        display: 'inline-block'
                      }}>
                        {exp.role}
                      </h3>
                    </div>
                    <span style={{
                      background: 'rgba(187, 204, 215, 0.15)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      color: '#BBCCD7',
                      fontWeight: 500
                    }}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Company & Details */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      color: '#D7E2EA',
                      fontSize: '1.1rem',
                      fontWeight: 500
                    }}>
                      {exp.company}
                    </span>
                    <span style={{
                      color: '#D7E2EA',
                      opacity: 0.5,
                      fontSize: '0.875rem'
                    }}>
                      •
                    </span>
                    <span style={{
                      color: '#D7E2EA',
                      opacity: 0.7,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      📅 {exp.period}
                    </span>
                    <span style={{
                      color: '#D7E2EA',
                      opacity: 0.7,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      📍 {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {exp.description.map((item, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        color: '#D7E2EA',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }}>
                        <span style={{
                          color: '#BBCCD7',
                          fontSize: '1rem',
                          marginTop: '0.125rem'
                        }}>
                          ▹
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Decorative Bottom Line */}
                  <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, #BBCCD7, transparent)',
                    marginTop: '1rem',
                    borderRadius: '2px'
                  }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Version (Stacked) - Visible only on mobile */}
        <div style={{
          display: 'none',
        }}>
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{
                marginBottom: '2rem'
              }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '1.5rem',
                padding: '1.5rem',
                border: '1px solid rgba(187, 204, 215, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#BBCCD7' }}>{exp.role}</h3>
                  <span style={{ fontSize: '2rem' }}>{exp.icon}</span>
                </div>
                <p style={{ color: '#D7E2EA', fontWeight: 500, marginBottom: '0.5rem' }}>{exp.company}</p>
                <p style={{ color: '#D7E2EA', opacity: 0.7, fontSize: '0.875rem', marginBottom: '1rem' }}>{exp.period} • {exp.location}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.description.map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#D7E2EA' }}>
                      <span style={{ color: '#BBCCD7' }}>▹</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .timeline-line {
            display: none;
          }
          .desktop-timeline {
            display: none;
          }
          .mobile-stacked {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-stacked {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};
// Projects Section
const ProjectsSection: React.FC = () => {
  const projects = [
    { 
      name: "Email Marketing System", 
      tech: ["HTML", "CSS", "JS", "Bootstrap"], 
      description: "Responsive front-end with interactive dashboards and real-time updates",
      icon: "📧",
      color: "#FF6B6B",
      featured: true,
      link: "#"
    },
    { 
      name: "Ashiana.com", 
      tech: ["Python", "Java", "Docker"], 
      description: "Property management system with image optimization and role-based access control",
      icon: "🏠",
      color: "#4ECDC4",
      featured: false,
      link: "#"
    },
    { 
      name: "Proposal Management System", 
      tech: ["PHP", "MySQL", "JS"], 
      description: "Complete proposal workflow system with permissions and action logging",
      icon: "📋",
      color: "#45B7D1",
      featured: false,
      link: "#"
    },
    { 
      name: "RozDoz (Mobile App)", 
      tech: ["Kotlin", "Firebase", "Android Studio"], 
      description: "Medication management app with scheduling, tracking, and alert system",
      icon: "💊",
      color: "#96CEB4",
      featured: true,
      link: "#"
    },
    { 
      name: "Fire Fighting Robot", 
      tech: ["Arduino", "Sensors"], 
      description: "Autonomous fire detection and extinguishing robot — Won 1st Prize at TICE",
      icon: "🤖",
      color: "#FFEAA7",
      featured: true,
      link: "#"
    }
  ];

  return (
    <section id="projects" style={{
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="hero-heading" style={{ 
            fontSize: 'clamp(2rem, 8vw, 4rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            Featured Work
          </h2>
          <p style={{
            color: '#D7E2EA',
            opacity: 0.7,
            marginTop: '1rem',
            fontSize: '1rem'
          }}>
            Some of my best projects and creative work
          </p>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #BBCCD7, transparent)',
            margin: '1rem auto 0'
          }} />
        </motion.div>

        {/* Featured Project (First one large) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{
            background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.05), rgba(187, 204, 215, 0.02))',
            borderRadius: '2rem',
            padding: '2rem',
            border: '1px solid rgba(187, 204, 215, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Featured Badge */}
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'linear-gradient(135deg, #BBCCD7, #646973)',
              color: '#0C0C0C',
              padding: '0.25rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Featured
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '1fr 2fr' },
              gap: '2rem',
              alignItems: 'center'
            }}>
              <div style={{
                fontSize: '4rem',
                textAlign: 'center'
              }}>
                {projects[0].icon}
              </div>
              <div>
                <h3 style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800,
                  color: '#BBCCD7',
                  marginBottom: '0.5rem'
                }}>
                  {projects[0].name}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {projects[0].tech.map((t, i) => (
                    <span key={i} style={{
                      background: 'rgba(187, 204, 215, 0.1)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '2rem',
                      fontSize: '0.75rem',
                      color: '#BBCCD7'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
                <p style={{
                  color: '#D7E2EA',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {projects[0].description}
                </p>
                <a href={projects[0].link} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#BBCCD7',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  transition: 'gap 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '0.75rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '0.5rem';
                }}>
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {projects.slice(1).map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              style={{
                height: '100%'
              }}
            >
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '1.5rem',
                padding: '1.75rem',
                border: '1px solid rgba(187, 204, 215, 0.1)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}>
                
                {/* Project Icon */}
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {project.icon}
                </div>

                {/* Project Title */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#BBCCD7',
                  marginBottom: '0.5rem'
                }}>
                  {project.name}
                </h3>

                {/* Tech Stack */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {project.tech.map((t, i) => (
                    <span key={i} style={{
                      background: 'rgba(187, 204, 215, 0.1)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '2rem',
                      fontSize: '0.7rem',
                      color: '#BBCCD7'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p style={{
                  color: '#D7E2EA',
                  lineHeight: 1.6,
                  fontSize: '0.9rem',
                  flex: 1,
                  marginBottom: '1rem'
                }}>
                  {project.description}
                </p>

                {/* Learn More Link */}
                <a href={project.link} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#BBCCD7',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = '0.75rem';
                  e.currentTarget.style.opacity = '0.8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = '0.5rem';
                  e.currentTarget.style.opacity = '1';
                }}>
                  Learn More →
                </a>

                {/* Decorative Line */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  borderRadius: '0 0 1.5rem 1.5rem'
                }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '4rem'
          }}
        >
          <button style={{
            background: 'transparent',
            border: '2px solid rgba(187, 204, 215, 0.3)',
            borderRadius: '3rem',
            padding: '0.75rem 2rem',
            color: '#D7E2EA',
            fontSize: '0.9rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#BBCCD7';
            e.currentTarget.style.background = 'rgba(187, 204, 215, 0.1)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.3)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            View All Projects →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('umisid339@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactMethods = [
    {
      icon: <Mail size={24} />,
      label: "Email",
      value: "umisid339@gmail.com",
      link: "mailto:umisid339@gmail.com",
      action: "copy",
      color: "#FF6B6B"
    },
    {
      icon: <Phone size={24} />,
      label: "Phone",
      value: "+92 318-1212015",
      link: "tel:+923181212015",
      action: "call",
      color: "#4ECDC4"
    },
    {
      label: "LinkedIn",
      value: "umar-siddiqui",
      link: "https://linkedin.com/in/umar-siddiqui-870170228",
      action: "link",
      color: "#0077B5"
    }
  ];

  return (
    <section id="contact" style={{
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)'
    }}>
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(187,204,215,0.02) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="hero-heading" style={{ 
            fontSize: 'clamp(2rem, 8vw, 4rem)', 
            fontWeight: 900, 
            textTransform: 'uppercase',
            letterSpacing: '-0.02em'
          }}>
            Let's Connect
          </h2>
          <p style={{
            color: '#D7E2EA',
            opacity: 0.7,
            marginTop: '1rem',
            fontSize: '1rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Have a project in mind? Let's work together and create something amazing.
          </p>
          <div style={{ 
            width: '80px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #BBCCD7, transparent)',
            margin: '1rem auto 0'
          }} />
        </motion.div>

        {/* Contact Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {contactMethods.map((method, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '1.5rem',
                padding: '2rem',
                border: '1px solid rgba(187, 204, 215, 0.1)',
                transition: 'all 0.3s ease',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={method.action === 'copy' ? handleCopyEmail : () => window.open(method.link, '_blank')}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.3)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(187, 204, 215, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              }}
            >
              {/* Icon */}
              <div style={{
                width: '70px',
                height: '70px',
                background: `linear-gradient(135deg, ${method.color}20, ${method.color}05)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: method.color
              }}>
                {method.icon}
              </div>

              {/* Label */}
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#BBCCD7',
                marginBottom: '0.5rem'
              }}>
                {method.label}
              </h3>

              {/* Value */}
              <p style={{
                color: '#D7E2EA',
                fontSize: '0.9rem',
                marginBottom: '1rem',
                wordBreak: 'break-all'
              }}>
                {method.value}
              </p>

              {/* Action Button */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: method.color,
                fontSize: '0.8rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                {method.action === 'copy' && (copied ? 'Copied!' : 'Copy')}
                {method.action === 'call' && 'Call Now'}
                {method.action === 'link' && 'Connect'}
                <span>→</span>
              </div>

              {/* Decorative Bottom Line */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${method.color}, transparent)`
              }} />
            </motion.div>
          ))}
        </div>

        {/* Contact Form / CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            background: 'linear-gradient(135deg, rgba(187, 204, 215, 0.05), rgba(187, 204, 215, 0.02))',
            borderRadius: '2rem',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid rgba(187, 204, 215, 0.1)',
            marginTop: '2rem'
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
            fontWeight: 700,
            color: '#BBCCD7',
            marginBottom: '1rem'
          }}>
            Ready to start your project?
          </h3>
          <p style={{
            color: '#D7E2EA',
            opacity: 0.7,
            marginBottom: '2rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Whether you have a question or just want to say hi, I'll get back to you within 24 hours.
          </p>
          <ContactButton />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}
        >
          {['GitHub', 'Twitter', 'Instagram', 'Facebook'].map((social, idx) => (
            <a
              key={idx}
              href="#"
              style={{
                color: '#D7E2EA',
                opacity: 0.5,
                textDecoration: 'none',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                borderRadius: '2rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = '#BBCCD7';
                e.currentTarget.style.background = 'rgba(187, 204, 215, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.color = '#D7E2EA';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {social}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Copy Notification Toast */}
      {copied && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#BBCCD7',
            color: '#0C0C0C',
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            zIndex: 1000,
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }}
        >
          📋 Email copied to clipboard!
        </motion.div>
      )}
    </section>
  );
};

// Main App Component
function App() {
  return (
    <main className="bg-[#0C0C0C] overflow-x-clip">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <footer className="py-10 text-center text-[#D7E2EA]/40 text-sm">
        © 2025 Muhammad Umar Sohail — Backend Developer & Creative Technologist
      </footer>
    </main>
  );
}

export default App;
