import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import FormInput from '../../ui/FormInput'
import { bgLanding, btn } from '../../landing/tokens'
import useAuthStore from '../../../store/authStore'
import api from '../../../lib/api'

export default function Login () {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const { email, password } = form
  const setToken = useAuthStore(state => state.setToken)
  const setId = useAuthStore(state => state.setId)
  const setUser = useAuthStore(state => state.setUser)
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
    setErrors({})
    try {
      const { data } = await api.post('/api/login', { email, password })
      setToken(data.token)
      setId(data.user.id)
      setUser(data.user.name)
      navigate('/dashboard')
    } catch (err) {
      setErrors(err.response?.data?.errors ?? {})
    }
  }

  return (
    <div
      className={`min-h-screen ${bgLanding} flex flex-col items-center justify-center px-4`}
    >
      <div className='font-serif text-2xl font-medium text-text-primary mb-8'>
        study<em className='italic text-amber-800'>flow</em>
      </div>

      <Card className='w-full max-w-sm p-8'>
        <h1 className='font-serif font-medium text-[22px] tracking-tight text-text-primary mb-1'>
          Welcome back
        </h1>
        <p className='text-xs text-text-muted mb-6'>
          Sign in to continue to your dashboard.
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <FormInput
            label='Email'
            type='email'
            placeholder='you@university.edu'
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <FormInput
            label='Password'
            type='password'
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          {Object.keys(errors).length > 0 && (
            <div className='rounded-md bg-peach-light border border-peach/60 px-3 py-2.5 flex flex-col gap-1'>
              {Object.values(errors)
                .flat()
                .map((msg, i) => (
                  <p key={i} className='text-xs text-peach-dark'>
                    {msg}
                  </p>
                ))}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            className={`${btn} w-full mt-1 text-sm`}
          >
            Sign in
          </Button>
        </form>

        <p className='text-xs text-text-muted text-center mt-5'>
          No account yet?{' '}
          <Link
            to='/register'
            className='text-amber-800 hover:underline font-medium'
          >
            Create one
          </Link>
        </p>
      </Card>
    </div>
  )
}
