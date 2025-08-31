import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../test/utils'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary-600', 'text-white')
  })

  it('renders with different variants', () => {
    render(
      <div>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    )
    
    expect(screen.getByRole('button', { name: 'Primary' })).toHaveClass('bg-primary-600')
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass('bg-gray-100')
    expect(screen.getByRole('button', { name: 'Ghost' })).toHaveClass('hover:bg-gray-50')
  })

  it('renders with different sizes', () => {
    render(
      <div>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    )
    
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('px-3', 'py-1.5', 'text-sm')
    expect(screen.getByRole('button', { name: 'Medium' })).toHaveClass('px-4', 'py-2', 'text-sm')
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('px-6', 'py-3', 'text-base')
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button', { name: 'Click me' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    const handleClick = vi.fn()
    
    render(<Button onClick={handleClick} disabled>Disabled</Button>)
    
    const button = screen.getByRole('button', { name: 'Disabled' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
  })

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    
    const button = screen.getByRole('button', { name: 'Loading' })
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50')
  })
})