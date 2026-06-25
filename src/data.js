// Central content for the portfolio — sourced from Gagan's resumes.
// Edit here to update copy; the Projects section also pulls live repos from GitHub.

export const GITHUB_USERNAME = "gaganv007";

export const profile = {
  name: "Gagan Veginati",
  roles: [
    "AI / ML Engineer",
    "Full-Stack Software Engineer",
    "Data Scientist",
    "MLOps / DevOps Engineer",
  ],
  tagline:
    "I take ML models from prototype to deployed, reliable systems — graph neural nets, LLM apps, and serverless ML on AWS.",
  blurb:
    "Machine Learning Engineer (M.S., Boston University) who turns research into shipped products. I built and deployed a live AI oracle on AWS, trained GNNs/CNNs, and engineer full-stack apps end to end. Runner-up at the EasyA Consensus hackathon (Toronto, 2025).",
  location: "Boston, MA · Open to Relocation / Remote",
  email: "gveginati@gmail.com",
  phone: "(657) 726-5627",
  github: "https://github.com/gaganv007",
  linkedin: "https://linkedin.com/in/gagan-veginati",
  avatar: "/gagan.jpg",
  resume: { label: "AI / ML Engineer", file: "Gagan_Veginati_AI_ML_Engineer.pdf" },
};

export const stats = [
  { value: "89%", label: "Retention model accuracy" },
  { value: "65%", label: "ETL time reduced" },
  { value: "~14s", label: "AI oracle verdict time" },
  { value: "3×", label: "Faster deployments" },
];

export const skills = [
  {
    icon: "🧠",
    title: "ML & Deep Learning",
    items: [
      "PyTorch", "PyTorch Geometric", "TensorFlow", "Keras",
      "Scikit-learn", "XGBoost", "CNNs", "GNNs (GCN/GraphSAGE/GAT)",
      "LSTM", "OpenCV", "NLP",
    ],
  },
  {
    icon: "🤖",
    title: "LLMs & GenAI",
    items: [
      "Claude", "Hugging Face", "LangChain", "LangGraph",
      "RAG", "FAISS / Chroma", "Prompt Engineering",
    ],
  },
  {
    icon: "☁️",
    title: "MLOps & Cloud",
    items: [
      "AWS Lambda", "Bedrock", "SageMaker", "EC2 / S3",
      "Docker", "Kubernetes", "MLflow", "Weights & Biases",
      "CI/CD", "FastAPI", "Redis", "Apache Spark",
    ],
  },
  {
    icon: "💻",
    title: "Languages & Web",
    items: [
      "Python", "JavaScript", "TypeScript", "Java", "C/C++",
      "SQL", "Solidity", "React", "Next.js", "Node.js",
    ],
  },
  {
    icon: "📊",
    title: "Data & BI",
    items: [
      "Pandas", "NumPy", "Power BI", "Streamlit", "Databricks",
      "MySQL / MongoDB", "Matplotlib / Seaborn", "ETL Pipelines",
    ],
  },
];

// Curated highlight projects (richer detail than the live repo grid).
export const featuredProjects = [
  {
    emoji: "⚖️",
    title: "Gavel — AI Oracle for Prediction Markets",
    period: "2026",
    description:
      "A live, pay-per-query AI oracle that resolves prediction-market questions in ~14s by reasoning over cited sources and returning a verdict with on-chain proof.",
    highlights: [
      "Serverless FastAPI on AWS Lambda with an AWS Bedrock failover path",
      "Custom HTTP-402 (x402) micropayment layer verifying on-chain payments",
      "Next.js + wagmi frontend, Solidity settlement contract on Base",
    ],
    tags: ["Claude", "FastAPI", "AWS Lambda", "Bedrock", "Solidity", "Next.js"],
    repo: "https://github.com/gaganv007/Gavel",
    accent: "violet",
  },
  {
    emoji: "📈",
    title: "GNN-Based Stock Relations & Prediction",
    period: "2025",
    description:
      "Correlation graphs of 29 large-cap U.S. stocks trained with GCN, GraphSAGE, GAT and Temporal-GAT models against a Random Forest baseline.",
    highlights: [
      "GraphSAGE reached 58.7% next-day directional accuracy (F1 = 0.654)",
      "Streamlit app with an attention-based peer-influence graph",
      "Modular, config-driven pipeline that reruns with a single command",
    ],
    tags: ["PyTorch Geometric", "GNN", "Streamlit", "Python"],
    repo: "https://github.com/gaganv007",
    accent: "cyan",
  },
  {
    emoji: "🛡️",
    title: "Financial Transaction Anomaly Detection",
    period: "2024",
    description:
      "Fraud detection on highly imbalanced transaction data, benchmarking classical and deep-learning detectors with tuned decision thresholds.",
    highlights: [
      "Balanced data with SMOTE, improving F1 by 95% (relative)",
      "Compared KNN, Random Forest and LSTM model families",
      "Tuned thresholds to balance false positives vs. missed fraud",
    ],
    tags: ["Scikit-learn", "SMOTE", "LSTM", "Random Forest"],
    repo: "https://github.com/gaganv007",
    accent: "pink",
  },
  {
    emoji: "🔗",
    title: "ML-Blockchain Integration Platform (MLOps)",
    period: "2025",
    description:
      "A platform for ML governance — containerized services orchestrated on Kubernetes with automated smart-contract deployment.",
    highlights: [
      "3× deployment speedup, 70% less integration complexity",
      "Python SDK to standardize how models are registered & governed",
      "Docker + Kubernetes + Ethereum smart contracts",
    ],
    tags: ["Docker", "Kubernetes", "Python", "TypeScript", "Ethereum"],
    repo: "https://github.com/gaganv007",
    accent: "amber",
  },
  {
    emoji: "🎁",
    title: "BillRewards — Blockchain Loyalty Platform",
    period: "2025",
    description:
      "A universal loyalty platform converting receipts into on-chain rewards, with smart-contract reward logic.",
    highlights: [
      "Smart-contract reward tracking on Ethereum",
      "JavaScript / Node.js application layer",
      "Receipts → rewards conversion flow",
    ],
    tags: ["JavaScript", "Node.js", "Ethereum", "Smart Contracts"],
    repo: "https://github.com/gaganv007",
    accent: "green",
  },
  {
    emoji: "🔊",
    title: "Urban Noise Detection",
    period: "2024",
    description:
      "An audio-classification model that identifies urban sound categories from environmental noise recordings.",
    highlights: [
      "Raw audio → spectrogram / feature representations",
      "Evaluated accuracy across multiple sound classes",
      "Built with TensorFlow audio pipelines",
    ],
    tags: ["TensorFlow", "Audio", "Python", "Classification"],
    repo: "https://github.com/gaganv007",
    accent: "cyan",
  },
];

export const experience = [
  {
    role: "Graduate Assistant",
    org: "Boston University — Department of Computer Science",
    location: "Boston, MA",
    period: "Jan 2025 – May 2025",
    points: [
      "Automated data processing workflows for 500+ students, cutting manual handling time by 30%",
      "Mentored students and presented analysis of large-scale academic datasets to faculty, supporting reporting for 2,000+ students",
    ],
  },
  {
    role: "Data Research Intern",
    org: "SRM University AP — International Relations Department",
    location: "Amaravati, India",
    period: "May 2023 – May 2024",
    points: [
      "Built ML models (Random Forest, XGBoost, Logistic Regression) predicting student retention with 89% accuracy across 15,000+ records",
      "Engineered an end-to-end pipeline processing 5GB+ of data with Apache Spark and Python, reducing ETL time by 65%",
      "Created interactive Power BI dashboards with real-time refresh adopted by administrators",
    ],
  },
  {
    role: "Mobile App Developer Intern",
    org: "Winfra Tech Ltd",
    location: "Kochi, India",
    period: "Jun 2022",
    points: [
      "Shipped mobile application features in a production codebase with a small engineering team",
    ],
  },
];

export const education = [
  {
    degree: "M.S. in Computer Science",
    school: "Boston University",
    location: "Boston, MA",
    period: "Sep 2024 – May 2026",
    note: "Coursework: Machine Learning, Data Science with Python, Advanced Programming Techniques, Algorithms",
  },
  {
    degree: "B.Tech in Computer Science (AI/ML Specialization)",
    school: "SRM University AP",
    location: "Amaravati, India",
    period: "Sep 2020 – May 2024",
    note: "Coursework: Deep Learning, Computer Vision, Data Structures & Algorithms, DBMS",
  },
];

export const achievements = [
  "🏆 Runner-up — EasyA Consensus Hackathon, Toronto 2025",
  "☁️ Google Cloud — Prompt Design in Vertex AI",
  "🧩 MathWorks — Image Processing & MATLAB Onramp",
  "🎯 Sports Secretary, SRM University AP — led 30, organized 18+ events",
];
