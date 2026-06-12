import { useInView } from 'react-intersection-observer'

export function useScrollReveal (threshold = 0.15) {
  const { ref, inView: visible } = useInView({ threshold, triggerOnce: true })
  return { ref, visible }
}

export function revealStyle (visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: `opacity 0.45s ease ${delay}ms, transform 0.45s ease ${delay}ms`
  }
}
