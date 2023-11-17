// Components
import { Comment } from './UI/Comment';
// Types
import { Comment as CommentType, Task } from 'shared/types';

type CommentsProps = {
  task: Task;
  comments: CommentType[];
  addCommentReplyHandler: (
    taskTitle: Task['title'],
    commentId: CommentType['id']
  ) => void;
};

export const Comments = (props: CommentsProps) => {
  const { task, comments, addCommentReplyHandler } = props;

  const commentsReqursion = (comments: CommentType[], task: Task) =>
    comments.map((comment: CommentType) =>
      comment.replies === null ? (
        <Comment
          key={comment.id}
          task={task}
          comment={comment}
          addCommentReplyHandler={addCommentReplyHandler}
        />
      ) : (
        <Comment
          key={comment.id}
          task={task}
          comment={comment}
          commentsReqursion={commentsReqursion}
          addCommentReplyHandler={addCommentReplyHandler}
        />
      )
    );

  return <>{commentsReqursion(comments, task)}</>;
};
