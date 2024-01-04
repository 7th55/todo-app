// Hooks
import { useEffect, useState } from 'react';
import { useProject } from '../model/projectReducer';
import { useProjectAnimation } from 'features/Project/hooks';
// Components
import { motion, useAnimate } from 'framer-motion';
import { variants } from 'shared/animations.config';
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
