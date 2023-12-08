// Hooks
import { useEffect, useState } from 'react';
// Components
import { Button } from 'shared/UI/Button';
import { Input } from 'shared/UI/Input';
// Styles
import classes from './styles.module.scss';
import { useIsPresent } from 'framer-motion';

type Project = {
  name: string;
};

type ProjectFormProps = {
  createProjectHandler: (project: Project) => void;
  upperLayerHandler: () => void;
};

export const ProjectForm = (props: ProjectFormProps) => {
  const { createProjectHandler, upperLayerHandler } = props;

  const projectFormInitialState = {
    name: {
      value: '',
      error: {
        message: 'Pls Add Name',
        isOpen: false,
      },
    },
  };
  const [projectForm, setProjectForm] = useState(projectFormInitialState);

  const createHandler = () => {
    createProjectHandler({ name: projectForm.name.value });
    upperLayerHandler();
  };

  const errorHandler = (input: 'name') => {
    setProjectForm({
      ...projectForm,
      [input]: {
        ...projectForm[input],
        error: {
          ...projectForm[input].error,
          isOpen: true,
        },
      },
    });
  };

  const isEmpty = (value: string) => value.trim() === '';

  const checkInputs = () => {
    const nameInput = isEmpty(projectForm.name.value);
    nameInput && errorHandler('name');

    if (!nameInput) return true;
  };

  return (
    <div>
      <h3 className={classes.formTitle}>Create Project</h3>
      <ul>
        <li>
          <Input
            placeholder="Project Name"
            value={projectForm.name.value}
            error={{
              message: projectForm.name.error.message,
              isOpen: projectForm.name.error.isOpen,
            }}
            onChangeHandler={(e) => {
              setProjectForm({
                ...projectForm,
                name: {
                  value: e.target.value,
                  error: {
                    ...projectForm.name.error,
                    isOpen: false,
                  },
                },
              });
            }}
          />
        </li>
      </ul>
      <Button
        onClickHandler={() => {
          checkInputs() ? createHandler() : errorHandler('name');
        }}
      >
        Create Project
      </Button>
    </div>
  );
};
