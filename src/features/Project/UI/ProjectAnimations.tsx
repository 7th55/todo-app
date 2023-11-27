import { useProjectAnimation } from 'features/Project/hooks';

export const ProjectAnimations = (props: {
  children: React.ReactNode;
  projectClass: string;
  projectCardClass: string;
}) => {
  const { children, projectClass, projectCardClass } = props;

  const scope = useProjectAnimation({
    projectClass,
    projectCardClass,
  });
  return <div ref={scope}>{children}</div>;
};
