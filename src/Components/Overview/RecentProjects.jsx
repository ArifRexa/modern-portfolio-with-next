'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const RecentProjects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const projects = [
    {
      title: "Homebuyer Backend",
      description: "Homebuyer Essentials – Generate concise, data-driven UK property reports with scores, maps, and authoritative insights.",
      tags: ["edge-functions", "homebuying", "postgresql", "supabase"],
      status: "in-progress"
    },
    {
      title: "Portfolio Frontend",
      description: "An interactive portfolio website built using Next.js and Supabase, designed to highlight development projects, technical expertise, and professional experience.",
      tags: ["developer-portfolio", "nextjs", "portfolio-website", "resume", "supabase", "tailwindcss"],
      status: "in-progress"
    },
    {
      title: "arifrexa",
      description: "arifrexa is a special repository. Its README.md will appear on your public GitHub profile.",
      tags: ["git", "github", "python", "readme"],
      status: "in-progress"
    }
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={container}
      className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm"
    >
      <motion.div className="flex items-center justify-between mb-4" variants={item}>
        <h3 className="text-lg font-bold tracking-tight text-gray-200">Recent Projects</h3>
        <Link href="/projects" className="group flex items-center gap-1 font-semibold transition-all duration-200 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 text-sm whitespace-nowrap text-gray-300 hover:text-white">
          View All
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </motion.div>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3" variants={container}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} isInView={isInView} />
        ))}
      </motion.div>
    </motion.div>
  );
};

// Project Card Subcomponent
const ProjectCard = ({ project, index, isInView }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={cardVariants}
      className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/40 h-full p-4 lg:p-4  relative rounded-xl border backdrop-blur-md cursor-pointer shadow-md bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/40 h-full" style={{ height: 'auto' }}
    >
      <div className=" flex flex-col h-full">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-rose-500/20 border-yellow-500/30 rounded-full flex items-center justify-center text-white">
            <div className="text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-6 h-6 mr-1"></svg></div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-extrabold truncate text-gray-200">{project.title}</h4>
            <p className="text-sm mb-2 line-clamp-5 leading-relaxed text-gray-300">{project.description}</p>
          </div>
        </div>
        <div className="gap-1 mb-4 flex flex-wrap">
          {project.tags.map((tag, idx) => (
            <div key={idx} className="inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold text-xs border transition-colors bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-gray-100">
              {tag}
            </div>
          ))}
        </div>
        <div className="relative mt-auto">
          <button
            className="group flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-gray-700/70 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 text-sm font-medium relative overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link w-4 h-4">
              <path d="M15 3h6v6"></path>
              <path d="m10 14 9-9"></path>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6"></path>
            </svg>
            <span>View Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
          </button>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800/90 text-gray-200 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-gray-600 z-10 whitespace-nowrap">
            Private Repository
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentProjects;