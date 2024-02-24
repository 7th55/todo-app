import { createContext } from 'react';
import { TaskHandlers } from './Task';
import { useDispatch } from 'react-redux';
import { deleteSubTask, deleteTask, editTask } from './model/taskReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
import { Project, Task } from 'shared/types';

export const TasksHandlers = createContext(null as unknown as TaskHandlers);

export const TaskProvider = (props: {
  children: React.ReactNode;
  project: Project;
  taskStatus: Task['status'] | null;
  createSubTaskUpperLayerHandler: () => void;
  editUpperLayerHandler: () => void;
  addCommentUpperLayerHandler: () => void;
  replyCommentUpperLayerHandler: () => void;
  setAddComment: ({
    taskId,
    commentAuthorId,
  }: {
    taskId: string;
    commentAuthorId: null | string;
  }) => void;
  setEditTaskData: ({ taskState }: { taskState: Task }) => void;
}) => {
  const {
    children,
    project,
    taskStatus,
    createSubTaskUpperLayerHandler,
    editUpperLayerHandler,
    addCommentUpperLayerHandler,
    replyCommentUpperLayerHandler,
    setAddComment,
    setEditTaskData,
  } = props;

  const dispatch = useDispatch();

  const taskHandlers: TaskHandlers = {
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
      dispatch(
        editTask({
          projectId: project.id,
          taskId: taskState.taskId,
          editedTask: {
            status: taskStatus as Task['status'],
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
      dispatch(
        deleteTask({
          projectId: project?.id,
          task,
        })
      );
    },
    timeTaskHandler: (taskState, time) => {
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
      dispatch(
        editTask({
          projectId: project?.id,
          taskId: taskState.taskId,
          editedTask: {
            subTasks: taskState.subTasks?.concat().map((sub) => {
              return sub.taskId === editedSubTaskId ? { ...sub, status } : sub;
            }) as Task[],
          },
        })
      );
    },
    deleteSubTaskHandler: (taskState, subTask) => {
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
  };

  return (
    <TasksHandlers.Provider value={{ ...taskHandlers }}>
      {children}
    </TasksHandlers.Provider>
  );
};
