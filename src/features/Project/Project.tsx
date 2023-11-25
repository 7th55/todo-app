// Hooks
import { useDispatch } from 'react-redux';
import { deleteProject, useProject } from './model/projectReducer';
// Components
import { CreateProjectLayer } from './UI/CreateProjectLayer/CreateProjectLayer';
import { ProjectCard } from 'entites/ProjectCard';
import { Animation } from 'shared/UI/Animation';
// Lib
import { checkWidth } from 'shared/lib';
// Styles
import classes from './styles.module.css';
import { useProjectAnimation } from './hooks';
import { useEffect } from 'react';

type ProjectProps = {
  clearTasksHandler: (projectId: string) => void;
  createProjectHandler: () => void;
};

export const Project = (props: ProjectProps) => {
  const { createProjectHandler, clearTasksHandler } = props;

  const projects = useProject();
  const dispatch = useDispatch();

  const scope = useProjectAnimation({
    projectClass: classes.project,
    projectCardClass: classes.projectCard,
  });

  return (
    <div ref={scope}>
      <div
        className={classes.project}
        style={{ paddingTop: projects.length ? undefined : '5px' }}
      >
        <div className={classes.projectCardContainer}>
          {projects.length
            ? projects.map((project, index) => (
                // <Animation>
                <div
                  key={project.id}
                  className={classes.projectCard}
                  id="projectCard"
                >
                  <ProjectCard
                    key={project.id}
                    index={index}
                    project={project}
                    onClickHandler={() => {
                      dispatch(deleteProject({ ...project }));
                      clearTasksHandler(project.id);
                    }}
                  />
                </div>
                // </Animation>
              ))
            : null}
        </div>
        <CreateProjectLayer
          type={checkWidth() >= 1024 ? 'HoverAndClick' : 'BigButton'}
          projects={projects}
          createProjectHandler={() => createProjectHandler()}
        />
      </div>
    </div>
  );
};
