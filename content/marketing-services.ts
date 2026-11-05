import type { Service } from './types.ts';

/**
 * The sections of each Marketing Studio service page. DRAFT, for the client to review: everything
 * here except the lines drawn from the client's own copy (the Understand, Plan, Deliver and Improve
 * steps, and the sentences repeated from their service descriptions). The lists describe what each
 * service usually covers, so the client should confirm they offer every item, the platforms named
 * included. Nothing here states results, figures or clients. Fallback (and seed) for the Sanity
 * `marketingPage` services; studio edits override these.
 */
type Sections = Pick<Service, 'seo' | 'overviewHeading' | 'whoFor' | 'details' | 'serves' | 'pillars' | 'journey' | 'courses' | 'platforms' | 'workshops' | 'closing' | 'faqs'>;

const photo = (file: string, alt: string) => ({ src: `/images/marketing-services/${file}.jpg`, alt });
const slide = (title: string, text: string, image: { src: string; alt: string }) => ({ title, audience: '', text, image });

export const strategySections: Sections = {
  seo: {
    title: 'Digital Marketing Strategy Services | Uexora Marketing Studio',
    description: 'Digital marketing strategy services from Uexora Marketing Studio: clear goals, audience insight, channel planning and budget priorities before you spend.',
  },
  overviewHeading: 'A Digital Marketing Strategy Built Around Your Business Goals',
  whoFor: '',
  details: [
    'A digital marketing strategy connects what your business wants to achieve with the channels and campaigns most likely to get it there. Without one, budgets can spread thinly across activities that do not support each other.',
    'We look at your goals, your customers and your current marketing, then set out clear priorities: where to focus first, what to leave for later and how progress will be measured.',
  ],
  serves: {
    heading: 'Who a marketing strategy helps',
    serveGroups: [
      { text: 'Startups establishing their presence', icon: 'sprout' },
      { text: 'Growing businesses generating enquiries', icon: 'target' },
      { text: 'Established companies improving their marketing', icon: 'chart' },
      { text: 'Businesses not sure where to start', icon: 'compass' },
    ],
  },
  pillars: {
    heading: 'What a digital marketing strategy covers',
    pillarItems: [
      { title: 'Business Goals', icon: 'target', points: ['Growth objectives', 'Priorities', 'Measures of success'] },
      { title: 'Target Audience', icon: 'team', points: ['Who your customers are', 'What they need', 'How they search and decide'] },
      { title: 'Market and Competitors', icon: 'search', points: ['Competitor activity', 'Market opportunities', 'Your positioning'] },
      { title: 'Channel Planning', icon: 'layers', points: ['Search engine optimisation', 'Paid advertising', 'Social media', 'Your website'] },
      { title: 'Budget and Priorities', icon: 'sliders', points: ['Where budget goes first', 'Early opportunities', 'Longer-term work'] },
      { title: 'Measurement', icon: 'chart', points: ['The metrics that matter', 'Performance insights', 'Regular reviews'] },
    ],
  },
  courses: {
    heading: 'How the channels work together',
    text: 'A strategy gives each channel a clear role, so they support each other instead of competing for budget.',
    courseSlides: [
      slide('Search Engine Optimisation', 'Long-term organic visibility through relevant content and website optimisation.', { src: '/images/services/search-engine-optimisation-dashboard.jpg', alt: 'A person reviewing an analytics dashboard on a laptop beside a cup of coffee' }),
      slide('Paid Advertising', 'Campaigns that reach relevant audiences and generate enquiries.', { src: '/images/services/paid-advertising-ad-spend.jpg', alt: 'A laptop showing an ad spend breakdown on a wooden desk' }),
      slide('Social Media Marketing', 'Content and engagement that keep your brand relevant to customers.', { src: '/images/services/social-media-marketing-desk.jpg', alt: 'A desk with a social media marketing sheet, a laptop and a monitor' }),
      slide('Website Design', 'A clear first impression that guides visitors towards taking action.', { src: '/images/services/website-design-responsive.jpg', alt: 'A website shown on a laptop, a tablet and a phone on an orange table' }),
      slide('AI-Powered Marketing', 'Practical uses of artificial intelligence that help your marketing work smarter.', { src: '/images/services/ai-powered-marketing-laptop.jpg', alt: 'A person working on a laptop browsing a grid of visual content' }),
    ],
  },
  journey: {
    heading: 'How we build your strategy',
    journeySteps: [
      { title: 'Understand', text: 'We start with your business, your customers, your challenges and what you want to achieve.' },
      { title: 'Plan', text: 'We identify suitable services, agree on priorities and develop a plan that fits your objectives.' },
      { title: 'Deliver', text: 'We put the plan into action, making sure every piece of work has a clear purpose.' },
      { title: 'Improve', text: 'We monitor performance, share insights and look for ways to improve the approach over time.' },
    ],
  },
  closing: {
    heading: 'Make Your Digital Presence Work Harder',
    text: 'The goal isn’t simply to be seen. It’s to make your digital presence work harder for your business.',
    image: photo('strategy-band', 'A team in a bright office watching two colleagues plan on a board of sticky notes'),
  },
  faqs: [
    { q: 'What is a digital marketing strategy?', a: 'A plan that connects your business goals to the digital channels and activities most likely to support them, around your priorities and budget.' },
    { q: 'Why start with strategy?', a: 'Because what works for one company may not work for another. A strategy sets direction before money is spent on channels and campaigns.' },
    { q: 'What does a strategy engagement cover?', a: 'Your goals, your target audience and a plan of digital marketing activities around your priorities and budget.' },
    { q: 'Do we need a strategy if we only want one service?', a: 'Not always. We start by understanding your business and recommend only what fits your needs.' },
    { q: 'What happens once the strategy is agreed?', a: 'We put the plan into action, monitor performance, share insights and look for ways to improve the approach over time.' },
  ],
};

export const seoSections: Sections = {
  seo: {
    title: 'SEO Services for Businesses | Uexora Marketing Studio',
    description: 'SEO services from Uexora Marketing Studio: keyword research, on-page optimisation, technical SEO, local search and content for long-term organic visibility.',
  },
  overviewHeading: 'SEO Services That Help the Right Customers Find You',
  whoFor: '',
  details: [
    'When someone searches for what you offer, they have already told you what they need. Search engine optimisation (SEO) helps your website appear for those searches, so more of the right people can find you without paying for every visit.',
    'SEO is a long-term activity. It brings together relevant content, a well-structured website and steady improvement, and we set realistic expectations and share performance insights as the work progresses.',
  ],
  serves: {
    heading: 'Who SEO helps',
    serveGroups: [
      { text: 'Businesses that customers cannot find in search', icon: 'search' },
      { text: 'Companies relying heavily on paid traffic', icon: 'chart' },
      { text: 'Local businesses serving a specific area', icon: 'shop' },
      { text: 'New websites building visibility from the start', icon: 'sprout' },
    ],
  },
  journey: {
    heading: 'How SEO work progresses',
    journeySteps: [
      { title: 'Review', text: 'We look at your website, your search visibility and how customers search for what you offer.' },
      { title: 'Plan', text: 'We agree on the keywords, pages and fixes that matter most to your business.' },
      { title: 'Optimise', text: 'We improve content, page structure and the technical foundations of your website.' },
      { title: 'Measure', text: 'We monitor performance, share insights and look for the next opportunities.' },
    ],
  },
  courses: {
    heading: 'What our SEO services cover',
    text: 'The main areas of search engine optimisation, planned around what your business needs first.',
    courseSlides: [
      slide('Keyword Research', 'Finding the words your customers use, and the intent behind each search.', photo('seo-keyword-research', 'Hands typing on a laptop open at a search engine, with a phone beside it')),
      slide('On-Page SEO and Content', 'Titles, headings and relevant content that answer what people are looking for.', photo('seo-on-page-content', 'Hands typing on a laptop beside a notebook and a cup of coffee')),
      slide('Technical SEO', 'Site speed, mobile experience and a structure search engines can crawl and understand.', photo('seo-technical', 'A person working on a laptop in a bright room')),
      slide('Local SEO', 'Helping nearby customers find your business when they search in your area.', photo('seo-local', 'A woman working at a laptop among cardboard boxes')),
    ],
  },
  workshops: {
    heading: 'Signs your website needs SEO',
    image: photo('seo-signs', 'A person at a table using a search engine on a laptop, with a bowl of cereal beside it'),
    workshopItems: [
      'Customers tell you they could not find you online.',
      'Competitors appear in search results for the services you offer.',
      'Most of your visitors arrive only when you pay for advertising.',
      'Your pages are not written around what customers actually search for.',
      'Your website is slow or difficult to use on a phone.',
      'You cannot tell which searches bring visitors to your website.',
    ],
  },
  closing: {
    heading: 'Be Found by People Already Looking for You',
    text: 'SEO supports long-term organic discovery: being found by people who are already looking for what you offer, without paying for every visit.',
    image: photo('seo-band', 'Hands typing on a laptop on a dark table'),
  },
  faqs: [
    { q: 'What is SEO?', a: 'Search engine optimisation is the work of helping your website appear in search results for the things your customers look for, through relevant content, website optimisation and other SEO practices.' },
    { q: 'What does SEO work involve?', a: 'Relevant content, website optimisation and other SEO practices that support long-term organic discovery.' },
    { q: 'How long does SEO take to show results?', a: 'SEO is a long-term activity. We set realistic expectations and share performance insights as the work progresses.' },
    { q: 'Is SEO better than paid advertising?', a: 'They do different jobs. SEO builds lasting organic visibility; paid advertising reaches audiences quickly. Many businesses use both.' },
    { q: 'Can you guarantee first-page rankings?', a: 'No. Search engines decide their own rankings, so nobody can honestly promise a position. We focus on the work that supports visibility and on tracking the metrics that matter to your business.' },
  ],
};

export const paidSections: Sections = {
  seo: {
    title: 'Paid Advertising & Lead Generation Services | Uexora Marketing',
    description: 'Paid advertising and lead generation services: campaigns planned and managed to reach relevant audiences, generate enquiries and improve over time.',
  },
  overviewHeading: 'Paid Advertising Campaigns Planned Around Real Enquiries',
  whoFor: '',
  details: [
    'Paid advertising puts your business in front of relevant audiences quickly, whether they are searching for what you offer or browsing social media. Lead generation turns that attention into enquiries you can follow up.',
    'Clicks and impressions only tell part of the story, so we track enquiries and the other measures that matter to your business, and move budget towards what works.',
  ],
  serves: {
    heading: 'Who paid advertising helps',
    serveGroups: [
      { text: 'Businesses that need more enquiries, and soon', icon: 'target' },
      { text: 'Companies launching a new product or offer', icon: 'megaphone' },
      { text: 'Advertisers unsure what their spend is achieving', icon: 'chart' },
      { text: 'Teams running seasonal or time-limited campaigns', icon: 'routine' },
    ],
  },
  pillars: {
    heading: 'What paid advertising management includes',
    pillarItems: [
      { title: 'Campaign Planning', icon: 'compass', points: ['Goals and priorities', 'Budget planning', 'Choosing the right channels'] },
      { title: 'Audience Targeting', icon: 'target', points: ['Relevant audiences', 'Keywords and interests', 'Reaching past visitors'] },
      { title: 'Ads and Creative', icon: 'bulb', points: ['Ad copy', 'Images and video', 'Testing what works'] },
      { title: 'Landing Pages', icon: 'device', points: ['Clear messages', 'Simple enquiry forms', 'Mobile-friendly pages'] },
      { title: 'Conversion Tracking', icon: 'search', points: ['Enquiry tracking', 'Campaign measurement', 'The metrics that matter'] },
      { title: 'Optimisation and Reporting', icon: 'chart', points: ['Performance reviews', 'Budget adjustments', 'Clear insights'] },
    ],
  },
  courses: {
    heading: 'Paid advertising campaigns we plan and manage',
    text: 'The right mix depends on where your audience is, so we recommend channels after understanding your business and goals.',
    courseSlides: [
      slide('Search Advertising', 'Appear when people search for what you offer, with campaigns such as Google Ads.', photo('paid-search', 'A person typing on a laptop on an outdoor bench')),
      slide('Social Media Advertising', 'Reach relevant audiences as they browse, with campaigns such as Meta Ads.', photo('paid-social', 'A person holding a phone and browsing a grid of images')),
      slide('Display and Remarketing', 'Stay visible to people who have already shown interest in your business.', photo('paid-display', 'Colleagues around a table reviewing a chart on a tablet')),
      slide('Video Advertising', 'Tell your story in motion, for audiences who respond better to video.', photo('paid-video', 'A small crew setting up a camera for a video shoot')),
      slide('Lead Generation Campaigns', 'Attract potential customers and turn their interest into enquiries.', photo('paid-lead-generation', 'A person checking charts on a laptop beside cardboard boxes')),
    ],
  },
  journey: {
    heading: 'How we run your campaigns',
    journeySteps: [
      { title: 'Plan', text: 'We agree on goals, audiences and a budget that fits your priorities.' },
      { title: 'Launch', text: 'We set up tracking, build the campaigns and put them live.' },
      { title: 'Measure', text: 'We track the metrics that matter to your business, such as enquiries.' },
      { title: 'Improve', text: 'We share insights and move budget towards what is working.' },
    ],
  },
  closing: {
    heading: 'Budget That Goes Where It Works',
    text: 'Our focus is on understanding campaign performance and identifying opportunities to improve it.',
    image: photo('paid-band', 'A team seen from above around laptops, charts and a tablet'),
  },
  faqs: [
    { q: 'What is lead generation?', a: 'Attracting potential customers and encouraging them to get in touch, so your team has genuine enquiries to follow up.' },
    { q: 'Which platforms do you advertise on?', a: 'That depends on where your audience is. We recommend channels after understanding your business and goals.' },
    { q: 'How do you measure success?', a: 'By tracking the metrics that matter to your business, such as enquiries, rather than impressions alone.' },
    { q: 'What budget do we need?', a: 'Campaigns are planned around your priorities and budget. Tell us about your goals and we will suggest a sensible starting point.' },
    { q: 'Should we choose paid advertising or SEO?', a: 'They do different jobs. Paid advertising reaches audiences quickly; SEO builds lasting organic visibility. Many businesses use both.' },
  ],
};

export const socialSections: Sections = {
  seo: {
    title: 'Social Media Marketing Services | Uexora Marketing Studio',
    description: 'Social media marketing services: platform selection, content planning, creative, community engagement and reporting, all with a clear business purpose.',
  },
  overviewHeading: 'Social Media Marketing With a Clear Purpose',
  whoFor: '',
  details: [
    'Your customers are already forming opinions about your business on social media, whether you post regularly or not. A considered presence helps them understand who you are, trust what you offer and know how to reach you.',
    'Social media marketing works best with a plan behind it: the right platforms, content tied to your business goals and time set aside to respond to the people who engage with you.',
  ],
  serves: {
    heading: 'Who social media marketing helps',
    serveGroups: [
      { text: 'Businesses whose social presence does not reflect the brand', icon: 'person' },
      { text: 'Teams posting without a clear plan', icon: 'routine' },
      { text: 'New brands building an audience', icon: 'sprout' },
      { text: 'Companies wanting more meaningful engagement', icon: 'team' },
    ],
  },
  platforms: {
    heading: 'What our social media marketing covers',
    platformItems: [
      { name: 'Social Media Strategy', points: ['Goals and audience', 'Choosing the right platforms', 'Brand voice', 'Competitor review'], image: photo('social-platforms', 'A hand holding a phone open at a social media sign-in screen') },
      { name: 'Content Planning', points: ['Content themes', 'Content calendars', 'Campaign planning', 'Seasonal moments'], image: photo('social-content-planning', 'A woman arranging sticky notes on a marketing planning board') },
      { name: 'Creative Content', points: ['Short-form video', 'Images and carousels', 'Captions', 'Brand communication'], image: photo('social-creative', 'A person recording a video on a phone held in a ring light') },
      { name: 'Audience Engagement', points: ['Comments and messages', 'Community building', 'Customer conversations', 'A stronger online presence'], image: photo('social-community', 'Hands holding a phone and browsing a feed of images') },
      { name: 'Performance Reporting', points: ['The metrics that matter', 'What content works', 'Regular insights', 'Next steps'], image: photo('social-reporting', 'People at a table reviewing charts on a laptop and on printed reports') },
    ],
  },
  closing: {
    heading: 'Content With a Purpose',
    text: 'The emphasis is on purpose: content that supports your business goals, not activity for its own sake.',
    image: photo('social-band', 'A woman preparing to record a video beside a ring light in a clothing studio'),
  },
  faqs: [
    { q: 'What is social media marketing?', a: 'Using social platforms to connect with customers, communicate your brand and stay relevant, through planned content and audience engagement.' },
    { q: 'Which social platforms should we be on?', a: 'The ones your customers use. We look at your audience before recommending platforms.' },
    { q: 'Do you create the content?', a: 'We help plan content and strengthen your presence. Tell us what you need and we will agree the right level of support.' },
    { q: 'How often should a business post?', a: 'Often enough to stay relevant, and no more often than you can keep up with good content. We plan a rhythm that suits your audience and your team.' },
    { q: 'How is success measured?', a: 'Through meaningful engagement and results connected to your business goals, not likes alone.' },
  ],
};

export const webSections: Sections = {
  seo: {
    title: 'Website Design & Development Services | Uexora Marketing Studio',
    description: 'Website design and development services: clear, mobile-friendly business websites and landing pages that show your value and guide visitors to act.',
  },
  overviewHeading: 'Website Design and Development That Guides Visitors to Act',
  whoFor: '',
  details: [
    'Visitors decide quickly whether to stay. A clear structure, honest messages and an easy experience on every device help them understand what you do and what to do next.',
    'Design and development are planned together with your marketing, so the site supports search visibility, campaigns and enquiries from the day it launches.',
  ],
  serves: {
    heading: 'Who website design helps',
    serveGroups: [
      { text: 'New businesses that need a first website', icon: 'sprout' },
      { text: 'Companies whose website is not winning customers', icon: 'target' },
      { text: 'Brands that have outgrown their current site', icon: 'layers' },
      { text: 'Teams running campaigns that need landing pages', icon: 'megaphone' },
    ],
  },
  pillars: {
    heading: 'What website design and development includes',
    pillarItems: [
      { title: 'Planning and Structure', icon: 'layers', points: ['Goals and audience', 'Site structure', 'Page planning'] },
      { title: 'User Experience', icon: 'person', points: ['Easy navigation', 'Clear calls to action', 'Simple enquiry forms'] },
      { title: 'Visual Design', icon: 'bulb', points: ['Design that fits your brand', 'Clear communication of value', 'Consistent pages'] },
      { title: 'Development', icon: 'code', points: ['Clean, reliable build', 'Fast-loading pages', 'Content your team can manage'] },
      { title: 'Mobile-Friendly Design', icon: 'device', points: ['Phones', 'Tablets', 'Desktops'] },
      { title: 'SEO Foundations', icon: 'search', points: ['Logical page structure', 'Titles and descriptions', 'A site search engines can read'] },
    ],
  },
  courses: {
    heading: 'Websites we design and build',
    text: 'Each one starts from what the website needs to do for your business.',
    courseSlides: [
      slide('Business Websites', 'Explain what you do, build trust and make it easy to get in touch.', photo('web-business', 'A laptop showing a website on a wooden table beside a phone')),
      slide('Landing Pages', 'Focused pages that give campaign visitors one clear next step.', photo('web-landing', 'A laptop displaying a website design beside a large monitor')),
      slide('Online Stores', 'Present your products clearly and help customers buy with confidence.', photo('web-online-store', 'A man working at a laptop beside cardboard boxes and a pair of shoes')),
      slide('Website Redesigns', 'Improve an existing site that no longer reflects your business.', photo('web-redesign', 'A notebook of hand-drawn website wireframes beside a phone')),
    ],
  },
  workshops: {
    heading: 'Signs it’s time for a new website',
    image: photo('web-signs', 'A man sketching a layout on paper at a desk'),
    workshopItems: [
      'Visitors leave without getting in touch.',
      'It is hard to tell from the home page what you do.',
      'The site is difficult to use on a phone.',
      'Pages load slowly.',
      'Your team cannot easily update the content.',
      'The design no longer reflects your business.',
    ],
  },
  closing: {
    heading: 'First Impressions Start Here',
    text: 'A website is often where potential customers form their first impression of a business. We help you make it communicate your value clearly.',
    image: photo('web-band', 'A notebook of website wireframe sketches on a light wooden desk beside a keyboard and a phone'),
  },
  faqs: [
    { q: 'We already have a website. Can you help?', a: 'Yes. Tell us about it and what it needs to do, and we will look at where it can be improved.' },
    { q: 'Will the website work on mobile?', a: 'Yes. A good user experience on every device is part of the brief.' },
    { q: 'Can our team update the site?', a: 'Tell us how your team wants to manage content and we will plan the build around it.' },
    { q: 'Will the website help with SEO?', a: 'Design and development are planned together with your marketing, so the site gives search visibility a sound foundation. Ongoing SEO is a separate service you can add.' },
    { q: 'How much does a website cost?', a: 'It depends on what the site needs to do. Tell us about your business and goals and we will discuss a plan that fits your priorities and budget.' },
  ],
};

export const aiSections: Sections = {
  seo: {
    title: 'AI Marketing Solutions for Businesses | Uexora Marketing Studio',
    description: 'AI-powered marketing solutions: practical uses of artificial intelligence for content, audience insight, personalisation and everyday marketing tasks.',
  },
  overviewHeading: 'Practical AI for Marketing That Helps You Work Smarter',
  whoFor: '',
  details: [
    'Artificial intelligence can take time-consuming work off your team’s hands and help you make sense of what your marketing is telling you. The useful question is not which tool is newest, but which problem is worth solving.',
    'There is no single AI product for every business, so we start with your goals and the work that takes up most of your team’s time.',
  ],
  serves: {
    heading: 'Who AI marketing helps',
    serveGroups: [
      { text: 'Businesses exploring where AI could fit', icon: 'compass' },
      { text: 'Small teams with more work than time', icon: 'routine' },
      { text: 'Marketers who want more from their data', icon: 'chart' },
      { text: 'Companies wanting to work smarter with AI', icon: 'robot' },
    ],
  },
  journey: {
    heading: 'How we introduce AI to your marketing',
    journeySteps: [
      { title: 'Identify', text: 'We look at your goals and find the problems AI could genuinely help with.' },
      { title: 'Test', text: 'We try practical solutions on real work, on a small scale.' },
      { title: 'Adopt', text: 'We bring what works into your marketing and explain it in plain terms.' },
      { title: 'Improve', text: 'We review what is helping, and adapt as your needs and the tools change.' },
    ],
  },
  courses: {
    heading: 'Where AI can support your marketing',
    text: 'Practical uses that support marketing activities and improve efficiency.',
    courseSlides: [
      slide('Content Support', 'Draft ideas, outlines and variations faster, with people reviewing the result.', photo('ai-content', 'A man working on a laptop with an AI assistant open on screen')),
      slide('Audience Insights', 'Make sense of campaign and customer data to inform better decisions.', photo('ai-insights', 'Four colleagues discussing work around a laptop at a meeting table')),
      slide('Personalisation', 'Make messages more relevant to the different people you reach.', photo('ai-personalisation', 'A hand holding up a phone showing an app, in front of a laptop')),
      slide('Workflow Automation', 'Reduce repetitive tasks so your team has more time for the work that matters.', photo('ai-automation', 'A man typing on a laptop with an AI assistant open on screen, a pair of glasses beside it')),
    ],
  },
  workshops: {
    heading: 'Where people stay in charge',
    image: photo('ai-people', 'A man seen from behind, working at a laptop with an AI assistant open on screen'),
    workshopItems: [
      'Deciding what your brand says and how it says it.',
      'Checking facts before anything is published.',
      'Understanding your customers and your market.',
      'Protecting customer and business information.',
      'Judging whether the work supports your goals.',
    ],
  },
  closing: {
    heading: 'The Right Solution Depends on the Problem',
    text: 'We use AI to help people work smarter, not to replace judgement about your business and customers.',
    image: photo('ai-band', 'Hands typing on a laptop with an AI assistant open on screen'),
  },
  faqs: [
    { q: 'What is AI-powered marketing?', a: 'Using artificial intelligence to support marketing activities such as content, audience insight and repetitive tasks, with people making the decisions.' },
    { q: 'What can AI do for our marketing?', a: 'It can support marketing activities and improve efficiency. Where it helps depends on your goals and the problem you want to solve.' },
    { q: 'Do we need technical knowledge?', a: 'No. We focus on practical uses and explain each solution in plain terms.' },
    { q: 'Will AI replace our marketing team?', a: 'No. We use it to help people work smarter, not to replace judgement about your business and customers.' },
    { q: 'Is AI-written content safe to publish?', a: 'Only after a person has checked it. We treat AI output as a starting point, to be reviewed for accuracy and for how well it fits your brand.' },
  ],
};
