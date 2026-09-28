const projectCategories = [
  "All",
  "Java",
  "C / C++",
  "Python",
  "Backend",
  "Frontend",
  "Full Stack",
  "Data Engineering",
];

const projects = [
  {
    id: "distributed-notification-platform",
    title: "Distributed Notification Platform",
    description:
      "A backend-focused notification platform designed around scalable services, clean architecture and reliable notification delivery.",
    categories: ["Java", "Backend"],
    technologies: ["Java", "Spring Boot", "REST APIs", "Docker"],
    github:
      "https://github.com/ShreyMadaan/distributed-notification-platform",
    live: null,
    status: "In Progress",
    featured: true,
  },

  {
    id: "huffman-compressor",
    title: "Huffman Compressor",
    description:
      "A dependency-free Java CLI application that compresses and decompresses files using Huffman coding with a custom .huff format.",
    categories: ["Java", "C / C++"],
    technologies: ["Java", "Algorithms", "Data Structures", "CLI"],
    github: "https://github.com/ShreyMadaan/HuffmanCompressor",
    live: null,
    status: "Completed",
    featured: true,
  },

  {
    id: "shreyflix-ai",
    title: "ShreyFlixAI",
    description:
      "An IMDb-inspired movie discovery application exploring modern frontend development and AI-powered features.",
    categories: ["Frontend", "Full Stack"],
    technologies: ["React", "JavaScript", "AI"],
    github: "https://github.com/ShreyMadaan/ShreyFlixAI",
    live: null,
    status: "In Progress",
    featured: true,
  },

  {
    id: "parking-lot",
    title: "Parking Lot",
    description:
      "A parking lot system designed to apply object-oriented design and low-level design principles.",
    categories: ["Java", "Backend"],
    technologies: ["Java", "OOP", "LLD", "Design Patterns"],
    github: "https://github.com/ShreyMadaan/ParkingLot",
    live: null,
    status: "Completed",
    featured: false,
  },

  {
    id: "todo-list",
    title: "ToDo List App",
    description:
      "A frontend application for managing tasks through a simple and responsive user interface.",
    categories: ["Frontend"],
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/ShreyMadaan/ToDoListApp",
    live: null,
    status: "In Progress",
    featured: false,
  },

  {
    id: "weather-app",
    title: "Weather App",
    description:
      "A web application that retrieves and displays weather information using an external API.",
    categories: ["Frontend"],
    technologies: ["JavaScript", "HTML", "CSS", "REST API"],
    github: "https://github.com/ShreyMadaan/WeatherApp",
    live: null,
    status: "Completed",
    featured: false,
  },

  {
    id: "throttle-function-visualizer",
    title: "Throttle Function Visualizer",
    description:
      "An interactive frontend project for visualizing how throttling controls the frequency of function execution.",
    categories: ["Frontend"],
    technologies: ["JavaScript", "HTML", "CSS"],
    github:
      "https://github.com/ShreyMadaan/ThrottleFunctionVisualizer",
    live: null,
    status: "Completed",
    featured: false,
  },

  {
    id: "splitwise",
    title: "SplitWise",
    description:
      "A Splitwise-inspired application focused on implementing expense sharing and object-oriented design.",
    categories: ["Java", "Backend"],
    technologies: ["Java", "OOP", "LLD"],
    github: "https://github.com/ShreyMadaan/SplitWise",
    live: null,
    status: "Completed",
    featured: false,
  },
];

export { projectCategories, projects };