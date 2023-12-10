import { combineReducers, legacy_createStore as createStore } from 'redux';
// Reducers
import { projectReducer } from 'features/Project/model/projectReducer';
import { taskReducer } from 'features/Task/model/taskReducer';
import { filterReducer } from 'features/Filter/model/filterReducer';
import { upperLayerReducer } from 'shared/UI/UpperLayer/model/upperLayerReducer';
// Types
import { RootState } from 'shared/types';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) return undefined;
    else return JSON.parse(serializedState);
  } catch (err) {
    return console.error('Redux: Load State', err);
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('Redux: Save State', err);
  }
};

const persistedStore = loadState();

const rootReducer = combineReducers({
  projects: projectReducer,
  tasks: taskReducer,
  filter: filterReducer,
  upperLayer: upperLayerReducer,
});

export const store = createStore(rootReducer, persistedStore);

store.subscribe(() => {
  saveState(store.getState());
});
