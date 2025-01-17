import { Code, Globe, Server, Database, Cloud, Terminal, BotIcon as Robot, Lock, Palette, Smartphone } from 'lucide-react';

export const TECH_CATEGORIES = {
  frontend: {
    name: 'Frontend',
    icon: Globe,
    subcategories: {
      languages: {
        name: 'Languages',
        items: ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'Sass', 'Less'],
      },
      frameworks: {
        name: 'Frameworks',
        items: ['React', 'Vue.js', 'Angular', 'Svelte', 'Next.js', 'Nuxt.js'],
      },
      styling: {
        name: 'Styling',
        items: ['Tailwind CSS', 'styled-components', 'Material-UI', 'Bootstrap', 'Chakra UI'],
      },
    },
  },
  backend: {
    name: 'Backend',
    icon: Server,
    subcategories: {
      languages: {
        name: 'Languages',
        items: ['Node.js', 'Python', 'Java', 'Ruby', 'Go', 'PHP', 'C#'],
      },
      frameworks: {
        name: 'Frameworks',
        items: ['Express.js', 'Django', 'Ruby on Rails', 'Spring Boot', 'ASP.NET Core', 'Laravel'],
      },
      databases: {
        name: 'Databases',
        items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra'],
      },
    },
  },
  devops: {
    name: 'DevOps',
    icon: Cloud,
    subcategories: {
      containerization: {
        name: 'Containerization',
        items: ['Docker', 'Kubernetes', 'Docker Compose', 'Podman'],
      },
      cicd: {
        name: 'CI/CD',
        items: ['Jenkins', 'GitLab CI', 'GitHub Actions', 'CircleCI', 'Travis CI'],
      },
      cloud: {
        name: 'Cloud Platforms',
        items: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean', 'Heroku'],
      },
    },
  },
  tools: {
    name: 'Tools',
    icon: Terminal,
    subcategories: {
      versionControl: {
        name: 'Version Control',
        items: ['Git', 'GitHub', 'GitLab', 'Bitbucket'],
      },
      packageManagers: {
        name: 'Package Managers',
        items: ['npm', 'Yarn', 'pnpm', 'Composer', 'pip'],
      },
      testing: {
        name: 'Testing',
        items: ['Jest', 'Mocha', 'Cypress', 'Selenium', 'Puppeteer'],
      },
    },
  },
  mobile: {
    name: 'Mobile',
    icon: Smartphone,
    subcategories: {
      crossPlatform: {
        name: 'Cross-Platform',
        items: ['React Native', 'Flutter', 'Ionic', 'Xamarin'],
      },
      ios: {
        name: 'iOS',
        items: ['Swift', 'Objective-C', 'SwiftUI'],
      },
      android: {
        name: 'Android',
        items: ['Kotlin', 'Java', 'Jetpack Compose'],
      },
    },
  },
  ai: {
    name: 'AI & ML',
    icon: Robot,
    subcategories: {
      frameworks: {
        name: 'Frameworks',
        items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV'],
      },
      languages: {
        name: 'Languages',
        items: ['Python', 'R', 'Julia'],
      },
      tools: {
        name: 'Tools',
        items: ['Jupyter', 'Pandas', 'NumPy', 'NLTK', 'Matplotlib'],
      },
    },
  },
  security: {
    name: 'Security',
    icon: Lock,
    subcategories: {
      tools: {
        name: 'Tools',
        items: ['Wireshark', 'Metasploit', 'Nmap', 'Burp Suite', 'OWASP ZAP'],
      },
      practices: {
        name: 'Practices',
        items: ['Penetration Testing', 'Encryption', 'Authentication', 'Authorization', 'OWASP Top 10'],
      },
    },
  },
  design: {
    name: 'Design',
    icon: Palette,
    subcategories: {
      tools: {
        name: 'Tools',
        items: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
      },
      concepts: {
        name: 'Concepts',
        items: ['UI/UX', 'Responsive Design', 'Color Theory', 'Typography', 'Accessibility'],
      },
    },
  },
};

export const LAYOUT_TEMPLATES = {
  modern: {
    name: 'Modern',
    description: 'Clean and professional layout with modern design elements',
    features: [
      { name: 'Clean design', description: 'Minimalist and elegant presentation' },
      { name: 'Stats grid', description: 'Organized statistics in a grid layout' },
      { name: 'Tech badges', description: 'Visual representation of technologies' },
    ],
    preview: '🎨',
    recommended: true,
    customizable: true,
  },
  developer: {
    name: 'Developer',
    description: 'Code-focused layout with syntax highlighting and project showcases',
    features: [
      { name: 'Code snippets', description: 'Highlight your best code' },
      { name: 'Project cards', description: 'Showcase your top projects' },
      { name: 'GitHub stats', description: 'Display your GitHub activity' },
    ],
    preview: '💻',
    recommended: false,
    customizable: true,
  },
  minimalist: {
    name: 'Minimalist',
    description: 'Simple and clean layout focusing on essential information',
    features: [
      { name: 'Concise bio', description: 'Brief introduction about yourself' },
      { name: 'Key skills', description: 'Highlight your main skills' },
      { name: 'Contact info', description: 'Easy-to-find contact information' },
    ],
    preview: '🧘',
    recommended: false,
    customizable: true,
  },
  creative: {
    name: 'Creative',
    description: 'Visually appealing layout for designers and creative professionals',
    features: [
      { name: 'Portfolio grid', description: 'Showcase your visual work' },
      { name: 'Custom illustrations', description: 'Add personality with illustrations' },
      { name: 'Animated elements', description: 'Engage visitors with subtle animations' },
    ],
    preview: '🎨',
    recommended: false,
    customizable: true,
  },
};

