import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status', { hidden: true })
    expect(spinner.firstChild).toHaveClass('h-8', 'w-8')
  })

  it('renders with different sizes', () => {
    const { container } = render(
      <div>
        <LoadingSpinner size="sm" />
        <LoadingSpinner size="md" />
        <LoadingSpinner size="lg" />
      </div>
    )
    
    const spinners = container.querySelectorAll('[role="status"] > div')
    expect(spinners[0]).toHaveClass('h-4', 'w-4')
    expect(spinners[1]).toHaveClass('h-8', 'w-8')
    expect(spinners[2]).toHaveClass('h-12', 'w-12')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    
    const container = screen.getByRole('status', { hidden: true })
    expect(container).toHaveClass('custom-class')
  })

  it('has spinning animation', () => {
    render(<LoadingSpinner />)
    
    const spinner = screen.getByRole('status', { hidden: true }).firstChild
    expect(spinner).toHaveClass('animate-spin')
  })
})