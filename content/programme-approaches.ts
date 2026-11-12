import type { Service } from './types.ts';

/**
 * "Our Approach to Learning" for the programmes that need their own, in place of the division's
 * shared points (which remain on Academic Support, the page the client wrote them for; the exam
 * and overseas pages have their own approach sections).
 *
 * DRAFT, for the client to review: every line here is ours, written only from what each page
 * already says (no durations, tools, staff qualifications or outcomes the client has not confirmed).
 * Fallback for the Sanity `programme` documents; a page's points in the studio replace these.
 */
type Approach = NonNullable<Service['approach']>;

export const aiStudentsApproach: Approach = {
  quote: 'Technology makes the most sense when you build something with it.',
  approachPoints: [
    { title: 'Learn by Building', subtitle: 'Real projects, not just theory', text: 'Students learn new concepts by putting them to use in working projects, from small experiments to robots, apps and games.', icon: 'robot' },
    { title: 'Try, Test, Improve', subtitle: 'Every attempt teaches something', text: 'When something doesn’t work, students find out why, change it and try again, so problem-solving becomes a habit rather than a lesson.', icon: 'iterate' },
    { title: 'Understand How It Works', subtitle: 'Look inside the technology', text: 'Students explore how AI tools work and how hardware and code fit together, so they can do more than follow instructions.', icon: 'chip' },
    { title: 'A Starting Point for Every Age', subtitle: 'From Grade 1 to university', text: 'Younger learners meet AI through playful activities, while older students move on to coding, robotics and projects of their own.', icon: 'steps' },
    { title: 'Using AI Thoughtfully', subtitle: 'Responsible habits from the start', text: 'Learners use AI tools to support their own thinking, and learn to question what those tools produce.', icon: 'aicheck' },
    { title: 'From Idea to Finished Result', subtitle: 'Creativity, teamwork and presenting', text: 'Students take their own ideas from a first sketch to something people can use, working in teams and presenting what they have made.', icon: 'rocket' },
  ],
};

export const aiProfessionalsApproach: Approach = {
  quote: 'AI is most useful when it is applied to the work you actually do, with your judgement still in charge.',
  approachPoints: [
    { title: 'Start With Your Work', subtitle: 'Shaped around your profession', text: 'Courses are built around the tasks of your field, from sales and leadership to accounting, healthcare and taxation.', icon: 'career' },
    { title: 'Clear on What AI Can and Cannot Do', subtitle: 'Understanding without the hype', text: 'We explain AI in plain terms, so you know where it can help your work and where it falls short.', icon: 'scales' },
    { title: 'Hands-On Practice', subtitle: 'Doing, as well as watching', text: 'Demonstrations lead into guided exercises, so you try AI tools on the kind of tasks you handle every day.', icon: 'device' },
    { title: 'Your Judgement Comes First', subtitle: 'Check before you rely on it', text: 'AI output still needs a professional’s review. You learn to check its accuracy and keep to the standards of your field.', icon: 'search' },
    { title: 'Responsible Use', subtitle: 'Privacy, risk and good decisions', text: 'Using AI well means thinking about privacy, risk and which decisions should stay with people, so that is part of the learning.', icon: 'shield' },
    { title: 'AI in Teaching and Learning', subtitle: 'For educators and their students', text: 'Educators think through how AI fits into their teaching, and how to guide students in using it thoughtfully and responsibly.', icon: 'book' },
  ],
};

export const communicationApproach: Approach = {
  quote: 'Confidence grows by doing: speaking up, being heard and trying again.',
  approachPoints: [
    { title: 'Practise Out Loud', subtitle: 'Speaking is learned by speaking', text: 'Interactive activities give students regular chances to speak, listen, discuss and respond.', icon: 'speech' },
    { title: 'Real Stages, Real Audiences', subtitle: 'From practice to performance', text: 'Students take what they have practised to platforms such as The UEXORA Stage, Debate Arena and Digital Showcase.', icon: 'mic' },
    { title: 'Confidence, Step by Step', subtitle: 'Small moments before big ones', text: 'Confidence games, storytelling and show and tell help students move past hesitation and stage fear before they take on bigger moments.', icon: 'person' },
    { title: 'Right for Each Stage', subtitle: 'Grade 5 through university', text: 'Foundation Explorers, Emerging Leaders and Future Professionals meet students where they are, from first speeches to interviews and corporate presentations.', icon: 'steps' },
    { title: 'Ideas First, Then Delivery', subtitle: 'Having something to say', text: 'Through debate, forming opinions and constructive discussion, students learn to build an argument and express what they really think.', icon: 'bulb' },
    { title: 'Skills for School, Work and Life', subtitle: 'Beyond the stage', text: 'Leadership, teamwork, group discussions and interview preparation help students carry these skills into university and their careers.', icon: 'career' },
  ],
};

export const specialNeedsApproach: Approach = {
  quote: 'We begin with the child: their strengths, their needs and the way they communicate.',
  approachPoints: [
    { title: 'Start With the Child', subtitle: 'Strengths and interests first', text: 'We look at what each child enjoys, what they do well and what they need, and shape support around them.', icon: 'sprout' },
    { title: 'Individual Learning Plans', subtitle: 'No two journeys are alike', text: 'Support is individualised, with learning plans built around each child’s abilities, pace and goals.', icon: 'sliders' },
    { title: 'Every Way of Communicating Counts', subtitle: 'Every voice deserves to be heard', text: 'From early sounds and vocabulary to alternative communication, we help children express themselves in the way that works for them.', icon: 'speech' },
    { title: 'Skills for Everyday Life', subtitle: 'Learning that carries over to home', text: 'Routines, personal care, organisation and independence are part of the support, so progress means something day to day.', icon: 'routine' },
    { title: 'Positive Support for Feelings and Behaviour', subtitle: 'Understanding what lies behind behaviour', text: 'We look for the needs behind behaviour and respond with encouragement, coping skills and positive support strategies.', icon: 'heart' },
    { title: 'Parents as Partners', subtitle: 'Working together around the child', text: 'Courses and workshops help parents understand their child’s needs, communicate at home and work with teachers and support professionals.', icon: 'family' },
  ],
};

export const corporateApproach: Approach = {
  quote: 'Training works best when it starts from your goals and ends in your team’s daily work.',
  approachPoints: [
    { title: 'Built Around Your Organisation', subtitle: 'Customised workshops and seminars', text: 'Training is shaped around your teams, your goals and the way your business works.', icon: 'target' },
    { title: 'Practical Skills for Real Work', subtitle: 'Useful in day-to-day roles', text: 'Sessions focus on what people can apply in their jobs, from negotiation and complaint handling to presentations and reporting.', icon: 'career' },
    { title: 'Linked to Business Performance', subtitle: 'Training with a purpose', text: 'Each programme starts from what the organisation wants to improve, whether that is sales, service, leadership or how teams work together.', icon: 'chart' },
    { title: 'Development Across Roles', subtitle: 'From customer teams to leaders', text: 'Seven areas of training let different roles build what they need, from customer service and soft skills to leadership and HR.', icon: 'team' },
    { title: 'Ready for New Technology', subtitle: 'AI and digital skills at work', text: 'Teams learn to use generative AI, data and productivity tools in the context of their own business.', icon: 'robot' },
    { title: 'Growth That Continues', subtitle: 'Continuous professional growth', text: 'Our workshops are designed to encourage people to keep developing their capabilities well beyond the session itself.', icon: 'sprout' },
  ],
};
