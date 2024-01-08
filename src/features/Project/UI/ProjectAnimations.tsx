// Hooks
import { useProjectAnimation } from 'features/Project/hooks';
// Components
import { motion } from 'framer-motion';
// Lib

export const ProjectAnimations = (props: {
  children: React.ReactNode;
  projectClass: string;
  projectCardClass: string;
}) => {
  const { children, projectClass, projectCardClass } = props;

  const scope = useProjectAnimation({
    projectClass,
    projectCardClass,
  });

  return (
    <motion.div ref={scope} layout>
      {children}
    </motion.div>
  );
};
