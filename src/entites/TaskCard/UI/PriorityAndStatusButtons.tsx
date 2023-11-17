import React from 'react';
import { Task } from 'shared/types';

type PriorityButtonProps = {
  priority: Task['priority'];
  changePriorityHandler: (priority: Task['priority']) => void;
};

type PriorityAndStatusButton<T> = {
  state: T extends 'status'
    ? Task['status']
    : T extends 'priority'
    ? Task['priority']
    : never;
  handler: T extends 'status'
    ? { changeStatusHandler: (status: Task['status']) => void }
    : T extends 'priority'
    ? {
        changePriorityHandler: (priority: Task['priority']) => void;
      }
    : never;
};

export const PriorityAndStatusButtons = <T,>({
  state,
  handler,
}: PriorityAndStatusButton<T>) => {
  return <div>{state}</div>;
};
