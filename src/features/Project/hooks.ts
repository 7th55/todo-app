// Hooks
import { useEffect, useMemo, useState } from 'react';
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

  const PROJECT_CARD_HEIGHT = 75;

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    animate(
      className(projectClassMemo),
      {
        height: `${
          projects.length
            ? PROJECT_CARD_HEIGHT * projects.length + PROJECT_CARD_HEIGHT
            : PROJECT_CARD_HEIGHT
        }px`,
      },
      { duration: TRANSITION_DURATION }
    );
  }, [projects.length]);

  useEffect(() => {
    const className = (className: string) => `.${className}`;

    if (projects.length >= 1) {
      animate(
        className(projectClassMemo),
        {
          height: [
            '0px',
            `${
              projects.length
                ? PROJECT_CARD_HEIGHT * projects.length + PROJECT_CARD_HEIGHT
                : PROJECT_CARD_HEIGHT
            }px`,
          ],
        },
        { duration: TRANSITION_DURATION }
      );
    } else {
      animate(
        className(projectClassMemo),
        { height: [`${PROJECT_CARD_HEIGHT}px`] },
        { duration: TRANSITION_DURATION }
      );
    }
  }, []);

  return scope;
}
