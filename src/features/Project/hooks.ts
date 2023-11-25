import { useEffect } from 'react';
import { useAnimate } from 'framer-motion';

export function useProjectAnimation({ projectClass, projectCardClass }: any) {
  const [scope, animate] = useAnimate<any>();

  useEffect(() => {
    const project = document.getElementsByClassName(projectClass);
    const projectCard = document.getElementsByClassName(projectCardClass);

    const sequence: any = [
      [project, { opacity: [0, 1] }, { duration: 0.5 }],
      [projectCard, { opacity: [0, 1] }, { duration: 0.5 }],
    ];

    animate(sequence);
  });

  console.log(scope);

  return scope;
}
