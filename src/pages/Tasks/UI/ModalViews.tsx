// Components
import { UpperLayer } from 'shared/UI/UpperLayer';
import { CreateTaskForm } from './CreateTaskForm';
import { CreateSubTaskForm } from './CreateSubTaskForm';
import { EditTaskForm } from './EditTaskForm';
import { AddCommentForm } from './AddCommentForm';
import { ReplyCommentForm } from './ReplyCommentForm';
// Types
import { UpperLayersStates } from '../hooks';
import { Project, Task } from 'shared/types';

type ModalViewsProps = {
  upperLayer: UpperLayersStates;
  projectId: Project['id'];
  taskState: Task;
  addComment: {
    taskId: string;
    commentAuthorId: string;
  };
  closeHandler: () => void;
};

export const ModalViews = (props: ModalViewsProps) => {
  const { upperLayer, projectId, taskState, addComment, closeHandler } = props;

  return (
    <>
      {upperLayer === 'create' && (
        <UpperLayer content={<CreateTaskForm projectId={projectId} />} />
      )}
      {upperLayer === 'createSubTask' && (
        <UpperLayer
          content={
            <CreateSubTaskForm
              projectId={projectId}
              taskState={taskState}
              closeModal={() => closeHandler()}
            />
          }
          closeModal={() => closeHandler()}
        />
      )}
      {upperLayer === 'edit' && (
        <UpperLayer
          content={<EditTaskForm projectId={projectId} taskState={taskState} />}
        />
      )}
      {upperLayer === 'addComment' && (
        <UpperLayer
          content={
            <AddCommentForm
              projectId={projectId}
              taskId={addComment?.taskId as string}
              closeModal={() => closeHandler()}
            />
          }
          closeModal={() => closeHandler()}
        />
      )}
      {upperLayer === 'replyComment' && (
        <UpperLayer
          content={
            <ReplyCommentForm
              projectId={projectId}
              taskId={addComment?.taskId as string}
              commentAuthorId={addComment?.commentAuthorId as string}
              closeModal={() => closeHandler()}
            />
          }
          closeModal={() => closeHandler()}
        />
      )}
    </>
  );
};
