import { useCallback, useEffect, useRef, useState } from 'react'
import { Linkedin, Github, Mail, Twitter, Send, FileText, Trophy, ExternalLink, Zap, BookOpen, Coffee, X, Smartphone, Monitor, Copy, Check, GitMerge, Award, GitPullRequest } from 'lucide-react'
import GitHubCalendar from 'react-github-calendar'
import './App.css'

const XLogo = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [copiedText, setCopiedText] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const closeButtonRef = useRef(null)
  const teaButtonRef = useRef(null)

  const closePaymentModal = useCallback(() => {
    setShowPaymentModal(false)
    setPaymentMethod(null)
    setCopiedText('')
  }, [])

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
    } catch {
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
      } catch {
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
    const returnFocusTo = teaButtonRef.current
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      returnFocusTo?.focus()
    }
  }, [showPaymentModal])

  useEffect(() => {
    if (!showPaymentModal) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePaymentModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [closePaymentModal, showPaymentModal])

  // Personal Data
  const personalInfo = {
    name: 'JAYANT',
    techStack: 'WEB3 | FULL-STACK | AI',
    github: 'Iam-jayant',
    linkedin: 'jayant-kurekar',
    email: 'jayantkurekar1@gmail.com',
    twitter: 'https://x.com/0xjayantxyz',
    telegram: 'https://t.me/staticmelon',
    resume: '/jayant_fullstack_resume.pdf'
  }

  // Stack Data
  const stackData = [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Solidity', 'Java', 'Python', 'SQL']
    },
    {
      category: 'Frameworks',
      items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'FastAPI']
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
      category: 'AI/ML',
      items: ['LLM Integration', 'Agent Pipelines', 'RAG', 'Hugging Face', 'Scikit-learn']
    },
    {
      category: 'Cloud',
      items: ['Azure AI', 'Firebase', 'Docker']
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'GitHub', 'Google Colab', 'Microsoft Office (Excel, Word, PowerPoint)', 'Privy', 'MCP', 'Supabase']
    }
  ]

  // Projects Data — size drives bento grid: 'lg' = 2 cols, 'sm' = 1 col
  // Order tuned for 3-col bento: lg+sm | sm+sm+sm | lg+sm | lg+sm | last stretches
  const projects = [
    {
      title: 'Walnut',
      year: '2026',
      tags: ['Fhenix', 'SOLIDITY', 'TYPESCRIPT', 'EVM'],
      grantWinner: true,
      size: 'lg',
      description: 'A confidential lending protocol where your collateral, debt, health factor, and liquidation threshold are fully encrypted and the protocol still works. Not despite encryption. Because of it.',
      features: [
        'Fully Homomorphic Encryption : Computations happen on encrypted data.',
        'Private State : Your positions, balances, and credit score are computed privately.',
        'Private Liquidations : No public mempool. No liquidation sniping. No MEV extraction.',
      ],
      repo: 'https://github.com/Iam-jayant/walnut',
      live: 'https://walnut-finance.vercel.app/'
    },
    {
      title: 'ProofOS',
      year: '2026',
      tags: ['EVM', 'WEB3', 'ZK', 'ETHMUMBAI WINNER'],
      hackathonWinner: true,
      size: 'sm',
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
    // ── Row 2: three smalls together ──
    {
      title: 'Blitzboard',
      year: '2026',
      tags: ['MONAD', 'SOLIDITY', 'TYPESCRIPT'],
      size: 'sm',
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
    {
      title: 'Code Vault',
      year: '2025',
      tags: ['MOVE', 'TYPESCRIPT', 'NODE.JS'],
      size: 'sm',
      description: 'Decentralized marketplace for premium code & developer bounties. Payments are x402 enabled and transactions are seamlessly fast.',
      features: [
        'Buy & Sell premium code repositories',
        'Launch bounties for bug fixes, features, and code challenges',
        'Trustless Payments with blockchain-backed rewards'
      ],
      live: 'https://codevault-asyncawait.netlify.app/'
    },
    {
      title: 'SAAD - AI Sentiment Alert System',
      year: '2025',
      tags: ['AI/ML', 'NODE.JS', 'PYTHON'],
      size: 'sm',
      description: 'Intelligent AI agent that continuously monitors Twitter/X and Reddit for brand mentions, analyzes sentiment, and sends real-time alerts.',
      features: [
        'Real-time social media monitoring',
        'Advanced sentiment analysis',
        'Slack & Email integration'
      ],
      repo: 'https://github.com/Iam-jayant/Agent-Saad'
    },
    // ── Row 3: lg + sm ──
    {
      title: 'Bliss',
      year: '2026',
      tags: ['ALEO BLOCKCHAIN', 'WEB3', 'PRIVACY'],
      grantWinner: true,
      size: 'lg',
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
    {
      title: 'CRYPT - NFT Gift Protocol',
      year: '2025',
      tags: ['POLYGON', 'AI', 'NFT'],
      size: 'sm',
      description: 'Decentralized gifting platform combining AI-generated art with ERC-20 token vaults for personalized NFT gift cards.',
      features: [
        'AI-generated personalized NFT art',
        'ERC-20 token vault integration',
        'Instant liquidation option'
      ],
      repo: 'https://github.com/Iam-jayant/CRYPT'
    },
    // ── Row 4: lg + sm ──
    {
      title: 'Ascend Protocol',
      year: '2025',
      tags: ['SEPOLIA', 'SOLIDITY', 'REACT'],
      hackathonWinner: true,
      size: 'lg',
      description: 'Crypto Inheritance protocol that enables users to create inheritance vaults for their crypto assets with automatic distribution to beneficiaries.',
      features: [
        'Smart contract-based inheritance vaults',
        'Automated beneficiary distribution',
        'Secure multi-signature support'
      ],
      repo: 'https://github.com/Iam-jayant'
    },
    {
      title: 'EraseIt - Ultra-Fast Drive Wiper',
      year: '2025',
      tags: ['SOFTWARE', 'JAVA', 'JAVAFX'],
      size: 'sm',
      description: 'High-Performance NIST SP 800-88 Compliant Data Destruction Solution ensuring 100% data unrecoverability.',
      features: [
        'NIST SP 800-88 compliant wiping',
        'Multi-pass secure deletion',
        'Fast performance optimization'
      ],
      repo: 'https://github.com/Iam-jayant/EraseIt'
    },
    // ── Row 5: last item stretches ──
    {
      title: 'Jeevan Setu - Bridge of Life',
      year: '2025',
      tags: ['FULL-STACK', 'SUPABASE', 'NODE.JS'],
      size: 'sm',
      description: 'Role-based platform securely connecting organ donors and recipients through verified doctors and hospital networks.',
      features: [
        'Secure donor-recipient matching',
        'Doctor verification system',
        'Hospital network integration'
      ],
      repo: 'https://github.com/Iam-jayant/Jeevan-Setu'
    }
  ]

  // Achievements Data — single mixed pool for bento grid
  // size: 'lg' spans 2 cols, 'md' spans 1 col + taller, 'sm' is compact 1×1
  const achievements = [
    {
      name: 'Web3 Hackathon',
      organization: 'IIIT Nagpur',
      winner: true,
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/IIIT%20Nagpur%20Web3%20Hackathon.pdf'
    },
    {
      name: 'Fhenix Grant Winner',
      project: 'Walnut',
      organization: 'Fhenix',
      size: 'lg',
      grant: true,
      description: 'A confidential lending protocol where your collateral, debt, health factor, and liquidation threshold are fully encrypted and the protocol still works. It works on FHE, powered by Fhenix and settled on Privara.',
      tags: ['FHE', 'Fhenix', 'DeFi', 'Privara'],
      projectUrl: 'https://walnut-finance.vercel.app/',
      repoUrl: 'https://github.com/Iam-jayant/walnut',
    },
    {
      name: 'ETHMumbai Winner',
      project: 'ProofOS',
      organization: 'ETHmumbai',
      winner: true,
      size: 'lg',
      description: 'Privacy-preserving crypto income and tax proofs for India. Winner at the prestigious ETHMumbai hackathon organized by ETHGlobal.',
      tags: ['EVM', 'Web3', 'ZK', 'Privacy'],
      projectUrl: 'https://proofos-theta.vercel.app/',
      repoUrl: 'https://github.com/Iam-jayant/ProofOS',
    },
    {
      name: 'Krutiverse Hackathon',
      organization: 'TGP Nagpur',
      winner: true,
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/TGP%20krutiverese%20Hackathon.pdf'
    },
    {
      name: 'Hack On',
      organization: 'GDG on Campus GCOEN',
      winner: true,
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/Hack%20On%20GCOEN.pdf'
    },
    {
      name: 'Healthcare Management System Hackathon',
      organization: 'FLUXUS - IIT Indore',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/iit%20indore.pdf'
    },
    {
      name: 'Aleo Grant Winner',
      project: 'Bliss',
      organization: 'Aleo',
      size: 'lg',
      grant: true,
      description: 'AI + Web3 privacy-focused dating platform that helps users securely manage identity, access, and permissions. Built with a forward-thinking approach to decentralized trust and automation. Built on Aleo blockchain.',
      tags: ['Aleo', 'AI', 'Privacy', 'Web3'],
      projectUrl: 'https://bliss-dating.vercel.app/',
      repoUrl: 'https://github.com/Iam-jayant/bliss-dating-app',
    },
    {
      name: 'Code Of Phoenix',
      organization: 'IIIT Naya Raipur',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/a8770f82b4972122a549eef912fd7491ab5a0c92/code%20of%20phoenix.pdf'
    },
    {
      name: 'CIH 2.0 Nagpur',
      organization: 'Suryodaya College Nagpur',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/bb6c686d9ca212529ada114c12730cc3cfcd0bfe/cih%202.0%20certificate.pdf'
    },
    {
      name: 'Ethglobal New Delhi',
      organization: 'Ethereum Global',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/Ethglobal%20New%20Delhi%202025.pdf'
    },
    {
      name: 'Devcraft Hackathon',
      organization: 'IIT Indore',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/Devcraft%20Esummit%20IIT%20Indore.pdf'
    },
    {
      name: 'DSU Devhack 2.0',
      organization: 'DSU Bangaluru',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/DSU%20Devhack%202.0.pdf'
    },
    {
      name: 'Ecothon 4.0',
      organization: 'Sipna College Nagpur',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/61b0d91300168a44c4be6b2f15dfae1c27fa3d67/Hackathon/ecothon%204.0%20certificate%20jayant.pdf'
    },
    {
      name: 'Gradio Agents & MCP Hackathon',
      organization: 'Gradio & Hugging Face',
      size: 'sm',
      certificateUrl: 'https://github.com/Iam-jayant/Certificates/blob/c27e53ac7355c016b58a05abe1a6eac48e7c5675/Certificate-AgentsMCP-Hackathon-1753275644066_6550.pdf'
    }
  ]

  // Open Source Contributions Data
  const openSourceContributions = [
    {
      repo: 'CodeLabsAI29/Inbox_OS',
      repoUrl: 'https://github.com/CodeLabsAI29/Inbox_OS',
      repoDescription: 'AI-powered email OS — decision + execution layer that understands, prioritizes, and routes emails automatically.',
      pr: {
        title: 'feat(security): implement security hardening and automated scanning',
        number: 46,
        url: 'https://github.com/CodeLabsAI29/Inbox_OS/pull/46',
        issueRef: '#15',
        status: 'merged',
      },
      changes: [
        'Added eslint-plugin-security to backend and frontend',
        'Added dedicated GitHub Actions security workflow',
        'Added automated security scanning pipeline',
      ],
      tags: ['Security', 'CI/CD', 'GitHub Actions', 'ESLint'],
    }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="about-content">
            {/* Hero Highlights — flowing ticker */}
            <div className="hero-ticker">
              <div className="hero-ticker-track">
                <a href="https://walnut-finance.vercel.app/" target="_blank" rel="noopener noreferrer" className="hero-ticker-item">
                  <Award size={14} />
                  <span>Fhenix Grant Winner — Walnut Protocol</span>
                </a>
                <span className="hero-ticker-dot">✦</span>
                <a href="https://bliss-dating.vercel.app/" target="_blank" rel="noopener noreferrer" className="hero-ticker-item">
                  <Award size={14} />
                  <span>Aleo Grant Winner — Bliss</span>
                </a>
                <span className="hero-ticker-dot">✦</span>
                <button className="hero-ticker-item" onClick={() => setActiveTab('opensource')}>
                  <GitMerge size={14} />
                  <span>Open Source Contributor — PR Merged</span>
                </button>
                <span className="hero-ticker-dot">✦</span>
                {/* Duplicate for seamless loop */}
                <a href="https://walnut-finance.vercel.app/" target="_blank" rel="noopener noreferrer" className="hero-ticker-item" tabIndex={-1} aria-hidden="true">
                  <Award size={14} />
                  <span>Fhenix Grant Winner — Walnut Protocol</span>
                </a>
                <span className="hero-ticker-dot" aria-hidden="true">✦</span>
                <a href="https://bliss-dating.vercel.app/" target="_blank" rel="noopener noreferrer" className="hero-ticker-item" tabIndex={-1} aria-hidden="true">
                  <Award size={14} />
                  <span>Aleo Grant Winner — Bliss</span>
                </a>
                <span className="hero-ticker-dot" aria-hidden="true">✦</span>
                <button className="hero-ticker-item" onClick={() => setActiveTab('opensource')} tabIndex={-1} aria-hidden="true">
                  <GitMerge size={14} />
                  <span>Open Source Contributor — PR Merged</span>
                </button>
                <span className="hero-ticker-dot" aria-hidden="true">✦</span>
              </div>
            </div>

            <div className="about-card">
              <h2 className="about-title">Hi, I'm Jayant.</h2>

              <p className="about-text">
                I'm an engineering student and a developer. I genuinely enjoy shipping things that actually work.
              </p>

              <p className="about-text">
                I build across <strong>Web3, full-stack, and AI</strong>, working with smart contracts, backend systems, and frontend. I like understanding the <strong>whole stack,</strong> not just one layer.
              </p>

              <p className="about-text">
                Hackathons shaped my mindset. Build fast, think deep, and deliver under pressure. I've been to <strong>15+ hackathons</strong>, won a few, and learned more there than any textbook. <strong>I believe in Build what Matters</strong>
              </p>

              <p className="about-text">
                Outside code, I travel and shoot. A reminder that great systems, like great photos, need clarity, patience, and intent.
              </p>
            </div>
            <div className="github-calendar-container">
              <h3 className="github-calendar-title">
                <Github size={24} /> Contributions
              </h3>
              <div className="github-calendar-wrapper">
                <GitHubCalendar
                  username={personalInfo.github}
                  blockSize={10}
                  blockMargin={4}
                  fontSize={14}
                  colorScheme="light"
                />
              </div>
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
            <h2 className="stack-main-title">TECH STACK</h2>
            <div className="stack-list">
              {stackData.map((stack) => (
                <div
                  key={stack.category}
                  className={`stack-card stack-cat-${stack.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                >
                  <h3 className="stack-category-title">{stack.category}</h3>
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
          <div className="proj-pool">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`proj-tile ${project.size === 'lg' ? 'proj-tile-lg' : 'proj-tile-sm'}`}
              >
                {project.grantWinner && (
                  <div className="bento-badge bento-badge-grant">GRANT WINNER</div>
                )}
                {project.hackathonWinner && (
                  <div className="bento-badge proj-badge-hack">HACKATHON WINNER</div>
                )}
                <div className="proj-tile-header">
                  <div className="proj-tile-meta">
                    <h3 className="proj-tile-title">{project.title}</h3>
                    <span className="proj-tile-year">{project.year}</span>
                  </div>
                  <div className="proj-tile-actions">
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="proj-tile-btn" title="View Repository" aria-label={`Open ${project.title} repository`}>
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="proj-tile-btn" title="Open Live Site" aria-label={`Open ${project.title} live site`}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="proj-tile-tags">
                  {project.tags.map((tag) => (
                    <span key={`${project.title}-${tag}`} className="proj-tile-tag">{tag}</span>
                  ))}
                </div>
                <p className="proj-tile-desc">{project.description}</p>
                {project.features && (
                  <ul className="proj-tile-features">
                    {project.features.map((feature) => (
                      <li key={`${project.title}-${feature}`}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )

      case 'achievements':
        return (
          <div className="bento-pool">
            {achievements.map((item) =>
              item.size === 'lg' ? (
                <div key={item.name} className={`bento-tile bento-tile-lg ${item.grant ? 'bento-tile-grant' : 'bento-tile-won-lg'}`}>
                  <div className={`bento-badge ${item.grant ? 'bento-badge-grant' : 'bento-badge-won-lg'}`}>
                    {item.grant ? 'GRANT WINNER' : 'HACKATHON WINNER'}
                  </div>
                  <div className="bento-tile-header">
                    <h3 className="bento-tile-project">{item.project}</h3>
                    <span className="bento-tile-org">{item.organization}</span>
                  </div>
                  <p className="bento-tile-desc">{item.description}</p>
                  <div className="bento-tile-tags">
                    {item.tags.map((tag) => (
                      <span key={`${item.project}-${tag}`} className="bento-tile-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="bento-tile-links">
                    {item.repoUrl && (
                      <a href={item.repoUrl} target="_blank" rel="noopener noreferrer" className="bento-tile-link" aria-label={`View ${item.project} repository`}>
                        <Github size={16} /> Repo
                      </a>
                    )}
                    {item.projectUrl && (
                      <a href={item.projectUrl} target="_blank" rel="noopener noreferrer" className="bento-tile-link" aria-label={`View ${item.project} live site`}>
                        <ExternalLink size={16} /> Live
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div key={item.name} className={`bento-tile bento-tile-sm ${item.winner ? 'bento-tile-winner' : ''}`}>
                  <div className="bento-tile-top">
                    <div className="bento-tile-icon">
                      <Trophy size={16} />
                    </div>
                    {item.winner && <span className="bento-badge bento-badge-won">WON</span>}
                  </div>
                  <h4 className="bento-tile-name">{item.name}</h4>
                  <span className="bento-tile-org-sm">{item.organization}</span>
                  {item.certificateUrl && (
                    <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="bento-tile-cert" aria-label={`View certificate for ${item.name}`}>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        )

      case 'opensource':
        return (
          <div className="os-section">
            <h2 className="os-main-title">OPEN SOURCE</h2>
            <p className="os-subtitle">Contributions to real-world projects. Code that ships in production.</p>

            <div className="os-contributions">
              {openSourceContributions.map((contrib) => (
                <div key={`${contrib.repo}-${contrib.pr.number}`} className="os-contribution-card">
                  <div className="os-card-header">
                    <div className="os-repo-info">
                      <Github size={18} />
                      <a
                        href={contrib.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="os-repo-name"
                        aria-label={`View ${contrib.repo} repository`}
                      >
                        {contrib.repo}
                      </a>
                    </div>
                    <span className="os-merged-badge">
                      <GitMerge size={14} /> MERGED
                    </span>
                  </div>

                  <p className="os-repo-desc">{contrib.repoDescription}</p>

                  <div className="os-pr-block">
                    <div className="os-pr-header">
                      <GitPullRequest size={16} />
                      <a
                        href={contrib.pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="os-pr-title"
                        aria-label={`View pull request #${contrib.pr.number}`}
                      >
                        {contrib.pr.title}
                      </a>
                      <span className="os-pr-number">#{contrib.pr.number}</span>
                    </div>

                    <ul className="os-changes-list">
                      {contrib.changes.map((change) => (
                        <li key={change}>{change}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="os-card-tags">
                    {contrib.tags.map((tag) => (
                      <span key={tag} className="os-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="os-card-links">
                    <a href={contrib.repoUrl} target="_blank" rel="noopener noreferrer" className="os-card-link" aria-label={`View ${contrib.repo} repository`}>
                      <Github size={16} /> Repository
                    </a>
                    <a href={contrib.pr.url} target="_blank" rel="noopener noreferrer" className="os-card-link os-card-link-pr" aria-label={`View pull request #${contrib.pr.number}`}>
                      <GitMerge size={16} /> Pull Request
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Writing / Narratives */}
            <h3 className="os-writing-title">WRITING</h3>
            <div className="os-contributions">
              <div className="os-contribution-card os-writing-card">
                <div className="os-card-header">
                  <div className="os-repo-info">
                    <img
                      src="/walnut%20logo.png"
                      alt="Walnut logo"
                      className="os-writing-logo"
                      loading="lazy"
                      width="24"
                      height="24"
                    />
                    <a
                      href="https://github.com/Iam-jayant/walnut"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="os-repo-name"
                      aria-label="View Walnut repository"
                    >
                      Iam-jayant/walnut
                    </a>
                  </div>
                  <span className="os-badge-writing">
                    <BookOpen size={12} /> NARRATIVE
                  </span>
                </div>

                <p className="os-repo-desc">
                  Confidential lending protocol narrative. A deep dive into Fully Homomorphic Encryption (FHE) in DeFi, explaining how positions remain private while liquidations stay secure.
                </p>

                <div className="os-pr-block">
                  <div className="os-pr-header">
                    <BookOpen size={16} />
                    <a
                      href="/walnut.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="os-pr-title"
                      aria-label="Read Walnut Narrative Article"
                    >
                      Walnut: Confidential Lending Narrative
                    </a>
                  </div>
                  <ul className="os-changes-list-writing">
                    <li>Homomorphic Encryption integration details</li>
                    <li>Private liquidations & avoiding MEV extraction</li>
                    <li>Health factor calculations under encryption</li>
                  </ul>
                </div>

                <div className="os-card-tags">
                  <span className="os-tag-writing">Fhenix</span>
                  <span className="os-tag-writing">Solidity</span>
                  <span className="os-tag-writing">FHE</span>
                  <span className="os-tag-writing">Privacy</span>
                </div>

                <div className="os-card-links">
                  <a href="https://github.com/Iam-jayant/walnut" target="_blank" rel="noopener noreferrer" className="os-card-link" aria-label="View Walnut repository">
                    <Github size={16} /> Repository
                  </a>
                  <a href="/walnut.html" target="_blank" rel="noopener noreferrer" className="os-card-link os-card-link-writing" aria-label="Read Walnut article">
                    <BookOpen size={16} /> Read Article
                  </a>
                  <a href="https://walnut-finance.vercel.app/" target="_blank" rel="noopener noreferrer" className="os-card-link" aria-label="View Walnut Live Site">
                    <ExternalLink size={16} /> Live Site
                  </a>
                </div>
              </div>
            </div>
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
            loading="lazy"
            width="140"
            height="140"
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
              aria-label="LinkedIn profile"
              title="LinkedIn profile"
              style={{ '--hover-bg': 'var(--accent-blue)' }}
            >
              <span className="social-link-icon"><Linkedin size={20} /></span>
              <span className="social-link-handle">@{personalInfo.linkedin}</span>
            </a>
            <a
              href={`https://github.com/${personalInfo.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
              title="GitHub profile"
              style={{ '--hover-bg': 'var(--accent-green)' }}
            >
              <span className="social-link-icon"><Github size={20} /></span>
              <span className="social-link-handle">@{personalInfo.github}</span>
            </a>
            <a
              href={personalInfo.twitter !== '#' ? personalInfo.twitter : 'https://x.com/0xjayantxyz'}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="X profile"
              title="X profile"
              style={{ '--hover-bg': 'var(--accent-yellow)' }}
            >
              <span className="social-link-icon"><XLogo size={18} /></span>
              <span className="social-link-handle">@0xjayantxyz</span>
            </a>
            <a
              href={personalInfo.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Telegram"
              title="Telegram"
              style={{ '--hover-bg': 'var(--accent-lavender)' }}
            >
              <span className="social-link-icon"><Send size={20} /></span>
              <span className="social-link-handle">@staticmelon</span>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="social-link"
              aria-label="Send email"
              title="Send email"
              style={{ '--hover-bg': 'var(--accent-pink)' }}
            >
              <span className="social-link-icon"><Mail size={20} /></span>
              <span className="social-link-handle">{personalInfo.email}</span>
            </a>
            <a
              href={personalInfo.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Resume"
              title="View Resume"
              style={{ '--hover-bg': 'var(--accent-yellow)' }}
            >
              <span className="social-link-icon"><FileText size={20} /></span>
              <span className="social-link-handle">Resume</span>
            </a>
            <a
              href="/SEMINAR%20PPT.pptx"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Seminar PPT"
              title="Download Seminar PPT"
              style={{ '--hover-bg': 'var(--accent-lavender)' }}
              download
            >
              <span className="social-link-icon"><Monitor size={20} /></span>
              <span className="social-link-handle">Seminar PPT</span>
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
          className={`nav-button ${activeTab === 'opensource' ? 'active' : ''}`}
          onClick={() => setActiveTab('opensource')}
        >
          Open Source
        </button>
      </div>

      {/* Content Area */}
      <div className="content-area">
        {renderContent()}
      </div>

      <footer className="footer">
        (c) 2026 | {personalInfo.name}
      </footer>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={closePaymentModal}>
          <div
            className="modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={closePaymentModal}
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
