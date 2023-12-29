// Hooks
import { useEffect, useMemo } from 'react';
import { useAnimate } from 'framer-motion';

const animationStyles = {
  opacity: [0, 1],
};

const animationTransition = {
  duration: 1,
};

export function useProjectAnimation({ projectClass, projectCardClass }: any) {
  const [scope, animate] = useAnimate<any>();

  const projectClassMemo = useMemo(() => projectClass, [projectClass]);
  const projectCardClassMemo = useMemo(
    () => projectCardClass,
    [projectCardClass]
  );

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    const sequence: any = [
      [className(projectClassMemo), animationStyles, animationTransition],
      [className(projectCardClassMemo), animationStyles, animationTransition],
    ];

    animate(sequence);
  }, [animate, projectClassMemo, projectCardClassMemo]);

  return scope;
}
