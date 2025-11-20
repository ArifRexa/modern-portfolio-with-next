// app/components/ProfessionalExperience.jsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const ProfessionalExperience = () => {
  const { theme } = useTheme();
  const experiences = [
    {
      id: 1,
      title: "Software Engineer II",
      company: "Mediusware LTD.",
      companyUrl: "https://mediusware.com/",
      location: "Dhaka, Bangladesh",
      locationUrl: "https://maps.app.goo.gl/xLdRRXd2vhrieXj3A",
      period: "November 2023 - Present",
      logo: "https://mediusware.com/brand.svg",
      description:
        "Lead the design and development of scalable backend systems using Python and cloud-native technologies, driving technical vision and mentoring teams. Collaborate with stakeholders to align solutions with business goals while enhancing system reliability and deployment efficiency through DevOps practices.",
      responsibilities: [
        "Architect scalable backend services using FastAPI, Django, and PostgreSQL.",
        "Lead backend initiatives, enforcing clean code and best practices.",
        "Mentor engineers through code reviews and technical workshops.",
        "Drive CI/CD, containerization, and infrastructure automation.",
        "Ensure security compliance and optimize performance."
      ],
      achievements: [
        "Boosted application performance by 40% via backend optimizations.",
        "Led a team of 5 on high-impact projects, achieving on-time delivery.",
        "Reduced deployment time by 60% with Docker and GitHub Actions CI/CD.",
        "Built RESTful APIs handling 1M+ daily requests with 99.9% uptime.",
        "Migrated monolith to microservices, cutting downtime by 70%.",
        "Enhanced response time consistency by 35% with profiling tools.",
        "Improved throughput by 50% using asynchronous FastAPI programming.",
        "Implemented observability (Prometheus, Grafana, Sentry), reducing MTTR by 40%."
      ],
      projects: [
        "CardTrack Engine: Developed image-based search system for collectible cards using FastAPI, CLIP embeddings, and vector search, handling 1M+ records with real-time responses.",
        "CI/CD Overhaul: Redesigned deployment pipelines with Docker and GitHub Actions for zero-downtime blue-green deployments.",
        "Monolith to Microservices: Led migration of Django monolith to FastAPI/gRPC microservices, improving modularity and performance."
      ],
      impact: [
        "Cut incident recovery time from 2 hours to 40 minutes with observability tools.",
        "Reduced onboarding time from 3 weeks to 1 week via automation.",
        "Increased delivery velocity by 30% through DevOps automation."
      ],
      tools: [
        "GitHub Actions", "Docker", "Prometheus", "Grafana", "Sentry", "Celery", "Redis", "Terraform", "Nginx", "OpenSearch"
      ],
      technologies: [
        "Python", "Django", "Django REST Framework", "FastAPI", "PostgreSQL", "AWS", "React", "Next.js"
      ],
      tags: ["Current", "Full-time"]
    },
    // {
    //   id: 2,
    //   title: "Software Engineer",
    //   company: "FatCoupon",
    //   companyUrl: "https://fatcoupon.com/",
    //   location: "Shanghai, China",
    //   locationUrl: "https://maps.app.goo.gl/VUTBSU9pmezXSHaYA",
    //   period: "July 2023 - March 2024",
    //   logo: "/images/fatcoupon.png",
    //   description:
    //     "Engineered automation solutions for coupon discovery and application, streamlining discount retrieval and enhancing the user experience across e-commerce platforms. Played a pivotal role in developing browser extension features and ensuring product quality through rigorous QA practices.",
    //   responsibilities: [
    //     "Developed backend services for automated coupon scraping using Python and headless browser automation.",
    //     "Built a Chrome extension for real-time coupon application during checkout on supported e-commerce sites.",
    //     "Collaborated closely with QA and frontend teams to maintain high product standards.",
    //     "Integrated logging and monitoring tools to track scraping success and coupon validity.",
    //     "Maintained and extended scraping rules to adapt to site structure changes."
    //   ],
    //   achievements: [
    //     "Increased scraping accuracy by 45% through improved DOM targeting and error handling.",
    //     "Boosted scraping speed by 60% with concurrent task execution and request optimizations.",
    //     "Contributed to a Chrome extension that reached 5K+ active users within 2 months.",
    //     "Reduced manual QA efforts by 70% via automated test scripts and monitoring dashboards."
    //   ],
    //   projects: [
    //     "Coupon Scraper Engine: Designed a robust scraping pipeline using Python and Puppeteer for extracting and validating coupons from 100+ e-commerce websites.",
    //     "Smart Apply Extension: Built and maintained a Chrome extension that automatically detects and applies best coupons at checkout, enhancing UX and driving user retention.",
    //     "QA Automation Suite: Implemented automated test cases and monitoring scripts to ensure scraper and extension stability across updates."
    //   ],
    //   impact: [
    //     "Reduced coupon discovery and application time by over 80%, improving user satisfaction.",
    //     "Enhanced customer retention and checkout conversion through automated savings features.",
    //     "Improved system resilience to layout changes via flexible selector strategies and fallback mechanisms."
    //   ],
    //   tools: [
    //     "Jenkins", "Docker", "Puppeteer", "Sentry", "Selenium", "Redis", "Nginx", "MongoDB", "Playwright"
    //   ],
    //   technologies: [
    //     "Python", "JavaScript", "FastAPI", "Chrome Extension API", "MongoDB", "Redis", "Next.js"
    //   ],
    //   tags: ["Full-time"]
    // },
    // {
    //   id: 3,
    //   title: "Software Development Engineer",
    //   company: "Talent Pro",
    //   companyUrl: "https://talentpro.global/",
    //   location: "Dhaka, Bangladesh",
    //   locationUrl: "https://maps.app.goo.gl/HDhuctNBGHc1fxuZ9",
    //   period: "June 2022 - October 2022",
    //   logo: "/images/talent-pro.webp",
    //   description:
    //     "Acted as a liaison between business and technical teams by transforming business needs into clear technical specifications. Designed and developed backend systems using FastAPI and Flask, with an emphasis on maintainability, scalability, and collaboration across departments.",
    //   responsibilities: [
    //     "Translated complex business requirements into actionable technical tasks.",
    //     "Developed high-performance, RESTful APIs using FastAPI and Flask.",
    //     "Maintained effective communication across sales, marketing, and development teams.",
    //     "Collaborated with DevOps to deploy services and monitor system performance on AWS.",
    //     "Assisted in logging and tracing service behavior via Elastic Stack (ELK)."
    //   ],
    //   achievements: [
    //     "Accelerated backend development timelines by 30% through improved coordination.",
    //     "Reduced communication gaps between business and tech teams by establishing standardized documentation practices.",
    //     "Increased system visibility with integrated logging and monitoring using ELK.",
    //     "Delivered stable and well-documented APIs that reduced frontend-backend friction."
    //   ],
    //   projects: [
    //     "Business Requirement Mapping Tool: Built internal tooling to convert client requirements into structured engineering tasks, improving backlog clarity and team efficiency.",
    //     "API Development Stack: Implemented robust API services using FastAPI and Flask for internal business operations, enabling faster product iteration.",
    //     "AWS Deployment & Monitoring: Worked with infrastructure team to containerize services, deploy them on AWS, and set up real-time monitoring using the Elastic Stack."
    //   ],
    //   impact: [
    //     "Improved alignment between product vision and technical implementation.",
    //     "Reduced production incidents through proactive monitoring setup.",
    //     "Enabled quicker stakeholder feedback loops by reducing technical iteration cycles."
    //   ],
    //   tools: [
    //     "AWS", "Elastic Stack (ELK)", "GitHub Actions", "Docker", "Nginx", "Postman", "Swagger", "Elasticsearch", "Kibana", "Logstash"
    //   ],
    //   technologies: ["Python", "FastAPI", "Flask", "AWS"],
    //   tags: ["Full-time"]
    // },
    // {
    //   id: 4,
    //   title: "Software Engineer",
    //   company: "Worklife",
    //   companyUrl: "https://worklife.so/",
    //   location: "Dhaka, Bangladesh",
    //   locationUrl: "https://maps.app.goo.gl/9RRr8opr23LiKsDA7",
    //   period: "June 2021 - December 2021",
    //   logo: "/images/worklife.svg",
    //   description:
    //     "Developed a robust backend system to support a machine learning-driven performance review platform. Focused on efficient data extraction, database optimization, and scalable deployment to ensure high availability and reliability for enterprise-level employee feedback processing.",
    //   responsibilities: [
    //     "Built data pipelines for extracting and processing employee performance metrics.",
    //     "Integrated ML-driven logic to generate tailored feedback based on historical work data.",
    //     "Optimized PostgreSQL queries and schema for faster access and lower latency.",
    //     "Implemented Redis caching to reduce DB read load and improve API response times.",
    //     "Deployed backend services on AWS, including EC2 for compute and S3 for data storage."
    //   ],
    //   achievements: [
    //     "Reduced database load by 30% through caching, indexing, and query optimization.",
    //     "Enabled personalized employee feedback via automated ML-based analysis.",
    //     "Deployed and maintained reliable cloud infrastructure with 99.9% uptime.",
    //     "Streamlined processing of large employee datasets with minimal performance bottlenecks."
    //   ],
    //   projects: [
    //     "ML-Powered Review Engine: Engineered a backend system to support a machine learning pipeline for generating automated performance feedback for employees.",
    //     "Database Optimization Layer: Improved database performance with strategic indexing, optimized query plans, and Redis-based caching.",
    //     "Cloud Infrastructure Deployment: Set up scalable infrastructure using AWS EC2 and S3 to ensure reliable and cost-efficient application hosting."
    //   ],
    //   impact: [
    //     "Improved system responsiveness and scalability, enhancing user experience.",
    //     "Enabled faster and more accurate performance reviews through ML integration.",
    //     "Reduced operational overhead by automating infrastructure setup and tuning."
    //   ],
    //   tools: ["AWS EC2", "AWS S3", "Redis", "GitHub Actions", "PostgreSQL", "Docker"],
    //   technologies: ["Python", "Django REST Framework", "PostgreSQL", "AWS"],
    //   tags: ["Full-time"]
    // },
    // {
    //   id: 5,
    //   title: "Software Engineer",
    //   company: "D2 - A Concern of mPower Social Ltd.",
    //   companyUrl: "https://mpower-social.com/",
    //   location: "Dhaka, Bangladesh",
    //   locationUrl: "https://maps.app.goo.gl/yubbGVpnkE1govTC7",
    //   period: "January 2018 - May 2021",
    //   logo: "/images/d2.webp",
    //   description:
    //     "Designed and built scalable Django-based backend systems with RESTful API integrations to improve real-time monitoring and data accessibility. Delivered high-performance visualizations and streamlined user experience for handling large-scale datasets.",
    //   responsibilities: [
    //     "Developed backend logic for interactive web applications using Django and Django REST Framework.",
    //     "Created REST APIs to expose monitoring data for frontend visualization tools.",
    //     "Built an intuitive frontend interface to display database metrics and real-time system information.",
    //     "Implemented a high-performance real-time filtering and visualization engine to handle millions of records efficiently.",
    //     "Collaborated with UI/UX and product teams to improve accessibility for non-technical stakeholders."
    //   ],
    //   achievements: [
    //     "Improved monitoring system functionality by integrating new backend features and APIs.",
    //     "Reduced query response time by 45% with efficient filtering and indexing strategies.",
    //     "Increased stakeholder engagement by 60% through enhanced data visibility.",
    //     "Successfully scaled data visualization system to handle millions of records with low memory overhead."
    //   ],
    //   projects: [
    //     "Monitoring Dashboard Backend: Designed Django-based backend system and APIs to support a live monitoring dashboard with robust data querying and filtering capabilities.",
    //     "Real-Time Visualization Engine: Engineered a high-performance data pipeline and visualization interface to support millions of records in real-time.",
    //     "Stakeholder Web Interface: Built a user-centric frontend connected to REST APIs for real-time data inspection and decision-making."
    //   ],
    //   impact: [
    //     "Enhanced system observability and responsiveness for internal and external users.",
    //     "Increased transparency and usability of critical system metrics across departments.",
    //     "Boosted development velocity by streamlining API contracts and frontend/backend integration."
    //   ],
    //   tools: ["PostgreSQL", "Docker", "GitHub", "Nginx", "Grafana", "Redis"],
    //   technologies: ["Python", "Django", "JavaScript", "HTML/CSS", "React"],
    //   tags: ["Full-time"]
    // }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Professional Experience
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Highlights from My Software Engineering Career
        </p>
        <span className={`block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400`}></span>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 flex items-center justify-center text-white text-6xl font-bold overflow-hidden relative">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className=" object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Role & Company Info */}
              <div className="flex flex-col items-start flex-1">
                <h3 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{exp.title}</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-4 items-start text-center lg:text-left">
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'} hover:underline`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building w-4 h-4 mr-2">
                      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                      <path d="M9 22v-4h6v4" />
                      <path d="M8 6h.01" />
                      <path d="M16 6h.01" />
                      <path d="M12 6h.01" />
                      <path d="M12 10h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 10h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 10h.01" />
                      <path d="M8 14h.01" />
                    </svg>
                    <h2 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{exp.company}</h2>
                  </a>
                  <a
                    href={exp.locationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'} hover:underline`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-4 h-4 mr-2">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <h2 className={`font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{exp.location}</h2>
                  </a>
                </div>
                <div className={`flex items-center font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-4 h-4 mr-2">
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  {exp.period}
                </div>

                {/* Tags - mobile */}
                <div className="flex flex-wrap gap-2 justify-center lg:hidden mt-2">
                  {exp.tags.map((tag, i) => (
                    <div
                      key={i}
                      className={`py-0.5 px-3 text-sm font-medium border backdrop-blur-sm rounded-full ${
                        tag === "Current"
                          ? `${theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30' : 'bg-green-500/30 text-green-600 border-green-500/60 hover:bg-green-500/40'}`
                          : `${theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30' : 'bg-blue-500/30 text-blue-600 border-blue-500/60 hover:bg-blue-500/40'}`
                      }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags - desktop */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end mt-0">
                {exp.tags.map((tag, i) => (
                  <div
                    key={i}
                    className={`py-0.5 px-3 text-sm font-medium border backdrop-blur-sm rounded-full ${
                      tag === "Current"
                        ? `${theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30' : 'bg-green-500/30 text-green-600 border-green-500/60 hover:bg-green-500/40'}`
                        : `${theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30' : 'bg-blue-500/30 text-blue-600 border-blue-500/60 hover:bg-blue-500/40'}`
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>

            <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>

            {/* Reusable section renderer */}
            {[
              { title: "Responsibilities", items: exp.responsibilities },
              { title: "Achievements", items: exp.achievements },
              { title: "Projects", items: exp.projects },
              { title: "Impact and Outcomes", items: exp.impact },
            ].map(({ title, items }) =>
              items.length > 0 ? (
                <div key={title} className="mt-4">
                  <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{title}</h4>
                  <ul className="space-y-1">
                    {items.map((item, idx) => (
                      <li key={idx} className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-chevron-right w-4 h-4 mr-2 mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'} flex-shrink-0`}>
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}

            {/* Tools & Technologies */}
            <div className="mt-4">
              <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Tools and Platforms</h4>
              <div className="flex flex-wrap gap-2">
                {exp.tools.map((tool, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center border font-semibold px-3 py-1 text-xs sm:text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300 border-gray-700/50 hover:bg-gray-600/50 hover:text-gray-100' : 'bg-gray-200/50 text-gray-700 border-gray-300 hover:bg-gray-300/50 hover:text-gray-900'}`}
                  >
                    {tool}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <div
                    key={i}
                    className={`inline-flex items-center border font-semibold px-3 py-1 text-xs sm:text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700/50 text-gray-300 border-gray-700/50 hover:bg-gray-600/50 hover:text-gray-100' : 'bg-gray-200/50 text-gray-700 border-gray-300 hover:bg-gray-300/50 hover:text-gray-900'}`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfessionalExperience;