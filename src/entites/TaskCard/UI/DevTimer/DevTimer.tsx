import React, { useEffect, useInsertionEffect, useRef, useState } from 'react';
import { formatTimeAndDate } from 'shared/lib';

type DevTimerProps = {
  timeInDev: number;
  timeInDevHandler: (timeInDev: number) => void;
};

export const DevTimer = (props: DevTimerProps) => {
  const { timeInDev, timeInDevHandler } = props;
  const [timer, setTimer] = useState(() => ({
    time: timeInDev,
  }));

  useEffect(() => {
    const timerSetInterval = setInterval(() => {
      setTimer({
        time: timeInDev + 1000,
      });
    }, 1000);

    return () => {
      clearInterval(timerSetInterval);
      timeInDevHandler(timer.time + 1000);
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
