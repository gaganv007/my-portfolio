import React, { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for intersection observer
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Skills state
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');
  const [experienceTab, setExperienceTab] = useState('experience');

  // Mouse tracking for cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Intersection Observer for active navigation
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = [homeRef, aboutRef, skillsRef, projectsRef, experienceRef, contactRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Data
  const projects = [
    {
      id: 1,
      title: "ML-Blockchain SDK for MLOps",
      description: "Developed Python SDK wrapper for Forte's O2 Oracle API, automating ML metrics serialization to blockchain—reduced governance setup time by 40% over manual integration. Built automated pipeline enabling ML teams to integrate blockchain without expertise, cutting manual configuration steps by 60%.",
      technologies: ["Python", "JavaScript", "Node.js", "Blockchain", "API", "MLOps"],
      github: "https://github.com/Lexinator6647/Decentralized-MLOps",
      featured: true,
      category: "ml",
      date: "May 2025"
    },
    {
      id: 2,
      title: "Graph Neural Network (GNN)-Based Stock Relations & Prediction",
      description: "Collected and processed daily price/volume data for 29 major U.S. companies using Python and Pandas for financial modeling. Built Graph Neural Network that improved next-day price prediction accuracy by 12% over isolation-based baseline models.",
      technologies: ["Python", "PyTorch", "Graph Neural Networks", "Financial Analysis", "Data Mining", "Pandas"],
      github: "https://github.com/gaganv007/GNN-Based-Stock-Relations-and-Prediction",
      featured: true,
      category: "ml",
      date: "Apr 2025"
    },
    {
      id: 3,
      title: "Anomaly Detection in Financial Transactions",
      description: "Balanced highly skewed dataset (99.95% vs. 0.05%) using SMOTE technique for class imbalance correction in fraud detection. Applied 8 different ML models including Random Forest and LSTM, boosting fraud detection F1-score from 0.22 to 0.95.",
      technologies: ["Python", "Scikit-learn", "TensorFlow", "SMOTE", "Machine Learning", "Random Forest", "LSTM"],
      github: "https://github.com/gaganv007/anomaly_detection",
      featured: true,
      category: "ml",
      date: "May 2024"
    }
  ];

  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["Python", "Java", "C/C++", "SQL", "JavaScript", "TypeScript", "R"]
    },
    {
      category: "Machine Learning",
      skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Neural Networks"]
    },
    {
      category: "Data & DevOps",
      skills: ["Pandas", "NumPy", "Power BI", "AWS", "Docker", "Kubernetes", "Git"]
    },
    {
      category: "Web & Databases",
      skills: ["React.js", "Node.js", "Flask", "MongoDB", "MySQL", "REST APIs"]
    },
    {
      category: "AI/ML Specialties",
      skills: ["NLP", "Computer Vision", "MLOps", "Financial Modeling", "GenAI", "LLMs"]
    }
  ];

  const experiences = [
    {
      title: "Graduate Assistant",
      company: "Boston University",
      location: "Boston, MA",
      period: "Jan 2025 – May 2025",
      description: "Streamlined Dean's Office workflows using project-management tools and G Suite, reducing student inquiry response time by 30%. Managed communications for a 10-person team, coordinating schedules and documents via G Suite and MS Office.",
      achievements: [
        "Reduced student inquiry response time by 30%",
        "Managed communications for a 10-person team",
        "Coordinated schedules and documents via G Suite and MS Office",
        "Streamlined workflows using project-management tools"
      ]
    },
    {
      title: "Data Research Intern",
      company: "SRM University AP",
      location: "Amaravati, India",
      period: "May 2023 – May 2024",
      description: "Analyzed university datasets with Python, SQL, and Pandas, identifying inefficiencies that cut processing time by 15%. Developed interactive Power BI dashboards to guide strategic planning for 15,000+ students.",
      achievements: [
        "Reduced processing time by 15%",
        "Created interactive Power BI dashboards for 15,000+ students",
        "Analyzed datasets using Python, SQL, and Pandas",
        "Guided strategic planning through data insights"
      ]
    }
  ];

  const education = [
    {
      degree: "Master of Science in Computer Science",
      school: "Boston University",
      location: "Boston, MA",
      period: "Sep 2024 – May 2026",
      description: "Part-Time Program focusing on AI/ML applications and software engineering.",
      coursework: ["Data Science with Python", "Advanced Programming Techniques", "Health Informatics"]
    },
    {
      degree: "Bachelor of Technology in Computer Science and Engineering (AI/ML)",
      school: "SRM University AP",
      location: "Amaravati, India",
      period: "Sep 2020 – May 2024",
      description: "Specialized in AI/ML with strong foundation in computer science fundamentals.",
      coursework: ["Deep Learning", "Digital Image Processing", "Database Management", "Software Engineering"]
    }
  ];

  // Check if device is touch device
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  return (
    <div className={`portfolio ${theme}`}>
      {/* Custom Cursor */}
      {!isTouchDevice() && (
        <div 
          className="cursor"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
        />
      )}
      
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span onClick={() => scrollToSection('home')}>GV</span>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <div
                key={section}
                className={`nav-item ${activeSection === section ? 'active' : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </div>
            ))}
          </div>
          
          <div className="nav-controls">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            <div
              className={`hamburger ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="highlight">Gagan Veginati</span>
              </h1>
              <h2 className="hero-subtitle">AI/ML Engineer • Software Developer • Data Scientist</h2>
              <p className="hero-description">
                I build intelligent systems and scalable applications using cutting-edge AI/ML technologies. 
                Currently pursuing my Master's in Computer Science at Boston University.
              </p>
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => scrollToSection('projects')}
                >
                  View My Work
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => scrollToSection('contact')}
                >
                  Get In Touch
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card">
                <div className="card-content">
                  <div className="code-snippet">
                    <div className="code-line">
                      <span className="keyword">class</span> <span className="class-name">AIEngineer</span>:
                    </div>
                    <div className="code-line indent">
                      <span className="keyword">def</span> <span className="function">__init__</span>(self):
                    </div>
                    <div className="code-line indent2">
                      self.name = <span className="string">"Gagan"</span>
                    </div>
                    <div className="code-line indent2">
                      self.skills = [<span className="string">"ML"</span>, <span className="string">"AI"</span>]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a detail-oriented Computer Science professional with a strong foundation in AI, ML, 
                data science, and full-stack development. Currently pursuing my Master's degree at Boston University 
                while working as a Graduate Assistant.
              </p>
              <p>
                My experience includes developing impactful projects like GNN-based stock prediction systems, 
                blockchain MLOps integration, and anomaly detection systems. I'm passionate about creating 
                scalable AI solutions that solve real-world problems.
              </p>
              <p>
                Seeking Machine Learning Engineer roles where I can deliver scalable AI solutions and contribute
                to cutting-edge technology development. With expertise in Python, TensorFlow, PyTorch, and cloud
                technologies, I'm ready to tackle complex ML challenges.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>3+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="stat">
                  <h3>15+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat">
                  <h3>95%</h3>
                  <p>Fraud Detection Accuracy</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img src="profile.jpg" alt="Gagan Veginati" className="profile-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="skills">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          
          <div className="skills-navigation">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                className={`skill-nav-btn ${activeSkillCategory === index ? 'active' : ''}`}
                onClick={() => setActiveSkillCategory(index)}
              >
                {category.category}
              </button>
            ))}
          </div>

          <div className="skills-content">
            <div className="skill-category active">
              <h3>{skillCategories[activeSkillCategory].category}</h3>
              <div className="skill-tags">
                {skillCategories[activeSkillCategory].skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className={`project-card ${project.featured ? 'featured' : ''}`}>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="experience">
        <div className="container">
          <h2 className="section-title">Experience & Education</h2>
          
          <div className="experience-tabs">
            <button
              className={`tab-btn ${experienceTab === 'experience' ? 'active' : ''}`}
              onClick={() => setExperienceTab('experience')}
            >
              Experience
            </button>
            <button
              className={`tab-btn ${experienceTab === 'education' ? 'active' : ''}`}
              onClick={() => setExperienceTab('education')}
            >
              Education
            </button>
          </div>

          <div className="tab-content">
            {experienceTab === 'experience' && (
              <div className="timeline">
                {experiences.map((exp, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h3>{exp.title}</h3>
                      <h4>{exp.company} - {exp.location}</h4>
                      <span className="timeline-date">{exp.period}</span>
                      <p>{exp.description}</p>
                      <ul>
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {experienceTab === 'education' && (
              <div className="education-grid">
                {education.map((edu, index) => (
                  <div key={index} className="education-card">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.school} - {edu.location}</h4>
                    <span className="period">{edu.period}</span>
                    <p>{edu.description}</p>
                    <div className="coursework">
                      <h4>Relevant Coursework:</h4>
                      <div className="coursework-list">
                        {edu.coursework.map((course, i) => (
                          <span key={i} className="course-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="contact">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-wrapper">
            <p className="contact-intro">
              I'm always interested in discussing new opportunities, innovative projects, 
              or just having a chat about technology and AI. Feel free to reach out!
            </p>
            <div className="contact-info-center">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:gveginati@gmail.com">gveginati@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <a href="tel:+16577265627">(657) 726-5627</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Boston, MA</span>
              </div>
            </div>
            <div className="social-links-center">
              <a href="https://linkedin.com/in/gagan-veginati" target="_blank" rel="noopener noreferrer" className="social-link">
                LinkedIn
              </a>
              <a href="https://github.com/gaganv007" target="_blank" rel="noopener noreferrer" className="social-link">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Gagan Veginati. Built with React.js</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;