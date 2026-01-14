import { useState } from 'react'
import { Linkedin, Github, Mail, Twitter, Send, Trophy, ExternalLink, Zap, BookOpen, Coffee } from 'lucide-react'
import GitHubCalendar from 'react-github-calendar'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('about')

  // Personal Data
  const personalInfo = {
    name: 'JAYANT',
    techStack: 'WEB3 | FULL-STACK | AI | JAVA',
    github: 'Iam-jayant',
    linkedin: 'jayant-kurekar',
    email: 'jayantkurekar1@gmail.com',
    twitter: 'x.com/0xjayantxyz',
    telegram: 'https://t.me/staticmelon',
    about: "Hi, I'm Jayant."
  }

  // Stack Data
  const stackData = [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Solidity', 'Java', 'Python']
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'HTML', 'CSS', 'JavaFX']
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'REST APIs']
    },
    {
      category: 'Web3',
      items: ['Web3.js', 'Hardhat', 'Ethers.js', 'Smart Contracts']
    },
    {
      category: 'AI/ML',
      items: ['Azure AI', 'HuggingFace', 'LangChain', 'PyTorch', 'scikit-learn']
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB', 'Firebase', 'Supabase']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Docker', 'Linux', 'VS Code']
    }
  ]

  // Projects Data
  const projects = [
    {
      title: 'Ascend Protocol',
      year: '2024',
      tags: ['WEB3', 'SOLIDITY', 'REACT'],
      description: 'Crypto Inheritance protocol that enables users to create inheritance vaults for their crypto assets with automatic distribution to beneficiaries.',
      features: [
        'Smart contract-based inheritance vaults',
        'Automated beneficiary distribution',
        'Secure multi-signature support'
      ]
    },
    {
      title: 'SAAD - AI Sentiment Alert System',
      year: '2024',
      tags: ['AI/ML', 'NODE.JS', 'PYTHON'],
      description: 'Intelligent AI agent that continuously monitors Twitter/X and Reddit for brand mentions, analyzes sentiment, and sends real-time alerts.',
      features: [
        'Real-time social media monitoring',
        'Advanced sentiment analysis',
        'Slack & Email integration'
      ]
    },
    {
      title: 'CRYPT - NFT Gift Protocol',
      year: '2024',
      tags: ['WEB3', 'AI', 'NFT'],
      description: 'Decentralized gifting platform combining AI-generated art with ERC-20 token vaults for personalized NFT gift cards.',
      features: [
        'AI-generated personalized NFT art',
        'ERC-20 token vault integration',
        'Instant liquidation option'
      ]
    },
    {
      title: 'EraseIt - Ultra-Fast Drive Wiper',
      year: '2024',
      tags: ['SOFTWARE', 'JAVA', 'SECURITY'],
      description: 'High-Performance NIST SP 800-88 Compliant Data Destruction Solution ensuring 100% data unrecoverability.',
      features: [
        'NIST SP 800-88 compliant wiping',
        'Multi-pass secure deletion',
        'Fast performance optimization'
      ]
    },
    {
      title: 'Jeevan Setu – Bridge of Life',
      year: '2024',
      tags: ['FULL-STACK', 'HEALTHCARE', 'NODE.JS'],
      description: 'Role-based platform securely connecting organ donors and recipients through verified doctors and hospital networks.',
      features: [
        'Secure donor-recipient matching',
        'Doctor verification system',
        'Hospital network integration'
      ]
    }
  ]

  // Achievements Data
  const achievements = [
    {
      name: 'Web3 Hackathon',
      organization: 'IIIT Nagpur',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/IIIT%20Nagpur%20Web3%20Hackathon.pdf'
    },
    {
      name: 'Krutiverse Hackathon',
      organization: 'TGP Nagpur',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/TGP%20krutiverese%20Hackathon.pdf'
    },
    {
      name: 'Hack On',
      organization: 'GDG on Campus GCOEN',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/Hack%20On%20GCOEN.pdf'
    },
    {
      name: 'Healthcare Management System Hackathon',
      organization: 'FLUXUS - IIT Indore',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/iit%20indore.pdf'
    },
    {
      name: 'Code Of Phoenix',
      organization: 'IIIT Naya Raipur',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/code%20of%20phoenix.pdf'
    },
    {
      name: 'CIH 2.0 Nagpur',
      organization: 'Suryodaya College Nagpur',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/bb6c686d9ca212529ada114c12730cc3cfcd0bfe/cih%202.0%20certificate.pdf'
    },
    {
      name: 'Devcraft Hackathon',
      organization: 'IIT Indore',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/Devcraft%20Esummit%20IIT%20Indore.pdf'
    },
    {
      name: 'DSU Devhack 2.0',
      organization: 'DSU Bangaluru',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/DSU%20Devhack%202.0.pdf'
    },
    {
      name: 'Ethglobal New Delhi',
      organization: 'Ethereum Global',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/Ethglobal%20New%20Delhi%202025.pdf'
    },
    {
      name: 'Ecothon 4.0',
      organization: 'Sipna College Nagpur',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/ecothon%204.0%20certificate%20jayant.pdf'
    },
    {
      name: 'Gradio Agents & MCP Hackathon',
      organization: 'Gradio & Hugging Face',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/c27e53ac7355c016b58a05abe1a6eac48e7c5675/Certificate-AgentsMCP-Hackathon-1753275644066_6550.pdf'
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="about-content">
            <div className="about-card">
              <h2 className="about-title">Hi, I'm Jayant.</h2>

              <p className="about-text">
                I'm an engineering student and a developer. I genuinely enjoy shipping things that actually work.
              </p>

              <p className="about-text">
                I build across <strong>Web3, full-stack, and AI</strong>, working with smart contracts, backend systems, and frontend polish. I like understanding the <strong>whole stack,</strong> not just one layer.
              </p>

              <p className="about-text">
                Hackathons shaped my mindset. Build fast, think deep, and deliver under pressure. I’ve been to <strong>15+ hackathons</strong>, won a few, and learned more there than any textbook.
              </p>

              <p className="about-text">
                Outside code, I travel and shoot. A reminder that great systems, like great photos, need clarity, patience, and intent.
              </p>
            </div>
            <div className="github-calendar-container">
              <h3 className="github-calendar-title">
                <Github size={24} /> Contributions
              </h3>
              <GitHubCalendar
                username={personalInfo.github}
                blockSize={10}
                blockMargin={4}
                fontSize={14}
                colorScheme="light"
              />
            </div>


            <div className="info-grid">
              <div className="info-card">
                <h3 className="info-title">
                  <Zap size={20} /> Learning Now
                </h3>
                <ul className="info-list">
                  <li>Rust Lang Book</li>
                  <li>Solana Development</li>
                  <li>Zero Knowledge Proofs</li>
                </ul>
              </div>
              <div className="info-card">
                <h3 className="info-title">
                  <BookOpen size={20} /> Interests
                </h3>
                <ul className="info-list">
                  <li>DeFi Protocols</li>
                  <li>Hackathons</li>
                  <li>Open Source</li>
                </ul>
              </div>
            </div>

            <button
              className="tea-button"
              onClick={() => {
                navigator.clipboard.writeText('8767629570');
                alert('UPI Number 8767629570 copied to clipboard! Pay via any UPI App.');
              }}
            >
              <Coffee size={20} /> Buy me a chai!
            </button>
          </div >
        )

      case 'stack':
        return (
          <div className="stack-grid">
            {stackData.map((stack, index) => (
              <div key={index} className="stack-category">
                <h3 className="stack-category-title">{stack.category}</h3>
                <div className="stack-items">
                  {stack.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="stack-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'projects':
        return (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="project-year">{project.year}</span>
                </div>
                <p className="project-description">{project.description}</p>
                {project.features && (
                  <ul className="project-features">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )

      case 'achievements':
        return (
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div key={index} className="achievement-card">
                <div className="achievement-icon">
                  <Trophy size={20} />
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-name">{achievement.name}</h3>
                  <p className="achievement-org">{achievement.organization}</p>
                </div>
                {achievement.certificateUrl && (
                  <a
                    href={achievement.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="achievement-link"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )

      case 'community':
        return (
          <div className="community-content">
            <p>Community contributions and talks coming soon...</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="app">
      {/* Profile Section */}
      <div className="header">
        <div className="profile-section">
          <img
            src="/profile.jpg"
            alt="Jayant Kurekar"
            className="profile-image"
            onError={(e) => {
              e.target.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jayant'
            }}
          />
          <h1 className="profile-name">{personalInfo.name}</h1>
          <div className="tech-tags">{personalInfo.techStack}</div>

          <div className="social-links">
            <a
              href={`https://linkedin.com/in/${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={personalInfo.twitter !== '#' ? personalInfo.twitter : `https://twitter.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Twitter size={20} />
            </a>
            <a
              href={personalInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Telegram"
            >
              <Send size={20} />
            </a>
            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Github size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-link"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button
          className={`nav-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button
          className={`nav-button ${activeTab === 'stack' ? 'active' : ''}`}
          onClick={() => setActiveTab('stack')}
        >
          Stack
        </button>
        <button
          className={`nav-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button
          className={`nav-button ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button
          className={`nav-button ${activeTab === 'community' ? 'active' : ''}`}
          onClick={() => setActiveTab('community')}
        >
          Community
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderContent()}
      </div>

      <footer className="footer">
        © 2026 {personalInfo.name} • Built with React + Vite
      </footer>
    </div>
  )
}

export default App
