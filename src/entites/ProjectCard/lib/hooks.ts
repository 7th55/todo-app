import { AnimationScope, useAnimate } from 'framer-motion';

export const useAnimateProjectCard = (
  projectId: string
): [AnimationScope<any>, (deleteHandler: () => void) => void] => {
  const [scope, animate] = useAnimate();

  const deleteCard = (onClickHandler: () => void) => {
    const projectCard = document.getElementById(projectId) as HTMLElement;
    console.log(projectCard);
    const animation = animate(
      projectCard,
      { opacity: [1, 0] },
      { duration: 0.5 }
    );

    animation.then(() => onClickHandler());
  };

  return [scope, deleteCard];
};
