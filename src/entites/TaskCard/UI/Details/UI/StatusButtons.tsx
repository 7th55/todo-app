import React, { useState } from 'react';
import { Button } from 'shared/UI/Button';
import { Task } from 'shared/types';

const statusStyles = (str: Task['status']) => {
  let color;

  switch (str) {
    case 'Queue':
      color = 'orange';
      break;
    case 'Development':
      color = 'mediumaquamarine';
      break;
    case 'Done':
      color = 'green';
      break;
  }

  return color;
};

type StatusButtons = {
  task: Task;
  subTask: Task;
  handlers: {
    changeSubTaskStatusHandler: (
      taskState: Task,
      editedSubTaskId: string,
      status: Task['status']
    ) => void;
  };
};

export const StatusButtons = (props: StatusButtons) => {
  const { task, subTask, handlers } = props;

  const { changeSubTaskStatusHandler } = handlers;

  const [status, setStatus] = useState(false);

  return (
    <>
      <span
        style={{
          color: statusStyles(subTask.status),
        }}
      >
        Status:{' '}
      </span>
      {!status && (
        <Button
          variant="outline"
          style={{
            color: statusStyles(subTask.status),
            borderColor: statusStyles(subTask.status),
          }}
          onClickHandler={() => setStatus(!status)}
        >
          {subTask.status}
        </Button>
      )}
      {status && (
        <>
          <Button
            variant="outline"
            style={{
              backgroundColor:
                subTask.status === 'Queue' ? statusStyles(subTask.status) : '',
              marginRight: '5px',
            }}
            onClickHandler={() => {
              changeSubTaskStatusHandler(task, subTask.taskId, 'Queue');
              setStatus(!status);
            }}
          >
            Queue{' '}
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor:
                subTask.status === 'Development'
                  ? statusStyles(subTask.status)
                  : '',
              marginRight: '5px',
            }}
            onClickHandler={() => {
              changeSubTaskStatusHandler(task, subTask.taskId, 'Development');
              setStatus(!status);
            }}
          >
            Development{' '}
          </Button>
          <Button
            variant="outline"
            style={{
              backgroundColor:
                subTask.status === 'Done' ? statusStyles(subTask.status) : '',
              marginRight: '5px',
            }}
            onClickHandler={() => {
              changeSubTaskStatusHandler(task, subTask.taskId, 'Done');
              setStatus(!status);
            }}
          >
            Done{' '}
          </Button>
        </>
      )}
    </>
  );
};
