// Hooks
import { useDispatch } from 'react-redux';
// Components
import { TaskForm } from 'entites/TaskForm';
// Lib
import { createSubTask } from 'features/Task/model/taskReducer';
// Types
import { Task } from 'shared/types';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
import { createId } from 'shared/lib';

type CreateSubTaskFormProps = {
  projectId: string;
  taskState: Task;
  closeModal: () => void;
};

export const CreateSubTaskForm = (props: CreateSubTaskFormProps) => {
  const { projectId, taskState, closeModal } = props;
  const dispatch = useDispatch();
  return (
    <TaskForm
      type="Sub"
      taskState={taskState}
      editTaskHandler={(subTask) =>
        dispatch(
          createSubTask({
            projectId: projectId,
            taskState: taskState,
            subTask: {
              ...subTask,
              taskId: createId(),
            },
          })
        )
      }
      upperLayerHandler={() => closeModal()}
    />
  );
};
