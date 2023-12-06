// Hooks
import { useLayoutEffect } from 'react';
import { useUpperLayer } from './model/upperLayerReducer';
// Components
import { Button } from '../Button';
import { motion } from 'framer-motion';
// Lib
import { isOpenUpperLayer } from './model/upperLayerReducer';
// React Api
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
// Styles
import classes from './styles.module.css';

const fixHTMLElement = (element: HTMLElement) => {
  element.style.position = 'fixed';
  element.style.overflow = 'hidden';
  // element.style.width = '100%';
  // element.style.height = '100%';
};
const unfixHTMLElement = (element: HTMLElement) => {
  element.style.position = 'static';
  element.style.overflow = 'auto';
};

const upperLayer = document.querySelector('.upperLayer') as HTMLElement;

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
    if (isOpen && upperLayer) {
      fixHTMLElement(upperLayer);
    }
    if (isOpen === false && upperLayer) {
      unfixHTMLElement(upperLayer);
    }
  }, [isOpen]);

  return isOpen
    ? createPortal(
        <div
          className={classes.upperLayer}
          onClick={(e) => {
            e.preventDefault();
            if (closeModal) {
              closeModal();
            } else {
              if (isOpen && upperLayer) {
                unfixHTMLElement(upperLayer);
              }
              dispatch(isOpenUpperLayer({ isOpen: false }));
            }
          }}
        >
          <div className={classes.content} onClick={(e) => e.stopPropagation()}>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
            >
              <span className={classes.closeButton}>
                <Button
                  variant="outline"
                  style={{ borderColor: 'red', color: 'red' }}
                  onClickHandler={() => {
                    if (closeModal) {
                      closeModal();
                    } else {
                      if (isOpen && upperLayer) {
                        unfixHTMLElement(upperLayer);
                      }

                      dispatch(isOpenUpperLayer({ isOpen: false }));
                    }
                  }}
                >
                  close
                </Button>
              </span>
              {content}
            </motion.div>
          </div>
        </div>,
        document.body
      )
    : null;
};
