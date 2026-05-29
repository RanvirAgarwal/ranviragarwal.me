export const portfolioData = {
  personal: {
    name: "Ranvir Agarwal",
    title: "Electrical Engineering | Computer Science",
    location: "Cedar Park, TX",
    email: "ranviragarwal9@gmail.com",
    phone: "818-264-9032",
    links: {
      linkedin: "https://www.linkedin.com/in/ranvir-agarwal-66805a313",
      github: "https://github.com/RanvirAgarwal",
      portfolio: "https://ranviragarwal.me"
    }
  },

  about: {
    bio: "I am a driven student bridging the gap between Electrical Engineering and Computer Science, passionate about building scalable software systems and innovative hardware solutions.",
    goals: ["Build scalable AI-integrated systems", "Innovate in sustainable hardware and renewable energy", "Contribute to impactful open-source projects"],
    fun: ["I love competing in hackathons", "I build custom circuits and hardware", "I'm a retro game enthusiast"]
  },

  contact: {
    email: "ranviragarwal9@gmail.com",
    github: "https://github.com/RanvirAgarwal",
    linkedin: "https://www.linkedin.com/in/ranvir-agarwal-66805a313"
  },

  experience: [
    {
      id: "exp-1",
      company: "TerraScan",
      role: "Lead Developer",
      period: "Jan 2025 – Present",
      location: "Remote",
      description: "Developing AI-powered soil analysis platform using advanced computing",
      highlights: [
        "AI & HPC cluster analysis of soil DNA for pathogen/bacterial detection",
        "React Native Maps integration with Google Gemini API",
        "Real-time location tracking for satellite imagery assessment",
        "Optimized growing practices recommendation engine"
      ],
      tech: ["React Native", "Google Gemini API", "HPC", "AI/ML", "Python"],
      impact: "Revolutionizing agricultural soil analysis through AI",
      expandedDetails: {
        overview: "Leading development of TerraScan, an innovative platform that leverages AI and high-performance computing to analyze soil DNA samples. This technology identifies pathogens, bacterial infections, and provides actionable solutions for farmers.",
        responsibilities: [
          "Architecture design for scalable soil analysis platform",
          "Integration of Google Gemini API for intelligent data processing",
          "Real-time satellite imagery processing for land assessment",
          "Performance optimization across multiple data sources"
        ],
        achievements: [
          "Reduced soil analysis time by 40% through optimized algorithms",
          "Integrated satellite imagery with ground-truth data",
          "Created recommendation engine for optimal growing practices"
        ],
        skills_gained: ["AI Integration", "Real-time Systems", "Google Cloud APIs", "Agricultural Tech"],
        metrics: {
          accuracy: "94%",
          response_time: "<2s"
        }
      },
      color: "#22c55e"
    },
    {
      id: "exp-2",
      company: "RKTPL",
      role: "Engineering Intern",
      period: "May 2024 – August 2024",
      location: "Remote",
      description: "Nanotechnology research and CAD prototyping for hardware enhancement",
      highlights: [
        "Nanotechnology applications in mechanical production",
        "Material enhancement and structural integrity analysis",
        "High-fidelity CAD prototyping using Autodesk",
        "Performance testing and documentation for stakeholders"
      ],
      tech: ["Autodesk Inventor", "CAD", "Nanotechnology", "COMSOL", "Materials Science"],
      impact: "Advanced hardware durability through nano-coating research",
      expandedDetails: {
        overview: "Conducted foundational research on nanotechnology applications in mechanical production, focusing on how nano-scale materials could enhance component durability and performance.",
        responsibilities: [
          "Research methodology development for nano-coating evaluation",
          "Prototype design and testing in Autodesk CAD suite",
          "Material property analysis using COMSOL simulations",
          "Technical documentation and stakeholder presentations"
        ],
        achievements: [
          "Identified 3 viable nano-coating solutions for hardware components",
          "Achieved 35% improvement in material durability metrics",
          "Received Director recommendation letter",
          "Published findings in technical documentation"
        ],
        skills_gained: ["Materials Science", "CAD Design", "Simulation Software", "Technical Writing"],
        mentor: "Director of Engineering",
        recommendation: "Demonstrated exceptional research methodology and technical execution"
      },
      color: "#3b82f6"
    }
  ],

  projects: [
    {
      id: "proj-1",
      name: "TerraScan - AI Soil Analysis Platform",
      shortDescription: "AI-powered platform for agricultural soil analysis",
      fullDescription: "Comprehensive platform using AI and satellite imagery to analyze soil health, identify pathogens, and recommend optimal farming practices.",
      category: "AI/Web",
      tech: ["React Native", "Python", "Google Gemini API", "Satellite Imagery API", "Machine Learning"],
      status: "In Development",
      timeline: "Jan 2025 – Present",
      features: [
        "Real-time soil DNA analysis",
        "Satellite imagery integration",
        "Pathogen detection AI model",
        "Growing recommendations engine"
      ],
      results: {
        accuracy: "94%",
        response_time: "< 2 seconds"
      },
      links: {
        github: "https://github.com/RanvirAgarwal/terrascan",
        demo: "https://terrascan-demo.vercel.app"
      },
      expandedDetails: {
        problem: "Farmers lack real-time insights into soil health, leading to suboptimal planting decisions and crop yields",
        solution: "TerraScan combines AI analysis of soil DNA with satellite imagery to provide actionable insights",
        approach: [
          "Integrated Google Gemini for intelligent data processing",
          "Built ML models for pathogen detection",
          "Created recommendation algorithm for growing practices",
          "Implemented real-time location tracking"
        ],
        challenges: "Processing large satellite imagery datasets efficiently while maintaining accuracy",
        lessons: "The importance of combining multiple data sources for comprehensive analysis"
      },
      color: "#10b981"
    },
    {
      id: "proj-2",
      name: "Software Recycling System - Tidal Hack Winner",
      shortDescription: "1st Place winner - Hackathon project for hardware lifecycle optimization",
      fullDescription: "Innovative system to reduce electronic waste by identifying and repurposing underutilized hardware through efficient software-level resource management.",
      category: "Systems/Sustainability",
      tech: ["Python", "Hardware Diagnostics", "Resource Optimization", "Data Analysis"],
      status: "Completed - Award Winner",
      timeline: "Feb 2025",
      award: "1st Place - Tidal Hack '25",
      features: [
        "Hardware capability detection",
        "Resource utilization analysis",
        "Repurposing recommendations",
        "E-waste reduction tracking"
      ],
      results: {
        ewaste_reduction: "45%",
        hardware_repurposed: "200+ devices",
        environmental_impact: "12 tons CO2 prevented"
      },
      expandedDetails: {
        problem: "Over 50 million tons of e-waste generated annually; valuable components discarded prematurely",
        solution: "Intelligent software that identifies underutilized hardware capabilities for repurposing",
        approach: [
          "Analyzed hardware specs vs. actual utilization",
          "Built matching algorithm for compatible uses",
          "Created sustainability tracking dashboard",
          "Developed resale platform integration"
        ],
        hackathon_experience: "Competed against 50+ teams, presented to industry judges, received recognition for innovation",
        future_plans: "Scale to 10,000+ devices with enterprise partnerships"
      },
      color: "#f59e0b"
    },
    {
      id: "proj-3",
      name: "Gridfinity AI",
      shortDescription: "Electronic components CAD generator AI tool",
      fullDescription: "An AI-powered tool that uses a smart parsing structure and self-healing architecture to procedurally generate specific Arduino components, PCBs, vials, and custom electronic housings.",
      category: "AI/Hardware",
      tech: ["Python", "Machine Learning", "CAD Parsing", "Self-healing Architecture"],
      status: "Active",
      timeline: "2025",
      features: [
        "Smart parsing structure",
        "Self-healing architecture",
        "Arduino component generation",
        "PCB and vial planting"
      ],
      results: {
        efficiency_gain: "Generates CAD structures in seconds",
        components_supported: "Vials, PCBs, Arduino sensors"
      },
      links: {
        github: "https://github.com/RanvirAgarwal"
      },
      expandedDetails: {
        problem: "Creating custom mounting and housing components (like Gridfinity boxes) for unique electronic parts is extremely time consuming.",
        solution: "A generative AI tool that takes electronic component specifications and auto-generates perfectly sized 3D-printable housing structures.",
        approach: [
          "Developed a smart parsing structure to read component specs",
          "Implemented a self-healing algorithm to fix generated mesh errors",
          "Created modular generation logic for PCBs and vials"
        ],
        future_plans: "Expand to support full custom cases for Raspberry Pi clusters"
      },
      color: "#a855f7"
    }
  ],

  education: [
    {
      id: "edu-1",
      school: "Texas A&M University",
      location: "College Station, TX",
      degree: "B.S. Electrical Engineering",
      expectedGraduation: "May 2029",
      relevantCoursework: [
        "Differential Equations",
        "Calculus III",
        "Physics: Mechanics",
        "Circuit Analysis (Upcoming)",
        "Digital Logic (Upcoming)"
      ],
      highlights: [
        "Pursuing rigorous engineering curriculum",
        "Focus on electrical systems and design",
        "Active in SHINE research program"
      ],
      expandedDetails: {
        why_chosen: "Texas A&M's strong engineering program and research opportunities aligned with my career goals",
        research: "Currently working under Dr. Madsen on off-grid solar solutions",
        campus_involvement: "Engineering clubs, student organizations",
        future_focus: "Renewable energy systems and sustainable technology"
      },
      color: "#8b5cf6"
    },
    {
      id: "edu-2",
      school: "Round Rock High School",
      location: "Round Rock, TX",
      degree: "High School Diploma",
      graduation: "May 2025",
      testScores: {
        sat: "1570/1600",
        math: "800",
        readingWriting: "770"
      },
      relevantCoursework: [
        "AP Calculus BC",
        "AP Statistics",
        "AP Computer Science Advanced",
        "AP English Literature",
        "Principles of Engineering",
        "Digital Engineering",
        "Multivariable Calculus"
      ],
      honors: [
        "National Honor Society",
        "Mu Alpha Theta Honor Society",
        "National Merit Commendation"
      ],
      expandedDetails: {
        academic_focus: "Strong foundation in mathematics, engineering, and computer science",
        senior_project: "Designed and presented multiple engineering solutions",
        prep_strategy: "Focused SAT prep on math concepts and critical reading skills",
        college_readiness: "Well-prepared for rigorous university-level coursework"
      },
      color: "#06b6d4"
    }
  ],

  skills: {
    categories: [
      {
        name: "CAD & Design",
        skills: [
          { name: "Autodesk Inventor", proficiency: 90, certified: true },
          { name: "SolidWorks", proficiency: 85, certified: false },
          { name: "Revit", proficiency: 75, certified: false },
          { name: "COMSOL", proficiency: 80, certified: false }
        ],
        icon: "🏗️"
      },
      {
        name: "Programming",
        skills: [
          { name: "Python", proficiency: 88, certified: false },
          { name: "HTML/CSS", proficiency: 90, certified: false },
          { name: "Java", proficiency: 80, certified: false },
          { name: "JavaScript", proficiency: 85, certified: false }
        ],
        icon: "💻"
      },
      {
        name: "Engineering & Robotics",
        skills: [
          { name: "PLC Programming", proficiency: 75, certified: false },
          { name: "MATLAB", proficiency: 80, certified: false },
          { name: "Arduino", proficiency: 85, certified: false },
          { name: "Digital Electronics", proficiency: 80, certified: false }
        ],
        icon: "⚙️"
      },
      {
        name: "AI & Advanced Tech",
        skills: [
          { name: "Machine Learning", proficiency: 75, certified: false },
          { name: "Google Gemini API", proficiency: 80, certified: false },
          { name: "React Native", proficiency: 85, certified: false },
          { name: "Satellite Imagery Analysis", proficiency: 70, certified: false }
        ],
        icon: "🤖"
      },
      {
        name: "Languages",
        skills: [
          { name: "English", proficiency: 100, native: true },
          { name: "Hindi", proficiency: 95, fluent: true },
          { name: "Marathi", proficiency: 85, conversant: true }
        ],
        icon: "🌍"
      }
    ]
  },

  awards: [
    {
      id: "award-1",
      title: "Tidal Hack '25 - 1st Place Winner",
      date: "Feb 2025",
      organization: "Tidal Hack",
      description: "Won first place for developing Software Recycling System that optimizes hardware lifecycle",
      expandedDetails: {
        competition: "Competed against 50+ teams of developers and engineers",
        project: "Software Recycling System for reducing electronic waste",
        judges: "Industry professionals from major tech companies",
        presentation: "Presented working prototype and sustainability metrics",
        recognition: "Featured in hackathon winners announcement"
      },
      category: "Hackathon",
      color: "#fbbf24"
    },
    {
      id: "award-2",
      title: "Presidential Volunteer Service Award",
      date: "2024",
      organization: "White House",
      description: "200+ hours of service, 25,000+ lbs of goods processed",
      expandedDetails: {
        hours: "200+ hours of volunteer service",
        impact: "Distributed 25,000 lbs of food and clothing",
        organization: "Round Rock Area Service Center",
        recognition: "Official Presidential award for sustained volunteer commitment",
        significance: "Top 1% of youth volunteers in Texas"
      },
      category: "Service",
      color: "#ef4444"
    },
    {
      id: "award-3",
      title: "Model United Nations - Outstanding Delegate",
      date: "2021-2025",
      organization: "Multiple Institutions",
      description: "Multiple international awards at UT Austin, UCLA, USC, UC Berkeley",
      expandedDetails: {
        achievements: "Outstanding Delegate awards at 4 major conferences",
        competitions: "Debated with 1000+ delegates from around the world",
        topics: "Tech-governance, digital rights, sustainability",
        recognition: "Ranked among top 5% of all delegates",
        skills: "Research, public speaking, policy analysis, debate"
      },
      category: "Academic",
      color: "#06b6d4"
    },
    {
      id: "award-4",
      title: "National Merit Commendation",
      date: "2024",
      organization: "National Merit Scholarship Corporation",
      description: "Top 1% of SAT test takers nationally",
      expandedDetails: {
        score: "1570/1600",
        percentile: "99th percentile",
        recognition: "Elite academic achievement recognition"
      },
      category: "Academic",
      color: "#8b5cf6"
    },
    {
      id: "award-5",
      title: "AP Scholar with Honor",
      date: "2024",
      organization: "College Board",
      description: "High achievement on Advanced Placement exams",
      expandedDetails: {
        exams_taken: "6+ AP exams",
        scores: "Multiple 4's and 5's",
        recognition: "Top academic performers nationwide"
      },
      category: "Academic",
      color: "#10b981"
    },
    {
      id: "award-6",
      title: "AutoDesk Professional Certification",
      date: "2022",
      organization: "Autodesk",
      description: "Professional certification in CAD design software",
      expandedDetails: {
        software: "Autodesk Inventor & Revit",
        certification_level: "Professional",
        applications: "Used in engineering internship and projects"
      },
      category: "Certification",
      color: "#f97316"
    }
  ],

  research: [
    {
      id: "research-1",
      title: "Off-Grid Solar Solutions",
      organization: "Texas A&M University",
      mentor: "Dr. Madsen",
      period: "Jan 2026 – Present",
      location: "College Station, TX (Hybrid)",
      type: "SHINE Program Research Apprenticeship",
      focus: [
        "Solar energy system design",
        "Energy storage optimization",
        "Grid independence strategies",
        "Sustainability solutions"
      ],
      expandedDetails: {
        background: "Working under Dr. Madsen's guidance on renewable energy research",
        objectives: [
          "Design efficient off-grid solar systems",
          "Optimize energy storage solutions",
          "Analyze sustainability metrics",
          "Develop scalable solutions"
        ],
        methodology: "Combining theoretical engineering with practical system design",
        significance: "Contributing to sustainable energy future",
        expected_outcomes: "Research publication and innovation in renewable energy"
      },
      color: "#fbbf24"
    }
  ],

  activities: [
    {
      id: "act-1",
      name: "Model United Nations",
      period: "Aug 2021 – May 2025",
      role: "Delegate & Speaker",
      description: "Research and debate on global policy issues",
      highlights: [
        "Attended conferences at UT Austin, UCLA, USC, UC Berkeley",
        "Received multiple Outstanding Delegate awards",
        "Debated with thousands of delegates worldwide",
        "Specialized in tech-governance and digital rights"
      ],
      expandedDetails: {
        skills: ["Research", "Public Speaking", "Policy Analysis", "Debate", "Leadership"],
        impact: "Developed deep understanding of global issues and public speaking prowess",
        memorable_moments: "Winning awards at prestigious universities"
      },
      color: "#06b6d4"
    },
    {
      id: "act-2",
      name: "DECA",
      period: "Aug 2021 – May 2025",
      role: "Competitor & Student Leader",
      description: "Business and marketing competitions",
      highlights: [
        "Financial and marketing simulations",
        "Verbal roleplay competitions",
        "Competed at District 5 competitions",
        "District winner - CDC category"
      ],
      expandedDetails: {
        skills: ["Business Acumen", "Public Speaking", "Data Analysis", "Corporate Strategy"],
        awards: "DECA District 5 CDC Winner",
        impact: "Built strong professional communication skills"
      },
      color: "#10b981"
    },
    {
      id: "act-3",
      name: "Engineering Club",
      period: "Aug 2022 – May 2025",
      role: "Project Lead",
      description: "Design and build engineering projects",
      highlights: [
        "Designed vacuum attachment for suction improvement",
        "Created complex circuits with temperature sensors",
        "Learned CAD and 3D modeling",
        "Collaborated on robotics projects"
      ],
      expandedDetails: {
        projects: [
          {
            name: "Vacuum Attachment Design",
            tech: "Autodesk CAD",
            outcome: "Increased suction effectiveness by 25%"
          },
          {
            name: "Temperature Sensor Circuit",
            tech: "XOR/AND/OR gates, Inverters",
            outcome: "Functional sensor array with logic control"
          }
        ],
        skills_gained: ["CAD Design", "Circuit Design", "Measurement", "3D Modeling"]
      },
      color: "#f59e0b"
    },
    {
      id: "act-4",
      name: "National Honor Society",
      period: "Oct 2023 – May 2025",
      role: "Member & Volunteer",
      description: "Academic excellence and community service",
      highlights: [
        "80+ hours of volunteer service",
        "Computer hardware recycling program",
        "Food donation initiatives",
        "Breast cancer research awareness"
      ],
      expandedDetails: {
        service_hours: "80+",
        programs: ["Hardware Recycling", "Food Donations", "Cancer Research"],
        impact: "Contributed to community sustainability efforts"
      },
      color: "#8b5cf6"
    },
    {
      id: "act-5",
      name: "Mu Alpha Theta",
      period: "Oct 2023 – May 2025",
      role: "Tutor & Competitor",
      description: "Mathematics honor society",
      highlights: [
        "Tutored 5+ peers in Precalculus and Calculus",
        "Helped peers achieve 4's and 5's on AP exams",
        "Participated in AMC competitions",
        "Strengthened problem-solving skills"
      ],
      expandedDetails: {
        students_tutored: 5,
        exam_success: "Multiple 4's and 5's on AP Calculus",
        competitions: "AMC, regional math competitions",
        teaching_impact: "Developed strong communication and explanation skills"
      },
      color: "#ec4899"
    }
  ]
};
