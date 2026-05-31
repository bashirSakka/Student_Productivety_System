// src/components/Card.jsx
export default function Card ({ children, className = '' }) {
  return (
    <div
      className={`bg-white p-4 rounded-[10px] border border-border-strong ${className}`}
    >
      {children}
    </div>
  )
}
