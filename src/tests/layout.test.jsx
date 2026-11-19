import { test, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

const renderAt = (path = '/') =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

const nav = () => screen.getByRole('navigation', { name: /main navigation/i })

test('navbar and footer appear on every page', () => {
  renderAt('/shop')
  expect(nav()).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
})

test('navbar links navigate between pages', async () => {
  const user = userEvent.setup()
  renderAt('/')

  await user.click(within(nav()).getByRole('link', { name: 'Shop' }))
  expect(within(nav()).getByRole('link', { name: 'Shop' }))
    .toHaveAttribute('aria-current', 'page')

  await user.click(within(nav()).getByRole('link', { name: 'Admin Portal' }))
  expect(within(nav()).getByRole('link', { name: 'Admin Portal' }))
    .toHaveAttribute('aria-current', 'page')
})