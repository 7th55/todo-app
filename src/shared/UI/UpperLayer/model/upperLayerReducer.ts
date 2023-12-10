import { useSelector } from 'react-redux';
import { RootState } from 'shared/types';

type UpperLayerActions = {
  type: 'upperLayer/TOGGLE';
  payload: {
    isOpen: boolean;
  };
};

export function upperLayerReducer(
  state = {
    isOpen: false,
  },
  action: UpperLayerActions
) {
  switch (action.type) {
    case 'upperLayer/TOGGLE': {
      const { isOpen } = action.payload;

      return {
        isOpen,
      };
    }
    default:
      return state;
  }
}

// Actions Creators
export const isOpenUpperLayer = (payload: UpperLayerActions['payload']) => ({
  type: 'upperLayer/TOGGLE',
  payload,
});

// Hooks
export const useUpperLayer = () =>
  useSelector((state: RootState) => state.upperLayer);
