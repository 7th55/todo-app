// Hooks
import { useDispatch } from 'react-redux';
// Components
import { ProjectForm } from 'entites/ProjectForm';
import { Project as ProjectFeature } from 'features/Project';
import { UpperLayer } from 'shared/UI/UpperLayer';
// Lib
import { clearTasks } from 'features/Task/model/taskReducer';
import { createId } from 'shared/lib';
import { createProject } from 'features/Project/model/projectReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

//
export const Projects = () => {
  const dispatch = useDispatch();

  return (
    <section style={{ margin: '0 10px 0 10px' }}>
      <h1>Projects</h1>
      <UpperLayer
        content={
          <ProjectForm
            createProjectHandler={(project) =>
              dispatch(createProject({ id: createId(), ...project }))
            }
            upperLayerHandler={() =>
              dispatch(isOpenUpperLayer({ isOpen: false }))
            }
          />
        }
      />
      <ProjectFeature
        createProjectHandler={() => {
          dispatch(isOpenUpperLayer({ isOpen: true }));
        }}
        clearTasksHandler={(projectId) =>
          dispatch(
            clearTasks({
              projectId,
            })
          )
        }
      />
    </section>
  );
};
