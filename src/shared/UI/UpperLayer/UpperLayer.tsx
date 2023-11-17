// Hooks
import { useEffect, useLayoutEffect } from 'react';
import { useUpperLayer } from './model/upperLayerReducer';
// Lib
import { isOpenUpperLayer } from './model/upperLayerReducer';
// React Api
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
// Styles
import classes from './styles.module.css';
import { Button } from '../Button';

export const UpperLayer = ({
  content,
  closeModal,
}: {
  content: React.ReactNode;
  closeModal?: () => void;
}) => {
  const isOpen = useUpperLayer().isOpen;
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const fixedLayer = document.querySelector('.upperLayer') as HTMLElement;
    if (isOpen && fixedLayer) {
      fixedLayer.style.position = 'fixed';
      fixedLayer.style.overflow = 'hidden';
      fixedLayer.style.width = '100%';
      fixedLayer.style.height = '100%';
    }
    if (isOpen === false && fixedLayer) {
      fixedLayer.style.position = 'static';
      fixedLayer.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // const fixedLayer = document.querySelector('.upperLayer') as HTMLElement;
      // if (isOpen && fixedLayer) {
      //   fixedLayer.style.position = 'static';
      //   fixedLayer.style.overflow = 'auto';
      // }
    };
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div
          style={{
            zIndex: 100,
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={(e) => {
            e.preventDefault();
            if (closeModal) {
              closeModal();
            } else {
              const fixedLayer = document.querySelector(
                '.upperLayer'
              ) as HTMLElement;
              if (isOpen && fixedLayer) {
                fixedLayer.style.position = 'static';
                fixedLayer.style.overflow = 'auto';
              }
              dispatch(isOpenUpperLayer({ isOpen: false }));
            }
          }}
        >
          <div className={classes.content} onClick={(e) => e.stopPropagation()}>
            <span className={classes.closeButton}>
              <Button
                variant="outline"
                style={{ borderColor: 'red', color: 'red' }}
                onClickHandler={() => {
                  if (closeModal) {
                    closeModal();
                  } else {
                    const fixedLayer = document.querySelector(
                      '.upperLayer'
                    ) as HTMLElement;
                    if (isOpen && fixedLayer) {
                      fixedLayer.style.position = 'static';
                      fixedLayer.style.overflow = 'auto';
                    }
                    dispatch(isOpenUpperLayer({ isOpen: false }));
                  }
                }}
              >
                close
              </Button>
            </span>
            {content}
          </div>
        </div>,
        document.body
      )
    : null;
};
