// Hooks
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteSubTask,
  editTask,
  useTask,
} from 'features/Task/model/taskReducer';
import { useState } from 'react';
import { useProject } from 'features/Project/model/projectReducer';
import { useFilter } from 'features/Filter/model/filterReducer';
import { useUpperLayers } from './hooks';
// Components
import { TaskProvider } from 'features/Task/TaskProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from 'shared/UI/Button';
import { Task as TasksFeature } from 'features/Task';
import { Filter } from 'features/Filter';
import { PagesAnimation } from 'shared/UI/PagesAnimation';
// Styles
import classes from './styles.module.css';
// Types
import { Project, Projects, Task } from 'shared/types';
import { TasksProps } from 'features/Task/Task';
// Lib
import { deleteTask } from 'features/Task/model/taskReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
import { variants } from 'shared/animations.config';
import { ModalViews } from './UI/ModalViews';

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

  // Checks
  const editTaskStatusValuesCheck = projectId && taskStatus;
  const timeTaskHandlerValuesCheck = projectId !== undefined;
  const changeSubTaskStatusHandlerValuesCheck = projectId;

  // Task Props

  const taskProps: Omit<TasksProps, 'status'> = {
    filter: {
      filterState,
      isOpen: filterIsOpen,
    },
    handlers: {
      editTaskHandler: (taskState, changedFields) => {
        dispatch(
          editTask({
            projectId: project.id,
            taskId: taskState.taskId,
            editedTask: {
              ...changedFields,
            },
          })
        );
      },
      changeTaskStatusDnDHandler: (taskState) => {
        editTaskStatusValuesCheck &&
          dispatch(
            editTask({
              projectId: project.id,
              taskId: taskState.taskId,
              editedTask: {
                status: taskStatus,
              },
            })
          );
      },
      editHandler: (taskState) => {
        editUpperLayerHandler();
        setEditTaskData({ taskState });
        dispatch(isOpenUpperLayer({ isOpen: true }));
      },
      deleteTaskHandler: (task) => {
        projectId &&
          dispatch(
            deleteTask({
              projectId: project?.id,
              task,
            })
          );
      },
      timeTaskHandler: (taskState, time) => {
        timeTaskHandlerValuesCheck &&
          dispatch(
            editTask({
              projectId: project?.id,
              taskId: taskState.taskId,
              editedTask: {
                time: {
                  ...taskState.time,
                  ...time,
                },
              },
            })
          );
      },
      createSubTaskHandler: (taskState) => {
        createSubTaskUpperLayerHandler();
        setEditTaskData({ taskState });
        dispatch(isOpenUpperLayer({ isOpen: true }));
      },
      changeSubTaskStatusHandler: (taskState, editedSubTaskId, status) => {
        changeSubTaskStatusHandlerValuesCheck &&
          dispatch(
            editTask({
              projectId: project?.id,
              taskId: taskState.taskId,
              editedTask: {
                subTasks: taskState.subTasks?.concat().map((sub) => {
                  return sub.taskId === editedSubTaskId
                    ? { ...sub, status }
                    : sub;
                }) as Task[],
              },
            })
          );
      },
      deleteSubTaskHandler: (taskState, subTask) => {
        projectId &&
          dispatch(
            deleteSubTask({
              projectId: project?.id,
              taskState,
              subTask,
            })
          );
      },
      addCommentHandler: (taskId) => {
        addCommentUpperLayerHandler();
        setAddComment({ taskId, commentAuthorId: null });
        dispatch(isOpenUpperLayer({ isOpen: true }));
      },
      addCommentReplyHandler: (taskId, commentAuthorId) => {
        replyCommentUpperLayerHandler();
        setAddComment({ taskId, commentAuthorId: commentAuthorId });
        dispatch(isOpenUpperLayer({ isOpen: true }));
      },
    },
  };

  return (
    <PagesAnimation keyProp="tasksPage">
      <TaskProvider value={taskProps.handlers as typeof taskProps.handlers}>
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
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    setTaskStatus('Queue');
                  }}
                  className={classes.taskCol}
                  style={{
                    backgroundColor: 'rgba(255, 172, 0, 0.61)',
                  }}
                >
                  <h3 className={classes.taskColTitle}>Queue</h3>
                  <div className={classes.taskColContent}>
                    <TasksFeature status={'Queue'} {...taskProps} />
                  </div>
                </div>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    setTaskStatus('Development');
                  }}
                  className={classes.taskCol}
                  style={{
                    backgroundColor: 'rgba(195, 255, 56, 0.61)',
                  }}
                >
                  <h3 className={classes.taskColTitle}>Development</h3>
                  <div className={classes.taskColContent}>
                    <TasksFeature status={'Development'} {...taskProps} />
                  </div>
                </div>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    setTaskStatus('Done');
                  }}
                  className={classes.taskCol}
                  style={{
                    backgroundColor: 'rgba(0, 255, 55, 0.67)',
                  }}
                >
                  <h3 className={classes.taskColTitle}>Done</h3>
                  <div className={classes.taskColContent}>
                    <TasksFeature status={'Done'} {...taskProps} />
                  </div>
                </div>
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
