// Comoponents
import { motion } from 'framer-motion';
// Lib
import { animationStyles, animationTransition } from 'shared/animations.config';

type ProjectCardAnimationProps = {
  children: React.ReactNode;
};

export const ProjectCardAnimation = (props: ProjectCardAnimationProps) => {
  const { children } = props;

  return (
    <motion.div
      animate={{ opacity: animationStyles.opacity }}
      transition={animationTransition}
    >
      {children}
    </motion.div>
  );
};
