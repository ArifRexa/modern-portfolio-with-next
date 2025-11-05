'use client';
import { motion } from 'framer-motion';
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Overview = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <PersonalInfo />
      </motion.div>
      <motion.div variants={item}>
        <CurrentActivity />
      </motion.div>
      <motion.div variants={item}>
        <TerminalWindow />
      </motion.div>
      <motion.div variants={item}>
        <RecentProjects />
      </motion.div>
      <motion.div variants={item}>
        <QuickInsights />
      </motion.div>
      <motion.div variants={item}>
        <LatestBlogPosts />
      </motion.div>
      <motion.div variants={item}>
        <LearningAndLanguages />
      </motion.div>
      <motion.div variants={item}>
        <Testimonials />
      </motion.div>
      <motion.div variants={item}>
        <QuickActions />
      </motion.div>
      <motion.div variants={item}>
        <FunFactsAndInterests />
      </motion.div>
      <motion.div variants={item}>
        <GetInTouch />
      </motion.div>
    </motion.div>
  );
};

export default Overview;