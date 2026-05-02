import { useEffect, useState } from 'react'
import './App.css'

const roles = ['Game Dev', 'Web Dev']

function App() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const currentRole = roles[activeRoleIndex]
    let timeout

    if (typing) {
      if (roleText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length + 1))
        }, 120)
      } else {
        timeout = setTimeout(() => setTyping(false), 1200)
      }
    } else {
      if (roleText.length > 0) {
        timeout = setTimeout(() => {
          setRoleText(currentRole.slice(0, roleText.length - 1))
        }, 70)
      } else {
        timeout = setTimeout(() => {
          setActiveRoleIndex((activeRoleIndex + 1) % roles.length)
          setTyping(true)
        }, 300)
      }
    }

    return () => clearTimeout(timeout)
  }, [activeRoleIndex, roleText, typing])

  const projects = [
    {
      title: "Budget Life",
      desc: "A 2D financial tracking system featuring real-time banking, loan, and investment management.",
      tech: ["C#", "JavaScript", "RPG Maker MZ"],
      status: "Capstone Project",
      image: "/budgetlayp.PNG", 
      detailsUrl: "/budget-life.html"
    },
    {
      title: "Clinic Database", 
      desc: "A secure healthcare management system with dual-role authentication and automated patient tracking.",
      tech: ["MySQL", "Visual Basic", "Form.vb"],
      status: "School Project",
      image: "/logn.PNG", 
      detailsUrl: "/clinicdbo.html"
    },
    {
      title: "E-commerce Website",
      desc: "A deep dive into application security risks and cloud deployment vulnerabilities.",
      tech: ["MySQL", "Visual Basic", "Form.vb"],
      status: "School Project",
      image: "/LTAB.PNG",
      detailsUrl: "/E-commerce.html"
    }
  ];

  return (
    
    <div className="portfolio">
      {/* Background Video */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="main-video">
          <source src="/bgretro.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
      </div>

      {/* Main Content */}
      <div className="content-layer">
        <nav className="navbar">
          <a href="https://github.com/Demented912" target="_blank" rel="noreferrer" className="logo-link">
            <img src="/github.png" alt="GitHub" className="logo-icon" />
            <span className="logo">Demented912</span>
          </a>
          <ul className="nav-links">
            <li><a href="#projects">Projects</a></li>
            <li><a href="#about">About</a></li>
            <li><button className="resume-btn">Resume</button></li>
          </ul>
        </nav>

        <header className="hero">
          <div className="hero-text">
            <h1>JOHN ROMAN RUGA</h1>
            <p><span className="typing-text">{roleText}</span></p>
            <div className="skill-marquee-wrapper">
              <div className="skill-marquee">
                {['HTML', 'CSS', 'Java', 'Python', 'C#', 'C++', 'GitHub', 'MySQL', 'React', 'Vite', 'HTML', 'CSS', 'Java', 'Python', 'C#', 'C++', 'GitHub', 'MySQL', 'React', 'Vite'].map((skill, idx) => (
                  <span key={idx} className="skill-chip">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <section id="about" className="about-section">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img src="/ME.jpg" alt="John Roman Ruga" className="about-image" />
            </div>
            <div className="about-copy">
              <span className="section-label">About Me</span>
              <p>I'm a passionate engineer dedicated to building efficient, scalable systems that bridge the gap between logic and play.</p>
              <p>Starting with a rigorous study of programming and database systems in university, I have developed a versatile skillset that allows me to tackle both the technical demands of web architecture and the creative logic of game development. I am constantly refining my craft, looking for new ways to optimize performance and enhance the way users—and players—interact with technology.</p>
            </div>
          </div>
        </section>

        <section id="projects" className="projects-section">
          <h2>My Projects</h2>
          <div className="project-list">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-card-media">
                  <img src={project.image} alt={project.title} className="project-thumb" />
                </div>
                <div className="project-card-content">
                  <span className="status-tag">{project.status}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="tech-pills">
                    {project.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <a href={project.detailsUrl || '#projects'} className="view-details">View Details →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="education-section">
          <div className="education-card">
            <div className="education-card-grid">
              <div className="education-intro">
                <span className="section-label">Academic Journey</span>
                <h2>Education</h2>
                <p>My academic foundation towards learning in software development and game development.</p>
              </div>

              <div>
                <div className="education-card-top">
                  <img src="/perps.png" alt="PERPS Logo" className="education-logo" />
                  <div>
                    <h3>Bachelor of Science in Information Technology with Specialization in Game Development</h3>
                    <p className="school-name">University of Perpetual Help System Dalta</p>
                  </div>
                </div>

                <div className="education-meta">
                  <span className="education-score">1.99 GWA</span>
                  <span className="education-date">Sept 2022 - July 2026</span>
                </div>

                <div className="education-section-blocks">
                  <div className="education-block">
                    <h4>Relevant Coursework</h4>
                    <div className="coursework-list">
                      <span>Data Structures & Algorithms</span>
                      <span>Database Systems</span>
                      <span>Game Development</span>
                      <span>Web Development</span>
                      <span>Git Collaboration</span>
                    </div>

                    <h4>Skills & Technologies</h4>
                    <p>JavaScript C++ React Vite SQL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-card">
            <span className="section-label">Let's Connect</span>
            <h2>Contact Me</h2>
            <p>Want to discuss something? Send me a message!</p>

            <div className="contact-grid">
              <div className="contact-summary">
                <a href="https://www.linkedin.com/in/john-roman-ruga-6265b93b3/" target="_blank" rel="noreferrer" className="contact-box contact-box-link">
                  <div className="contact-icon">in</div>
                  <h3>LinkedIn</h3>
                  <p>Connect with me</p>
                </a>
                <div className="contact-box contact-box--primary">
                  <div className="contact-icon">+</div>
                  <h3>Available for Work</h3>
                  <p>Open to discuss opportunities</p>
                </div>
              </div>

              <form className="contact-form">
              <div className="contact-row">
                <label>
                  Full Name *
                  <input type="text" placeholder="Your full name" />
                </label>
                <label>
                  Email Address *
                  <input type="email" placeholder="your.email@example.com" />
                </label>
              </div>
              <label>
                Subject *
                <select>
                  <option>Select a subject</option>
                  <option>Project Inquiry</option>
                  <option>Job Opportunity</option>
                  <option>General Question</option>
                </select>
              </label>
              <label>
                Message *
                <textarea placeholder="Tell me about your project or opportunity..."></textarea>
              </label>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
        </section>

        <footer>
          <p>© 2026 • Designed & Developed by Rugaportfolio</p>
        </footer>
      </div>
    </div>
  )
}

export default App