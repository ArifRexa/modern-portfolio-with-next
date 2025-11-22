// app/components/AwardsCertifications.jsx
'use client';
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const AwardsCertifications = () => {
  const { theme } = useTheme();
  const awardsData = [
    {
      title: "HCI Prototyping Contest – 2nd Place",
      issuer: "Central University of Science and Technology",
      year: "2017",
      event: "Human-Computer Interaction",
      description:
        "Awarded 2nd place in the HCI Prototyping Challenge for designing and presenting an innovative Smart Campus concept. Developed a user-centered prototype that integrated technology to enhance campus experiences, focusing on usability, accessibility, and interaction design principles. The project involved thorough research, ideation, and iterative prototyping, showcasing strong skills in human-computer interaction, creative problem-solving, and effective presentation. This recognition highlights the ability to translate complex ideas into practical, user-friendly solutions."
    },
    {
      title: "CUST Intra-University Programming Contest - 2nd Place",
      issuer: "Central University of Science and Technology",
      year: "2016",
      event: "Competitive Programming",
      description:
        "Secured 2nd place in a highly competitive, university-wide programming contest by efficiently solving a series of complex algorithmic and computational problems under strict time constraints. The competition tested proficiency in data structures, algorithms, problem-solving strategies, and logical reasoning. Successfully tackling diverse challenges such as graph traversal, dynamic programming, and optimization problems demonstrated strong analytical thinking, coding efficiency, and adaptability under pressure, earning recognition among top peers and contributing to a track record of excellence in competitive programming."
    },
    {
      title: "ACM National Collegiate Programming Contest (NCPC) – Participant",
      issuer: "International Collegiate Programming Contest",
      year: "2016",
      event: "Competitive Programming",
      description:
        "Selected to represent the American International University-Bangladesh (AIUB) in the national-level ACM National Collegiate Programming Contest (NCPC) 2017, participating in high-pressure, real-time, team-based algorithmic problem-solving. Collaborated closely with teammates to tackle complex computational challenges involving data structures, algorithms, and optimization problems, under strict time constraints. This experience honed advanced problem-solving skills, teamwork, strategic thinking, and the ability to perform effectively in competitive programming at a national scale."
    },
    {
      title: "ACM National Collegiate Programming Contest (NCPC) – Participant",
      issuer: "International Collegiate Programming Contest",
      year: "2016",
      event: "Competitive Programming",
      description:
        "Participated in the ACM National Collegiate Programming Contest (NCPC) 2016, representing the American International University-Bangladesh (AIUB) in one of the country's most prestigious collegiate programming competitions. Engaged in team-based, real-time problem-solving challenges that tested advanced algorithms, data structures, and computational thinking under strict time constraints. This experience enhanced technical proficiency, teamwork, and strategic problem-solving skills, while providing exposure to high-level competitive programming at a national scale."
    },
    {
      title: "CUST Intra-University Programming Contest – 3rd Place",
      issuer: "Central University of Science and Technology",
      year: "2020",
      event: "Competitive Programming",
      description:
        "Achieved 3rd place in the annual university-level coding competition, which tested participants on advanced problem-solving skills and mastery of data structures and algorithms. Competed against a large pool of talented peers to solve challenging computational problems under strict time constraints, including tasks related to arrays, trees, graphs, and dynamic programming. This accomplishment highlights strong analytical thinking, efficient coding practices, and the ability to perform under pressure, reflecting a solid foundation in algorithmic problem-solving and technical proficiency."
    }
  ];

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className={`relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
          Awards & Certifications
        </h1>
        <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Recognition for excellence in technology & innovation
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
        {awardsData.map((award, index) => (
          <div
            key={index}
            className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} backdrop-blur-md rounded-xl border ${theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300/50'} p-4 lg:p-6 shadow-sm h-full`}
            style={{ opacity: 1, transform: 'none' }}
          >
            <div className="flex-1">
              <h3 className={`text-xl lg:text-2xl font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{award.title}</h3>
              <div className="flex flex-col mb-2">
                <div className={`flex items-center text-base lg:text-lg ${theme === 'dark' ? 'text-amber-200' : 'text-amber-600'}`}>
                  {award.issuer}
                </div>
              </div>
              <p className={`text-sm lg:text-base mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{award.description}</p>
              <div className="flex justify-between items-center flex-wrap gap-1 mt-auto">
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex space-x-2">
                    <div className={`px-2.5 py-0.5 w-fit flex items-center text-xs lg:text-sm font-bold border backdrop-blur-sm rounded-full shadow-sm ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40' : 'bg-indigo-500/30 text-indigo-700 border-indigo-500/40'}`}>
                      {award.year}
                    </div>
                    <div className={`px-2.5 py-0.5 w-fit flex items-center text-xs lg:text-sm font-bold border backdrop-blur-sm rounded-full shadow-sm ${theme === 'dark' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' : 'bg-purple-500/30 text-purple-700 border-purple-500/40'}`}>
                      {award.event}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsCertifications;