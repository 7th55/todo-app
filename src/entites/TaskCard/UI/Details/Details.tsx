import { Task } from 'shared/types';
import classes from './styles.module.scss';
import { Button } from 'shared/UI/Button';
import { Comments } from 'entites/Comments';
import { StatusButtons } from './UI/StatusButtons';

type DetailsProps = {
  task: Task;
  handlers: {
    createSubTaskHandler: () => void;
    changeSubTaskStatusHandler: (
      taskState: Task,
      editedSubTaskId: string,
      status: Task['status']
    ) => void;
    deleteSubTaskHandler: (task: Task, subTask: Task) => void;
    addCommentHandler: () => void;
    addCommentReplyHandler: (taskId: string, commentAuthorID: string) => void;
  };
};

const statusStyles = (str: Task['status']) => {
  let color;

  switch (str) {
    case 'Queue':
      color = 'orange';
      break;
    case 'Development':
      color = 'mediumaquamarine';
      break;
    case 'Done':
      color = 'green';
      break;
  }

  return color;
};

export const Details = (props: DetailsProps) => {
  const { task, handlers } = props;

  const {
    createSubTaskHandler,
    changeSubTaskStatusHandler,
    deleteSubTaskHandler,
    addCommentHandler,
    addCommentReplyHandler,
  } = handlers;

  return (
    <div className={classes.taskDetails} style={{}}>
      <div className={classes.description}>
        <h3 className={classes.descriptionTitle}>Description:</h3>
        <p className={classes.descriptionText}>{task.description}</p>
      </div>
      {task.files !== null && (
        <section>
          <hr />
          <h4>Attached Files:</h4>
          <ul>
            {task.files.map((file) => {
              return (
                <li key={file.name}>
                  <a href={file.objectURL} download={file.name}>
                    {file.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      <hr />
      <section className={classes.subTasksBox}>
        {task.subTasks !== null && task.subTasks.length ? (
          <>
            <h4>Sub Tasks:</h4>
            {task.subTasks.map((subTask, index) => (
              <div key={subTask.taskId} className={classes.taskBox}>
                <div className={classes.taskNumber}>{index + 1}</div>
                <section
                  className={classes.subTask}
                  style={{
                    backgroundColor: statusStyles(subTask.status),
                  }}
                >
                  <h4 className={classes.taskTitle}>
                    <span className={classes.taskTitleId}>
                      Task Id: {subTask.taskId}
                    </span>
                    {subTask.title}
                  </h4>
                  <h4 className={classes.taskStatus}>
                    <StatusButtons
                      task={task}
                      subTask={subTask}
                      handlers={{ changeSubTaskStatusHandler }}
                    />
                  </h4>
                  <div className={classes.description}>
                    <h3 className={classes.descriptionTitle}>Description:</h3>
                    <p className={classes.descriptionText}>
                      {subTask.description}
                    </p>
                  </div>
                  {subTask.files !== null && (
                    <section>
                      <h4>Attached Files:</h4>
                      <ul>
                        {subTask.files.map((file) => {
                          return (
                            <li key={file.objectURL}>
                              <a href={file.objectURL} download={file.name}>
                                {file.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  )}

                  <Button
                    variant="outline"
                    style={{
                      color: 'red',
                      borderColor: 'red',
                      backgroundColor: 'black',
                    }}
                    onClickHandler={() => {
                      deleteSubTaskHandler(task, subTask);
                    }}
                  >
                    Delete Sub Task
                  </Button>
                  <hr />
                </section>
              </div>
            ))}
          </>
        ) : (
          <h4>No Sub Tasks</h4>
        )}
      </section>
      <Button
        variant="outline"
        style={{ color: 'green', borderColor: 'green' }}
        onClickHandler={() => createSubTaskHandler()}
      >
        Create Sub Task
      </Button>
      <hr />
      <div className={classes.commentsBox}>
        {task.comments !== null ? (
          <>
            <h4>Comments:</h4>
            <Comments
              comments={task.comments}
              task={task}
              addCommentReplyHandler={addCommentReplyHandler}
            />
          </>
        ) : (
          <h4>No Comments</h4>
        )}
      </div>
      <Button
        variant="outline"
        style={{ color: 'green', borderColor: 'green' }}
        onClickHandler={() => {
          addCommentHandler();
        }}
      >
        Add Comment
      </Button>
    </div>
  );
};
