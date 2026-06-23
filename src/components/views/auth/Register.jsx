import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../ui/Card'
import Button from '../../ui/Button'
import FormInput from '../../ui/FormInput'
import { bgLanding, btn } from '../../landing/tokens'
import { useNavigate } from 'react-router-dom'
import api from '../../../lib/api'
import { toast } from 'sonner'

export default function Register () {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState({})
  const { name, email, password, password_confirmation } = form
  const navigate = useNavigate()

  async function handleSubmit (e) {
    e.preventDefault()
    setErrors({})
    try {
      await api.post('/api/register', { name, email, password, password_confirmation })
      toast.success('Account created! Please sign in.')
      navigate('/login')
    } catch (err) {
      setErrors(err.response?.data?.errors ?? {})
    }
  }

  return (
    <div className={`min-h-screen ${bgLanding} flex flex-col items-center justify-center px-4`}>
      <div className='font-serif text-2xl font-medium text-text-primary mb-8'>
        study<em className='italic text-amber-800'>flow</em>
      </div>

      <Card className='w-full max-w-sm p-8'>
        <h1 className='font-serif font-medium text-[22px] tracking-tight text-text-primary mb-1'>
          Create your account
        </h1>
        <p className='text-xs text-text-muted mb-6'>
          Free for students. No credit card needed.
        </p>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <FormInput
            label='Full name'
            type='text'
            placeholder='Maya Hassan'
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
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
          <FormInput
            label='Confirm password'
            type='password'
            value={form.password_confirmation}
            onChange={e => setForm({ ...form, password_confirmation: e.target.value })}
          />

          {Object.keys(errors).length > 0 && (
            <div className='rounded-md bg-peach-light border border-peach/60 px-3 py-2.5 flex flex-col gap-1'>
              {Object.values(errors).flat().map((msg, i) => (
                <p key={i} className='text-xs text-peach-dark'>{msg}</p>
              ))}
            </div>
          )}

          <Button onClick={handleSubmit} className={`${btn} w-full mt-1 text-sm`}>
            Create account
          </Button>
        </form>

        <p className='text-xs text-text-muted text-center mt-5'>
          Already have an account?{' '}
          <Link to='/login' className='text-amber-800 hover:underline font-medium'>
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  )
}
