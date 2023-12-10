import { Button } from 'shared/UI/Button';
import { Task } from 'shared/types';
// Styles
import classes from './styles.module.css';

type TaskFormButtonsProps = {
  type: 'StatusButtons' | 'PriorityButtons';
  status?: Task['status'];
  priority?: Task['priority'];
  statusHandler?: (status: Task['status']) => void;
  priorityHandler?: (priority: Task['priority']) => void;
};

export const TaskFormButtons = (props: TaskFormButtonsProps) => {
  const { type, status, priority, statusHandler, priorityHandler } = props;

  return (
    <>
      {type === 'StatusButtons' && statusHandler && (
        <li className={classes.taskFormButtonsBox}>
          Status:
          <Button
            variant="outline"
            style={{
              backgroundColor: status === 'Queue' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => statusHandler('Queue')}
          >
            Queue
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor: status === 'Development' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => statusHandler('Development')}
          >
            Development
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor: status === 'Done' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => statusHandler('Done')}
          >
            Done
          </Button>
        </li>
      )}

      {type === 'PriorityButtons' && priorityHandler && (
        <li className={classes.taskFormButtonsBox}>
          Priority:
          <Button
            variant="outline"
            style={{
              backgroundColor: priority === 'High' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => priorityHandler('High')}
          >
            High
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor: priority === 'Mid' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => priorityHandler('Mid')}
          >
            Mid
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor: priority === 'Low' ? '#00ff1a70' : '',
            }}
            onClickHandler={() => priorityHandler('Low')}
          >
            Low
          </Button>
        </li>
      )}
    </>
  );
};
