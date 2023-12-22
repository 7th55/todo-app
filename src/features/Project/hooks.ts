// Hooks
import { useEffect, useMemo } from 'react';
import { useAnimate } from 'framer-motion';
// Lib
import { animationStyles, animationTransition } from 'shared/animations.config';

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
      [
        className(projectClassMemo),
        { opacity: animationStyles.opacity },
        animationTransition,
      ],
      [
        className(projectCardClassMemo),
        { opacity: animationStyles.opacity },
        animationTransition,
      ],
    ];

    animate(sequence);
  }, [animate, projectClassMemo, projectCardClassMemo]);

  return scope;
}
