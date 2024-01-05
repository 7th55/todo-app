// Comoponents
import { motion, stagger } from 'framer-motion';
// Lib
import { TRANSITION_DURATION, variants } from 'shared/animations.config';

type ProjectCardAnimationProps = {
  children: React.ReactNode;
};

const specialExitAnimation = {
  opacity: [1, 0],
  height: ['100%', '0%'],
  transition: {
    duration: TRANSITION_DURATION,
  },
};

export const ProjectCardAnimation = (props: ProjectCardAnimationProps) => {
  const { children } = props;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={specialExitAnimation}
      variants={variants}
      layout
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};
