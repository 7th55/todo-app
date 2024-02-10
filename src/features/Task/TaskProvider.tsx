import { createContext } from 'react';

export const TasksHandlers = createContext(null as unknown as object);

export const TaskProvider = <T extends object>(props: {
  children: React.ReactNode;
  value: T;
}) => {
  const { children, value } = props;

  return (
    <TasksHandlers.Provider value={{ ...value }}>
      {children}
    </TasksHandlers.Provider>
  );
};
