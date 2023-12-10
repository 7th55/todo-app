// Hooks
import { useDispatch } from 'react-redux';
// Components
import { CommentForm } from 'entites/CommentForm';
// Lib
import { createId } from 'shared/lib';
import { addComment } from 'features/Task/model/taskReducer';
import { isOpenUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type ReplyCommentFormProps = {
  projectId: string;
  taskId: string;
  commentAuthorId: string;
  closeModal: () => void;
};

export const ReplyCommentForm = (props: ReplyCommentFormProps) => {
  const { projectId, taskId, commentAuthorId, closeModal } = props;

  const dispatch = useDispatch();

  return (
    <CommentForm
      type="ReplyToComment"
      onClickHandler={(form) => {
        dispatch(
          addComment({
            projectId: projectId,
            taskId: taskId,
            parentCommentId: commentAuthorId,
            comment: {
              id: createId(),
              author: form.author.value,
              comment: form.comment.value,
              parent: commentAuthorId,
              replies: null,
            },
          })
        );
        closeModal();
      }}
    />
  );
};
