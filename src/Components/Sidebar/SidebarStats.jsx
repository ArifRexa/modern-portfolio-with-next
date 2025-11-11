'use client';
import { useState, useEffect } from 'react';

const SidebarStats = ({ theme = 'dark' }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch visitor count
        const visitorResponse = await fetch('/api/visitor-count');
        if (visitorResponse.ok) {
          const visitorData = await visitorResponse.json();
          setVisitorCount(visitorData.count || 0);
        }

        // Fetch resume download count
        const downloadResponse = await fetch('/api/resume-stats');
        if (downloadResponse.ok) {
          const downloadData = await downloadResponse.json();
          setDownloadCount(downloadData.download_count || 0);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check if we've already counted this visit today using localStorage
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    
    fetchStats();

    // Only increment visitor count if not already counted today
    if (lastVisitDate !== today) {
      const incrementVisitorCount = async () => {
        try {
          await fetch('/api/visitor-count', { method: 'POST' });
          // Mark that we've counted today's visit
          localStorage.setItem('lastVisitDate', today);
        } catch (error) {
          console.error('Error incrementing visitor count:', error);
        }
      };

      incrementVisitorCount();
    }
  }, []);

  const borderClass = theme === 'dark' ? 'border-gray-700/50' : 'border-gray-300';
  const bgClass = theme === 'dark' ? 'bg-gray-800/40' : 'bg-gray-200/40';
  const textClass = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';

  if (loading) {
    return (
      <div className={`p-4 border-t ${borderClass}`}>
        <div className="grid grid-cols-2 gap-2">
          <div className={`${bgClass} ${borderClass} p-2 rounded`}>
            <p className={`text-xs ${textClass} uppercase tracking-wide font-semibold text-center`}>CV</p>
            <p className="text-sm font-bold text-blue-300 text-center">Loading...</p>
          </div>
          <div className={`${bgClass} ${borderClass} p-2 rounded`}>
            <p className={`text-xs ${textClass} uppercase tracking-wide font-semibold text-center`}>Visitors</p>
            <p className="text-sm font-bold text-green-300 text-center">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border-t ${borderClass}`}>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${bgClass} ${borderClass} p-2 rounded`}>
          <p className={`text-xs ${textClass} uppercase tracking-wide font-semibold text-center`}>CV Downloads</p>
          <p className="text-sm font-bold text-blue-300 text-center">{downloadCount}</p>
        </div>
        <div className={`${bgClass} ${borderClass} p-2 rounded`}>
          <p className={`text-xs ${textClass} uppercase tracking-wide font-semibold text-center`}>Visitors</p>
          <p className="text-sm font-bold text-green-300 text-center">{visitorCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarStats;