// Hooks
import { useEffect, useState } from 'react';
import { useForm } from 'shared/UI/Input/hooks';
// Components
import { Button } from 'shared/UI/Button';
import { Input } from 'shared/UI/Input';
// Lib
import { getTaskTime, isEmptyString } from 'shared/lib';
// Types
import { Task } from 'shared/types';
import React from 'react';
// Styles
import classes from './styles.module.css';
import { FilesInput } from './UI/FilesInput';
import { TaskFormButtons } from './UI/TaskFormButtons';

type TaskFormProps = {
  type: 'Sub' | 'Create' | 'Edit';
  taskState?: Task;
  createTaskHandler?: (task: Task) => void;
  createSubTaskHandler?: () => void;
  editTaskHandler?: (task: Task) => void;
  upperLayerHandler: () => void;
};

export const TaskForm = (props: TaskFormProps) => {
  const {
    type,
    taskState,
    createTaskHandler,
    createSubTaskHandler,
    editTaskHandler,
    upperLayerHandler,
  } = props;

  const [task, setTask] = useState<Task>(
    taskState
      ? taskState
      : {
          taskId: '',
          title: '',
          description: '',
          time: {
            create: {
              ms: getTaskTime().ms,
              time: getTaskTime().time,
              date: getTaskTime().date,
            },
            development: {
              ms: 0,
              timeInDev: 0,
              time: '',
              date: '',
            },
            done: {
              ms: 0,
              time: '',
              date: '',
            },
          },
          priority: 'High',
          files: null,
          status: 'Queue',
          subTasks: null,
          comments: null,
        }
  );

  const formInitialState = {
    title: {
      value: taskState?.title && type === 'Edit' ? taskState.title : '',
      error: {
        message: 'Pls Add Title',
        isOpen: false,
      },
    },
    description: {
      value:
        taskState?.description && type === 'Edit' ? taskState.description : '',
      error: { message: 'Pls Add Description', isOpen: false },
    },
  };

  const [form, onChange, error] = useForm(formInitialState);

  useEffect(() => {
    type === 'Sub' &&
      setTask({
        taskId: '',
        title: '',
        description: '',
        time: {
          create: {
            ms: getTaskTime().ms,
            time: getTaskTime().time,
            date: getTaskTime().date,
          },
          development: {
            ms: 0,
            timeInDev: 0,
            time: '',
            date: '',
          },
          done: {
            ms: 0,
            time: '',
            date: '',
          },
        },
        priority: 'High',
        files: null,
        status: 'Queue',
        subTasks: null,
        comments: null,
      });
  }, [type]);

  const checkInputs = () => {
    const titleInput = isEmptyString(form.title.value);
    titleInput && error('title');

    const descInput = isEmptyString(form.description.value);
    descInput && error('description');

    const ready = !titleInput && !descInput;

    if (ready) {
      return true;
    } else {
      return false;
    }
  };

  const inputs = [
    {
      onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange('title', e);
        setTask({ ...task, title: e.target.value });
      },
      error: form.title.error,
      value: form.title.value,
      type: 'Title',
    },
    {
      onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange('description', e);
        setTask({ ...task, description: e.target.value });
      },
      error: form.description.error,
      value: form.description.value,
      type: 'Description',
    },
    {
      type: 'Status',
    },
    {
      type: 'Priority',
    },
    {
      type: 'SubTasks',
    },
    {
      type: 'Files',
    },
  ];
  return (
    <div>
      <h3 className={classes.formTitle}>{`${type} Task`}</h3>
      <ul className={classes.inputsAndButtons}>
        {inputs.map((inp) => {
          if (inp.type === 'Files') {
            return (
              <li key={inp.type}>
                <FilesInput
                  onChangeHandler={(e) => {
                    setTask({
                      ...task,
                      files: e.target.files
                        ? Array.from(e.target.files).map((file) => {
                            const objectURL = URL.createObjectURL(file);
                            return {
                              objectURL,
                              name: file.name,
                            };
                          })
                        : null,
                    });
                  }}
                />
              </li>
            );
          } else if (inp.type === 'Status') {
            return (
              <TaskFormButtons
                key={inp.type}
                type="StatusButtons"
                status={task.status}
                statusHandler={(status) => setTask({ ...task, status })}
              />
            );
          } else if (inp.type === 'Priority') {
            return (
              <TaskFormButtons
                key={inp.type}
                type="PriorityButtons"
                priority={task.priority}
                priorityHandler={(priority) => {
                  setTask({ ...task, priority });
                }}
              />
            );
          } else if (
            inp.type === 'SubTasks' &&
            (type === 'Sub' || type === 'Create' || type === 'Edit')
          ) {
            return null;
          } else if (inp.type === 'SubTasks' && type !== 'Sub') {
            return (
              <li key={inp.type}>
                {taskState
                  ? taskState.subTasks?.map((sub) => (
                      <div key={sub.taskId}>{sub.title}</div>
                    ))
                  : 'No Sub Tasks'}
              </li>
            );
          } else {
            return (
              <li key={inp.type}>
                <Input
                  error={inp.error}
                  value={inp.value ? inp.value : ''}
                  onChangeHandler={(e) =>
                    inp.onChangeHandler && inp.onChangeHandler(e)
                  }
                  placeholder={inp.type}
                />
              </li>
            );
          }
        })}
      </ul>

      {type === 'Create' && (
        <Button
          onClickHandler={() => {
            if (checkInputs()) {
              createTaskHandler && createTaskHandler(task);
              upperLayerHandler();
            }
          }}
        >
          Create
        </Button>
      )}
      {type === 'Edit' && (
        <>
          <Button
            onClickHandler={() => {
              if (checkInputs()) {
                editTaskHandler && editTaskHandler(task);
                upperLayerHandler();
              }
            }}
          >
            Edit
          </Button>
        </>
      )}
      {type === 'Sub' && (
        <>
          <Button
            onClickHandler={() => {
              if (checkInputs()) {
                createSubTaskHandler && createSubTaskHandler();
                editTaskHandler && editTaskHandler(task);
                upperLayerHandler();
              }
            }}
          >
            Add Sub Task
          </Button>
        </>
      )}
    </div>
  );
};
