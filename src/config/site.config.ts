// Please note Some data Below are Just Placeholder for now due to active development
import type { Metadata } from 'next';

export type SocialLink = {
  label: string;
  url: string;
  icon?: string; // name for icon library if needed later
};

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export interface SiteConfig {
  siteName: string;
  domain: string;
  description: string;
  about: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  author: string;
  author_img: string;
  theme: {
    default: 'light' | 'dark';
    allowSystem: boolean;
  };
  links: {
    website: string;
    github: string;
    linkedin: string;
    tips: string;
    email: string;
  };
  social: SocialLink[];
  navigation: NavItem[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical?: string;
    image?: string; // default og image
    imageAlt?: string;
    locale?: string;
    type?: string;
    twitterCard?: string;
    robots?: string;
    themeColor?: string;
  };
}

export const siteConfig: SiteConfig = {
  siteName: 'Tushar',
  domain: 'tushar.com',
  author: 'Tushar',
  description: 'An ordinary person creating extraordinary things through code and creativity.',
  about: "I'm just an ordinary person with an extraordinary passion for technology and learning. I enjoy turning complex problems into simple, beautiful solutions. When I'm not coding, you can find me exploring new technologies, contributing to open source, or learning something new. Always open to collaboration and new challenges! 🤌",
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

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const { seo, siteName, domain } = siteConfig;

  const base: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.author, url: siteConfig.links.website }],
    metadataBase: new URL(`https://${domain}`),
    alternates: { canonical: seo.canonical ?? `https://${domain}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical ?? `https://${domain}`,
      siteName,
      images: seo.image ? [seo.image] : [],
      type: seo.type ?? 'website',
      locale: seo.locale,
    },
    twitter: {
      card: seo.twitterCard ?? 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.image ? [seo.image] : [],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    other: {
      robots: seo.robots,
      'theme-color': seo.themeColor,
      'og:image:alt': seo.imageAlt,
    },
  } as Metadata;

  return { ...base, ...overrides };
}

export type { Metadata };