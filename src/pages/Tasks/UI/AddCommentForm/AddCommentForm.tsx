// Hooks
import { useDispatch } from 'react-redux';
// Components
import { CommentForm } from 'entites/CommentForm';
// Lib
import { createId } from 'shared/lib';
import { addComment } from 'features/Task/model/taskReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type AddCommentFormProps = {
  projectId: string;
  taskId: string;
  closeModal: () => void;
};

export const AddCommentForm = (props: AddCommentFormProps) => {
  const { projectId, taskId, closeModal } = props;

  const dispatch = useDispatch();

  return (
    <CommentForm
      type="Comment"
      onClickHandler={(form) => {
        dispatch(
          addComment({
            projectId: projectId,
            taskId: taskId,
            parentCommentId: null,
            comment: {
              id: createId(),
              author: form.author.value,
              comment: form.comment.value,
              replies: null,
            },
          })
        );
        closeModal();
      }}
    />
  );
};
