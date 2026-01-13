// app/components/TechnicalSkills.jsx
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

const TechnicalSkills = () => {
    const { theme } = useTheme();
    // Programming Languages Data
    const programmingLanguages = [
        { name: "Python", icon: "/images/icons/python.svg", color: "from-blue-500 to-green-400" },
        { name: "JavaScript", icon: "/images/icons/javascript.svg", color: "from-yellow-400 to-orange-500" },
        // { name: "TypeScript", icon: "/images/icons/typescript.svg", color: "from-sky-500 to-blue-700" },
        { name: "SQL", icon: "/images/icons/sql.png", color: "from-red-600 to-orange-400" },
    ];

    // Full Tech Stack (as per your HTML)
    const allTechStack = [
        "Django", "Python", "FastAPI", "Flask", "Node.js", "Express",
        "React", "Next.js", "Tailwind", "Sass",
        "PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Elasticsearch",
        "Git", "Postman", "Figma", "Trello", "Selenium", "VSCode",
        "TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV",
        "Docker", "AWS", "Terraform",
        "Linux", "macOS", "Windows"
    ];

    // Define category mappings
    const categories = {
        "All Stack": allTechStack,
        // "Frontend": ["React", "Next.js", "Vue.js", "Tailwind", "TypeScript", "Sass"],
        // "Backend": ["Django", "Python", "FastAPI", "Flask", "Node.js", "Express", "Spring Boot", "JAVA"],
        "Frontend": ["React", "Next.js", "Tailwind", "Sass"],
        "Backend": ["Django", "Python", "FastAPI", "Flask", "Node.js", "Express"],
        "Database": ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase", "Elasticsearch"],
        "ML Frameworks": ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV"],
        // "Cloud & DevOps": ["Docker", "AWS", "Kubernetes", "Terraform", "Argo CD"],
        "Cloud & DevOps": ["Docker", "AWS", "Terraform"],
        "Tools": ["Git", "Postman", "Figma", "Trello", "Selenium", "VSCode"],
        "Operating Systems": ["Linux", "macOS", "Windows"]
    };

    // State for active filter
    const [activeFilter, setActiveFilter] = useState("All Stack");

    // Get technologies based on active filter
    const filteredTechStack = categories[activeFilter] || allTechStack;

    const iconMap = {
        "Django": "/images/icons/django.svg",
        "Python": "/images/icons/python.svg",
        "FastAPI": "/images/icons/fastapi.svg",
        "Flask": "/images/icons/flask.svg",
        "Node.js": "/images/icons/nodejs.svg",
        "Express": "/images/icons/expressjs.svg",
        // "Spring Boot": "/images/icons/springboot.svg",
        // "JAVA": "/images/icons/java.svg",
        "React": "/images/icons/react.svg",
        "Next.js": "/images/icons/nextjs.svg",
        // "Vue.js": "/images/icons/vuejs.svg",
        "Tailwind": "/images/icons/tailwind.svg",
        "TypeScript": "/images/icons/typescript.svg",
        "Sass": "/images/icons/sass.svg",
        "PostgreSQL": "/images/icons/postgresql.svg",
        "MongoDB": "/images/icons/mongodb.svg",
        "Redis": "/images/icons/redis.svg",
        "MySQL": "/images/icons/mysql.svg",
        "Firebase": "/images/icons/firebase.svg",
        "Elasticsearch": "/images/icons/elasticsearch.svg",
        "Git": "/images/icons/git.svg",
        "Postman": "/images/icons/postman.svg",
        "Figma": "/images/icons/figma.svg",
        "Trello": "/images/icons/trello.svg",
        "Selenium": "/images/icons/selenium.svg",
        "VSCode": "/images/icons/vscode.svg",
        "TensorFlow": "/images/icons/tensorflow.svg",
        "PyTorch": "/images/icons/pytorch.svg",
        "Scikit-learn": "/images/icons/scikitlearn.svg",
        "Keras": "/images/icons/keras.svg",
        "OpenCV": "/images/icons/opencv.svg",
        "Docker": "/images/icons/docker.svg",
        "AWS": "/images/icons/aws.svg",
        // "Kubernetes": "/images/icons/kubernetes.svg",
        "Terraform": "/images/icons/terraform.svg",
        // "Argo CD": "/images/icons/argocd.svg",
        "Linux": "/images/icons/linux.svg",
        "macOS": "/images/icons/macos.svg",
        "Windows": "/images/icons/windows.svg",
    };

    return (
        <section className="space-y-6">
            {/* Section Header */}
            <div className="text-center p-2 sm:px-8 lg:px-12">
                <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                    Technical Skills
                </h1>
                <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    Skills and Technologies I&apos;ve Learned and Applied
                </p>
                <span className={`block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400`}></span>
            </div>

            {/* Programming Languages */}
            <div>
                <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            Programming Languages
                        </h3>
                    </div>
                    <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {programmingLanguages.map((lang, index) => (
                            <div
                                key={lang.name}
                                className={`relative bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700/40' : 'from-gray-200 to-gray-300 border-gray-300'} rounded-xl p-4 shadow-md backdrop-blur-md group overflow-hidden`}
                            >
                                {/* 3D Glass Effect */}
                                <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10' : 'bg-gradient-to-br from-blue-400/10 to-purple-400/10'} rounded-xl transform -rotate-1 scale-105 opacity-60 group-hover:opacity-100 transition-all duration-300 z-0`}></div>
                                <div className="relative z-10">
                                    <Image
                                        src={lang.icon}
                                        alt={lang.name}
                                        width={32}
                                        height={32}
                                        className="mx-auto mb-2 object-contain"
                                    />
                                    <div>
                                        <div className={`font-bold text-base ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{lang.name}</div>
                                        <div className={`w-full h-2 rounded-full mb-2 mt-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                                            <div className={`h-2 rounded-full bg-gradient-to-r ${lang.color}`}></div>
                                        </div>
                                        <div className={`text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} opacity-0`}>
                                            {/* Hidden as in original */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stacks and Frameworks */}
            <div>
                <div className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-2xl lg:text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
                            Stacks and Frameworks
                        </h3>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap justify-start md:justify-center gap-2 py-8">
                        {[
                            "All Stack",
                            "Frontend",
                            "Backend",
                            "Database",
                            "ML Frameworks",
                            "Cloud & DevOps",
                            "Tools",
                            "Operating Systems"
                        ].map((label) => (
                            <button
                                key={label}
                                onClick={() => setActiveFilter(label)}
                                className={`px-4 py-2 text-xs lg:text-base font-medium rounded-full transition-colors duration-300 ${label === activeFilter
                                    ? `${theme === 'dark' ? 'bg-blue-600/90 text-white border border-blue-600 shadow-md' : 'bg-blue-500 text-white border border-blue-500 shadow-md'}`
                                    : `${theme === 'dark' ? 'text-gray-200 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white' : 'text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-gray-900'}`
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Tech Icons Grid */}
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 mx-auto">
                        {filteredTechStack.map((tech) => {
                            const icon = iconMap[tech] || "/images/icons/python.svg"; // fallback
                            return (
                                <div
                                    key={tech}
                                    className={`group relative rounded-xl p-2 sm:p-3 border bg-gradient-to-br ${theme === 'dark' ? 'from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/30' : 'from-gray-200 to-gray-300 border-gray-300 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-100/30'} transition-all duration-300 overflow-hidden`}
                                >
                                    {/* 3D Glass Effect */}
                                    <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-500/10 to-purple-500/10' : 'bg-gradient-to-br from-cyan-400/10 to-purple-400/10'} rounded-xl transform -rotate-1 scale-105 opacity-60 group-hover:opacity-100 transition-all duration-300 z-0`}></div>
                                    <div className="relative z-10 flex items-center justify-center">
                                        <Image
                                            src={icon}
                                            alt={tech}
                                            width={56}
                                            height={56}
                                            className="object-contain filter drop-shadow-sm z-20"
                                            onError={(e) => {
                                                try {
                                                    e.currentTarget.src = "/images/icons/python.svg";
                                                } catch (err) {
                                                    // fallback: ignore if not available
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Tooltip on hover - updated for theme */}
                                    <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2
                    text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 rounded-xl
                    opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none
                    whitespace-nowrap z-30 shadow-lg ${theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-800 text-gray-100'}`}>
                                        {tech}
                                        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0
                      border-l-4 border-r-4 border-t-4 border-transparent ${theme === 'dark' ? 'border-t-gray-100' : 'border-t-gray-800'}`}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center mt-6">
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} font-medium`}>
                            Showing <span className={`${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{filteredTechStack.length}</span> technologies
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnicalSkills;