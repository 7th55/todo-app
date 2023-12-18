// Comoponents
import { motion } from 'framer-motion';
// Lib
import { transition } from 'shared/animations.config';

type ProjectCardAnimationProps = {
  children: React.ReactNode;
};

export const ProjectCardAnimation = (props: ProjectCardAnimationProps) => {
  const { children } = props;

  return (
    <motion.div animate={{ opacity: [0, 1] }} transition={transition}>
      {children}
    </motion.div>
  );
};
