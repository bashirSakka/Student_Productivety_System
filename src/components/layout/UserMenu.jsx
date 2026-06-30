import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useState } from 'react'
import Modal from '../ui/Modal'
import useAuthStore from '../../store/authStore'
import api from '../../lib/api'
import {
  IconDots,
  IconTrash,
  IconLogout2
} from '@tabler/icons-react'
import Avatar from '../ui/Avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const menuItems = [
  {
    section: [
      { label: 'LogOut', icon: IconLogout2, danger: true, logout: true }
    ]
  },
  {
    section: [
      { label: 'Reset all data', icon: IconTrash, danger: true, modal: 'reset' }
    ]
  }
]

export default function UserMenu () {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState(null)
  const closeModal = () => setActiveModal(null)
  const userName = useAuthStore(state => state.user)
  const clearAuth = useAuthStore(state => state.clearAuth)
  const [resetLoading, setResetLoading] = useState(false)
  async function logOut () {
    try {
      await api.post('/api/logout')
      clearAuth()
      toast.success('Logged out successfully.')
      navigate('/login')
    } catch (error) {}
  }
  async function resetData () {
    setResetLoading(true)
    try {
      await api.post('/api/reset')
      toast.success('All data has been reset.')
      closeModal()
    } catch {
      toast.error('Failed to reset data.')
    } finally {
      setResetLoading(false)
    }
  }
  return (
    <Menu as='div' className='relative w-full'>
      <MenuButton className='flex flex-row p-2 gap-3 items-center cursor-pointer w-full rounded-[8px] border border-transparent transition-colors duration-150 data-open:bg-cream2 data-open:border-border-strong data-closed:bg-lavender-light data-closed:border-lavender-dark hover:bg-lavender-light'>
        <Avatar name={userName} className='w-6.5 h-6.5 text-xs shrink-0' />
        <div className='flex flex-col text-left flex-1'>
          <p className='font-medium text-xs text-text-primary leading-none mb-0.5'>
            {userName}
          </p>
          <p className='text-[11px] text-text-muted leading-none'>Student</p>
        </div>
        <IconDots size={14} className='text-text-muted shrink-0' />
      </MenuButton>

      <MenuItems
        transition
        anchor='down'
        className='w-[var(--button-width)] origin-bottom rounded-xl bg-cream2 border border-cream3 shadow-lg z-50 mb-2 transition duration-150 ease-out data-closed:scale-y-95 data-closed:opacity-0 data-closed:origin-bottom'
      >
        <div className='p-3.5 border-b border-cream3 flex items-center gap-2.5'>
          <Avatar name={userName} className='w-9 h-9 text-xs shrink-0' />
          <div>
            <p className='text-sm font-medium text-text-primary'>{userName}</p>
            <p className='text-[11px] text-text-muted mt-0.5'>
              Spring 2025 · 4.0 scale
            </p>
          </div>
        </div>

        {menuItems.map((group, i) => (
          <div key={i}>
            <div className='py-1'>
              {group.section.map(item => (
                <MenuItem key={item.label}>
                  <button
                    onClick={() => {
                      if (item.modal) setActiveModal(item.modal)
                      if (item.logout) logOut()
                      if (item.navigate) navigate(item.navigate)
                    }}
                    className={`flex items-center cursor-pointer gap-2.5 w-full px-4 py-1.5 text-[13px] transition-colors duration-100
                      ${
                        item.danger
                          ? 'text-red-700 data-focus:bg-red-50'
                          : 'text-text-primary data-focus:bg-cream2'
                      }`}
                  >
                    <item.icon
                      size={14}
                      className={`shrink-0 ${
                        item.danger ? 'text-red-400' : 'text-text-muted'
                      }`}
                    />
                    {item.label}
                    {item.hint && (
                      <span className='ml-auto text-[11px] text-text-muted'>
                        {item.hint}
                      </span>
                    )}
                  </button>
                </MenuItem>
              ))}
            </div>
            {i < menuItems.length - 1 && <hr className='border-cream3' />}
          </div>
        ))}
      </MenuItems>

      <Modal
        isOpen={activeModal === 'reset'}
        onClose={closeModal}
        header='Reset all data?'
      >
        <p className='text-xs text-text-muted mb-5'>
          This will permanently delete all your tasks, courses, and GPA data.
          This cannot be undone.
        </p>
        <div className='flex gap-2 justify-end'>
          <button
            onClick={closeModal}
            disabled={resetLoading}
            className='text-xs px-4 py-1.5 rounded-md border border-border-strong text-text-primary hover:bg-cream2 transition-colors cursor-pointer disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            onClick={resetData}
            disabled={resetLoading}
            className='text-xs px-4 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer disabled:opacity-60'
          >
            {resetLoading ? 'Resetting…' : 'Reset'}
          </button>
        </div>
      </Modal>

    </Menu>
  )
}
