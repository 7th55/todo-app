import React from 'react';
// Components
import { motion } from 'framer-motion';
// Lib
import { animationTransition } from 'shared/animations.config';

export const PagesAnimation = ({
  children,
  keyProp,
}: {
  children: React.ReactNode;
  keyProp: string;
}) => {
  return (
    <motion.section
      key={keyProp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationTransition}
      style={{ margin: '0 10px 0 10px' }}
    >
      {children}
    </motion.section>
  );
};
