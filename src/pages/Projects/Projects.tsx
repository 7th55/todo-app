// Hooks
import { useDispatch } from 'react-redux';
// Components
import { motion } from 'framer-motion';
import { ProjectForm } from 'entites/ProjectForm';
import { Project as ProjectFeature } from 'features/Project';
import { UpperLayer } from 'shared/UI/UpperLayer';
// Lib
import { clearTasks } from 'features/Task/model/taskReducer';
import { createId } from 'shared/lib';
import { createProject } from 'features/Project/model/projectReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
import { animationTransition } from 'shared/animations.config';

export const Projects = () => {
  const dispatch = useDispatch();

  return (
    <motion.section
      key="projectsPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={animationTransition}
      style={{ margin: '0 10px 0 10px' }}
    >
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
    </motion.section>
  );
};
