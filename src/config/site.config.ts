export const siteConfig: SiteConfig = {
  siteName: 'Tushar',
  domain: 'tushar.com',
  author: 'Tushar',
  description: 'An ordinary person creating extraordinary things through code and creativity.',
  about:
  "I'm just an ordinary person with an extraordinary passion for technology and learning. I enjoy turning complex problems into simple, beautiful solutions. When I'm not coding, you can find me exploring new technologies, contributing to open source, or learning something new. Always open to collaboration and new challenges! 🤌",
  author_img: 'https://avatars.githubusercontent.com/u/139502199?s=400&u=08dd0ba146ca9b1661802f50ce58cbcab793dba7&v=4',
  keywords: [
    'Tushar',
    'Full Stack Developer',
    'Portfolio',
    'Next.js',
    'TypeScript',
    'Web Developer',
    'Open Source',
    'Programming',
    'Coding'
  ],
  ogImage: '/og.png',
  twitterHandle: '@tushar',

  theme: {
    default: 'dark',
    allowSystem: true,
  },
  links: {
    website: 'https://tushar.com',
    github: 'https://github.com/Tushar-bot-hash',
    linkedin: 'https://www.linkedin.com/in/tushar',
    tips: 'https://github.com/Tushar-bot-hash', // Using GitHub as fallback
    email: 'mailto:tusharv811@gmail.com',
  },
  social: [
    { label: 'GitHub', url: 'https://github.com/Tushar-bot-hash', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/tushar', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:tusharv811@gmail.com', icon: 'globe' },
  ],
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Posts', href: '/posts' },
    { label: 'Chat', href: '/chat' },
    { label: 'Contact', href: '/contact' }
  ],

  seo: {
    title: 'Tushar - Developer Portfolio',
    description: 'An ordinary person creating extraordinary things through code and creativity.',
    keywords: [
      'Tushar',
      'Developer',
      'Portfolio',
      'Next.js',
      'TypeScript',
      'Web Development',
      'Programming'
    ],
    canonical: 'https://tushar.com',
    image: '/og.png',
    imageAlt: "Tushar - Developer Portfolio",
    locale: 'en-US',
    type: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index,follow',
    themeColor: '#0f172a',
  },
};