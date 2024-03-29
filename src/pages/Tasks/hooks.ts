import { useLayoutEffect, useState } from 'react';
import { useUpperLayer } from 'shared/UI/UpperLayer/model/upperLayerReducer';

type UpperLayers =
  | 'create'
  | 'createSubTask'
  | 'edit'
  | 'addComment'
  | 'replyComment';

export type UpperLayersStates = UpperLayers | null;

export type UpperLayersHandlers = Record<
  `${UpperLayers | null}UpperLayerHandler`,
  () => void
>;

export const useUpperLayers = (): [UpperLayers | null, UpperLayersHandlers] => {
  const [upperLayer, setUpperLayer] = useState<UpperLayersStates>(null);

  const upperLayers: Array<UpperLayersStates> = [
    'create',
    'createSubTask',
    'edit',
    'addComment',
    'replyComment',
    null,
  ];

  const isOpenUpperLayerState = useUpperLayer().isOpen;

  useLayoutEffect(() => {
    if (isOpenUpperLayerState === false) setUpperLayer(null);
  }, [isOpenUpperLayerState]);

  const createHandlers = (arr: Array<UpperLayersStates>) => {
    const handlers: any = {};
    arr.forEach(
      (key) =>
        (handlers[
          typeof key === 'string'
            ? `${key}UpperLayerHandler`
            : 'nullUpperLayerHandler'
        ] = () => setUpperLayer(key))
    );

    return handlers as UpperLayersHandlers;
  };

  return [upperLayer, createHandlers(upperLayers)];
};
