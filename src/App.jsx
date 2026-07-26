import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

const roles = ['Game Dev', 'Web Dev']
const CONTACT_EMAIL = 'jrruga912@gmail.com'
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function App() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [typing, setTyping] = useState(true)
  const [formData, setFormData] = useState(initialFormState)
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

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

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (formStatus !== 'idle') {
      setFormStatus('idle')
      setFormError('')
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setFormStatus('error')
      setFormError('Email service is not configured yet. Please email me directly instead.')
      return
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject || !formData.message.trim()) {
      setFormStatus('error')
      setFormError('Please fill in all required fields.')
      return
    }

    setFormStatus('sending')
    setFormError('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          reply_to: formData.email.trim(),
          to_email: CONTACT_EMAIL,
          subject: formData.subject,
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY,
      )

      setFormStatus('success')
      setFormData(initialFormState)
    } catch (error) {
      console.error('EmailJS error:', error)
      setFormStatus('error')
      setFormError('Something went wrong sending your message. Please try again or email me directly.')
    }
  }

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
      title: "Tales of Destiny", 
      desc: "A 2D top-down roguelite survival game made in GDevelop, inspired by Vampire Survivors.",
      tech: ["JavaScript", "GDevelop"],
      status: "School Project",
      image: "/tales1.PNG", 
      detailsUrl: "/TalesGame.html"
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
            <li>
  <a
    href="/resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="resume-btn"
  >
    Resume
  </a>
</li>
          </ul>
        </nav>

        <header className="hero">
          <div className="hero-text">
            <h1>JOHN ROMAN RUGA</h1>
            <p><span className="typing-text">{roleText}</span></p>
            <div className="skill-marquee-wrapper">
              <div className="skill-marquee">
                {[
  'Java',
  'VB.NET',
  'JavaScript',
  'HTML',
  'CSS',
  'C',
  'C#',
  'Python',
  'GDScript',
  'SQL',
  'MySQL',
  'GDevelop',
  'Godot',
  'Vite',
  'React',
  'Git'
].map((skill, idx) => (
  <span key={idx} className="skill-chip">{skill}</span>
))}
              </div>
            </div>
          </div>
        </header>

        <section id="about" className="about-section">
          <div className="about-grid">
            <div className="about-image-wrapper">
              <img src="/gradme.jpg" alt="John Roman Ruga" className="about-image" />
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
                    <p>Java, VB.NET, JavaScript, HTML, CSS, C, C#, Python, GDScript, SQL, MySQL, GDevelop, Godot, Vite, React</p>
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
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact-box contact-box-link">
                  <div className="contact-icon">@</div>
                  <h3>Email</h3>
                  <p>{CONTACT_EMAIL}</p>
                </a>
                <div className="contact-box contact-box--primary">
                  <div className="contact-icon">+</div>
                  <h3>Available for Work</h3>
                  <p>Open to discuss opportunities</p>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="contact-row">
                <label>
                  Full Name *
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label>
                  Email Address *
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </label>
              </div>
              <label>
                Subject *
                <select name="subject" value={formData.subject} onChange={handleFormChange} required>
                  <option value="">Select a subject</option>
                  <option>Project Inquiry</option>
                  <option>Job Opportunity</option>
                  <option>General Question</option>
                </select>
              </label>
              <label>
                Message *
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                ></textarea>
              </label>
              {formStatus === 'success' && (
                <p className="form-feedback form-feedback--success">
                  Message sent! I&apos;ll get back to you at {CONTACT_EMAIL} soon.
                </p>
              )}
              {formStatus === 'error' && (
                <p className="form-feedback form-feedback--error">
                  {formError}{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`}>Email me directly</a>
                </p>
              )}
              <button type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
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