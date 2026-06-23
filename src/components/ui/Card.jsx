// src/components/Card.jsximport { twMerge } from 'tailwind-merge'
import { twMerge } from 'tailwind-merge'

export default function Card ({
  children,
  className = '',
  style,
  onClick,
  header = '',
  body = '',
  bodyClass = '',
  headerClass = ''
}) {
  return (
    <div
      style={style}
      onClick={onClick}
      className={twMerge(
        `bg-white p-4 rounded-[10px] border border-border-strong ${className}`
      )}
    >
      <h3
        className={twMerge(
          `text-[11px] text-text-muted uppercase tracking-[0.07em] mb-[5px] ${headerClass}`
        )}
      >
        {header}
      </h3>
      <p
        className={twMerge(
          `text-[26px] font-light text-text-primary tracking-tight font-family-display ${bodyClass} overflow-hidden`
        )}
      >
        {body}
      </p>
      {children}
    </div>
  )
}
