// Hooks
import { useEffect, useMemo } from 'react';
import { useAnimate } from 'framer-motion';

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
      [className(projectClassMemo), { opacity: [0, 1] }, { duration: 0.5 }],
      [className(projectCardClassMemo), { opacity: [0, 1] }, { duration: 0.5 }],
    ];

    animate(sequence);
  }, [animate, projectClassMemo, projectCardClassMemo]);

  return scope;
}
