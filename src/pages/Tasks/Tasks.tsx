// Hooks
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTask } from 'features/Task/model/taskReducer';
import { useState } from 'react';
import { useProject } from 'features/Project/model/projectReducer';
import { useFilter } from 'features/Filter/model/filterReducer';
import { useUpperLayers } from './hooks';
// Components
import { TaskProvider } from 'features/Task/TaskProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from 'shared/UI/Button';
import { Filter } from 'features/Filter';
import { PagesAnimation } from 'shared/UI/PagesAnimation';
import { ModalViews } from './UI/ModalViews';
// Styles
import classes from './styles.module.css';
// Types
import { Project, Projects, Task } from 'shared/types';
import { TasksProps } from 'features/Task/Task';
// Lib
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
import { variants } from 'shared/animations.config';
import { TasksLists } from './UI/TasksLists';

export const Tasks = () => {
  // Modal Views
  const [
    upperLayer,
    {
      createUpperLayerHandler,
      createSubTaskUpperLayerHandler,
      editUpperLayerHandler,
      addCommentUpperLayerHandler,
      replyCommentUpperLayerHandler,
      nullUpperLayerHandler,
    },
  ] = useUpperLayers();

  const [editTaskData, setEditTaskData] = useState<{
    taskState: Task;
  } | null>(null);

  const [addComment, setAddComment] = useState<{
    taskId: string;
    commentAuthorId: string | null;
  } | null>(null);

  const { projectId } = useParams();

  const filterState = useFilter();
  const tasksState = useTask();
  const tasks = tasksState.find(
    (tasks) => tasks.projectId === projectId
  )?.projectTasks;

  const projects = useProject() as Projects;
  const dispatch = useDispatch();

  const project = projects.find((proj) => proj.id === projectId) as Project;

  // DnD
  const [taskStatus, setTaskStatus] = useState<Task['status'] | null>(null);

  // Filter
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  // Task Props
  const taskProps: TasksProps = {
    status: taskStatus as Task['status'],
    filter: {
      filterState,
      isOpen: filterIsOpen,
    },
  };
  const taskProviderProps = {
    project,
    taskStatus,
    createSubTaskUpperLayerHandler,
    editUpperLayerHandler,
    addCommentUpperLayerHandler,
    replyCommentUpperLayerHandler,
    setAddComment,
    setEditTaskData,
  };

  const columns = () =>
    ['Queue', 'Development', 'Done'].map((status) => (
      <TasksLists
        key={status}
        taskProps={taskProps}
        status={status as Task['status']}
        onDropHandler={(status) => setTaskStatus(status)}
      />
    ));

  return (
    <PagesAnimation keyProp="tasksPage">
      <TaskProvider {...taskProviderProps}>
        <section style={{ margin: '0 10px 0 10px' }}>
          <h1>Tasks Page</h1>
          <nav>
            <Link to="/">Back To Projects</Link>
          </nav>
          <div className={classes.projectInfo}>
            <h3>Project Name: {project.name}</h3>
            <h3>Project Id: {project.id}</h3>
          </div>
          <div className={classes.tasksButtons}>
            <Button
              onClickHandler={() => {
                createUpperLayerHandler();
                dispatch(isOpenUpperLayer({ isOpen: true }));
              }}
            >
              Create Task
            </Button>
            {tasks?.length ? (
              <Filter
                tasks={tasks}
                tasksState={tasksState}
                open={() => setFilterIsOpen(!filterIsOpen)}
              />
            ) : null}
          </div>
          <AnimatePresence mode="wait">
            {tasks?.length ? (
              <motion.div
                key="TasksColumn"
                initial="hidden"
                animate="visible"
                exit={'hidden'}
                variants={variants}
                className={classes.tasksColumns}
              >
                {columns()}
              </motion.div>
            ) : (
              <motion.h3
                key="TasksHeader"
                initial="hidden"
                animate="visible"
                exit={'hidden'}
                variants={variants}
              >
                Create Task Pls
              </motion.h3>
            )}
          </AnimatePresence>
          <ModalViews
            upperLayer={upperLayer}
            projectId={project.id}
            taskState={editTaskData?.taskState as Task}
            addComment={
              addComment as {
                taskId: string;
                commentAuthorId: string;
              }
            }
            closeHandler={() => nullUpperLayerHandler()}
          />
        </section>
      </TaskProvider>
    </PagesAnimation>
  );
};
