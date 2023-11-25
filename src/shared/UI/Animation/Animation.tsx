// Hooks
import React from 'react';
// Styles
import { motion } from 'framer-motion';

type AnimationProps = {
  children: React.ReactNode;
};

export const Animation = (props: AnimationProps) => {
  const { children } = props;
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        animate={{ y: [-1000, 0], opacity: [0, 1] }}
        transition={{ ease: 'easeOut', duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
