// Hooks
import React, { useEffect, useLayoutEffect, useState } from 'react';
// Styles
import classes from './styles.module.css';

type AnimationProps = {
  children: React.ReactNode;
  onEnd?: () => void;
};
export const Animation = (props: AnimationProps) => {
  const { children, onEnd } = props;

  const [animation, setAnimation] = useState<'start' | 'end' | null>(null);

  useLayoutEffect(() => {
    setAnimation('start');
  }, []);

  return (
    <div
      className={classes.animation}
      data-animation={animation}
      onAnimationEnd={(e) => {
        setAnimation(null);
        e.animationName === 'end' && onEnd && onEnd();
      }}
      onClick={() => setAnimation('end')}
    >
      {children}
      <button
        onClick={() =>
          animation === null ? setAnimation('start') : setAnimation(null)
        }
      ></button>
    </div>
  );
};
