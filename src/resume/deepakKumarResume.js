export const deepakKumarResume = {
  name: 'Deepak Kumar',
  location: 'Jaipur, Rajasthan',
  phone: '+91-9024877100',
  email: 'deepakshantoriya@gmail.com',
  headline:
    'Senior Full Stack Engineer | AI Integrations | Automation Systems | Scalable SaaS Platforms',
  links: [
    {
      label: 'LinkedIn: linkedin.com/in/deepak-kumar-432889148',
      href: 'https://linkedin.com/in/deepak-kumar-432889148',
    },
    {
      label: 'GitHub: github.com/deepjangid',
      href: 'https://github.com/deepjangid',
    },
    {
      label: 'Portfolio: deepakjangid.in',
      href: 'https://deepakjangid.in',
    },
  ],
  summary:
    'Senior Full Stack Engineer with 4+ years of experience building scalable SaaS products, AI-powered applications, workflow automation systems, and cloud-hosted platforms. Experienced in designing high-throughput backend systems, integrating LLM technologies, implementing distributed architectures, and delivering production-ready solutions serving thousands of daily users. Proven track record of leading engineering teams, improving system performance, and building automation platforms that drive measurable business outcomes.',
  skillGroups: [
    {
      label: 'Frontend',
      items: [
        'React.js',
        'Next.js',
        'Redux',
        'React Native',
        'React Flow',
        'GrapesJS',
        'HTML5',
        'CSS3',
        'SCSS',
        'MUI',
        'Ant Design',
      ],
    },
    {
      label: 'Backend',
      items: [
        'Node.js',
        'NestJS',
        'Express.js',
        'Laravel',
        'REST APIs',
        'GraphQL',
        'JWT Authentication',
        'RBAC',
        'BullMQ',
      ],
    },
    {
      label: 'Databases',
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
    },
    {
      label: 'AI & LLMs',
      items: [
        'OpenAI API',
        'Amazon Bedrock',
        'Prompt Engineering',
        'AI Workflow Automation',
        'AI Assistant',
        'Conversational AI',
        'Voice AI Systems',
        'Survey Generation Systems',
        'Generative AI Applications',
        'AI Integrations',
        'LLMs',
      ],
    },
    {
      label: 'Architecture',
      items: [
        'System Design',
        'Microservices',
        'Distributed Systems',
        'Event-Driven Architecture',
        'Queue Processing',
        'Queue-Based Processing',
        'Background Jobs',
        'High Throughput Systems',
        'Scalable Systems',
        'Automation Platforms',
        'Performance Optimization',
        'Scalability',
      ],
    },
    {
      label: 'Cloud & DevOps',
      items: [
        'AWS S3',
        'Route53',
        'Static Website Hosting',
        'Custom Domain Hosting',
        'Deployment Automation',
        'Docker',
        'Docker Compose',
        'Nginx',
        'PM2',
        'GitHub Actions',
        'CI/CD',
        'Vercel',
      ],
    },
    {
      label: 'Integrations',
      items: [
        'WhatsApp Business API',
        'Twilio',
        'Stripe',
        'PhonePe',
        'Jotform',
        'Microsoft Teams',
        'ElevenLabs',
      ],
    },
    {
      label: 'Tools',
      items: ['Git', 'GitHub', 'Jira', 'Trello'],
    },
  ],
  experience: [
    {
      title: 'Senior Full Stack Engineer',
      company: 'Alea IT Solutions Pvt. Ltd.',
      location: 'Jaipur',
      dates: 'Apr 2022 - Present',
      summary:
        'Delivered 20+ full-stack projects across SaaS, AI integrations, workflow automation, cloud deployment, and marketing technology domains.',
      projects: [
        {
          name: 'Hotel CRM & Automation Platform',
          summary:
            'SaaS-based CRM for customer engagement, automation, surveys, AI-assisted workflows, and subscription billing.',
          highlights: ['5K-6K daily active users', 'campaign engagement by 2x'],
          bullets: [
            'Built a scalable CRM platform used by 5K-6K daily active users, improving communication efficiency by 35%.',
            'Integrated WhatsApp Business API, increasing campaign engagement by 2x.',
            'Designed a QR-based survey system, achieving a 60%+ response rate.',
            'Implemented Stripe subscription billing, reducing manual effort by 80%.',
            'Developed backend services handling 10K+ daily requests.',
            'Built an AI-powered survey generation engine using OpenAI APIs that transformed natural language prompts into structured surveys with dynamic questions, answer formats, scoring models, and conditional branching logic.',
            'Enabled users to generate complete survey workflows through prompt-driven interactions, significantly reducing manual survey creation effort.',
            'Developed a conversational AI assistant integrating Amazon Bedrock and ElevenLabs, enabling real-time Voice AI interactions through speech-to-text and text-to-speech workflows.',
            'Implemented bi-directional communication between users and AI systems using voice-based prompts and responses.',
            'Designed AI-assisted onboarding workflows that automated customer setup processes and reduced onboarding effort by 25%.',
          ],
          techStack:
            'Next.js, NestJS, Node.js, OpenAI API, Amazon Bedrock, ElevenLabs, WhatsApp API, Stripe, Jotform, PostgreSQL/MongoDB, Docker, Nginx, PM2',
        },
        {
          name: 'Affiliate Marketing & Workflow Builder',
          summary:
            'Workflow builder, survey engine, landing page creation, custom-domain publishing, and lead routing for performance marketing use cases.',
          highlights: [
            '1,000+ active flows',
            'lead conversion by 35%',
            '1,000+ requests per second',
          ],
          bullets: [
            'Built a workflow automation system supporting 1,000+ active flows.',
            'Increased lead conversion by 35% through a dynamic survey engine.',
            'Developed a self-serve landing page builder, reducing developer dependency by 70%.',
            'Improved system performance by 40-50% using Redis caching.',
            'Enhanced revenue efficiency by 25% through real-time lead routing.',
            'Designed and implemented a self-service website publishing platform allowing users to connect custom domains and deploy websites directly from the application.',
            'Built automated deployment workflows that package templates, images, static assets, and dependencies into production-ready websites.',
            'Implemented AWS-powered static site deployment pipelines using AWS S3, Route53, and custom-domain hosting for branded customer websites.',
            'Automated DNS onboarding workflows using customer-provided nameserver configurations.',
            'Architected Redis-backed queue processing systems capable of handling burst traffic exceeding 1,000+ requests per second while maintaining application stability.',
            'Built worker-based asynchronous processing pipelines for reliable event processing, storage, and distribution.',
            'Implemented event-driven architecture patterns using Redis queues and background workers.',
          ],
          techStack:
            'React.js, Redux, React Flow, GrapesJS, Laravel, Redis, REST APIs, AWS S3, Route53, Docker, Custom Domain Hosting',
        },
        {
          name: 'Multi-Vendor E-Commerce Platform',
          summary:
            'Role-based e-commerce system for admin, vendor, and customer workflows, including catalog, orders, payments, background jobs, and reporting.',
          highlights: ['10,000+ product records', '900ms to 150ms'],
          bullets: [
            'Developed a multi-vendor platform with secure authentication and RBAC for Admin, Vendor, and Customer roles.',
            'Built 50+ NestJS REST endpoints for product, cart, order, payment, and vendor workflows on PostgreSQL.',
            'Implemented product search with filtering, sorting, and pagination for 10,000+ product records.',
            'Integrated Stripe Payments and webhooks for checkout, refunds, and payment verification with 99% transaction tracking accuracy.',
            'Created a vendor dashboard to manage products, inventory, pricing, and orders, supporting 500+ listings per vendor account.',
            'Reduced average API response time from 900ms to 150ms using Redis caching, and processed 200+ daily background jobs with BullMQ.',
            'Implemented BullMQ-powered background processing pipelines for asynchronous order processing and notification workflows.',
            'Optimized high-volume data access using Redis caching strategies, reducing database load and improving overall throughput.',
            'Containerized the full stack with Docker Compose and supported zero-downtime deployments through Nginx and CI/CD.',
          ],
          techStack:
            'Next.js, NestJS, PostgreSQL, Redis, BullMQ, Stripe, Docker Compose, Nginx, GitHub Actions',
        },
        {
          name: 'Internal Automation Platform',
          summary:
            'Multi-channel automation platform for processing customer enquiries, lead routing, notifications, and outbound communication workflows.',
          highlights: ['real-time notifications', 'eliminating manual intervention'],
          bullets: [
            'Built a multi-channel automation platform that automatically processed incoming customer enquiries and support requests.',
            'Integrated Twilio, WhatsApp Business API, Email, and Microsoft Teams to trigger real-time notifications and customer engagement workflows.',
            'Implemented automated lead routing and communication pipelines, reducing response times and eliminating manual intervention.',
            'Automated outbound phone calls, messaging, and alerting workflows based on customer actions and submitted forms.',
          ],
          techStack:
            'Node.js, Twilio, WhatsApp API, Microsoft Teams, Email Automation, REST APIs',
        },
      ],
    },
  ],
  additionalSections: [
    {
      title: 'Leadership & Ownership',
      items: [
        'Led cross-functional teams of 4-8 engineers across multiple concurrent SaaS, AI, and automation product deliveries.',
        'Conducted architecture discussions, code reviews, sprint planning, and technical mentoring.',
        'Collaborated directly with stakeholders to define technical requirements and delivery roadmaps.',
        'Improved engineering productivity by 20% through process optimization and technical guidance.',
      ],
    },
    {
      title: 'Deployment Experience',
      items: [
        'Managed production deployments for SaaS products serving thousands of daily active users.',
        'Designed CI/CD pipelines using GitHub Actions, reducing deployment time by 60%.',
        'Maintained 99.9% uptime across production environments.',
        'Built deployment automation workflows supporting custom-domain website provisioning and cloud-hosted application delivery.',
        'Implemented Docker-based deployment strategies and Nginx-powered production environments.',
      ],
    },
    {
      title: 'Technical Highlights',
      items: [
        'Built AI-powered survey generation systems using OpenAI APIs.',
        'Developed conversational voice AI assistants using Amazon Bedrock and ElevenLabs.',
        'Designed custom-domain publishing and cloud deployment platforms using AWS.',
        'Built event-driven systems capable of handling 1,000+ requests per second.',
        'Implemented workflow automation platforms supporting thousands of active workflows.',
        'Led engineering teams across SaaS, AI, and automation product development initiatives.',
      ],
    },
    {
      title: 'Achievements',
      items: [
        'Employee of the Year (2024) - Alea IT Solutions Pvt. Ltd.',
        'Winner - AleaIT Hackathon (2023 & 2024)',
      ],
    },
  ],
  education: [
    {
      degree: 'B.Tech (Computer Engineering)',
      institution: 'Poornima College of Technology',
      year: '2020',
    },
  ],
  certifications: [],
  achievements: [],
}
