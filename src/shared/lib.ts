// TODO: Генерировать уникальный идентификатор не на "Math.random".
export const createId = () => Math.floor(Math.random() * 1000000).toString();

export const getTaskTime = (whatTime?: 'create' | 'development' | 'done') => {
  const time = new Date();
  return {
    ms: new Date().getTime(),
    time: `${time.getHours()}:${time.getMinutes()}`,
    date: `${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`,
  };
};

export const formatTimeAndDate = (ms: number) => {
  return {
    years: Math.floor(ms / (1000 * 60 * 60 * 24 * 30 * 12)),
    months: Math.floor((ms / (1000 * 60 * 60 * 24 * 30)) % 12),
    days: Math.floor((ms / (1000 * 60 * 60 * 24)) % 30),
    hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((ms / (1000 * 60)) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
};

export const checkWidth = () => {
  return window.innerWidth;
};

export const isEmptyString = (value: string) => value.trim() === '';

export const className = (className: string) => `.${className}`;
