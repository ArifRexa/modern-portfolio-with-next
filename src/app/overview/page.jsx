import CurrentActivity from "@/Components/Overview/CurrentActivity";
import FunFactsAndInterests from "@/Components/Overview/FunFactsAndInterests";
import GetInTouch from "@/Components/Overview/GetInTouch";
import LatestBlogPosts from "@/Components/Overview/LatestBlogPosts";
import LearningAndLanguages from "@/Components/Overview/LearningAndLanguages";
import PersonalInfo from "@/Components/Overview/PersonalInfo";
import QuickActions from "@/Components/Overview/QuickActions";
import QuickInsights from "@/Components/Overview/QuickInsights";
import RecentProjects from "@/Components/Overview/RecentProjects";
import TerminalWindow from "@/Components/Overview/TerminalWindow";
import Testimonials from "@/Components/Overview/Testimonials";


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