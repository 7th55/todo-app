// Hooks
import { useSelector } from 'react-redux';
// Types
import { RootState, Tasks } from 'shared/types';

type FilterActionType = 'filter/FILTER_TASKS';

type FilterActionPayload = {
  title?: string;
  tasks?: Tasks['projectTasks'];
};

type FilterAction = {
  type: FilterActionType;
  payload: FilterActionPayload;
};

const initialState = [] as Array<Tasks>;

export function filterReducer(state = initialState, action: FilterAction) {
  switch (action.type) {
    case 'filter/FILTER_TASKS': {
      const { title, tasks } = action.payload;

      if (title && tasks) {
        if (isNaN(Number(title))) {
          const regExp = new RegExp(
            `^${title.trim().replace(/\s+ /g, ' ')}`,
            'i'
          );
          return tasks.filter((task) => task.title.match(regExp));
        } else {
          const regExp = new RegExp(
            `^${title.trim().replace(/\s+ /g, ' ')}`,
            'i'
          );
          return tasks.filter((task) => task.taskId.toString().match(regExp));
        }
      }

      if (!title && tasks) {
        // Add existing tasks
        return [...tasks];
      } else if (!tasks && !title) {
        // Remove tasks
        console.log('ds');
        return [];
      } else {
        return state;
      }
    }
    default:
      return state;
  }
}

// Actions Creators
export const filterTasks = (payload: FilterActionPayload) => ({
  type: 'filter/FILTER_TASKS',
  payload,
});

// Hooks
export const useFilter = () => useSelector((state: RootState) => state.filter);
