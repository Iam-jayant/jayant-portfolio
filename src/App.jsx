import { useEffect, useRef, useState } from 'react'
import { Linkedin, Github, Mail, Twitter, Send, Trophy, ExternalLink, Zap, BookOpen, Coffee, X, Smartphone, Monitor, Copy, Check } from 'lucide-react'
import GitHubCalendar from 'react-github-calendar'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [copiedText, setCopiedText] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const closeButtonRef = useRef(null)
  const teaButtonRef = useRef(null)

  // Payment Data
  const paymentInfo = {
    upi: {
      id: 'jayantkurekar1-1@oksbi',
      name: 'Jayant Kurekar',
      number: '8767629570',
      deepLink: 'upi://pay?pa=jayantkurekar1-1@oksbi&pn=Jayant%20Kurekar&cu=INR'
    },
    crypto: {
      ethereum: '0xC3C19fA66640769939A838dcBb78Df7d715F6663',
      solana: '8i78BFfNmrufu1dQx5uFNMSrAVP6PXt2fMwr9TfWnWn1',
      bitcoin: 'bc1qsat8cr6mzwfeun0sm2slqjvy9tf8d35jctynv0'
    }
  }

  // Detect if mobile / coarse pointer
  useEffect(() => {
    if (typeof window === 'undefined') return
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches
    const uaMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    setIsMobile(Boolean(coarsePointer || uaMobile))
  }, [])

  // Copy to clipboard handler with fallback for insecure contexts
  const copyToClipboard = async (text, label) => {
    const fallbackCopy = () => {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        fallbackCopy()
      }
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2000)
    } catch (error) {
      fallbackCopy()
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2000)
    }
  }

  // Handle UPI payment
  const handleUPIPayment = () => {
    if (isMobile) {
      // Try to open UPI app, but don't throw error if it fails
      try {
        window.location.href = paymentInfo.upi.deepLink
      } catch (error) {
        // If UPI app not available, show the QR/ID screen
        setPaymentMethod('upi')
      }
      // Set a timeout to show QR if user comes back (app not opened)
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          setPaymentMethod('upi')
        }
      }, 1000)
    } else {
      setPaymentMethod('upi')
    }
  }

  // Lock scroll when modal is open and manage focus
  useEffect(() => {
    if (!showPaymentModal) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      teaButtonRef.current?.focus()
    }
  }, [showPaymentModal])

  // Personal Data
  const personalInfo = {
    name: 'JAYANT',
    techStack: 'WEB3 | FULL-STACK | AI | JAVA',
    github: 'Iam-jayant',
    linkedin: 'jayant-kurekar',
    email: 'jayantkurekar1@gmail.com',
    twitter: 'https://x.com/0xjayantxyz',
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
      category: 'Frameworks',
      items: ['React', 'Next.js', 'Node.js', 'Express']
    },
    {
      category: 'Web3',
      items: ['Web3.js', 'Hardhat', 'Ethers.js', 'Smart Contracts']
    },
    {
      category: 'Blockchain',
      items: ['Ethereum', 'EVM L2 chains', 'Monad', 'Movement', 'Aptos']
    },
    {
      category: 'Databases',
      items: ['PostgreSQL', 'MongoDB']
    },
    {
      category: 'Tools & Others',
      items: ['Git', 'Firebase', 'Privy', 'MCP', 'Supabase']
    }
  ]

  // Projects Data
  const projects = [
    {
      title: 'ProofOS',
      year: '2026',
      tags: ['EVM', 'WEB3', 'ZK'],
      description: 'Privacy-preserving crypto income and tax proofs for India. ProofOS turns wallet activity into verifiable financial claims without exposing your full transaction history.',
      features: [
        'Privacy-first claim sharing (no raw wallet export required)',
        'Multi-wallet workflows with ENS club integration',
        'Certificate generation with ledger commitment and verification references',
        'Optional decentralized publishing integrations (for configured environments)'
      ],
      repo: 'https://github.com/Iam-jayant/ProofOS',
      live: 'https://proofos-theta.vercel.app/'
    },
      title: 'Blitzboard',
      year: '2026',
      tags: ['MONAD', 'SOLIDITY', 'TYPESCRIPT'],
      description: 'Real-time on-chain leaderboard + voting system built for hackathons. Human + AI Agents are voting parallel, designed to showcase Monad\'s speed with instant vote syncing and live ranking updates.',
      features: [
        'Live voting with instant leaderboard updates',
        'AI agents evaluating projects on code quality and plagiarism',
        'Real-time project ranking & score aggregation',
        'Transparent on-chain vote storage (tamper-proof)',
        'Built for hackathons, judges + participant voting support'
      ],
      link: 'https://github.com/Iam-jayant/blitzboard'
    },
    {
      title: 'Bliss',
      year: '2026',
      tags: ['ALEO BLOCKCHAIN', 'WEB3', 'PRIVACY'],
      description: 'AI + Web3 privacy-focused dating platform that helps users securely manage identity, access, and permissions. Built with a forward-thinking approach to decentralized trust and automation.',
      features: [
        'Privacy-first identity & permission management',
        'AI-driven access control + smart automation',
        'Secure user data flow using decentralized verification',
        'Built for scalable Web3 apps & real-world adoption'
      ],
      link: 'https://github.com/Iam-jayant/bliss-dating-app'
    },
    {
      title: 'Code Vault',
      year: '2025',
      tags: ['MOVE', 'TYPESCRIPT', 'NODE.JS'],
      description: 'Decentralized marketplace for premium code & developer bounties. Payments are x402 enabled and transactions are seamlessly fast.',
      features: [
        'Buy & Sell premium code repositories',
        'Launch bounties for bug fixes, features, and code challenges',
        'Trustless Payments with blockchain-backed rewards'
      ],
      link: 'https://codevault-asyncawait.netlify.app/'
    },
    {
      title: 'Ascend Protocol',
      year: '2025',
      tags: ['SEPOLIA', 'SOLIDITY', 'REACT'],
      description: 'Crypto Inheritance protocol that enables users to create inheritance vaults for their crypto assets with automatic distribution to beneficiaries.',
      features: [
        'Smart contract-based inheritance vaults',
        'Automated beneficiary distribution',
        'Secure multi-signature support'
      ],
      link: 'https://github.com/Iam-jayant'
    },
    {
      title: 'SAAD - AI Sentiment Alert System',
      year: '2025',
      tags: ['AI/ML', 'NODE.JS', 'PYTHON'],
      description: 'Intelligent AI agent that continuously monitors Twitter/X and Reddit for brand mentions, analyzes sentiment, and sends real-time alerts.',
      features: [
        'Real-time social media monitoring',
        'Advanced sentiment analysis',
        'Slack & Email integration'
      ],
      link: 'https://github.com/Iam-jayant/Agent-Saad'
    },
    {
      title: 'CRYPT - NFT Gift Protocol',
      year: '2025',
      tags: ['POLYGON', 'AI', 'NFT'],
      description: 'Decentralized gifting platform combining AI-generated art with ERC-20 token vaults for personalized NFT gift cards.',
      features: [
        'AI-generated personalized NFT art',
        'ERC-20 token vault integration',
        'Instant liquidation option'
      ],
      link: 'https://github.com/Iam-jayant/CRYPT'
    },
    {
      title: 'EraseIt - Ultra-Fast Drive Wiper',
      year: '2025',
      tags: ['SOFTWARE', 'JAVA', 'JAVAFX'],
      description: 'High-Performance NIST SP 800-88 Compliant Data Destruction Solution ensuring 100% data unrecoverability.',
      features: [
        'NIST SP 800-88 compliant wiping',
        'Multi-pass secure deletion',
        'Fast performance optimization'
      ],
      link: 'https://github.com/Iam-jayant/EraseIt'
    },
    {
      title: 'Jeevan Setu - Bridge of Life',
      year: '2025',
      tags: ['FULL-STACK', 'SUPABASE', 'NODE.JS'],
      description: 'Role-based platform securely connecting organ donors and recipients through verified doctors and hospital networks.',
      features: [
        'Secure donor-recipient matching',
        'Doctor verification system',
        'Hospital network integration'
      ],
      link: 'https://github.com/Iam-jayant/Jeevan-Setu'
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
              {
                title: 'Blitzboard',
                year: '2026',
                tags: ['MONAD', 'SOLIDITY', 'TYPESCRIPT'],
                description: 'Real-time on-chain leaderboard + voting system built for hackathons. Human + AI Agents are voting parallel, designed to showcase Monad\'s speed with instant vote syncing and live ranking updates.',
                features: [
                  'Live voting with instant leaderboard updates',
                  'AI agents evaluating projects on code quality and plagiarism',
                  'Real-time project ranking & score aggregation',
                  'Transparent on-chain vote storage (tamper-proof)',
                  'Built for hackathons, judges + participant voting support'
                ],
                repo: 'https://github.com/Iam-jayant/blitzboard',
                live: 'https://blitzboard.vercel.app/'
              },
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
                  <li>AI in Web3</li>
                  <li>System Design</li>
                  <li>Solana Development</li>
                </ul>
              </div>
              <div className="info-card">
                <h3 className="info-title">
                  <BookOpen size={20} /> Interests
                </h3>
                <ul className="info-list">
                  <li>DeFi Protocols</li>
                  <li>Hackathons</li>
                  <li>Generative AI</li>
                </ul>
              </div>
            </div>

            <button
              className="tea-button"
              onClick={() => setShowPaymentModal(true)}
              aria-label="Open buy me a coffee modal"
              ref={teaButtonRef}
            >
              <Coffee size={20} /> Buy me a Coffee!
            </button>
          </div >
        )

      case 'stack':
        return (
          <div className="stack-section">
            <h2 className="stack-main-title" style = {{color:'black', wordSpacing:'0.5px', paddingBottom:'30px',fontSize:'29px', fontFamily:'monospace',  }}>TECH STACK</h2>
            <div className="stack-grid">
              {stackData.map((stack) => (
                <div key={stack.category} className="stack-category">
                  <h3 className="stack-category-title">
                    <span className="stack-icon">{stack.icon}</span>
                    {stack.category}
                  </h3>
                  <div className="stack-items">
                    {stack.items.map((item) => (
                      <span key={item} className="stack-item">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'projects':
        return (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.title} className="project-card">
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={`${project.title}-${tag}`} className="project-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-header-right">
                    <span className="project-year">{project.year}</span>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-button"
                          title="View Repository"
                          aria-label={`Open ${project.title} repository`}
                        >
                          <Github size={18} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link-button"
                          title="Open Live Site"
                          aria-label={`Open ${project.title} live site`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                        year: '2026',
                        tags: ['ALEO BLOCKCHAIN', 'WEB3', 'PRIVACY'],
                        description: 'AI + Web3 privacy-focused dating platform that helps users securely manage identity, access, and permissions. Built with a forward-thinking approach to decentralized trust and automation.',
                        features: [
                          'Privacy-first identity & permission management',
                          'AI-driven access control + smart automation',
                          'Secure user data flow using decentralized verification',
                          'Built for scalable Web3 apps & real-world adoption'
                        ],
                        repo: 'https://github.com/Iam-jayant/bliss-dating-app',
                        live: 'https://bliss-dating.vercel.app/'
                      },
            ))}
          </div>
        )

      case 'achievements':
        return (
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.name} className="achievement-card">
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
                    aria-label={`View certificate for ${achievement.name}`}
                  >
                    <ExternalLink size={16} />
                  {
                    title: 'Code Vault',
                    year: '2025',
                    tags: ['MOVE', 'TYPESCRIPT', 'NODE.JS'],
                    description: 'Decentralized marketplace for premium code & developer bounties. Payments are x402 enabled and transactions are seamlessly fast.',
                    features: [
                      'Buy & Sell premium code repositories',
                      'Launch bounties for bug fixes, features, and code challenges',
                      'Trustless Payments with blockchain-backed rewards'
                    ],
                    live: 'https://codevault-asyncawait.netlify.app/'
                  },
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
          {
            title: 'Ascend Protocol',
            year: '2025',
            tags: ['SEPOLIA', 'SOLIDITY', 'REACT'],
            description: 'Crypto Inheritance protocol that enables users to create inheritance vaults for their crypto assets with automatic distribution to beneficiaries.',
            features: [
              'Smart contract-based inheritance vaults',
              'Automated beneficiary distribution',
              'Secure multi-signature support'
            ],
            repo: 'https://github.com/Iam-jayant'
          },
          <div className="tech-tags">{personalInfo.techStack}</div>

          <div className="social-links">
            <a
              href={`https://linkedin.com/in/${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            {
              title: 'SAAD - AI Sentiment Alert System',
              year: '2025',
              tags: ['AI/ML', 'NODE.JS', 'PYTHON'],
              description: 'Intelligent AI agent that continuously monitors Twitter/X and Reddit for brand mentions, analyzes sentiment, and sends real-time alerts.',
              features: [
                'Real-time social media monitoring',
                'Advanced sentiment analysis',
                'Slack & Email integration'
              ],
              repo: 'https://github.com/Iam-jayant/Agent-Saad'
            },
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Telegram"
              title="Telegram"
            >
              <Send size={20} />
            {
              title: 'CRYPT - NFT Gift Protocol',
              year: '2025',
              tags: ['POLYGON', 'AI', 'NFT'],
              description: 'Decentralized gifting platform combining AI-generated art with ERC-20 token vaults for personalized NFT gift cards.',
              features: [
                'AI-generated personalized NFT art',
                'ERC-20 token vault integration',
                'Instant liquidation option'
              ],
              repo: 'https://github.com/Iam-jayant/CRYPT'
            },
              className="social-link"
              aria-label="Send email"
            >
              <Mail size={20} />
            {
              title: 'EraseIt - Ultra-Fast Drive Wiper',
              year: '2025',
              tags: ['SOFTWARE', 'JAVA', 'JAVAFX'],
              description: 'High-Performance NIST SP 800-88 Compliant Data Destruction Solution ensuring 100% data unrecoverability.',
              features: [
                'NIST SP 800-88 compliant wiping',
                'Multi-pass secure deletion',
                'Fast performance optimization'
              ],
              repo: 'https://github.com/Iam-jayant/EraseIt'
            },
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
          {
            title: 'Jeevan Setu - Bridge of Life',
            year: '2025',
            tags: ['FULL-STACK', 'SUPABASE', 'NODE.JS'],
            description: 'Role-based platform securely connecting organ donors and recipients through verified doctors and hospital networks.',
            features: [
              'Secure donor-recipient matching',
              'Doctor verification system',
              'Hospital network integration'
            ],
            repo: 'https://github.com/Iam-jayant/Jeevan-Setu'
          }

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => { setShowPaymentModal(false); setPaymentMethod(null); }}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => { setShowPaymentModal(false); setPaymentMethod(null); }}
              aria-label="Close payment modal"
              ref={closeButtonRef}
            >
              <X size={24} />
            </button>

            {!paymentMethod ? (
              <>
                <div className="modal-header">
                  <Coffee size={32} />
                  <h2 className="modal-title" id="payment-modal-title">Buy me a Coffee!</h2>
                  <p className="modal-subtitle">Choose your payment method</p>
                </div>

                <div className="payment-options">
                  <button className="payment-option-card" onClick={handleUPIPayment} aria-label="Pay via UPI">
                    <div className="payment-icon upi-icon">
                      <Smartphone size={28} />
                    </div>
                    <h3 className="payment-option-title">UPI Payment</h3>
                    <p className="payment-option-desc">
                      {isMobile ? 'Pay instantly via UPI app' : 'Scan QR or copy UPI ID'}
                    </p>
                  </button>

                  <button className="payment-option-card" onClick={() => setPaymentMethod('crypto')} aria-label="Pay with crypto">
                    <div className="payment-icon crypto-icon">
                      <Monitor size={28} />
                    </div>
                    <h3 className="payment-option-title">Crypto Payment</h3>
                    <p className="payment-option-desc">ETH, SOL, or BTC</p>
                  </button>
                </div>
              </>
            ) : paymentMethod === 'upi' ? (
              <>
                <div className="modal-header">
                  <Smartphone size={32} />
                  <h2 className="modal-title" id="payment-modal-title">UPI Payment</h2>
                  <p className="modal-subtitle">Scan QR or copy UPI ID</p>
                </div>

                <div className="payment-details">
                  <div className="qr-container">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paymentInfo.upi.deepLink)}`}
                      alt="UPI QR Code"
                      className="qr-code"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="upi-details">
                    <div className="detail-row">
                      <span className="detail-label">UPI ID</span>
                      <div className="detail-value-group">
                        <span className="detail-value">{paymentInfo.upi.id}</span>
                        <button
                          className="copy-button"
                          onClick={() => copyToClipboard(paymentInfo.upi.id, 'upi-id')}
                        >
                          {copiedText === 'upi-id' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Mobile</span>
                      <div className="detail-value-group">
                        <span className="detail-value">{paymentInfo.upi.number}</span>
                        <button
                          className="copy-button"
                          onClick={() => copyToClipboard(paymentInfo.upi.number, 'mobile')}
                        >
                          {copiedText === 'mobile' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="back-button" onClick={() => setPaymentMethod(null)} aria-label="Back to payment options">
                    Back to options
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-header">
                  <Monitor size={32} />
                  <h2 className="modal-title" id="payment-modal-title">Crypto Payment</h2>
                  <p className="modal-subtitle">Send to any of these addresses</p>
                </div>

                <div className="payment-details">
                  <div className="crypto-addresses">
                    <div className="crypto-card">
                      <div className="crypto-header">
                        <span className="crypto-name">Ethereum (ETH)</span>
                        <span className="crypto-badge">ERC-20</span>
                      </div>
                      <div 
                        className="crypto-address"
                        onClick={() => copyToClipboard(paymentInfo.crypto.ethereum, 'eth')}
                      >
                        {paymentInfo.crypto.ethereum}
                        <span className="crypto-address-copy-icon">
                          {copiedText === 'eth' ? <Check size={16} /> : <Copy size={16} />}
                        </span>
                      </div>
                    </div>

                    <div className="crypto-card">
                      <div className="crypto-header">
                        <span className="crypto-name">Solana (SOL)</span>
                        <span className="crypto-badge">SPL</span>
                      </div>
                      <div 
                        className="crypto-address"
                        onClick={() => copyToClipboard(paymentInfo.crypto.solana, 'sol')}
                      >
                        {paymentInfo.crypto.solana}
                        <span className="crypto-address-copy-icon">
                          {copiedText === 'sol' ? <Check size={16} /> : <Copy size={16} />}
                        </span>
                      </div>
                    </div>

                    <div className="crypto-card">
                      <div className="crypto-header">
                        <span className="crypto-name">Bitcoin (BTC)</span>
                        <span className="crypto-badge">Native</span>
                      </div>
                      <div 
                        className="crypto-address"
                        onClick={() => copyToClipboard(paymentInfo.crypto.bitcoin, 'btc')}
                      >
                        {paymentInfo.crypto.bitcoin}
                        <span className="crypto-address-copy-icon">
                          {copiedText === 'btc' ? <Check size={16} /> : <Copy size={16} />}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="back-button" onClick={() => setPaymentMethod(null)} aria-label="Back to payment options">
                    Back to options
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
