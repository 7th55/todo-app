// Hooks
import { useParams } from 'react-router-dom';
import { useTask } from './model/taskReducer';
// Components
import { TaskCard } from 'entites/TaskCard';
// Types
import { RootState, Task as TaskType } from 'shared/types';
// Styles
import classes from './styles.module.scss';

export type TasksProps = {
  status: TaskType['status'];
  filter: {
    filterState: RootState['filter'];
    isOpen: boolean;
  };
  // handlers: {
  //   editTaskHandler: (
  //     taskState: TaskType,
  //     changedFields: Partial<TaskType>
  //   ) => void;
  //   editHandler: (task: TaskType) => void;
  //   changeTaskStatusDnDHandler: (taskState: TaskType) => void;
  //   deleteTaskHandler: (task: TaskType) => void;
  //   timeTaskHandler: (
  //     taskState: TaskType,
  //     time: Partial<TaskType['time']>
  //   ) => void;
  //   createSubTaskHandler: (task: TaskType) => void;
  //   changeSubTaskStatusHandler: (
  //     taskState: TaskType,
  //     editedSubTaskId: string,
  //     status: TaskType['status']
  //   ) => void;
  //   deleteSubTaskHandler: (task: TaskType, subTask: TaskType) => void;
  //   addCommentHandler: (taskId: string) => void;
  //   addCommentReplyHandler: (taskId: string, commentAuthorID: string) => void;
  // };
};

export type TaskHandlers = {
  editTaskHandler: (
    taskState: TaskType,
    changedFields: Partial<TaskType>
  ) => void;
  editHandler: (task: TaskType) => void;
  changeTaskStatusDnDHandler: (taskState: TaskType) => void;
  deleteTaskHandler: (task: TaskType) => void;
  timeTaskHandler: (
    taskState: TaskType,
    time: Partial<TaskType['time']>
  ) => void;
  createSubTaskHandler: (task: TaskType) => void;
  changeSubTaskStatusHandler: (
    taskState: TaskType,
    editedSubTaskId: string,
    status: TaskType['status']
  ) => void;
  deleteSubTaskHandler: (task: TaskType, subTask: TaskType) => void;
  addCommentHandler: (taskId: string) => void;
  addCommentReplyHandler: (taskId: string, commentAuthorID: string) => void;
};

export const Task = (props: TasksProps) => {
  const { status, filter } = props;

  const { projectId } = useParams();
  const tasksState = useTask();

  const tasks =
    filter.isOpen === false
      ? tasksState.find((tasks) => tasks.projectId === projectId)?.projectTasks
      : filter.filterState;

  const filtredByStatusTasks = tasks?.filter((task) => task.status === status);

  return (
    <ul>
      {filtredByStatusTasks &&
        filtredByStatusTasks.map((task, index) => {
          const taksCardProps = {
            status,
            task,
            index,
          };
          return (
            <li
              key={task.taskId}
              className={classes.taskBox}
              style={{ marginBottom: '15px' }}
            >
              <div className={classes.taskNumber}>{index + 1}.</div>{' '}
              <TaskCard {...taksCardProps} />
            </li>
          );
        })}
    </ul>
  );
};
