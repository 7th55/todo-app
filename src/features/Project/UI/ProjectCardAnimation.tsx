// Comoponents
import { motion } from 'framer-motion';

type ProjectCardAnimationProps = {
  children: React.ReactNode;
};

export const ProjectCardAnimation = (props: ProjectCardAnimationProps) => {
  const { children } = props;

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div animate={{ opacity: [0, 1] }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </div>
  );
};
