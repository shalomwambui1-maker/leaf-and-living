import { test, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

const renderAt = (path) =>
  render(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>)

const nav = () => screen.getByRole('navigation', { name: /main navigation/i })

test('Home is the active page at /', () => {
  renderAt('/')
  expect(within(nav()).getByRole('link', { name: 'Home' }))
    .toHaveAttribute('aria-current', 'page')
})

test('Shop is the active page at /shop', () => {
  renderAt('/shop')
  expect(within(nav()).getByRole('link', { name: 'Shop' }))
    .toHaveAttribute('aria-current', 'page')
})

test('Admin Portal is the active page at /admin', () => {
  renderAt('/admin')
  expect(within(nav()).getByRole('link', { name: 'Admin Portal' }))
    .toHaveAttribute('aria-current', 'page')
})

test('shows Not Found for an unknown route', () => {
  renderAt('/nope')
  expect(screen.getByText(/page not found/i)).toBeInTheDocument()
  expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/')
})