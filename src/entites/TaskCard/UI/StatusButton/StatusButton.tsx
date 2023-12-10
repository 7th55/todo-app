// Hooks
import { useState } from 'react';
// Components
import { Button } from 'shared/UI/Button';
// Types
import { Task } from 'shared/types';
// Styles
import classes from './styles.module.scss';

type StatusButtonProps = {
  status: Task['status'];
  changeStatusHandler: (status: Task['status']) => void;
};

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

export const StatusButton = (props: StatusButtonProps) => {
  const { status, changeStatusHandler } = props;

  const [open, setOpen] = useState(false);
  const statusState: Task['status'][] = ['Queue', 'Development', 'Done'];

  return (
    <div className={classes.buttonsBox}>
      {!open ? (
        <Button
          className={classes.bigButton}
          variant="outline"
          onClickHandler={() => setOpen(!open)}
        >
          Status: <span style={{ color: statusStyles(status) }}>{status}</span>
        </Button>
      ) : (
        <>
          {statusState.map((state) => (
            <Button
              variant="outline"
              style={{
                backgroundColor: status === state ? '#00ff1a70' : '',
              }}
              onClickHandler={() => {
                setOpen(false);
                changeStatusHandler(state);
              }}
            >
              {state}
            </Button>
          ))}
        </>
      )}
    </div>
  );
};
