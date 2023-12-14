// Hooks
import { useProjectAnimation } from 'features/Project/hooks';
// Components
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ProjectAnimations = (props: {
  children: React.ReactNode;
  projectClass: string;
  projectCardClass: string;
}) => {
  const { children, projectClass, projectCardClass } = props;

  const [height, setHeight] = useState('0px');

  useEffect(() => {
    const projectElement = document.getElementById('Project') as HTMLElement;
    const height = projectElement.clientHeight + 10;
    setHeight(`${height}px`);
  }, [height]);

  const scope = useProjectAnimation({
    projectClass,
    projectCardClass,
  });
  return (
    <motion.div
      ref={scope}
      style={{ overflow: 'hidden' }}
      animate={{ height: ['0px', height] }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
