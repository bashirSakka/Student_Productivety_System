import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import useAuthStore from '../../store/authStore'
import useThemeStore from '../../store/themeStore'
import FormInput from '../ui/FormInput'
import ConfirmModal from '../ui/ConfirmModal'
import Avatar from '../ui/Avatar'
import { toast } from 'sonner'

function Spinner () {
  return (
    <svg className='animate-spin h-3.5 w-3.5 shrink-0' viewBox='0 0 24 24' fill='none'>
      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
    </svg>
  )
}

function SaveButton ({ loading, label }) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='text-xs px-4 py-1.5 rounded-md bg-lavender-dark text-white hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-60 flex items-center gap-2'
    >
      {loading && <Spinner />}
      {label}
    </button>
  )
}

function ErrorBox ({ errors }) {
  if (!Object.keys(errors).length) return null
  return (
    <div className='rounded-md bg-peach-light border border-peach/60 px-3 py-2.5 flex flex-col gap-1'>
      {Object.values(errors).flat().map((msg, i) => (
        <p key={i} className='text-xs text-peach-dark'>{msg}</p>
      ))}
    </div>
  )
}

export default function Settings () {
  const navigate   = useNavigate()
  const userName   = useAuthStore(state => state.user)
  const setUser    = useAuthStore(state => state.setUser)
  const clearAuth  = useAuthStore(state => state.clearAuth)

  const [name, setName]           = useState(userName ?? '')
  const [email, setEmail]         = useState('')
  const [profileLoading, setProfileLoading] = useState(false)

  const [pwForm, setPwForm] = useState({
    current_password: '',
    password: '',
    password_confirmation: ''
  })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwErrors, setPwErrors]   = useState({})

  const [deleteOpen, setDeleteOpen]       = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const theme       = useThemeStore(state => state.theme)
  const toggleTheme = useThemeStore(state => state.toggleTheme)

  useEffect(() => {
    api.get('/api/user')
      .then(({ data }) => {
        setEmail(data.email ?? '')
        setName(data.name ?? userName ?? '')
      })
      .catch(() => {})
  }, [])

  async function handleProfileSave (e) {
    e.preventDefault()
    setProfileLoading(true)
    try {
      const { data } = await api.patch('/api/user', { name })
      setUser(data.name)
      toast.success('Profile updated.')
    } catch {
      toast.error('Failed to update profile.')
    } finally {
      setProfileLoading(false)
    }
  }

  async function handlePasswordSave (e) {
    e.preventDefault()
    setPwErrors({})
    setPwLoading(true)
    try {
      await api.put('/api/password', pwForm)
      toast.success('Password updated.')
      setPwForm({ current_password: '', password: '', password_confirmation: '' })
    } catch (err) {
      const data = err.response?.data
      setPwErrors(
        data?.errors ??
        (data?.message ? { message: [data.message] } : { message: ['Failed to update password.'] })
      )
    } finally {
      setPwLoading(false)
    }
  }

  async function handleDeleteAccount () {
    setDeleteLoading(true)
    try {
      await api.delete('/api/user')
      clearAuth()
      navigate('/login')
      toast.success('Account deleted.')
    } catch {
      toast.error('Failed to delete account.')
      setDeleteLoading(false)
      setDeleteOpen(false)
    }
  }

  return (
    <div className='flex-1 overflow-y-auto p-6 lg:p-9'>
      <div className='max-w-lg'>
        <h1 className='font-display text-[26px] font-normal text-text-primary mb-1'>
          Settings
        </h1>
        <p className='text-[13px] text-text-muted mb-8'>
          Manage your profile and account security.
        </p>

        {/* Profile */}
        <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted mb-4'>
          Profile
        </p>
        <div className='flex items-center gap-4 mb-6'>
          <Avatar name={name || userName} className='w-16 h-16 text-xl shrink-0' />
          <div>
            <p className='text-sm font-medium text-text-primary'>{name || userName}</p>
            <p className='text-xs text-text-muted mt-0.5'>{email}</p>
          </div>
        </div>
        <form onSubmit={handleProfileSave} className='flex flex-col gap-4'>
          <FormInput
            label='Full name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormInput
            label='Email'
            type='email'
            value={email}
            readOnly
            className='opacity-60 cursor-default'
          />
          <div className='flex justify-end'>
            <SaveButton loading={profileLoading} label='Save changes' />
          </div>
        </form>

        <hr className='border-border-strong my-8' />

        {/* Password */}
        <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted mb-4'>
          Password
        </p>
        <form onSubmit={handlePasswordSave} className='flex flex-col gap-4'>
          <FormInput
            label='Current password'
            type='password'
            value={pwForm.current_password}
            onChange={e => setPwForm({ ...pwForm, current_password: e.target.value })}
          />
          <FormInput
            label='New password'
            type='password'
            value={pwForm.password}
            onChange={e => setPwForm({ ...pwForm, password: e.target.value })}
          />
          <FormInput
            label='Confirm new password'
            type='password'
            value={pwForm.password_confirmation}
            onChange={e => setPwForm({ ...pwForm, password_confirmation: e.target.value })}
          />
          <ErrorBox errors={pwErrors} />
          <div className='flex justify-end'>
            <SaveButton loading={pwLoading} label='Update password' />
          </div>
        </form>

        <hr className='border-border-strong my-8' />

        {/* Appearance */}
        <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted mb-4'>
          Appearance
        </p>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-sm font-medium text-text-primary'>Theme</p>
            <p className='text-xs text-text-muted mt-0.5'>
              {theme === 'dark' ? 'Dark mode is on' : 'Light mode is on'}
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${
              theme === 'dark' ? 'bg-lavender-dark' : 'bg-cream3'
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <hr className='border-border-strong my-8' />

        {/* Danger zone */}
        <p className='text-[10px] font-medium uppercase tracking-[0.08em] text-red-500 mb-4'>
          Danger Zone
        </p>
        <div className='border border-red-200 rounded-lg p-4 flex items-center justify-between gap-4'>
          <div>
            <p className='text-sm font-medium text-text-primary'>Delete account</p>
            <p className='text-xs text-text-muted mt-0.5'>
              Permanently delete your account and all associated data. This cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setDeleteOpen(true)}
            className='shrink-0 text-xs px-4 py-1.5 rounded-md border border-red-300 text-red-600 hover:bg-red-50 transition-colors cursor-pointer'
          >
            Delete account
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => !deleteLoading && setDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        title='Delete your account?'
        message='This will permanently delete your account, courses, tasks, notes, and all other data. This cannot be undone.'
      />
    </div>
  )
}
