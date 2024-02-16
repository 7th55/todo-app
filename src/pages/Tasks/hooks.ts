import { useLayoutEffect, useState } from 'react';
import { useUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type UpperLayers =
  | 'Create'
  | 'CreateSubTask'
  | 'Edit'
  | 'AddComment'
  | 'ReplyComment';

export const useUpperLayers = () => {
  const [upperLayer, setUpperLayer] = useState<UpperLayers | null>(null);

  const isOpenUpperLayerState = useUpperLayer().isOpen;

  useLayoutEffect(() => {
    if (isOpenUpperLayerState === false) setUpperLayer(null);
  }, [isOpenUpperLayerState]);

  return [upperLayer];
};
