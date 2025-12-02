// app/components/ProjectsPortfolio.jsx
'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ProjectsPortfolio = () => {
  const { theme } = useTheme();
  const projects = [
    {
      title: "AI Sales Assistant (TeezAI)",
      description:
        "A comprehensive car dealership AI assistant platform designed to handle multiple aspects of automotive sales and customer service. Features a sophisticated multi-agent AI system that routes user queries to specialized agents for optimal customer experience.",
      features: [
        "Multi-Agent AI System: Sophisticated AI assistant that routes user queries to specialized agents",
        "Vehicle Inventory Management: Complete vehicle inventory system with models, brands, and specifications",
        "Customer Interaction: Contact management, test drive booking, and appointment scheduling",
        "Trade-In Services: Vehicle trade-in evaluation and matching system",
        "Customer Support: FAQ handling and technical assistance booking",
        "Human Agent Integration: Ability to connect users with human representatives",
        "Payment and Subscription Management: Stripe integration for dealer subscriptions",
        "Voice Assistant Integration: Twilio for voice calls and communication",
        "Dealer Management: Complete dealer dashboard and administration panel",
        "Conversation History: Chat history tracking and management"
      ],
      topics: [
        "ai", "django", "langchain", "langgraph", "openai", "multi-agent",
        "car-dealership", "sales-automation", "vehicle-inventory", "chatbot",
        "python", "postgresql", "redis", "stripe", "twilio", "docker"
      ],
      status: "Completed",
      date: "Dec 1, 2025",
      githubUrl: "https://github.com/ArifRexa/AI-Car-Sales-Assistant"  // Replace with actual repository URL when available
    },
    {
      title: "Surrat Backend",
      description:
        "A Django-based audio processing and language learning platform that integrates AI services for transcription, translation, and conversation. Designed to help users practice speaking and improve language skills through an interactive audio-based system with support for minority languages like Sami.",
      features: [
        "Audio Processing Pipeline: Complete workflow from audio upload to AI response with transcription, translation, and TTS generation",
        "Multilingual Support: Focus on Sami, Norwegian, and English with Google Translate integration",
        "AI Integration: OpenAI GPT models for intelligent conversation responses",
        "TTS Options: Dual provider support (Acapela and GiellaLT) with voice selection",
        "User Engagement: Star-based system for tracking user progress and engagement",
        "Subscription Management: Multiple tiers with platform-specific tracking",
        "Data Privacy: GDPR-compliant user data management and anonymization",
        "Real-time Audio Transcription: Using Hugging Face Whisper model for MP3 and WAV files",
        "Translation Services: Real-time translation between Sami, Norwegian, and English",
        "AI-Powered Chatbot: Context-aware responses with GPT-4 and GPT-3.5 Turbo integration"
      ],
      topics: [
        "django", "djangorestframework", "ai", "audio-processing", "transcription",
        "translation", "text-to-speech", "openai", "gpt", "huggingface",
        "minority-languages", "sami", "language-learning", "celery", "redis",
        "postgresql", "python", "whisper", "google-translate"
      ],
      status: "Completed",
      date: "Dec 1, 2025",
      githubUrl: "https://github.com/ArifRexa/Surrat-AI-Chat-Bot"  // Replace with actual repository URL when available
    },
    {
      title: "Social Media Automation Platform",
      description:
        "A comprehensive social media automation platform designed to automate user engagement across multiple social media platforms. The system allows users to perform various actions like liking, commenting, following, posting, and more across different social networks through a unified API interface.",
      features: [
        "Multi-Platform Support: Automated interactions across Instagram, Tumblr, Pinterest, Reddit, Facebook Groups, WhatsApp, and LinkedIn",
        "Automated Interactions: Like, comment, follow, unfollow, share, and post across platforms",
        "Content Creation: Upload photos, create stories, and make posts on various platforms",
        "Tag/Hashtag Targeting: Perform actions based on specific hashtags or tags",
        "User Management: Follow/unfollow users and interact with profiles",
        "Content Management: Pin creation on Pinterest and post creation across platforms",
        "CSV-Based Automation: Configure actions through CSV command files",
        "Rate Limit Management: Built-in controls to minimize excessive API calls",
        "Unified API Interface: Centralized server for diverse social media platform integration",
        "User Authentication: Secure login/logout mechanisms for each platform"
      ],
      topics: [
        "python", "blacksheep", "automation", "social-media", "api", "instagram",
        "tumblr", "pinterest", "reddit", "facebook", "whatsapp", "linkedin",
        "instagrapi", "selenium", "pinterest-api", "tumblr-api", "reddit-api",
        "openapi", "rest-api", "social-media-automation"
      ],
      status: "Completed",
      date: "Dec 1, 2025",
      githubUrl: "https://github.com/ArifRexa/Social-Media-Automation-All"  // Replace with actual repository URL when available
    },
    {
      title: "Planning Conditions Extractor Tool",
      description:
        "A FastAPI-based web application designed to scrape London planning data, extract and categorize planning conditions based on predefined keywords, and provide a RESTful API for accessing and managing planning applications. The tool automatically categorizes conditions into heritage, archaeology, ecology, and cross-discipline categories.",
      features: [
        "Data Scraping & Processing: Scrapes London planning data from official API with advanced filtering for 'Approved' or 'Refused' applications",
        "Condition Categorization: Automatically categorizes conditions into heritage, archaeology, ecology, and cross-discipline categories",
        "Supabase Integration: Stores data in a PostgreSQL database via Supabase with batched upserts for efficiency",
        "RESTful API Endpoints: Comprehensive endpoints for authentication, data access, and application management",
        "Advanced Filtering & Querying: Multi-parameter filtering by borough, status, date range with pagination support",
        "User Authentication & Security: Full JWT-based authentication with email verification and password security",
        "Monitoring & Error Tracking: Sentry integration for comprehensive error monitoring and tracking",
        "Date Range Processing: Supports configurable date ranges with smart defaults for last 45 days",
        "Keyword-based Matching: Uses regex patterns for accurate condition categorization",
        "Batch Processing: Efficiently handles large data volumes with 1000-record batch processing"
      ],
      topics: [
        "fastapi", "python", "planning-data", "web-scraping", "data-extraction",
        "supabase", "postgresql", "api", "restful", "authentication",
        "jwt", "pydantic", "sentry", "london", "planning-portal",
        "data-categorization", "condition-classification", "async", "datetime",
        "data-validation", "batch-processing", "error-handling", "security"
      ],
      status: "Completed",
      date: "Dec 1, 2025",
      githubUrl: "https://github.com/arif-azrul/planning-conditions-extractor"  // Replace with actual repository URL when available
    },
    // {
    //   title: "AWS IAM User Management",
    //   description:
    //     "AWS IAM User Management Tool is a Python-based command-line utility for managing AWS IAM users efficiently. It allows administrators to automate common IAM tasks such as creating users, attaching policies, generating access keys, and cleaning up unused credentials.",
    //   features: [
    //     "Automated IAM Setup: Creates users (Alice, Bob, Charlie, Dana), groups (Developer, DBAdmin, Auditor), and policies for S3, EC2, RDS, and CloudTrail access.",
    //     "Policy Validation: Checks for overly permissive policies (e.g., Action: *, Resource: *).",
    //     "Cleanup Script: Safely deletes all created IAM resources.",
    //     "Unit Tests: Uses pytest and moto to test setup logic without AWS API calls.",
    //     "Configurable: Uses config.yaml for customizable team and permission settings."
    //   ],
    //   topics: [
    //     "access-management", "aws", "aws-cli", "aws-iam", "aws-tools",
    //     "boto3", "devops", "iam", "identity-and-access-management", "user-management"
    //   ],
    //   status: "Completed",
    //   date: "Jul 2, 2025",
    //   githubUrl: "https://github.com/rsakib15/aws-iam-user-management"
    // },
    {
      title: "LinkedIn Auto Apply",
      description:
        "Automate your LinkedIn job applications with ease! This Python-based bot uses Selenium to search for jobs and automatically apply to positions with Easy Apply. Designed to save time and streamline your job hunt while mimicking human-like behavior to reduce detection risk.",
      features: [
        "Automates LinkedIn job applications using Selenium.",
        "Searches for jobs based on user-defined keywords and filters.",
        "Automatically applies to positions with 'Easy Apply'.",
        "Mimics human-like behavior to reduce detection risk.",
        "Configurable application settings (resume, cover letter, job preferences).",
        "Saves time and streamlines the job application process.",
        "Logs applied jobs and application status for tracking.",
        "Handles multiple job applications in a single session."
      ],
      topics: ["automation", "linkedin", "linkedin-bot", "selenium"],
      status: "Completed",
      date: "Jun 10, 2024",
      githubUrl: "https://github.com/rsakib15/linkedin-auto-apply"
    },
    // {
    //   title: "Chinese License Plate Recognition",
    //   description:
    //     "Implementation of Chinese license plate character segmentation and recognition system",
    //   features: [
    //     "Implementation of both traditional and deep learning methods for license plate recognition.",
    //     "Preprocessing of dataset images using OpenCV for color conversion, noise removal, and perspective transformation.",
    //     "License plate detection using morphological operations, contours, and aspect ratio filtering.",
    //     "Perspective transformation to obtain front-view license plate images.",
    //     "Character segmentation and template matching for traditional recognition.",
    //     "Background checking for different plate colors (blue, yellow, green, white).",
    //     "CNN-based deep learning model trained on individual character images for high accuracy.",
    //     "Use of CCPD dataset with bounding box and character-level annotations for deep learning.",
    //     "High accuracy achieved: 99.75% on 2000 images and 99.94% on 60,000 images."
    //   ],
    //   topics: [
    //     "computer-vision", "convolutional-neural-networks", "image-processing",
    //     "license-plate-detection", "license-plate-recognition", "opencv"
    //   ],
    //   status: "Completed",
    //   date: "Nov 29, 2022",
    //   githubUrl: "https://github.com/rsakib15/Chinese-License-Plate-Recognition"
    // },
    {
      title: "WikiSearch",
      description:
        "WikiSearch is a search engine built on Wikipedia dump datasets, designed to help users quickly find relevant articles. It supports fuzzy search, wildcard queries, and multiple ranking methods to improve search accuracy and user experience.",
      features: [
        "Search engine built from Wikipedia dump dataset (15M+ articles).",
        "Supports document vector, inverted, positional, and bi-gram indexing.",
        "Fuzzy search with spelling correction using Levenshtein and bi-grams.",
        "Wildcard search for partial or unknown terms.",
        "Five ranking algorithms: Bag of Words, Cosine, Jaccard, TF-IDF, High-IDF."
      ],
      topics: [
        "fuzzy-search", "indexing", "python", "reactjs", "search", "search-algorithms",
        "search-engine", "wikipedia"
      ],
      status: "Completed",
      date: "Apr 30, 2021",
      githubUrl: "https://github.com/rsakib15/WikiSearch"
    },
    // {
    //   title: "One Shot Learning",
    //   description:
    //     "One-shot Image Classification leverages deep learning to classify images with very few examples per class, using Siamese Neural Networks and One-shot Learning techniques.",
    //   features: [
    //     "Supports One-shot Learning for image classification",
    //     "Uses Siamese Neural Network for similarity comparison",
    //     "Handles small labeled datasets efficiently",
    //     "N-way testing for model validation",
    //     "Triplet Loss implementation for improved embeddings"
    //   ],
    //   topics: [
    //     "computer-vision", "deep-learning", "few-shot-learning", "image-classification",
    //     "one-shot-learning", "siamese-neural-network"
    //   ],
    //   status: "Completed",
    //   date: "Apr 27, 2021",
    //   githubUrl: "https://github.com/rsakib15/One-Shot-Learning"
    // },
    // {
    //   title: "Image Stitcher",
    //   description:
    //     "Python project for computing image homography, drawing correspondences, warping and blending images, and generating realistic billboard overlays using OpenCV and NumPy.",
    //   features: [
    //     "Interactive point selection for computing homography",
    //     "Compute homography matrix from source and destination points",
    //     "Draw correspondences between images",
    //     "Warp and blend images seamlessly using computed homography",
    //     "Replace billboard content realistically with a custom image"
    //   ],
    //   topics: [
    //     "computer-vision", "image-stitching", "opencv", "python"
    //   ],
    //   status: "Completed",
    //   date: "Apr 22, 2021",
    //   githubUrl: "https://github.com/rsakib15/Image-Stitcher"
    // },
    // {
    //   title: "Harris Corner Detector",
    //   description:
    //     "Implementing Harris Corner Detector and Scale-Invariant Feature Transform (SIFT) for keypoint detection, feature description, and image matching under transformations like rotation, scaling, and translation.",
    //   features: [
    //     "Custom implementation of Harris Corner Detector",
    //     "Corner response calculation with Gaussian smoothing and Sobel filters",
    //     "Keypoint orientation and scale estimation",
    //     "Feature matching using Euclidean distance and DMatch"
    //   ],
    //   topics: [
    //     "computer-vision", "feature-detection", "harris-corners", "opencv", "sift"
    //   ],
    //   status: "Completed",
    //   date: "Apr 1, 2021",
    //   githubUrl: "https://github.com/rsakib15/Harris-Corner-Detector"
    // },
    // {
    //   title: "DIP Super Resolution",
    //   description:
    //     "An efficient deep learning approach for Single Image Super-Resolution (SISR) that leverages dense projection networks with up- and down-sampling stages, iterative error feedback, and deep concatenation.",
    //   features: [
    //     "Designed and implemented Dense Projection Network (DPCNN)",
    //     "Applied Iterative Error Feedback to progressively correct reconstruction errors",
    //     "Achieved state-of-the-art performance, outperforming SRCNN, FSRCNN, VDSR, DRRN, and EDSR"
    //   ],
    //   topics: [
    //     "computer-vision", "deep-learning", "image-super-resolution", "pytorch"
    //   ],
    //   status: "Completed",
    //   date: "Dec 19, 2020",
    //   githubUrl: "https://github.com/rsakib15/DIP-Super-Resolution"
    // },
    // {
    //   title: "LC4 Binary Interpreter",
    //   description:
    //     "C-based LC4 interpreter and disassembler that executes LC4 binaries, manages memory, and converts object files into readable assembly for educational use in computer architecture.",
    //   features: [
    //     "Binary Interpreter: Executes LC4 machine code instructions",
    //     "Disassembler: Converts LC4 binary into human-readable assembly",
    //     "Memory Management: Simulated LC4 memory system",
    //     "Loader Module: Loads .obj files into memory"
    //   ],
    //   topics: ["assembly", "c-language", "lc4", "pennsim"],
    //   status: "Completed",
    //   date: "Aug 19, 2020",
    //   githubUrl: "https://github.com/rsakib15/LC4-Binary-Interpreter"
    // },
    {
      title: "Bangla Newspaper Scraper",
      description:
        "A Python scraper to extract articles from popular Bangla newspapers, supporting text extraction, link collection, and data storage.",
      features: [
        "Scrapes articles from multiple Bangla newspaper websites",
        "Extracts headlines, article text, publication date, and links",
        "Saves scraped data in structured formats (CSV/JSON)"
      ],
      topics: ["automation", "beautifulsoup", "python", "selenium"],
      status: "Completed",
      date: "Feb 11, 2019",
      githubUrl: "https://github.com/rsakib15/Bangla-Newspaper-Scraper"
    },
    {
      title: "Smart Audio Profile Manager",
      description:
        "A mobile app that automatically adjusts device audio profiles based on position and user activity using sensors like accelerometer and proximity.",
      features: [
        "Automatically switches audio profiles based on device position",
        "Silent mode when the device is upside down",
        "Vibration mode when the device is in a pocket",
        "General audio profile when the device is in hand or on desk"
      ],
      topics: ["android-application", "accelerometer", "proximity-sensor"],
      status: "Completed",
      date: "Apr 7, 2017",
      githubUrl: "https://github.com/rsakib15/smart-audio-profile-manager"
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Projects & Portfolio
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Showcasing my technical expertise through innovative solutions
        </p>
        <span className={`block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400`}></span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`relative ${theme === 'dark' ? 'bg-gray-900/90' : 'bg-gray-100/90'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-3 sm:p-4 shadow-sm flex flex-col h-full overflow-hidden group`}
          >
            {/* 3D Glass Effect */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'} rounded-xl opacity-40 group-hover:opacity-60 transition-all duration-300 z-0`}></div>
            <div className="relative z-10 flex flex-col grow">
              {/* Title & Status */}
              <div className="flex items-center justify-between mb-2 z-10">
                <h4 className={`text-lg sm:text-xl font-semibold truncate ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {project.title}
                </h4>
                <div className="relative group/status">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className={`absolute top-4 right-0 text-xs sm:text-sm px-2 py-1 rounded-lg opacity-0 group-hover/status:opacity-100 transition-all duration-300 ease-out transform scale-95 group-hover/status:scale-100 font-semibold ${theme === 'dark' ? 'bg-gray-900 text-blue-100' : 'bg-gray-200 text-blue-900'} shadow-md border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className={`text-xs sm:text-sm mb-3 line-clamp-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-3 z-10">
                <h4 className={`text-sm sm:text-base font-semibold mb-1.5 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Key Features</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className={`text-xs sm:text-sm flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`lucide lucide-chevron-right w-3 h-3 mr-1.5 mt-0.5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} shrink-0 flex-shrink-0`}
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Topics */}
              <div className="mb-3 z-10">
                <div className="flex flex-row w-full items-center mb-1.5">
                  <h4 className={`text-sm sm:text-base font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Topics</h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.topics.map((topic, i) => (
                    <div
                      key={i}
                      className={`inline-flex items-center border font-semibold px-2 py-0.5 text-[10px] sm:text-xs rounded-md ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300 border-gray-700/50 hover:bg-gray-600/50 hover:text-gray-100' : 'bg-gray-200/50 text-gray-700 border-gray-300 hover:bg-gray-300/50 hover:text-gray-900'}`}
                    >
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer: Status, Date, GitHub */}
              <div className="flex flex-col sm:flex-row justify-between items-center flex-wrap gap-2 mt-auto pt-2 z-10">
                <div className="flex flex-wrap gap-1.5 text-[9px] sm:text-xs font-medium">
                  <div className={`px-2 py-0.5 w-fit flex items-center font-bold border backdrop-blur-sm rounded-full shadow-sm ${theme === 'dark' ? 'bg-green-500/20 text-green-300 border-green-400/40' : 'bg-green-500/30 text-green-700 border-green-500/40'}`}>
                    {project.status}
                  </div>
                  <div className={`px-2 py-0.5 w-fit flex items-center font-bold border backdrop-blur-sm rounded-full shadow-sm ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' : 'bg-purple-500/30 text-purple-700 border-purple-500/40'}`}>
                    {project.date}
                  </div>
                </div>
                <div className="flex space-x-1.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium h-8 text-[10px] px-2 py-1 ${theme === 'dark' ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/40 border' : 'bg-blue-500/30 hover:bg-blue-500/40 text-blue-700 border-blue-500/40 border'}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-github w-3 h-3"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsPortfolio;