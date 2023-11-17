// Hooks
import { useState } from 'react';
// Components
import { ProjectCard } from 'entites/ProjectCard';
import { Projects } from 'shared/types';
// Styles
import classes from './styles.module.css';

type CreateProjectLayerProps = {
  type: 'HoverAndClick' | 'BigButton';
  projects: Projects;
  createProjectHandler: () => void;
};

export const CreateProjectLayer = (props: CreateProjectLayerProps) => {
  const { type, projects, createProjectHandler } = props;

  const [showCreateProjectLayer, setShowCreateProjectLayer] = useState(false);

  return (
    <>
      {showCreateProjectLayer && (
        <div className={classes.createProject}>
          {projects.length ? (
            <>
              <div>
                {projects.map((project, index) => (
                  <div
                    className={classes.projectCard}
                    key={project.id}
                    style={{ visibility: 'hidden' }}
                  >
                    <ProjectCard
                      key={project.id}
                      index={index}
                      project={project}
                      onClickHandler={() => {}}
                    />
                  </div>
                ))}
              </div>
              <div className={classes.createProjectContainer}>
                <h4>Create Project</h4>
              </div>
            </>
          ) : (
            <div className={classes.messages}>
              <h4>Create Project</h4>
            </div>
          )}
        </div>
      )}
      {type === 'HoverAndClick' && (
        <>
          <div className={classes.hoverHere}>
            <div>
              {projects.map((project, index) => (
                <div
                  className={classes.projectCard}
                  key={project.id}
                  style={{ visibility: 'hidden' }}
                >
                  <ProjectCard
                    key={project.id}
                    index={index}
                    project={project}
                    onClickHandler={() => {}}
                  />
                </div>
              ))}
            </div>
            {!showCreateProjectLayer && (
              <div className={classes.messages}>
                <h4>Hover and click to Create Project</h4>
              </div>
            )}
          </div>

          <div
            onMouseOver={() => {
              setShowCreateProjectLayer(true);
            }}
            onMouseLeave={() => {
              setShowCreateProjectLayer(false);
            }}
            onMouseDown={() => {
              setShowCreateProjectLayer(true);
            }}
            onMouseUp={() => {
              setShowCreateProjectLayer(false);
              createProjectHandler();
            }}
            className={classes.hoverLayer}
          ></div>
          <div style={{ height: '80px', background: undefined }}></div>
        </>
      )}
      {type === 'BigButton' && (
        <>
          <div className={classes.hoverHere}>
            <div className={classes.projectCardContainer}>
              {projects.map((project, index) => (
                <div
                  className={classes.projectCard}
                  key={project.id}
                  style={{ visibility: 'hidden' }}
                >
                  <ProjectCard
                    key={project.id}
                    index={index}
                    project={project}
                    onClickHandler={() => {}}
                  />
                </div>
              ))}
            </div>
            {!showCreateProjectLayer && (
              <div className={classes.messages}>
                <h4>Click to Create Project</h4>
              </div>
            )}
          </div>

          <div
            onClick={() => {
              setShowCreateProjectLayer(true);
              const timer = setInterval(() => {
                setShowCreateProjectLayer(false);
                createProjectHandler();
                clearInterval(timer);
              }, 300);
            }}
            className={classes.hoverLayer}
          ></div>
          <div
            className={classes.hoverArea}
            style={{
              height: '80px',
              background: showCreateProjectLayer ? 'initial' : undefined,
            }}
          ></div>
        </>
      )}
    </>
  );
};
