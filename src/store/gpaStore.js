import { create } from 'zustand'

const useGpaStore = create(set => ({
  gpa: null,
  courses: [],
  setGpa:     gpa     => set({ gpa }),
  setCourses: courses => set({ courses })
}))

export default useGpaStore
