// Hooks
import { useSelector } from 'react-redux';
// Types
import { Projects, RootState } from 'shared/types';

type ProjectActions = {
  type: 'project/CREATE_PROJECT';
  payload: {
    id: string;
    name: string;
  };
};

const initialState = [] as Projects;

export function projectReducer(state = initialState, action: ProjectActions) {
  switch (action.type) {
    case 'project/CREATE_PROJECT': {
      if (state.find((project) => project.id === action.payload.id)) {
        return state;
      } else {
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
          },
        ];
      }
    }
    default:
      return state;
  }
}

export const useProject = () =>
  useSelector((state: RootState) => state.projects);
