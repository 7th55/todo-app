// Hooks
import { useState } from 'react';
// Components
import { Button } from 'shared/UI/Button';
// Types
import { Task } from 'shared/types';
// Styles
import classes from './styles.module.scss';

type PriorityButtonProps = {
  priority: Task['priority'];
  changePriorityHandler: (priority: Task['priority']) => void;
};

const priorityStyles = (str: Task['priority']) => {
  let color;

  switch (str) {
    case 'High':
      color = 'red';
      break;
    case 'Mid':
      color = 'yellow';
      break;
    case 'Low':
      color = 'green';
      break;
  }

  return color;
};

export const PriorityButton = (props: PriorityButtonProps) => {
  const { priority, changePriorityHandler } = props;

  const [open, setOpen] = useState(false);
  const priorityState: Task['priority'][] = ['Low', 'Mid', 'High'];

  return (
    <div className={classes.buttonsBox}>
      {!open ? (
        <Button
          className={classes.bigButton}
          variant="outline"
          onClickHandler={() => setOpen(!open)}
        >
          Priority:{' '}
          <span style={{ color: priorityStyles(priority) }}>{priority}</span>
        </Button>
      ) : (
        <>
          {priorityState.map((state) => (
            <Button
              variant="outline"
              style={{
                backgroundColor: priority === state ? '#00ff1a70' : '',
              }}
              onClickHandler={() => {
                setOpen(false);
                changePriorityHandler(state);
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
