// Types
import { Task as TaskFeature, TasksProps } from 'features/Task/Task';
import { Task } from 'shared/types';
// Styles
import classes from '../styles.module.css';

type TasksListsProps = {
  status: Task['status'];
  onDropHandler: (status: Task['status']) => void;
  taskProps: TasksProps;
};

export const TasksLists = (props: TasksListsProps) => {
  const { status, onDropHandler, taskProps } = props;

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        onDropHandler(status);
      }}
      className={classes.taskCol}
      style={{
        backgroundColor: getColumnsBgColor(status),
      }}
    >
      <h3 className={classes.taskColTitle}>{status}</h3>
      <div className={classes.taskColContent}>
        <TaskFeature {...taskProps} status={status} />
      </div>
    </div>
  );
};

const getColumnsBgColor = (status: Task['status']) => {
  switch (status) {
    case 'Queue':
      return 'rgba(255, 172, 0, 0.61)';
    case 'Development':
      return 'rgba(195, 255, 56, 0.61)';
    case 'Done':
      return 'rgba(0, 255, 55, 0.67)';
  }
};
