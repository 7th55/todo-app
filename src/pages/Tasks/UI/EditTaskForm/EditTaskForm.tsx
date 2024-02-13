// Hooks
import { useDispatch } from 'react-redux';
// Components
import { TaskForm } from 'entites/TaskForm';
// Lib
import { editTask } from 'features/Task/model/taskReducer';
// Types
import { Task } from 'shared/types';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type EditTaskFormProps = {
  projectId: string;
  taskState: Task;
};

export const EditTaskForm = (props: EditTaskFormProps) => {
  const { projectId, taskState } = props;
  const dispatch = useDispatch();
  return (
    <TaskForm
      type="Edit"
      taskState={taskState}
      editTaskHandler={(editedTask) =>
        dispatch(
          editTask({
            projectId: projectId,
            taskId: taskState.taskId,
            editedTask: editedTask,
          })
        )
      }
      upperLayerHandler={() => dispatch(isOpenUpperLayer({ isOpen: false }))}
    />
  );
};
