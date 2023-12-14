// Hooks
import { useDispatch } from 'react-redux';
import { deleteProject, useProject } from './model/projectReducer';
// Components
import { ProjectCard } from 'entites/ProjectCard';
import { CreateProjectLayer } from './UI/CreateProjectLayer/CreateProjectLayer';
import { ProjectAnimations } from './UI/ProjectAnimations';
import { ProjectCardAnimation } from './UI/ProjectCardAnimation';
// Lib
import { checkWidth } from 'shared/lib';
// Styles
import classes from './styles.module.css';

type ProjectProps = {
  clearTasksHandler: (projectId: string) => void;
  createProjectHandler: () => void;
};

const Space = () => (
  <span
    onClick={(e) => e.stopPropagation()}
    style={{ height: '5px', zIndex: 100 }}
  />
);

export const Project = (props: ProjectProps) => {
  const { createProjectHandler, clearTasksHandler } = props;

  const projects = useProject();
  const dispatch = useDispatch();

  return (
    <ProjectAnimations
      projectClass={classes.project}
      projectCardClass={classes.projectCard}
    >
      <div
        id="Project"
        className={classes.project}
        style={{ paddingTop: projects.length ? undefined : '5px' }}
      >
        <Space />
        <div className={classes.projectCardContainer}>
          {projects.length
            ? projects.map((project, index) => (
                <ProjectCardAnimation key={project.id}>
                  <div className={classes.projectCard} id="projectCard">
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
                </ProjectCardAnimation>
              ))
            : null}
        </div>
        <CreateProjectLayer
          type={checkWidth() >= 1024 ? 'HoverAndClick' : 'BigButton'}
          projects={projects}
          createProjectHandler={() => createProjectHandler()}
        />
      </div>
    </ProjectAnimations>
  );
};
