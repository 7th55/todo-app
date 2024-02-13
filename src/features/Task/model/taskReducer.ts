// Hooks
import { useSelector } from 'react-redux';
// Lib
import { createId } from 'shared/lib';
// Types
import { Comment, RootState, Task, Tasks } from 'shared/types';

type TasksActionTypes =
  | 'task/CREATE_TASK'
  | 'task/DELETE_TASK'
  | `task/CLEAR_TASKS`
  | 'task/EDIT_TASK'
  | 'task/ADD_COMMENT'
  | 'task/CREATE_SUB_TASK'
  | 'task/DELETE_SUB_TASK';

type TaskPayload = { projectId: string; task: Task };

type CreateTaskPayload = TaskPayload;

type DeleteTaskPayload = TaskPayload;

type ClearTasksPayload = Pick<TaskPayload, 'projectId'>;

type EditTaskPayload = Omit<TaskPayload, 'task'> & {
  editedTask: Partial<Task>;
  taskId: Task['taskId'];
  // taskState?: Task;
};

type CreateSubTaskPayload = Omit<TaskPayload, 'task'> & {
  subTask: Task;
  taskState: Task;
};

type DeleteSubTaskPayload = Omit<TaskPayload, 'task'> & {
  taskState: Task;
  subTask: Task;
};

type AddCommentTaskPayload = Omit<TaskPayload, 'task'> & {
  taskId: string;
  parentCommentId?: string | null;
  comment: Comment;
};

type TaskActionPayload =
  | CreateTaskPayload
  | DeleteTaskPayload
  | ClearTasksPayload
  | EditTaskPayload
  | CreateSubTaskPayload
  | DeleteSubTaskPayload
  | AddCommentTaskPayload;

type TasksAction = {
  type: TasksActionTypes;
  payload: TaskActionPayload;
};

const initialState = [] as Array<Tasks>;

export function taskReducer(state = initialState, action: TasksAction) {
  switch (action.type) {
    case 'task/CREATE_TASK': {
      const { projectId, task } = action.payload as CreateTaskPayload;

      if (state.find((tasks) => tasks.projectId === projectId)) {
        return state.map((tasks) => {
          if (tasks.projectId === projectId) {
            return {
              projectId: projectId,
              projectTasks: [
                ...tasks.projectTasks,
                { ...task, taskId: createId() },
              ],
            };
          } else {
            return tasks;
          }
        });
      } else {
        return [
          ...state,
          {
            projectId: projectId,
            projectTasks: [{ ...task, taskId: createId() }],
          },
        ];
      }
    }
    case 'task/DELETE_TASK': {
      const { projectId, task } = action.payload as DeleteTaskPayload;

      if (state.find((tasks) => tasks.projectId === projectId)) {
        return state.map((tasks) => {
          if (tasks.projectId === projectId) {
            return {
              projectId: projectId,
              projectTasks: tasks.projectTasks.filter(
                (tasks) => tasks.title !== task.title
              ),
            };
          } else {
            return tasks;
          }
        });
      } else {
        return [
          ...state,
          {
            projectId: projectId,
            projectTasks: [task],
          },
        ];
      }
    }
    case 'task/CLEAR_TASKS': {
      const { projectId } = action.payload as ClearTasksPayload;
      return state.filter((tasks) => tasks.projectId !== projectId);
    }

    case 'task/EDIT_TASK': {
      const { projectId, taskId, editedTask } =
        action.payload as EditTaskPayload;

      return state.map((project) => {
        if (project.projectId === projectId) {
          return {
            projectId: projectId,
            projectTasks: project.projectTasks.map((task) => {
              if (task.taskId === taskId) {
                return { ...task, ...editedTask };
              } else return task;
            }),
          };
        } else {
          return project;
        }
      });
    }
    case 'task/CREATE_SUB_TASK': {
      const { projectId, taskState, subTask } =
        action.payload as CreateSubTaskPayload;

      return state.map((project) => {
        if (project.projectId === projectId) {
          return {
            projectId: projectId,
            projectTasks: project.projectTasks.map((task) => {
              if (task.taskId === taskState.taskId) {
                return {
                  ...taskState,
                  subTasks:
                    task.subTasks === null
                      ? [{ ...subTask }]
                      : [...task.subTasks, { ...subTask }],
                };
              } else return task;
            }),
          };
        } else {
          return project;
        }
      });
    }
    case 'task/DELETE_SUB_TASK': {
      const { projectId, taskState, subTask } =
        action.payload as DeleteSubTaskPayload;

      return state.map((project) => {
        if (project.projectId === projectId) {
          return {
            projectId: projectId,
            projectTasks: project.projectTasks.map((task) => {
              if (task.taskId === taskState.taskId) {
                return {
                  ...taskState,
                  subTasks: task.subTasks?.filter(
                    (subTasks) => subTasks.taskId !== subTask.taskId
                  ),
                };
              } else return task;
            }),
          };
        } else {
          return project;
        }
      });
    }

    case 'task/ADD_COMMENT': {
      const { projectId, taskId, parentCommentId, comment } =
        action.payload as AddCommentTaskPayload;

      return state.map((project) => {
        if (project.projectId === projectId) {
          return {
            projectId: projectId,
            projectTasks: project.projectTasks.map((task) => {
              if (task.taskId === taskId) {
                // Не вложенные комментарии
                if (parentCommentId === null) {
                  return {
                    ...task,
                    comments:
                      task.comments !== null
                        ? [...task.comments, comment]
                        : [comment],
                  };
                } else if (parentCommentId) {
                  // Вложенные комментарии
                  const addCommentsRecursively = (
                    comments: Comment[],
                    parentCommentId: string,
                    addComment: Comment
                  ) =>
                    comments.map((comment) => {
                      if (comment.replies === null) {
                        if (comment.id === parentCommentId) {
                          comment.replies = [addComment];
                        }
                      } else if (comment.replies) {
                        if (comment.id === parentCommentId) {
                          comment.replies = [...comment.replies, addComment];
                        } else {
                          addCommentsRecursively(
                            comment.replies,
                            parentCommentId,
                            addComment
                          );
                        }
                      }
                      return comment;
                    });

                  return {
                    ...task,
                    comments: addCommentsRecursively(
                      task.comments as Comment[],
                      parentCommentId,
                      comment
                    ),
                  };
                } else return task;
              } else return task;
            }),
          };
        } else {
          return project;
        }
      });
    }
    default:
      return state;
  }
}

// Actions Creators
export const createTask = (payload: CreateTaskPayload) => ({
  type: 'task/CREATE_TASK',
  payload,
});

export const deleteTask = (payload: DeleteTaskPayload) => ({
  type: 'task/DELETE_TASK',
  payload,
});

export const clearTasks = (payload: ClearTasksPayload) => ({
  type: 'task/CLEAR_TASKS',
  payload,
});

export const editTask = (payload: EditTaskPayload) => ({
  type: 'task/EDIT_TASK',
  payload,
});

export const createSubTask = (payload: CreateSubTaskPayload) => ({
  type: 'task/CREATE_SUB_TASK',
  payload,
});

export const deleteSubTask = (payload: DeleteSubTaskPayload) => ({
  type: 'task/DELETE_SUB_TASK',
  payload,
});

export const addComment = (payload: AddCommentTaskPayload) => ({
  type: 'task/ADD_COMMENT',
  payload,
});

// Hooks
export const useTask = () => useSelector((state: RootState) => state.tasks);
