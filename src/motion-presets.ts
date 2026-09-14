export type MotionTiming = {
  duration: number;
  easing: string;
  curve: readonly [number, number, number, number];
};

export const motionTimings = {
  navigation: {
    forward: {
      duration: 240,
      easing: 'cubic-bezier(0.2, 0.7, 0.25, 1)',
      curve: [0.2, 0.7, 0.25, 1],
    },
    back: {
      duration: 280,
      easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      curve: [0.25, 0.1, 0.25, 1],
    },
    outgoing: 160,
  },
  focus: {
    open: {
      duration: 420,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      curve: [0.22, 1, 0.36, 1],
    },
    close: {
      duration: 360,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      curve: [0.22, 1, 0.36, 1],
    },
  },
  mobile: {
    open: {
      duration: 360,
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      curve: [0.22, 0.61, 0.36, 1],
    },
    close: {
      duration: 260,
      easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
      curve: [0.4, 0, 0.6, 1],
    },
  },
  feedback: {
    acknowledge: {
      duration: 360,
      easing: 'ease-in-out',
      curve: [0.42, 0, 0.58, 1],
    },
  },
} as const satisfies {
  navigation: { forward: MotionTiming; back: MotionTiming; outgoing: number };
  focus: { open: MotionTiming; close: MotionTiming };
  mobile: { open: MotionTiming; close: MotionTiming };
  feedback: { acknowledge: MotionTiming };
};
