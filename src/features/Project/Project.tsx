// Hooks
import { useDispatch } from 'react-redux';
import { deleteProject, useProject } from './model/projectReducer';
// Components
import { CreateProjectLayer } from './UI/CreateProjectLayer/CreateProjectLayer';
import { ProjectCard } from 'entites/ProjectCard';
// Lib
import { checkWidth } from 'shared/lib';
// Styles
import classes from './styles.module.css';

type ProjectProps = {
  clearTasksHandler: (projectId: string) => void;
  createProjectHandler: () => void;
};

export const Project = (props: ProjectProps) => {
  const { createProjectHandler, clearTasksHandler } = props;

  const projects = useProject();
  const dispatch = useDispatch();

  return (
    <div
      className={classes.project}
      style={{ paddingTop: projects.length ? undefined : '5px' }}
    >
      <div className={classes.projectCardContainer}>
        {projects.length
          ? projects.map((project, index) => (
              <div key={project.id} className={classes.projectCard}>
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
            ))
          : null}
      </div>
      <CreateProjectLayer
        type={checkWidth() >= 1024 ? 'HoverAndClick' : 'BigButton'}
        projects={projects}
        createProjectHandler={() => createProjectHandler()}
      />
    </div>
  );
};
