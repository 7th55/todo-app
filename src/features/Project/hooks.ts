// Hooks
import { useEffect, useMemo } from 'react';
import { stagger, useAnimate } from 'framer-motion';
import { TRANSITION_DURATION, variants } from 'shared/animations.config';
import { useProject } from './model/projectReducer';

const animation = {
  opacity: [variants.hidden.opacity, variants.visible.opacity],
};

export function useProjectAnimation({
  projectClass,
  projectCardClass,
}: {
  projectClass: string;
  projectCardClass: string;
}) {
  const [scope, animate] = useAnimate<any>();

  const projectClassMemo = useMemo(() => projectClass, [projectClass]);
  const projectCardClassMemo = useMemo(
    () => projectCardClass,
    [projectCardClass]
  );

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    const sequence: any = [
      [className(projectClassMemo), animation],
      [
        className(projectCardClassMemo),
        animation,
        {
          delay: stagger(0.1),
        },
      ],
    ];

    animate(sequence, { duration: TRANSITION_DURATION });
  }, [animate, projectClassMemo, projectCardClassMemo]);

  const projects = useProject();

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    if (projects.length >= 1) {
      animate(
        className(projectClassMemo),
        {
          height: ['0%', '100%'],
        },
        { duration: TRANSITION_DURATION }
      );
    }
  }, []);

  return scope;
}
