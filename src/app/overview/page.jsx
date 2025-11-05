import PersonalInfo from '@/Components/PersonalInfo/PersonalInfo';
import CurrentActivity from '@/Components/CurrentActivity/CurrentActivity';
import TerminalWindow from '@/Components/TerminalWindow/TerminalWindow';
import RecentProjects from '@/Components/RecentProjects/RecentProjects';
import QuickInsights from '@/Components/QuickInsights/QuickInsights';
import LatestBlogPosts from '@/Components/LatestBlogPosts/LatestBlogPosts';
import LearningAndLanguages from '@/Components/LearningAndLanguages/LearningAndLanguages';
import Testimonials from '@/Components/Testimonials/Testimonials';
import QuickActions from '@/Components/QuickActions/QuickActions';
import FunFactsAndInterests from '@/Components/FunFactsAndInterests/FunFactsAndInterests';
import GetInTouch from '@/Components/GetInTouch/GetInTouch';

const Overview = () => {
  return (
    <>
      <PersonalInfo />
      <CurrentActivity />
      <TerminalWindow />
      <RecentProjects />
      <QuickInsights />
      <LatestBlogPosts />
      <LearningAndLanguages />
      <Testimonials />
      <QuickActions />
      <FunFactsAndInterests />
      <GetInTouch />
    </>
  );
};

export default Overview;