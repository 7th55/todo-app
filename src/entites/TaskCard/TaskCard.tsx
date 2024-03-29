// Providers
import { TasksHandlers } from 'features/Task/TaskProvider';
// Hooks
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  isOpenUpperLayer,
  useUpperLayer,
} from 'shared/UI/UpperLayer/model/upperLayerReducer';
// Components
import { Button } from 'shared/UI/Button';
import { Details } from './UI/Details/Details';
import { StatusButton } from './UI/StatusButton/StatusButton';
import { PriorityButton } from './UI/PriorityButton/PriorityButton';
import { UpperLayer } from 'shared/UI/UpperLayer';
// Lib
import { getTaskTime, formatTimeAndDate } from 'shared/lib';
// Types
import { Task } from 'shared/types';
import { DevTimer } from './UI/DevTimer/DevTimer';
// Styles
import classes from './styles.module.scss';
import { TaskHandlers, TasksProps } from 'features/Task/Task';

type TaskCardProps = {
  status: Task['status'];
  task: Task;
};

export const TaskCard = (props: TaskCardProps) => {
  const {
    editTaskHandler,
    changeTaskStatusDnDHandler: changeTaskStatusHandler,
    editHandler,
    deleteTaskHandler,
    changeSubTaskStatusHandler,
    createSubTaskHandler,
    deleteSubTaskHandler,
    timeTaskHandler,
    addCommentHandler,
    addCommentReplyHandler,
  } = useContext(TasksHandlers) as TaskHandlers;

  const { status, task } = props;

  // Modal Views
  const [upperLayer, setUpperLayer] = useState<'TaskDetails' | null>(null);

  const dispatch = useDispatch();

  const isOpenUpperLayerState = useUpperLayer().isOpen;

  useLayoutEffect(() => {
    if (!isOpenUpperLayerState) setUpperLayer(null);
  }, [isOpenUpperLayerState]);

  useEffect(() => {
    if (status === 'Queue') {
      timeTaskHandler(task, {
        done: {
          ms: 0,
          time: '',
          date: '',
        },
      });
    }

    if (status === 'Development') {
      timeTaskHandler(task, {
        done: {
          ms: 0,
          time: '',
          date: '',
        },
      });
      task.time.development.ms === 0 &&
        timeTaskHandler(task, {
          development: {
            ms: getTaskTime().ms,
            date: getTaskTime().date,
            time: getTaskTime().time,
            timeInDev: task.time.development.timeInDev,
          },
          done: {
            ms: 0,
            time: '',
            date: '',
          },
        });
    }

    if (status === 'Done') {
      timeTaskHandler(task, {
        done: getTaskTime(),
      });
    }
  }, [status]);

  const timeInDevHandler = useCallback(
    (timeInDev: number) => {
      timeTaskHandler(task, {
        development: {
          ...task.time.development,
          timeInDev,
        },
      });
    },
    [timeTaskHandler, task]
  );

  return (
    <div
      className={classes.taskCard}
      draggable={true}
      onDragEnd={() => {
        changeTaskStatusHandler(task);
      }}
    >
      <h4 className={classes.taskTitle}>
        <span className={classes.taskTitleId}>Task Id: {task.taskId}</span>
        {task.title}
      </h4>
      <div>
        <div className={classes.statusAndPriority}>
          <PriorityButton
            priority={task.priority}
            changePriorityHandler={(priority) => {
              editTaskHandler(task, {
                priority,
              });
            }}
          />
          <StatusButton
            status={task.status}
            changeStatusHandler={(status) => {
              editTaskHandler(task, {
                status,
              });
            }}
          />
        </div>
        <hr />
        <p>
          Create: {`${task.time.create.time} ${task.time.create.date}`}
          <br />
          Development Start:{' '}
          {`${task.time.development.time} ${task.time.development.date}`}
          <br />
          {status === 'Development' && (
            <DevTimer
              timeInDevHandler={timeInDevHandler}
              timeInDev={task.time.development.timeInDev}
            />
          )}
          {(status === 'Done' || status === 'Queue') && (
            <>
              Time In Development:{' '}
              {`${formatTimeAndDate(task.time.development.timeInDev).hours}:${
                formatTimeAndDate(task.time.development.timeInDev).minutes
              }:${formatTimeAndDate(task.time.development.timeInDev).seconds}`}
              <br></br>
            </>
          )}
          {status === 'Done' && (
            <>Done: {`${task.time.done.time} ${task.time.done.date}`}</>
          )}
        </p>
      </div>
      <div className={classes.cardButtons}>
        <Button
          onClickHandler={() => {
            setUpperLayer('TaskDetails');
            dispatch(isOpenUpperLayer({ isOpen: true }));
          }}
        >
          Show Task
        </Button>
        <Button onClickHandler={() => editHandler(task)}>Edit Task</Button>
        <Button
          variant="outline"
          style={{ borderColor: 'red', color: 'red' }}
          onClickHandler={() => deleteTaskHandler(task)}
        >
          Delete Task
        </Button>
      </div>
      <hr />
      {upperLayer === 'TaskDetails' && (
        <UpperLayer
          content={
            <Details
              task={task}
              handlers={{
                createSubTaskHandler: () => createSubTaskHandler(task),
                changeSubTaskStatusHandler,
                deleteSubTaskHandler,
                addCommentHandler: () => addCommentHandler(task.taskId),
                addCommentReplyHandler,
              }}
            />
          }
        />
      )}
    </div>
  );
};
