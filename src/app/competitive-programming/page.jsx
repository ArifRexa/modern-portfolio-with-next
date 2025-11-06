// app/components/CompetitiveProgramming.jsx
'use client';
import React from 'react';

const StatCard = ({ title, value, color }) => (
  <div className="relative text-center rounded-xl border backdrop-blur-md px-2 py-4 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    <div className="text-base font-bold text-gray-300">{title}</div>
  </div>
);

const SubmissionItem = ({ title, details, verdict }) => (
  <div className="relative rounded-xl border backdrop-blur-md px-2 py-4 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
    <div className="px-2">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold text-md text-gray-300">{title}</h6>
          <div className="text-sm text-gray-400">{details}</div>
        </div>
        <div
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ml-4 ${
            verdict === 'Accepted' || verdict === 'OK'
              ? 'bg-green-500/20 text-green-400 border-green-500/50'
              : 'bg-red-500/20 text-red-400 border-red-500/50'
          }`}
        >
          <span className="hidden sm:inline">
            {verdict === 'Accepted' || verdict === 'OK' ? 'Accepted' : verdict}
          </span>
          <span className="inline sm:hidden">
            {verdict === 'Accepted' || verdict === 'OK' ? 'AC' : verdict.substring(0, 2)}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ContestItem = ({ title, details, rank }) => (
  <div className="relative rounded-xl border backdrop-blur-md px-2 py-4 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
    <div className="px-2">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold text-md text-gray-300">{title}</h6>
          <div className="text-sm text-gray-400">{details}</div>
        </div>
        <div className="text-sm rounded-lg ml-8 px-2 py-1 whitespace-nowrap text-gray-400">
          Rank: {rank}
        </div>
      </div>
    </div>
  </div>
);

const CompetitiveProgramming = () => {
  const platformData = {
    leetcode: {
      total_solved: 91,
      easy_solved: 68,
      medium_solved: 22,
      hard_solved: 1,
      recent_submissions: [
        {
          title: "Single Element in a Sorted Array",
          difficulty: "Medium",
          runtime: "4 ms",
          memory: "28.5 MB",
          timestamp: "2025-11-01",
          status: "Accepted"
        },
        {
          title: "Longest Common Prefix",
          difficulty: "Easy",
          runtime: "4 ms",
          memory: "17.7 MB",
          timestamp: "2025-11-01",
          status: "Accepted"
        },
        {
          title: "Reverse Prefix of Word",
          difficulty: "Easy",
          runtime: "0 ms",
          memory: "17.6 MB",
          timestamp: "2025-10-12",
          status: "Accepted"
        }
      ],
      recent_contests: [
        {
          title: "Weekly Contest 469",
          problems_solved: 3,
          total_problems: 4,
          rank: 614,
          timestamp: "1 month ago"
        }
      ]
    },
    codeforces: {
      total_solved: 236,
      rating: 1011,
      rank: "newbie",
      recent_submissions: [
        {
          problem_name: "2137C - Maximum Even Sum",
          verdict: "OK",
          lang: "Python 3",
          time: "124 ms",
          memory: "102.4 KB",
          timestamp: "1 month ago"
        },
        {
          problem_name: "2137C - Maximum Even Sum",
          verdict: "WRONG_ANSWER",
          lang: "Python 3",
          time: "62 ms",
          memory: "0 KB",
          timestamp: "1 month ago"
        },
        {
          problem_name: "2137B - Fun Permutation",
          verdict: "OK",
          lang: "Python 3",
          time: "312 ms",
          memory: "31641.6 KB",
          timestamp: "1 month ago"
        }
      ],
      recent_contests: [
        {
          contest_name: "Codeforces Round 1047 (Div. 3)",
          rank: 9021,
          timestamp: "1 month ago"
        },
        {
          contest_name: "Order Capital Round 1 (Codeforces Round 1038, Div. 1 + Div. 2)",
          rank: 8692,
          timestamp: "3 months ago"
        }
      ]
    },
    uva: {
      total_solved: 215,
      submission_count: 442,
      ac_rate: "48%",
      recent_submissions: [
        {
          problem_name: "Vito's Family (#982)",
          verdict: "Accepted",
          timestamp: "1 month ago"
        },
        {
          problem_name: "Laser Sculpture (#2730)",
          verdict: "Accepted",
          timestamp: "5 years ago"
        }
      ]
    },
    others: {
      atcoder: { solved: 0, rating: 0 },
      hackerrank: { solved: 0, badges: 0 }
    }
  };

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="text-center p-2 sm:px-8 lg:px-12">
        <h1 className="relative inline-block text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-gray-200">
          Competitive Programming
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
          Analytics, Achievements &amp; Milestones in Coding Challenges
        </p>
        <span className="block h-1 w-16 mx-auto mt-3 rounded-full bg-blue-400"></span>
      </div>

      {/* LeetCode */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg fill="#ffffff" width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-200">LeetCode Progress</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatCard title="Easy" value={platformData.leetcode.easy_solved} color="text-green-400" />
          <StatCard title="Medium" value={platformData.leetcode.medium_solved} color="text-yellow-400" />
          <StatCard title="Hard" value={platformData.leetcode.hard_solved} color="text-red-400" />
        </div>

        <div className="mb-4">
          <h6 className="font-semibold mb-2 text-lg text-gray-200">Recent Submissions</h6>
          <div className="space-y-2">
            {platformData.leetcode.recent_submissions.map((sub, i) => (
              <SubmissionItem
                key={i}
                title={sub.title}
                details={`${sub.difficulty} • ${sub.timestamp} • Python3 • ${sub.runtime} • ${sub.memory}`}
                verdict={sub.status}
              />
            ))}
          </div>
        </div>

        <div>
          <h6 className="font-semibold mb-2 text-lg text-gray-200">Recent Contests</h6>
          <div className="space-y-1">
            {platformData.leetcode.recent_contests.map((contest, i) => (
              <ContestItem
                key={i}
                title={contest.title}
                details={`${contest.problems_solved} Solved out of ${contest.total_problems} • ${contest.timestamp}`}
                rank={contest.rank}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Codeforces */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
              <path d="M22.5,10.5c0.8,0,1.5,0.7,1.5,1.5v7.5c0,0.8-0.7,1.5-1.5,1.5h-3c-0.8,0-1.5-0.7-1.5-1.5V12c0-0.8,0.7-1.5,1.5-1.5H22.5z" />
              <path d="M13.5,3C14.3,3,15,3.7,15,4.5v15c0,0.8-0.7,1.5-1.5,1.5h-3C9.7,21,9,20.3,9,19.5v-15C9,3.7,9.7,3,10.5,3H13.5z" />
              <path d="M4.5,7.5C5.3,7.5,6,8.2,6,9v10.5C6,20.3,5.3,21,4.5,21h-3C0.7,21,0,20.3,0,19.5V9c0-0.8,0.7-1.5,1.5-1.5H4.5z" />
            </svg>
          </div>
          <h4 className="text-xl font-semibold text-gray-200">Codeforces Progress</h4>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatCard title="Problems Solved" value={platformData.codeforces.total_solved} color="text-yellow-400" />
          <StatCard title="Rating" value={platformData.codeforces.rating} color="text-blue-400" />
          <StatCard title="Rank" value={platformData.codeforces.rank} color="text-red-400" />
        </div>

        <div className="mb-4">
          <h6 className="font-semibold mb-2 text-lg text-gray-200">Recent Submissions</h6>
          <div className="space-y-2">
            {platformData.codeforces.recent_submissions.map((sub, i) => (
              <SubmissionItem
                key={i}
                title={sub.problem_name}
                details={`${sub.timestamp} • ${sub.lang} • ${sub.time} • ${sub.memory}`}
                verdict={sub.verdict}
              />
            ))}
          </div>
        </div>

        <div>
          <h6 className="font-semibold mb-2 text-lg text-gray-200">Recent Contests</h6>
          <div className="space-y-2">
            {platformData.codeforces.recent_contests.map((contest, i) => (
              <ContestItem
                key={i}
                title={contest.contest_name}
                details={contest.timestamp}
                rank={contest.rank}
              />
            ))}
          </div>
        </div>
      </div>

      {/* UVa Online Judge */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 bg-red-500 rounded flex items-center justify-center">
            <span className="text-gray-200 font-bold text-sm">UVa</span>
          </div>
          <h4 className="text-xl font-semibold text-gray-200">UVa Progress</h4>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <StatCard title="Problems Solved" value={platformData.uva.total_solved} color="text-yellow-400" />
          <StatCard title="Submissions" value={platformData.uva.submission_count} color="text-blue-400" />
          <StatCard title="AC Rate" value={platformData.uva.ac_rate} color="text-green-400" />
        </div>

        <div>
          <h6 className="font-semibold mb-2 text-lg text-gray-200">Recent Submissions</h6>
          <div className="space-y-2">
            {platformData.uva.recent_submissions.map((sub, i) => (
              <SubmissionItem
                key={i}
                title={sub.problem_name}
                details={sub.timestamp}
                verdict={sub.verdict}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 text-sm text-right">
          <a
            href="https://uhunt.onlinejudge.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-end gap-1 text-blue-400 hover:text-blue-300"
          >
            Explore more on uHunt
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Other Platforms */}
      <div className="bg-gray-900 backdrop-blur-md rounded-xl border border-gray-700/50 p-4 lg:p-6 shadow-sm">
        <h3 className="text-2xl font-bold tracking-tight text-gray-200 mb-4">Other Platforms</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative text-center rounded-xl border backdrop-blur-md px-2 py-4 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
            <div className="text-2xl font-bold text-teal-500">{platformData.others.atcoder.solved}</div>
            <div className="text-sm font-semibold text-teal-300">AtCoder Problems</div>
            <div className="text-sm font-semibold text-gray-400">Rating: {platformData.others.atcoder.rating}</div>
          </div>
          <div className="relative text-center rounded-xl border backdrop-blur-md px-2 py-4 shadow-sm bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50">
            <div className="text-2xl font-bold text-teal-500">{platformData.others.hackerrank.solved}</div>
            <div className="text-sm font-semibold text-teal-300">HackerRank Problems</div>
            <div className="text-sm font-semibold text-gray-400">Badges: {platformData.others.hackerrank.badges}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgramming;