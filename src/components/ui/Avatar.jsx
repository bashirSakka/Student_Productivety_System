const PALETTES = [
  { bg: 'bg-lavender-light', text: 'text-lavender-dark'  },
  { bg: 'bg-peach-light',    text: 'text-peach-dark'     },
  { bg: 'bg-sage-light',     text: 'text-sage-dark'      },
  { bg: 'bg-sky-light',      text: 'text-sky'            },
  { bg: 'bg-cream3',         text: 'text-text-secondary' },
  { bg: 'bg-lavender',       text: 'text-lavender-dark'  },
]

function getInitials (name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function hashName (name) {
  let hash = 5381
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 33) ^ name.charCodeAt(i)
  }
  return Math.abs(hash)
}

export default function Avatar ({ name = '', className = '' }) {
  const initials = getInitials(name)
  const palette  = PALETTES[hashName(name) % PALETTES.length]

  return (
    <div className={`flex items-center justify-center rounded-full font-medium ${palette.bg} ${palette.text} ${className}`}>
      {initials}
    </div>
  )
}
