import { create } from 'zustand'

export const initialTimers = { work: 25, shortBreak: 5, longBreak: 15, round: 4 }

export const sessionMapping = {
  Focus: 'work',
  'Short Break': 'shortBreak',
  'Long Break': 'longBreak'
}

export const initialState = {
  Timers: initialTimers,
  session: 'work',
  round: 1,
  isActive: false
}

export const useCounterStore = create(set => ({
  count:             initialTimers.work * 60,
  isActive:          false,
  session:           'work',
  round:             1,
  timers:            { ...initialTimers },
  completedSessions: 0,

  start: () => set({ isActive: true }),
  stop:  () => set({ isActive: false }),

  reset: () => set(state => ({
    count: state.timers[state.session] * 60,
    isActive: false
  })),

  setSession: session => set(state => ({
    session,
    count: state.timers[session] * 60,
    isActive: false
  })),

  incrementTimer: key => set(state => {
    const max = { work: 90, shortBreak: 30, longBreak: 60, round: 10 }[key] ?? 90
    const val = Math.min(max, state.timers[key] + 1)
    const timers = { ...state.timers, [key]: val }
    const count = state.session === key ? val * 60 : state.count
    return { timers, count }
  }),

  decrementTimer: key => set(state => {
    const val = Math.max(1, state.timers[key] - 1)
    const timers = { ...state.timers, [key]: val }
    const count = state.session === key ? val * 60 : state.count
    return { timers, count }
  }),

  tick: () => set(state => {
    if (state.count > 1) return { count: state.count - 1 }
    const completedSessions =
      state.session === 'work' ? state.completedSessions + 1 : state.completedSessions
    const newRound  = state.session === 'work' ? state.round + 1 : state.round
    const goLong      = state.session === 'work' && newRound > state.timers.round
    const nextSession = state.session === 'work'
      ? (goLong ? 'longBreak' : 'shortBreak')
      : 'work'
    const nextRound = goLong ? 1 : newRound
    return {
      count: state.timers[nextSession] * 60,
      session: nextSession,
      round: nextRound,
      isActive: false,
      completedSessions
    }
  })
}))

export const useWorkStore = create(set => ({
  work: '',
  setWork: value => set({ work: value })
}))
