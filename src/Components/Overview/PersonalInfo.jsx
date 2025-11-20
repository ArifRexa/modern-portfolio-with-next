'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import avatar from '../../../public/images/arif.jpeg';
import { getTodaysMeetings, getCoffeeCount } from '@/utils/activityTracker';
import { useTheme } from '@/context/ThemeContext';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const PersonalInfo = () => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [codingTime, setCodingTime] = useState('...'); // Loading indicator
  const [commitCount, setCommitCount] = useState('...'); // Loading indicator
  const [meetings, setMeetings] = useState(0); // Daily meetings count (0-4)
  const [coffees, setCoffees] = useState(0); // Coffee count (0-3)
  const [isOnline, setIsOnline] = useState(true); // Set this to false to show offline status

  useEffect(() => {
    // Fetch coding time from our API route
    const fetchCodingTime = async () => {
      try {
        const response = await fetch('/api/wakatime');
        if (!response.ok) {
          throw new Error('Failed to fetch coding time');
        }
        const data = await response.json();
        setCodingTime(data.codingTime);
      } catch (error) {
        console.error('Error fetching coding time:', error);
        // Fallback to a default value if API fails
        setCodingTime('0 mins');
      }
    };

    // Fetch commit count from our API route
    const fetchCommitCount = async () => {
      try {
        const response = await fetch('/api/github/commits');
        if (!response.ok) throw new Error('Failed to fetch commit count');

        const data = await response.json();
        setCommitCount(data.commitCount); // ✔️ matches the API now
      } catch (error) {
        console.error('Error fetching commit count:', error);
        setCommitCount(0);
      }
    };

    // Set initial meetings and coffee counts using shared utility
    setMeetings(getTodaysMeetings());
    setCoffees(getCoffeeCount());

    fetchCodingTime();
    fetchCommitCount();
  }, []); // Empty dependency array means this runs once when component mounts

  // Update coffee count as time passes throughout the day
  useEffect(() => {
    const coffeeInterval = setInterval(() => {
      setCoffees(getCoffeeCount());
    }, 60000); // Update every minute

    return () => clearInterval(coffeeInterval);
  }, []);

  // Determine status based on online state
  const statusColor = isOnline ? 'green' : 'gray';
  const statusText = isOnline ? 'Online' : 'Offline';

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
      variants={container}
      className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300'} p-4 lg:p-6 shadow-sm`}
    >
      <motion.div
        className="flex flex-col lg:flex-row lg:items-start gap-6 relative"
        variants={item}
      >
        <div className="relative mx-auto lg:mx-0">
          <div className="w-56 h-56 flex items-center justify-center font-bold shadow-sm overflow-hidden  rounded-xl">
            <Image src={avatar}
              alt="Ariful Islam"
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 shadow-md flex items-center justify-center bg-${statusColor}-500 border-${statusColor}-500/50`}>
            <div className={`w-3 h-3 rounded-full bg-${statusColor}-400 animate-pulse`}></div>
            <div className="w-3 h-3 rounded-full animate-ping absolute bg-white/40"></div>
            <div className="w-3 h-3 rounded-full absolute bg-white/80"></div>
          </div>
        </div>

        <motion.div className="flex-1 text-center lg:text-left" variants={item}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full relative">
            <div className="hidden xl:flex absolute top-0 right-0 items-center space-x-2">
              <div className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 border-gray-500/50">
                <span className={`flex w-2.5 h-2.5 rounded-full animate-pulse bg-${statusColor}-400`}></span>
                {statusText}
              </div>
              <div className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 00-5 5v1H4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 6V7a3 3 0 016 0v1H7z"></path>
                </svg>
                Available for Hire
              </div>
            </div>
          </div>

          <div>
            <h1 className={`tracking-tight text-4xl font-bold capitalize ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
              Ariful Islam
            </h1>
            <h2 className={`tracking-tight text-xl mb-2 font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Software Engineer
            </h2>
            <p className={`text-md mb-2 leading-relaxed break-words lg:pl-0 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Experienced Cloud Solutions Architect and Full-Stack Developer with 5+ years of
              expertise in web application development, API engineering, automation, and debugging.
              Skilled in designing and deploying scalable, high-performance systems on platforms like
              AWS and Azure, with strong proficiency in DevOps, CI/CD pipelines, and cloud
              infrastructure management. Adept at driving cross-functional collaboration and
              implementing agile methodologies to deliver secure, maintainable, and user-centric
              software. Passionate about leveraging emerging technologies to innovate, optimize
              performance, and build robust digital solutions that enhance user experience and
              achieve business excellence.
            </p>
            <address className="flex flex-col lg:flex-row items-center lg:space-x-4 font-medium not-italic">
              <a
                href="https://maps.app.goo.gl/8jxqFzZa9ab5AASq8"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center hover:underline ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
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
                  className="lucide lucide-map-pin h-4 w-4 mr-1"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Dhaka, Bangladesh
              </a>
              <a
                href="mailto:arif.reza3126@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center hover:underline ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
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
                  className="lucide lucide-mail h-4 w-4 mr-1"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                arif.reza3126@gmail.com
              </a>
            </address>
          </div>

          {/* Mobile badges */}
          <div className="mt-6 flex justify-center lg:justify-start space-x-2 xl:hidden">
            <div className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 border-gray-500/50">
              <span className={`flex w-2.5 h-2.5 rounded-full animate-pulse bg-${statusColor}-400`}></span>
              {statusText}
            </div>
            <div className="py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit flex items-center gap-1 px-3 text-sm font-medium border backdrop-blur-sm rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border-blue-500/50">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M10 2a5 5 0 00-5 5v1H4a2 2 0 00-2 2v5a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 6V7a3 3 0 016 0v1H7z"></path>
              </svg>
              Available for Hire
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.section
        aria-label="Today's Stats"
        className={`mt-8 pt-8 ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'} border-t`}
        variants={item}
      >
        <h2 className={`text-xl text-center font-semibold mb-6 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Today&apos;s Stats
        </h2>
        <motion.dl className="grid grid-cols-2 sm:grid-cols-4 gap-4" variants={container}>
          <motion.div className="text-center" variants={item}>
            <dd className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
              {codingTime}
            </dd>
            <dt className={`uppercase text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Coding</dt>
          </motion.div>
          <motion.div className="text-center" variants={item}>
            <dd className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">
              {commitCount}
            </dd>
            <dt className={`uppercase text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Commits</dt>
          </motion.div>
          <motion.div className="text-center" variants={item}>
            <dd className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-violet-500 text-transparent bg-clip-text">
              {meetings}
            </dd>
            <dt className={`uppercase text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Meetings</dt>
          </motion.div>
          <motion.div className="text-center" variants={item}>
            <dd className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
              {coffees}
            </dd>
            <dt className={`uppercase text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Coffees</dt>
          </motion.div>
        </motion.dl>
      </motion.section>
    </motion.div>
  );
};

export default PersonalInfo;