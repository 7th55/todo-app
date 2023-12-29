// Components
import { motion } from 'framer-motion';
// Lib
import { variants } from 'shared/animations.config';

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
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      style={{ margin: '0 10px 0 10px' }}
    >
      {children}
    </motion.section>
  );
};
