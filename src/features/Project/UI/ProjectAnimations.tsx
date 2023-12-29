// Hooks
import { useEffect, useState } from 'react';
import { useProject } from '../model/projectReducer';
import { useProjectAnimation } from 'features/Project/hooks';
// Components
import { motion } from 'framer-motion';
import { variants } from 'shared/animations.config';
// Lib

export const ProjectAnimations = (props: {
  children: React.ReactNode;
  projectClass: string;
  projectCardClass: string;
}) => {
  const { children, projectClass, projectCardClass } = props;

  const [height, setHeight] = useState('0px');

  const projects = useProject();

  useEffect(() => {
    const projectElement = document.getElementById('Project') as HTMLElement;
    const height = projectElement.clientHeight + 10;
    setHeight(`${height}px`);
  }, [height, projects]);

  const scope = useProjectAnimation({
    projectClass,
    projectCardClass,
  });
  return (
    <motion.div
      ref={scope}
      style={{ overflow: 'hidden' }}
      initial={{ height: '0px' }}
      animate={{ height: height }}
      transition={variants.visible.transition}
      layout
    >
      {children}
    </motion.div>
  );
};
