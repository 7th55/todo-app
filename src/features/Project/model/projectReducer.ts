// Hooks
import { useSelector } from 'react-redux';
// Types
import { Projects, RootState } from 'shared/types';

type ProjectActionTypes = 'project/CREATE_PROJECT' | 'project/DELETE_PROJECT';

type AddProject = {
  id: string;
  name: string;
};

type DeleteProject = Pick<AddProject, 'id'>;

type ProjectPayload = AddProject | DeleteProject;

type ProjectAction = {
  type: ProjectActionTypes;
  payload: ProjectPayload;
};

const initialState = [] as Projects;

export function projectReducer(state = initialState, action: ProjectAction) {
  switch (action.type) {
    case 'project/CREATE_PROJECT': {
      const { id } = action.payload;

      if (state.find((project) => project.id === id)) {
        return state;
      } else if ('name' in action.payload) {
        const { name } = action.payload;

        return [...state, { id, name }];
      } else {
        return state;
      }
    }
    case 'project/DELETE_PROJECT': {
      const { id } = action.payload;

      return state.filter((project) => project.id !== id);
    }
    default:
      return state;
  }
}

// Actions Creators
export const createProject = (payload: ProjectAction['payload']) => ({
  type: 'project/CREATE_PROJECT',
  payload: payload,
});

export const deleteProject = (payload: ProjectAction['payload']) => ({
  type: 'project/DELETE_PROJECT',
  payload: payload,
});

// Hooks
export const useProject = () =>
  useSelector((state: RootState) => state.projects);
