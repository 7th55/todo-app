export const TRANSITION_DURATION = 1;

export const variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: TRANSITION_DURATION,
    },
  },
};
