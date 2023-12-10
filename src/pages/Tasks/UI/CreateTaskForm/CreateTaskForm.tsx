// Hooks
import { useDispatch } from 'react-redux';
// Components
import { TaskForm } from 'entites/TaskForm';
// Lib
import { createTask } from 'features/Task/model/taskReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type CreateTaskFormProps = {
  projectId: string;
};

export const CreateTaskForm = (props: CreateTaskFormProps) => {
  const { projectId } = props;
  const dispatch = useDispatch();
  return (
    <TaskForm
      type="Create"
      createTaskHandler={(task) => {
        dispatch(
          createTask({
            projectId: projectId,
            task,
          })
        );
      }}
      upperLayerHandler={() => dispatch(isOpenUpperLayer({ isOpen: false }))}
    />
  );
};
