// Hooks
import { useState } from 'react';
// Components
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'shared/UI/Button';
// Types
import { Project } from 'shared/types';
// Styles
import classes from './styles.module.css';

type ProjectCardProps = {
  index: number;
  project: Project;
  onClickHandler: () => void;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { project, index, onClickHandler } = props;

  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={classes.projectCard}
      style={{
        backgroundColor: active ? 'var(--palette_activeBg)' : undefined,
      }}
    >
      <div
        className={classes.clickableArea}
        onTouchStart={(e) => {
          e.preventDefault();
          setActive(true);
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          setActive(false);
          navigate(`/${project.id}/tasks`);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setActive(true);
        }}
        onMouseLeave={() => {
          setActive(false);
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          setActive(false);
          navigate(`/${project.id}/tasks`);
        }}
        onClick={() => navigate(`/${project.id}/tasks`)}
      >
        <p
          className={classes.projectInfo}
          style={{
            color: active ? 'var(--palette_activeTextProductCard)' : undefined,
          }}
        >
          {index + 1}. Id: {project.id} Name: {project.name}
        </p>
      </div>
      <Button
        variant="outline"
        style={{ borderColor: 'red', color: 'red' }}
        onClickHandler={() => onClickHandler()}
      >
        Delete
      </Button>
    </div>
  );
};
