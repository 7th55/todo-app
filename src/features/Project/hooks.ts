// Hooks
import { useEffect, useMemo } from 'react';
import { useAnimate } from 'framer-motion';
import { TRANSITION_DURATION, variants } from 'shared/animations.config';
import { useProject } from './model/projectReducer';

const animation = {
  opacity: [variants.hidden.opacity, variants.visible.opacity],
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
      [className(projectClassMemo), animation],
      [className(projectCardClassMemo), animation],
    ];

    animate(sequence, { duration: TRANSITION_DURATION });
  }, [animate, projectClassMemo, projectCardClassMemo]);

  const pj = useProject();

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    animate(
      className(projectClassMemo),
      { height: `${pj.length ? 72 * pj.length + 87 : 87}px` },
      { duration: TRANSITION_DURATION }
    );
  }, [pj]);

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    animate(
      className(projectClassMemo),
      { height: ['0px', `${pj.length ? 72 * pj.length + 87 : 87}px`] },
      { duration: TRANSITION_DURATION }
    );
  }, []);

  return scope;
}
