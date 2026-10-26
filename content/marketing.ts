import type { Service } from './types.ts';

/**
 * Default content for the Marketing page. This is the fallback (and the seed) for the
 * Sanity `marketingPage` document; when Sanity is configured, values edited in the
 * studio override these field by field (see lib/cms).
 */
const services: Service[] = [
  {
    title: 'Digital Marketing Strategy',
    slug: 'digital-marketing-strategy',
    promise: 'A clear marketing direction before you spend: goals, audience and a plan that fits your budget.',
    seo: { description: 'Digital marketing strategy from Uexora Marketing Studio: clear goals, audience understanding and a plan built around your priorities and budget.' },
    image: { src: '/images/services/digital-marketing-strategy.jpg', alt: 'Two colleagues planning at a whiteboard covered in sticky notes' },
    heroImage: { src: '/images/heroes/services/digital-marketing-strategy.jpg', alt: 'A team planning a marketing board of sticky notes on a flip chart' },
    highlights: ['Clear goals', 'Understanding the audience', 'Priorities and budget', 'A plan before investing'],
    whoFor: 'Businesses that want a clear direction for their marketing before they invest in it.',
    details: [
      'Every business needs a clear direction before investing in marketing. We help you identify your goals, understand your target audience and plan digital marketing activities around your priorities and budget.',
      'The result is a plan that connects marketing to business goals, so that every channel and campaign has a clear purpose.',
    ],
    faqs: [
      { q: 'Why start with strategy?', a: 'Because what works for one company may not work for another. A strategy sets direction before money is spent on channels and campaigns.' },
      { q: 'What does a strategy engagement cover?', a: 'Your goals, your target audience and a plan of digital marketing activities around your priorities and budget.' },
      { q: 'Do we need a strategy if we only want one service?', a: 'Not always. We start by understanding your business and recommend only what fits your needs.' },
    ],
    text: 'Every business needs a clear direction before investing in marketing. We help businesses identify their goals, understand their target audience and plan digital marketing activities around their priorities and budget.',
  },
  {
    title: 'Search Engine Optimisation (SEO)',
    slug: 'search-engine-optimisation',
    promise: 'Be found by people already searching for what you offer, and keep that visibility over time.',
    seo: { description: 'SEO services that improve search visibility through relevant content, website optimisation and practices that support long-term organic discovery.' },
    image: { src: '/images/services/search-engine-optimisation.jpg', alt: 'Performance analytics graphs on a laptop screen' },
    heroImage: { src: '/images/heroes/services/search-engine-optimisation.jpg', alt: 'A person reviewing a website analytics dashboard on a laptop' },
    highlights: ['Search visibility', 'Relevant content', 'Website optimisation', 'Long-term organic discovery'],
    whoFor: 'Businesses that want to be found in search engines and build visibility that lasts.',
    details: [
      'Search engine optimisation helps businesses improve their visibility in search engines through relevant content, website optimisation and other SEO practices.',
      'It supports long-term organic discovery: being found by people who are already looking for what you offer, without paying for every visit.',
    ],
    faqs: [
      { q: 'What does SEO work involve?', a: 'Relevant content, website optimisation and other SEO practices that support long-term organic discovery.' },
      { q: 'How long does SEO take to show results?', a: 'SEO is a long-term activity. We set realistic expectations and share performance insights as the work progresses.' },
      { q: 'Is SEO better than paid advertising?', a: 'They do different jobs. SEO builds lasting organic visibility; paid advertising reaches audiences quickly. Many businesses use both.' },
    ],
    text: 'We help businesses improve their visibility in search engines through relevant content, website optimisation and other SEO practices that support long-term organic discovery.',
  },
  {
    title: 'Paid Advertising and Lead Generation',
    slug: 'paid-advertising-and-lead-generation',
    promise: 'Campaigns that reach the right audiences and generate enquiries you can measure.',
    seo: { description: 'Paid advertising and lead generation: campaigns planned and managed to reach relevant audiences, generate enquiries and improve performance over time.' },
    image: { src: '/images/services/paid-advertising-and-lead-generation.jpg', alt: 'A bar chart on a computer screen' },
    heroImage: { src: '/images/heroes/services/paid-advertising-and-lead-generation.jpg', alt: 'Colleagues gathered around a laptop discussing a campaign' },
    highlights: ['Campaign planning and management', 'Relevant audiences', 'Enquiry generation', 'Performance insight'],
    whoFor: 'Businesses that want advertising campaigns which reach the right audiences and generate enquiries they can measure.',
    details: [
      'We plan and manage paid advertising campaigns designed to reach relevant audiences, attract potential customers and generate enquiries.',
      'Our focus is on understanding campaign performance and identifying opportunities to improve it, so that budget goes where it works.',
    ],
    faqs: [
      { q: 'Which platforms do you advertise on?', a: 'That depends on where your audience is. We recommend channels after understanding your business and goals.' },
      { q: 'How do you measure success?', a: 'By tracking the metrics that matter to your business, such as enquiries, rather than impressions alone.' },
      { q: 'What budget do we need?', a: 'Campaigns are planned around your priorities and budget. Tell us about your goals and we will suggest a sensible starting point.' },
    ],
    text: 'We plan and manage paid advertising campaigns designed to reach relevant audiences, attract potential customers and generate enquiries. Our focus is on understanding campaign performance and identifying opportunities to improve it.',
  },
  {
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    promise: 'Content and engagement with a purpose, so social media supports your business goals.',
    seo: { description: 'Social media marketing: content planning, brand communication and audience engagement that strengthen your online presence with a clear purpose.' },
    image: { src: '/images/services/social-media-marketing.jpg', alt: 'Social media apps on a smartphone screen' },
    heroImage: { src: '/images/heroes/services/social-media-marketing.jpg', alt: 'A creator at her desk with a phone on a tripod, planning content' },
    highlights: ['Content planning', 'Brand communication', 'A stronger online presence', 'Audience engagement'],
    whoFor: 'Businesses that want to connect with customers, communicate their brand and stay relevant on social media.',
    details: [
      'Social media gives businesses an opportunity to connect with customers, communicate their brand and stay relevant. We help you plan content, strengthen your online presence and build more meaningful audience engagement.',
      'The emphasis is on purpose: content that supports your business goals, not activity for its own sake.',
    ],
    faqs: [
      { q: 'Which social platforms should we be on?', a: 'The ones your customers use. We look at your audience before recommending platforms.' },
      { q: 'Do you create the content?', a: 'We help plan content and strengthen your presence. Tell us what you need and we will agree the right level of support.' },
      { q: 'How is success measured?', a: 'Through meaningful engagement and results connected to your business goals, not likes alone.' },
    ],
    text: 'Social media gives businesses an opportunity to connect with customers, communicate their brand and stay relevant. We help businesses plan content, strengthen their online presence and build more meaningful audience engagement.',
  },
  {
    title: 'Website Design and Development',
    slug: 'website-design-and-development',
    promise: 'A website that explains your value clearly and guides visitors towards taking action.',
    seo: { description: 'Website design and development that communicates your value clearly, gives visitors a good experience and guides them towards taking action.' },
    image: { src: '/images/services/website-design-and-development.jpg', alt: 'A laptop on a desk showing a website wireframe' },
    heroImage: { src: '/images/heroes/services/website-design-and-development.jpg', alt: 'A developer writing code across two monitors' },
    highlights: ['First impressions', 'Clear communication of value', 'Good user experience', 'Guiding visitors to act'],
    whoFor: 'Businesses whose website is where potential customers form their first impression of them.',
    details: [
      'A website is often where potential customers form their first impression of a business. We help businesses create websites that communicate their value clearly, provide a good user experience and guide visitors towards taking action.',
      'Design and development are planned together with your marketing, so the site supports search visibility, campaigns and enquiries.',
    ],
    faqs: [
      { q: 'We already have a website. Can you help?', a: 'Yes. Tell us about it and what it needs to do, and we will look at where it can be improved.' },
      { q: 'Will the website work on mobile?', a: 'Yes. A good user experience on every device is part of the brief.' },
      { q: 'Can our team update the site?', a: 'Tell us how your team wants to manage content and we will plan the build around it.' },
    ],
    text: 'A website is often where potential customers form their first impression of a business. We help businesses create websites that communicate their value clearly, provide a good user experience and guide visitors towards taking action.',
  },
  {
    title: 'AI-Powered Marketing Solutions',
    slug: 'ai-powered-marketing-solutions',
    promise: 'Practical uses of artificial intelligence that save time and help your marketing work smarter.',
    seo: { description: 'AI-powered marketing solutions: practical uses of artificial intelligence to support marketing, improve efficiency and help your business work smarter.' },
    image: { src: '/images/services/ai-powered-marketing-solutions.jpg', alt: 'Abstract blue and pink 3D cubes representing artificial intelligence' },
    heroImage: { src: '/images/heroes/services/ai-powered-marketing-solutions.jpg', alt: 'Two people working with transparent digital screens in violet light' },
    highlights: ['Practical uses of AI', 'Improved efficiency', 'Working smarter', 'Solutions fitted to the problem'],
    whoFor: 'Businesses exploring how artificial intelligence could support their marketing and help them work smarter.',
    details: [
      'We explore practical ways to use artificial intelligence to support marketing activities, improve efficiency and help businesses work smarter.',
      'There is no single AI product for every business: the right solution depends on the business, its goals and the problem it wants to solve, so we start there.',
    ],
    faqs: [
      { q: 'What can AI do for our marketing?', a: 'It can support marketing activities and improve efficiency. Where it helps depends on your goals and the problem you want to solve.' },
      { q: 'Do we need technical knowledge?', a: 'No. We focus on practical uses and explain each solution in plain terms.' },
      { q: 'Will AI replace our marketing team?', a: 'No. We use it to help people work smarter, not to replace judgement about your business and customers.' },
    ],
    text: 'We explore practical ways to use artificial intelligence to support marketing activities, improve efficiency and help businesses work smarter. The right solution depends on the business, its goals and the problem it wants to solve.',
  },
];

export const marketing = {
  seo: {
    title: 'Uexora Marketing Studio | SEO, Ads, Social, Web & AI Marketing',
    description:
      'Uexora Marketing Studio: digital strategy, SEO, paid advertising, social media, website design and AI-powered marketing, built around your business goals.',
  },

  eyebrow: 'Uexora Marketing Studio',
  title: 'Make Your Brand Impossible To Ignore.',
  lead:
    "Great brands don't just show up. They stand out, connect, and grow. We bring strategy, creativity, design, and digital expertise together to help businesses build a stronger presence and turn attention into meaningful growth.",
  hero: {
    chips: ['Strategy', 'SEO', 'Paid ads', 'Social', 'Web', 'AI'],
    background: { src: '/images/heroes/marketing-hero-bg.jpg', alt: 'A team reviewing printed charts and a laptop together around a white table' },
    primary: { label: 'Explore our approach', href: '/marketing#how-we-work' },
    secondary: { label: 'Discuss your requirements', href: '/contact?division=marketing' },
  },


  about: {
    heading: 'Helping Businesses Grow in a Digital World.',
    paragraphs: [
      'At Uexora, we bring strategy, creativity and technology together to help businesses build a stronger digital presence.',
      'Every business has a different starting point. Some need to reach new audiences. Others want to generate enquiries, communicate their value more clearly or make better use of their existing marketing efforts.',
      'Our approach begins with understanding your business, identifying what matters most and creating a focused way forward.',
    ],
    link: 'Why choose Uexora',
    image: { src: '/images/sections/marketing-approach.jpg', alt: 'A sunlit desk by a large window with a laptop, a monitor and a water carafe' },
    rows: [
      { title: 'Understand your goals', text: 'We take time to learn about your business, audience and challenges.' },
      { title: 'Create a focused strategy', text: 'We develop a clear plan built around your objectives and opportunities.' },
      { title: 'Turn ideas into results', text: 'We put the strategy into action and support your growth throughout the journey.' },
    ],
    closing: "The goal isn't simply to be seen. It's to make your digital presence work harder for your business.",
  },

  servicesHeading: 'The digital services a business needs to establish, strengthen and grow.',
  /** A word from the heading shown in the yellow accent. */
  servicesHighlight: 'grow',
  servicesIntro: 'We bring together the key digital services businesses need to establish, strengthen and grow their online presence.',
  servicesAside: 'Whether you need a website, better search visibility, advertising campaigns or all of it working together, we start by understanding your business.',
  services,
  servicesCta: {
    heading: 'Not sure which service you need?',
    text: 'Tell us about your business, your customers and what you want to achieve. We will recommend where to start and what to leave for later.',
    label: 'Discuss your requirements',
    href: '/contact?division=marketing',
  },

  how: {
    heading: 'How We Work',
    title: 'Understand first. Then plan, deliver and improve.',
    intro: [
      "We don't believe in offering the same marketing package to every business. What works for one company may not work for another.",
      "That's why we start by understanding your business, your customers, your challenges and what you want to achieve.",
    ],
    steps: [
      { title: 'Understand', text: 'We start with your business, your customers, your challenges and what you want to achieve.' },
      { title: 'Plan', text: 'We identify suitable services, agree on priorities and develop a plan that fits your objectives.' },
      { title: 'Deliver', text: 'We put the plan into action, making sure every piece of work has a clear purpose.' },
      { title: 'Improve', text: 'We monitor performance, share insights and look for ways to improve the approach over time.' },
    ],
    outro: 'We believe in clear communication, realistic expectations and making sure the work we do has a clear purpose.',
  },

  who: {
    heading: 'Who We Work With',
    title: 'Businesses at every stage, from a first website to an established brand.',
    paragraphs: [
      'We aim to work with businesses at different stages of growth, from startups establishing their presence to established companies looking to improve their digital marketing.',
      'Whether you need help building a website, improving search visibility, managing advertising campaigns or bringing your digital marketing activities together, we want to understand what your business needs before recommending a solution.',
    ],
    stages: ['Startups establishing their presence', 'Growing businesses generating enquiries', 'Established companies improving their marketing'],
  },

  philosophy: {
    heading: 'Our Philosophy',
    quote: 'Marketing should be connected to business goals.',
    paragraphs: [
      'More traffic is useful when it reaches the right audience. More enquiries matter when they create genuine opportunities. And a strong online presence becomes more valuable when it helps customers understand why they should choose your business.',
      'We focus on the bigger picture, combining strategy, creativity and technology to help businesses make more informed marketing decisions.',
    ],
  },

  choose: {
    heading: 'Which service fits your challenge?',
    intro: 'Most conversations start with a problem, not a service name. Each situation below leads to the service that addresses it; many businesses combine two or three.',
    rows: [
      { need: 'We are not sure where to start with marketing', slug: 'digital-marketing-strategy' },
      { need: 'Customers cannot find us in search', slug: 'search-engine-optimisation' },
      { need: 'We need more enquiries, and soon', slug: 'paid-advertising-and-lead-generation' },
      { need: 'Our social presence does not reflect the brand', slug: 'social-media-marketing' },
      { need: 'Our website is not winning us customers', slug: 'website-design-and-development' },
      { need: 'We want to work smarter with AI', slug: 'ai-powered-marketing-solutions' },
    ],
  },

  faqs: [
    {
      q: 'What kind of businesses do you work with?',
      a: 'Businesses at different stages of growth, from startups establishing their presence to established companies improving their digital marketing.',
    },
    {
      q: 'Do we have to buy a package?',
      a: 'No. We recommend services that fit your needs rather than pushing the same package on every client, and an engagement can begin with a single service.',
    },
    {
      q: 'How does an engagement begin?',
      a: 'With a conversation about your business, your customers, your challenges and what you want to achieve. From there we agree priorities and a plan that fits your objectives.',
    },
  ],

  why: {
    eyebrow: 'Why Choose Uexora?',
    title: 'Marketing With a Clear Purpose.',
    intro: [
      'Choosing a marketing agency is about finding a team that understands your business, listens to your goals and helps you make the right decisions about your marketing.',
      'At Uexora, we believe marketing works best when there is a clear plan behind it. We look beyond individual campaigns to understand how different digital channels can work together to support your business goals.',
    ],
    reasons: [
      {
        title: 'We Start With Your Business',
        text: "Before recommending services, we want to understand what you do, who your customers are and what you're trying to achieve. This helps us focus on the opportunities that matter most to your business.",
      },
      {
        title: 'Solutions Built Around Your Goals',
        text: 'Every business has different priorities, budgets and challenges. We aim to recommend services that fit your needs rather than pushing the same package on every client.',
      },
      {
        title: 'More Than Just One Service',
        text: 'From SEO and paid advertising to social media and website development, we bring different digital marketing services together under one roof. This helps create a more connected approach to your online presence.',
      },
      {
        title: 'Creativity Backed by Strategy',
        text: 'Good ideas matter, but they need direction. We combine creative thinking with a clear understanding of your audience, your objectives and the role each marketing activity should play.',
      },
      {
        title: 'A Focus on Meaningful Results',
        text: 'We believe marketing should have a purpose beyond likes and impressions. Depending on your goals, that could mean improving visibility, attracting relevant visitors, generating enquiries or supporting sales opportunities. We focus on tracking the metrics that matter to your business.',
      },
      {
        title: 'Clear Communication and Collaboration',
        text: 'You should understand what your marketing team is working on and why. We value open communication, shared priorities and regular performance discussions so that decisions are made with a clear view of progress.',
      },
      {
        title: 'Ready to Grow With Your Business',
        text: 'Your marketing needs may change as your business develops. Our aim is to help you build a practical foundation, learn what works and adapt your approach as your priorities evolve.',
      },
    ],
    closingHeading: "Let's Make Your Marketing Work Harder.",
    closing: [
      "Whether you're building your digital presence from the ground up or looking to improve your current marketing, let's start with a conversation about your business.",
    ],
    signoff: 'Strategy. Creativity. Growth.',
  },

  cta: {
    heading: "Let's Talk About Your Business.",
    paragraphs: [
      "Whether you're launching a new business or looking to improve your existing marketing, the first step is understanding where you are today and where you want to go.",
      "Tell us about your business, your goals and the challenges you're facing. We'll explore how the right digital marketing approach could help.",
    ],
    signoff: "Let's Build What's Next.",
    primary: { label: 'Start a conversation', href: '/contact?division=marketing' },
    secondary: { label: 'See all services', href: '/marketing#services' },
  },
};

export type MarketingContent = typeof marketing;
