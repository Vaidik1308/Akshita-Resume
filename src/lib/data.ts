// Raw portfolio content. Every UI string about the person comes from here (via portfolio.ts).
// `null` means "not provided yet": the UI hides that field instead of inventing it.

export type WorkMode = "Remote" | "Hybrid" | "On-site";
export type EngagementType = "Full-time" | "Internship" | "Part-time" | "Contract";
export type ProjectStatus = "Live" | "In progress" | "Archived";

export type ProfileData = {
  name: string;
  role: string; // headline shown under the name
  hireAs: string; // completes "Hiring ___?"
  location: string;
  coords: { lat: number; lon: number }; // weather widget
  timeZone: string; // IANA zone, for the person's local time in Contact
  email: string;
  linkedin: string | null;
  resume: string | null; // Google Drive share link
  photo: string;
  status: string | null; // green status pill; null hides it
  bio: string | null; // optional hand-written intro; replaces the generated one
  themeSeed: string; // Material You seed colour for the Android shell
};

export type ExperienceData = {
  company: string;
  role: string;
  start: string; // "Mon, YYYY"
  end: string | null; // "Mon, YYYY"; null while current
  current: boolean;
  mode: WorkMode;
  type: EngagementType;
  location?: string;
  bullets: string[];
  tech: string[];
  link?: string;
};

// Trainings and certifications are listed separately from employment.
export type TrainingData = {
  provider: string;
  title: string;
  date: string; // free text, as given on the résumé / LinkedIn
  mode?: WorkMode;
  bullets: string[];
};

export type EducationData = {
  institution: string;
  degree: string;
  years: string;
  grade: string;
  location?: string;
};

export type SkillGroupData = { group: string; items: string[] };

export type ProjectData = {
  slug: string;
  name: string;
  summary: string; // one line
  description: string[]; // longer write-up, one paragraph per entry
  tech: string[];
  live: string | null;
  status: ProjectStatus;
  publication?: string; // slug of a related publication
};

export type PublicationData = {
  slug: string;
  title: string;
  publisher: string;
  venue: string; // book the chapter appears in
  series?: string;
  published: string; // "Mon, YYYY"
  pages?: string;
  doi: string;
  url: string;
  authors: string[];
  summary: string;
  highlights: string[];
  images: { src: string; alt: string }[]; // under /public, added when provided
};

export const profileData: ProfileData = {
  name: "Akshita Deo",
  role: "Deputy Manager at Schneider Electric",
  hireAs: "an Industrial Automation Engineer",
  location: "Bengaluru, Karnataka, India",
  coords: { lat: 12.9716, lon: 77.5946 },
  timeZone: "Asia/Kolkata",
  email: "akshitadeo400@gmail.com",
  linkedin: "https://www.linkedin.com/in/akshita-deo", // from résumé handle; confirm
  resume: null, // TODO: Google Drive link
  photo: "/me.jpg",
  status: null,
  bio: null,
  themeSeed: "#D3AD9F", // extracted from the phone wallpaper (Material colour quantizer + score)
};

// Newest first. Only one entry may be `current`.
export const experienceData: ExperienceData[] = [
  {
    company: "Schneider Electric",
    role: "Deputy Manager",
    start: "Aug, 2026",
    end: null,
    current: true,
    mode: "Hybrid",
    type: "Full-time",
    location: "Bengaluru, Karnataka",
    bullets: ["AVEVA System Platform and EcoStruxure Automation Expert."],
    tech: ["AVEVA System Platform", "EcoStruxure Automation Expert"],
  },
  {
    company: "Schneider Electric",
    role: "Graduate Engineering Trainee",
    start: "Aug, 2025",
    end: "Aug, 2026",
    current: false,
    mode: "Hybrid",
    type: "Full-time",
    location: "Bengaluru, Karnataka",
    bullets: [],
    tech: [],
  },
  {
    company: "Lakshya Institute of Technology",
    role: "Machine Learning Intern",
    start: "Oct, 2023",
    end: "Dec, 2023",
    current: false,
    mode: "Remote",
    type: "Internship",
    location: "Bhubaneswar, Odisha",
    bullets: [
      "Developed a Music Genre Classification project using K-Nearest Neighbors (KNN) and Neural Networks.",
      "Built a House Price Prediction model as part of the internship's project work.",
      "Gained hands-on experience in implementing machine learning algorithms and processing audio data for genre prediction.",
    ],
    tech: ["Python", "Machine Learning", "Linear Regression", "KNN", "Neural Networks"],
  },
  {
    company: "Skolar",
    role: "Robotics Intern",
    start: "Jun, 2022",
    end: "Aug, 2022",
    current: false,
    mode: "Remote",
    type: "Internship",
    location: "Bengaluru, Karnataka",
    bullets: ["Building and testing of robots."],
    tech: ["ROS", "Robot Programming", "Robot Framework", "RPA", "Automation"],
  },
];

export const trainingData: TrainingData[] = [
  {
    provider: "World Skill Center",
    title: "LT Panel Maintenance & Industrial Automation",
    date: "From Jan 2025",
    mode: "Hybrid",
    bullets: [
      "Performed LT panel maintenance, ensuring optimal electrical system performance and safety.",
      "Provided hands-on training in industrial automation, covering PLC programming and system troubleshooting.",
    ],
  },
  {
    provider: "ServiceNow",
    title: "ServiceNow Application Developer & System Administrator",
    date: "Jun 2024 – Aug 2024",
    mode: "Hybrid",
    bullets: ["ServiceNow Application Developer", "ServiceNow System Administrator"],
  },
  {
    provider: "Skolar",
    title: "Robotics certification",
    date: "Issued Jul 2022",
    bullets: [],
  },
];

export const educationData: EducationData[] = [
  {
    institution: "Dayananda Sagar College of Engineering",
    degree: "B.E. in Electronics and Instrumentation",
    years: "2021 – 2025",
    grade: "CGPA 8.7",
    location: "Bengaluru",
  },
];

export const skillsData: SkillGroupData[] = [
  {
    group: "Industrial Automation",
    items: ["AVEVA System Platform", "EcoStruxure Automation Expert", "PLC Programming", "HMI", "Automation"],
  },
  { group: "Languages", items: ["Python", "C/C++", "SQL"] },
  {
    group: "Data & Machine Learning",
    items: ["Machine Learning", "Linear Regression", "Data Analysis", "Microsoft Power BI"],
  },
  {
    group: "Robotics",
    items: ["Robot Operating System (ROS)", "Robot Programming", "Robot Framework", "Robotic Process Automation (RPA)"],
  },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "RDBMS"] },
  {
    group: "Platforms & Tools",
    items: ["ServiceNow", "MATLAB", "NI LabVIEW", "Cadence", "ModelSim", "Keil uVision", "Picosoft", "VLab"],
  },
  { group: "Professional", items: ["Analytical Skills", "Business Analysis"] },
];

// Personal / academic projects only. Employer work lives in experienceData.
export const projectsData: ProjectData[] = [
  {
    slug: "guardian-in-the-bag",
    name: "Guardian in the Bag",
    summary: "GSM and IoT based women's safety device with GPS tracking and panic alerts.",
    description: [
      "A safety device with GPS tracking, panic buttons and emergency alerts to predefined contacts.",
      "Supports real-time location tracking and audio/video evidence collection via cloud connectivity.",
      "This final-year project grew into a research paper published by Springer Nature.",
    ],
    tech: ["ESP32", "GPS (NEO-6M)", "GSM (SIM800A)", "IoT"],
    live: null,
    status: "Archived",
    publication: "women-safety-gsm-iot-genai",
  },
  {
    slug: "dc-motor-health",
    name: "Health Monitoring of DC Motor",
    summary: "Digital Twin system that predicts and prevents DC motor failures.",
    description: [
      "Developed a Health Monitoring System for DC Motors using Digital Twin technology to predict and prevent potential failures.",
    ],
    tech: ["Digital Twin"],
    live: null,
    status: "Archived",
  },
  {
    slug: "anti-sleep-alarm",
    name: "Anti-Sleep Alarm System",
    summary: "Detects drowsiness and alerts the user to help prevent accidents.",
    description: [
      "Created an Anti-Sleep Alarm System designed to detect drowsiness and alert users to prevent accidents.",
    ],
    tech: ["Digital Twin"],
    live: null,
    status: "Archived",
  },
  {
    slug: "house-price-prediction",
    name: "House Price Prediction",
    summary: "Regression model for house prices built with NumPy and Pandas.",
    description: [
      "Implemented a House Price Prediction model using NumPy and Pandas for data manipulation and analysis.",
    ],
    tech: ["Python", "Machine Learning", "NumPy", "Pandas", "Jupyter Notebook"],
    live: null,
    status: "Archived",
  },
  {
    slug: "music-genre-classification",
    name: "Music Genre Classification",
    summary: "Classifies music genres from audio using KNN and neural networks.",
    description: [
      "Developed a Music Genre Classification project using K-Nearest Neighbors (KNN) and Neural Networks.",
      "Covers processing audio data into features for genre prediction.",
    ],
    tech: ["Python", "Machine Learning", "KNN", "Neural Networks", "Jupyter Notebook"],
    live: null,
    status: "Archived",
  },
];

// Metadata verified against Crossref for DOI 10.1007/978-981-92-1243-9_35.
export const publicationsData: PublicationData[] = [
  {
    slug: "women-safety-gsm-iot-genai",
    title: "Integrated GSM, IoT and Generative AI Solutions for Enhancing Women's Safety",
    publisher: "Springer Nature",
    venue: "Innovations and Applications of Next-Gen Communications",
    series: "Lecture Notes in Electrical Engineering",
    published: "Oct, 2026",
    pages: "455–466",
    doi: "10.1007/978-981-92-1243-9_35",
    url: "https://link.springer.com/chapter/10.1007/978-981-92-1243-9_35",
    authors: ["Silpa Ajith Kumar", "Khushi Khodbole", "Akshita Deo", "J. Satheesh Kumar", "Abhilash S. Vasu"],
    summary:
      "A technology-driven emergency response system that combines communication systems, connected hardware and emerging AI to support women's safety. It began as a final-year project at Dayananda Sagar College of Engineering.",
    highlights: [
      "ESP32 Dev Module as the central controller coordinating every connected component.",
      "NEO-6M GPS module for live location coordinates shared with emergency contacts.",
      "SIM800A GSM module sends distress SMS with location and places emergency calls.",
      "Holding the panic button for five seconds triggers the emergency sequence, with a buzzer alerting people nearby.",
      "Explores IoT data and Generative AI for threat analysis, predictive safety assistance and escape-route optimisation.",
      "Examines battery life, sensor reliability, data privacy and the ethics of AI-enabled safety tech.",
    ],
    images: [],
  },
];
