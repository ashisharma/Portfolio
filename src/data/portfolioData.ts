/**
 * ============================================================================
 * ASHISH - DEVELOPER PORTFOLIO CONFIGURATION & DATA
 * ============================================================================
 * You can edit your personal links, project details, and contact info directly
 * in this file.
 * 
 * Notice: If any link is empty (e.g. ""), the corresponding button will
 * automatically be hidden from the UI to avoid broken links.
 */

export interface ContactConfig {
  EMAIL: string;
  GITHUB_URL: string;
  LINKEDIN_URL: string;
  LEETCODE_URL: string;
  RESUME_URL: string;
}

export const CONTACT_CONFIG: ContactConfig = {
  // Your professional email address
  EMAIL: 'ashish7380123@gmail.com',

  // EDIT HERE: Replace with your actual GitHub profile URL (e.g., 'https://github.com/ashish')
  // If left empty (""), the button will be hidden cleanly.
  GITHUB_URL: 'https://github.com/ashisharma',

  // EDIT HERE: Replace with your actual LinkedIn profile URL (e.g., 'https://linkedin.com/in/ashish')
  // If left empty (""), the button will be hidden cleanly.
  LINKEDIN_URL: '',

  // EDIT HERE: Replace with your actual LeetCode profile URL (e.g., 'https://leetcode.com/u/ashish')
  // If left empty (""), the button will be hidden cleanly.
  LEETCODE_URL: '',

  // EDIT HERE: Path or URL to your PDF resume (e.g., '/resume.pdf' or a Google Drive public link)
  // If left empty (""), a clean modal preview or contact prompt is shown.
  RESUME_URL: '',
};

export interface DeveloperInfo {
  name: string;
  headline: string;
  identity: string[];
  statusLine: string;
  heroText: string;
  about: {
    paragraphs: string[];
    focusAreas: { title: string; description: string }[];
  };
}

export const DEVELOPER_INFO: DeveloperInfo = {
  name: 'Ashish',
  headline: 'Java Developer & Problem Solver',
  identity: ['Java Developer', 'DSA Problem Solver', 'Web Developer'],
  statusLine: 'Currently building SPARS',
  heroText:
    'Building practical software solutions while strengthening my skills in Java, Data Structures & Algorithms, and modern web development.',
  about: {
    paragraphs: [
      'I am an aspiring software engineer with a strong focus on core Java, object-oriented programming, and algorithmic problem-solving. My journey in tech is driven by curiosity and a desire to engineer resilient, high-performance software systems.',
      'Alongside deep daily practice in Data Structures & Algorithms, I actively build full-stack web applications. I believe in clean code, modular architecture, and understanding foundational computer science concepts down to how data flows through memory and networks.',
      'Currently, I am channeling my engineering focus into SPARS (Student Performance & Skill Assessment System) while continuously exploring modern web development and backend technologies.',
    ],
    focusAreas: [
      {
        title: 'Core Java & OOP',
        description: 'Writing robust, maintainable code leveraging OOP principles, collections, and clean design patterns.',
      },
      {
        title: 'Data Structures & Algorithms',
        description: 'Disciplined practice tackling algorithmic complexity, optimal space-time tradeoffs, and patterns.',
      },
      {
        title: 'Web Engineering',
        description: 'Developing responsive, reactive user interfaces with modern React, JavaScript, and database backends.',
      },
      {
        title: 'Practical Project Delivery',
        description: 'Translating real-world academic and productivity requirements into functional software architectures.',
      },
    ],
  },
};

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; tag?: string }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming',
    description: 'Core languages used for problem solving and application development',
    skills: [
      { name: 'Java', tag: 'Core' },
      { name: 'JavaScript', tag: 'Modern ES6+' },
    ],
  },
  {
    category: 'Web Development',
    description: 'Frontend tools and modern reactive user interface technologies',
    skills: [
      { name: 'HTML', tag: 'HTML5' },
      { name: 'CSS', tag: 'Tailwind' },
      { name: 'React', tag: 'Vite' },
    ],
  },
  {
    category: 'Database',
    description: 'Data persistence and real-time database management',
    skills: [
      { name: 'SQL', tag: 'Relational' },
      { name: 'Firebase', tag: 'NoSQL / Auth' },
    ],
  },
  {
    category: 'Tools',
    description: 'Version control, developer workflow, and IDE environments',
    skills: [
      { name: 'Git', tag: 'VCS' },
      { name: 'GitHub', tag: 'Collaboration' },
      { name: 'VS Code', tag: 'Editor' },
    ],
  },
  {
    category: 'Core Concepts',
    description: 'Fundamental computer science and software engineering principles',
    skills: [
      { name: 'Data Structures & Algorithms', tag: 'Foundational' },
      { name: 'OOP', tag: 'Design' },
      { name: 'DBMS', tag: 'Data' },
      { name: 'Computer Networks', tag: 'Protocols' },
    ],
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  fullName: string;
  description: string;
  problem: string;
  solution: string;
  technology: string;
  tags: string[];
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  isPlaceholder?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'spars',
    title: 'SPARS',
    fullName: 'Student Performance & Skill Assessment System',
    description:
      'An academic and skill assessment system designed to analyze student performance, identify skill gaps, and provide meaningful recommendations.',
    problem:
      'Educational institutions and students often rely on raw percentage marks that obscure specific learning bottlenecks, making it difficult to pinpoint exact topic deficiencies or formulate data-driven academic interventions.',
    solution:
      'Built a structured assessment workflow that evaluates multi-subject test inputs, parses skill metrics, maps student strengths against curricular standards, and generates intelligent recommendations using Gemini API and Firebase real-time data sync.',
    technology: 'Java, React, Firebase, Gemini API',
    tags: ['Java', 'React', 'Firebase', 'Gemini API'],
    // EDIT HERE: Set live demo URL or leave empty
    projectUrl: '',
    // EDIT HERE: Set GitHub repo URL or leave empty
    githubUrl: 'https://github.com',
    featured: true,
    isPlaceholder: false,
  },
  {
    id: 'project-02',
    title: 'Project 02',
    fullName: 'Editable Placeholder – Software Project',
    description:
      'This card is a ready-to-edit placeholder for your next software engineering project. Replace with your actual project title, description, and source repository.',
    problem:
      '[Editable Placeholder] Detail the specific engineering challenge, bottleneck, or functional requirement your project addresses.',
    solution:
      '[Editable Placeholder] Explain your architecture, implementation strategy, data handling, and core algorithmic choices.',
    technology: 'Java / Web Tech Stack',
    tags: ['Java', 'Backend', 'Placeholder'],
    // EDIT HERE: Replace with your actual project link
    projectUrl: '',
    // EDIT HERE: Replace with your actual repository link
    githubUrl: '',
    featured: false,
    isPlaceholder: true,
  },
  {
    id: 'project-03',
    title: 'Project 03',
    fullName: 'Editable Placeholder – Technical Showcase',
    description:
      'Another clean placeholder to showcase an additional web application, API service, or algorithmic utility as you continue building your portfolio.',
    problem:
      '[Editable Placeholder] Specify the real-world problem or developer tool requirement that prompted this build.',
    solution:
      '[Editable Placeholder] Summarize your solution design, performance optimization, and practical outcome.',
    technology: 'React / Database Stack',
    tags: ['Full Stack', 'Web', 'Placeholder'],
    // EDIT HERE: Replace with your actual project link
    projectUrl: '',
    // EDIT HERE: Replace with your actual repository link
    githubUrl: '',
    featured: false,
    isPlaceholder: true,
  },
];

export interface DSATopic {
  name: string;
  description: string;
  focus: string;
}

export const DSA_TOPICS: DSATopic[] = [
  {
    name: 'Arrays',
    description: 'Contiguous memory allocation, prefix sums, two pointers, in-place manipulation',
    focus: 'O(1) lookups, partitioning, boundary checks',
  },
  {
    name: 'Binary Search',
    description: 'Logarithmic search space pruning, monotonic predicates, rotated sorted arrays',
    focus: 'O(log N) runtime, finding inflection points',
  },
  {
    name: 'Sliding Window',
    description: 'Fixed and dynamic window constraints for substring and subarray optimizations',
    focus: 'Reducing O(N²) brute-force to linear O(N)',
  },
  {
    name: 'Linked List',
    description: 'Node pointer traversal, cycle detection with fast & slow pointers, reversals',
    focus: 'O(1) insertion/deletion, memory pointers',
  },
  {
    name: 'Trees',
    description: 'Binary trees, BST invariants, DFS & BFS traversals, tree depth and balance',
    focus: 'Recursive decomposition, hierarchy traversal',
  },
  {
    name: 'Backtracking',
    description: 'State space exploration, constraint satisfaction, pruning invalid sub-branches',
    focus: 'Combinatorial search, permutations, N-Queens',
  },
];

export interface PracticedProblem {
  name: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

export const PRACTICED_PROBLEMS: PracticedProblem[] = [
  {
    name: 'Two Sum',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    description: 'Finding index pair with target sum using single-pass hash lookup in O(N) time.',
  },
  {
    name: 'Longest Substring Without Repeating Characters',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Dynamic sliding window with character frequency map to locate max non-repeating sequence.',
  },
  {
    name: 'Longest Palindromic Substring',
    topic: 'Two Pointers / DP',
    difficulty: 'Medium',
    description: 'Expand around center approach to compute longest symmetric boundary in O(N²).',
  },
  {
    name: 'Median of Two Sorted Arrays',
    topic: 'Binary Search',
    difficulty: 'Hard',
    description: 'Binary partition optimization on shorter array to achieve logarithmic O(log(min(M,N))) time.',
  },
  {
    name: 'N-Queens',
    topic: 'Backtracking',
    difficulty: 'Hard',
    description: 'Placing non-attacking queens on NxN board via recursive pruning and diagonal bitmasks.',
  },
  {
    name: 'Reverse Linked List',
    topic: 'Linked List',
    difficulty: 'Easy',
    description: 'Iterative pointer redirection with previous, current, and next references in O(N).',
  },
  {
    name: 'Minimum Size Subarray Sum',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Expanding right boundary and shrinking left window to locate minimal subarray meeting target sum.',
  },
  {
    name: 'Subarray Product Less Than K',
    topic: 'Sliding Window',
    difficulty: 'Medium',
    description: 'Sliding window calculating contiguous subarray combinations maintaining strict product bound.',
  },
];

export interface ExploringItem {
  title: string;
  category: string;
  notes: string;
}

export const CURRENTLY_EXPLORING: ExploringItem[] = [
  {
    title: 'Advanced Java',
    category: 'Language Depth',
    notes: 'Multithreading, concurrency utilities, stream APIs, JVM memory internals',
  },
  {
    title: 'Data Structures & Algorithms',
    category: 'Problem Solving',
    notes: 'Consistent LeetCode practice, competitive coding patterns, graph traversals',
  },
  {
    title: 'React',
    category: 'Frontend Engineering',
    notes: 'State management, custom hooks, component lifecycle, responsive web apps',
  },
  {
    title: 'AI Integration',
    category: 'Modern Tools',
    notes: 'Integrating Gemini API for contextual analytics and automated recommendations',
  },
  {
    title: 'Backend Development',
    category: 'System Design',
    notes: 'RESTful API architecture, relational database schema modeling, server controllers',
  },
  {
    title: 'Building SPARS',
    category: 'Active Project',
    notes: 'Iterating on the Student Performance & Skill Assessment System feature roadmap',
  },
];
