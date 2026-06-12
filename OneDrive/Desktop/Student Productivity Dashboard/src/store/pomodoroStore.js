import { create } from "zustand";

export const initialTimers = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
  round: 4,
};

export const sessionMapping = {
  Focus: "work",
  "Short Break": "shortBreak",
  "Long Break": "longBreak",
};

export const initialState = {
  Timers: initialTimers,
  session: "work",
  round: 1,
  isActive: false,
};

const useCounterStore = create((set) => ({
  count: initialTimers.work * 60,
  isActive: false,
  increment: () => set((state) => ({ count: state.count + 5 })),
  decrement: () => set((state) => ({ count: state.count - 5 })),
  start: () => set({ isActive: true }),
  stop: () => set({ isActive: false }),
  reset: () => set({ count: initialTimers.work * 60 }),
  tick: () =>
    set((state) => ({ count: state.count > 0 ? state.count - 1 : 0 })),
}));

const useWorkStore = create((set) => ({
  work: '',
  setWork: (value) => set({ work: value }),
}))

export { useWorkStore, useCounterStore }
