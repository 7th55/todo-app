// Hooks
import { useState } from 'react';
// Components
import { Button } from 'shared/UI/Button';
// Types
import { Comment as CommentType, Task } from 'shared/types';
// Styles
import classes from './styles.module.scss';

type CommentProps = {
  task: Task;
  comment: CommentType;
  commentsReqursion?: (
    comments: CommentType[],
    task: Task
  ) => JSX.Element[] | JSX.Element;
  addCommentReplyHandler: (
    taskId: Task['taskId'],
    commentId: CommentType['id']
  ) => void;
};
export const Comment = (props: CommentProps) => {
  const { task, comment, commentsReqursion, addCommentReplyHandler } = props;

  const [showReplies, setShowReplies] = useState(false);

  return (
    <div>
      <section className={classes.comment}>
        <div className={classes.info}>
          <div className={classes.commentId}>
            <h4>&gt;&gt;{comment.id}</h4>
          </div>
          <div>
            <h4>{comment.author}</h4>
          </div>
          <div>
            {comment.parent ? <h4>Reply to: {comment.parent}</h4> : null}
          </div>
        </div>
        <p>{comment.comment}</p>
        <div className={classes.repliesButtons}>
          <Button
            onClickHandler={() => {
              addCommentReplyHandler(task.taskId, comment.id);
            }}
          >
            Reply to:
            <span className={classes.commentId}>&gt;&gt;{comment.id}</span>
          </Button>
          {comment.replies && (
            <Button onClickHandler={() => setShowReplies(!showReplies)}>
              Show Replies
            </Button>
          )}
        </div>

        {commentsReqursion && comment.replies && (
          <>
            {showReplies && (
              <div className={classes.replies}>
                <h4>
                  Replies to{' '}
                  <span className={classes.commentId}>
                    &gt;&gt;{comment.id}
                  </span>
                  {`(${comment.author})`}:
                </h4>
                {commentsReqursion(comment.replies, task)}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
