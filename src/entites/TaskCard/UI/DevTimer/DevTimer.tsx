import React, { useEffect } from 'react';
import { formatTimeAndDate } from 'shared/lib';

type DevTimerProps = {
  timeInDev: number;
  timeInDevHandler: (timeInDev: number) => void;
};

export const DevTimer = (props: DevTimerProps) => {
  const { timeInDev, timeInDevHandler } = props;

  useEffect(() => {
    const timeInDevTimer = setInterval(() => {
      timeInDevHandler(timeInDev + 1000);
    }, 1000);

    return () => {
      clearInterval(timeInDevTimer);
    };
  }, [timeInDev, timeInDevHandler]);

  return (
    <span>
      Time In Development:{' '}
      {`${formatTimeAndDate(timeInDev).hours}:${
        formatTimeAndDate(timeInDev).minutes
      }:${formatTimeAndDate(timeInDev).seconds}`}
    </span>
  );
};
