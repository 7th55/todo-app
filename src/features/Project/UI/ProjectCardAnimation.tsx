// Comoponents
import { motion, stagger } from 'framer-motion';
// Lib
import { variants } from 'shared/animations.config';

type ProjectCardAnimationProps = {
  children: React.ReactNode;
};

export const ProjectCardAnimation = (props: ProjectCardAnimationProps) => {
  const { children } = props;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
