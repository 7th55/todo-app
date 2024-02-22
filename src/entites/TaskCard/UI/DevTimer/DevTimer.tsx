import React, { useEffect, useInsertionEffect, useRef, useState } from 'react';
import { formatTimeAndDate } from 'shared/lib';

type DevTimerProps = {
  timeInDev: number;
  timeInDevHandler: (timeInDev: number) => void;
};

export const DevTimer = (props: DevTimerProps) => {
  const { timeInDev, timeInDevHandler } = props;
  const [timer, setTimer] = useState(() => ({
    time: timeInDev + 1000,
  }));

  useEffect(() => {
    const timerSetInterval = setInterval(() => {
      setTimer((t) => ({
        time: t.time + 1000,
      }));
    }, 1000);

    return () => {
      clearInterval(timerSetInterval);
      timeInDevHandler(timer.time);
    };
  }, [timer]);

  return (
    <span>
      Time In Development:{' '}
      {`${formatTimeAndDate(timer.time).hours}:${
        formatTimeAndDate(timer.time).minutes
      }:${formatTimeAndDate(timer.time).seconds}`}
    </span>
  );
};
