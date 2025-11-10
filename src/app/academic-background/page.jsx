// app/components/AcademicBackground.jsx
'use client';
import React from 'react';
import Image from 'next/image';

const AcademicBackground = () => {
  const educationData = [
    // {
    //   degree: "Master of Science in Computer Science & Technology",
    //   institution: "Shanghai Jiao Tong University",
    //   institutionLink: "https://www.sjtu.edu.cn",
    //   location: "Shanghai, China",
    //   locationLink: "https://maps.app.goo.gl/UiFKp3Fd3773DjFw8",
    //   period: "2020 - 2023",
    //   gpa: "3.59 / 4.00",
    //   description:
    //     "Built upon a solid undergraduate foundation to explore advanced topics in computing, with a focus on distributed systems, AI, Image Processing and blockchain technologies. Gained in-depth knowledge through coursework and research, culminating in a thesis on decentralized voting mechanisms.",
    //   logo: "/images/sjtu.png",
    //   courses: [
    //     "Computer Networking",
    //     "Machine Learning",
    //     "Digital Image Processing",
    //     "Computer Vision",
    //     "Cloud Computing",
    //     "Blockchain Applications",
    //     "WEB Search and Mining",
    //     "Advanced Computer Architecture",
    //     "Statistical Learning and Inference",
    //     "Artificial Intelligence",
    //     "Vision Information Processing and Application"
    //   ],
    //   honors: [
    //     "Researched blockchain, networking, and distributed systems.",
    //     "Built a blockchain-based digital governance prototype with faculty.",
    //     "Mentored peers in algorithms and system design.",
    //     "Ranked in the top 20% of the cohort."
    //   ]
    // },
    {
      degree: "Bachelor of Science in Computer Science & Engineering",
      institution: "Central University of Science & Technology.",
      institutionLink: "https://cust.edu.bd",
      location: "Dhaka, Bangladesh",
      locationLink: "https://maps.app.goo.gl/6HU2ehqnaTtKiMXZ6",
      period: "2019 - 2023",
      gpa: "3.95 / 4.00",
      description:
        "Possess a strong and comprehensive foundation in core computer science principles, including software engineering methodologies, programming paradigms, algorithmic problem-solving, data structures, and advanced mathematical concepts essential for computing and system design.",
      logo: "/images/cust.png",
      courses: [
        "Computer Science Fundamentals",
        "Discrete Mathematics",
        "Programming Fundamentals",
        "Data Structures and Algorithms",
        "Software Engineering",
        "Database Systems",
        "Computer Networks",
        "Operating Systems",
        "Computer Organization",
        "Artificial Intelligence"
      ],
      honors: [
        "Participated in multiple intra-university hackathons and coding bootcamps.",
        "Programming Contest Winner",
        "Completed Capstone Project on real-time vehicle tracking using GPS and mobile technologies.",
        "Served as a Lab Assistant for Programming I & II, helping first-year students debug and improve code.",
        "Received Dean's List Recognition for consistently maintaining top academic performance."
      ]
    }
  ];

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          Academic Background
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          My academic journey and qualifications
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* Education Entries */}
      <div className="space-y-4">
        {educationData.map((edu, idx) => (
          <div
            key={idx}
            className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Institution Logo */}
              <div className="flex-shrink-0">
                  <Image
                    src={edu.logo}
                    alt={edu.institution}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.src = "/images/sakib-rahman.jpg";
                    }}
                  />
    
    
                  
                </div>

              {/* Degree & Institution Info */}
              <div className="flex flex-col items-start flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-200">{edu.degree}</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-4 items-start text-center lg:text-left mt-1">
                  <a
                    href={edu.institutionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center font-medium text-gray-300 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-building w-4 h-4 mr-2"
                    >
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
                    {edu.institution}
                  </a>
                  <a
                    href={edu.locationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center font-medium text-gray-300 hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin w-4 h-4 mr-2"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {edu.location}
                  </a>
                </div>
                <div className="flex items-center font-medium text-gray-200 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-calendar w-4 h-4 mr-2"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                  {edu.period}
                </div>

                {/* GPA Tag - mobile */}
                <div className="flex flex-wrap gap-2 justify-center lg:hidden mt-2">
                  <div className="py-0.5 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-blue-500/20 text-blue-400 border-blue-500/50">
                    CGPA: {edu.gpa}
                  </div>
                </div>
              </div>

              {/* GPA Tag - desktop */}
              <div className="hidden lg:flex flex-wrap gap-2 justify-end mt-0">
                <div className="py-0.5 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-blue-500/20 text-blue-400 border-blue-500/50">
                  CGPA: {edu.gpa}
                </div>
              </div>
            </div>

            <p className="mt-4 mb-4 text-sm sm:text-base text-gray-200">{edu.description}</p>

            {/* Courses & Honors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Key Courses</h4>
                <ul className="space-y-1">
                  {edu.courses.map((course, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-right w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0"
                      >
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-200">Honors & Recognition</h4>
                <ul className="space-y-1">
                  {edu.honors.map((honor, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star w-4 h-4 mr-2 mt-1 text-yellow-400 flex-shrink-0"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                      {honor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AcademicBackground;