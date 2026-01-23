import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FilterCard from './FilterCard'

describe('FilterCard', () => {
    // Моковая функция для onDelete
    const mockOnDelete = vi.fn()

    // Тест 1: Рендеринг компонента
    it('renders skill name correctly', () => {
        render(<FilterCard card="React" onDelete={mockOnDelete} />)

        expect(screen.getByText('React')).toBeTruthy()

        expect(screen.getByText('✖')).toBeTruthy()
    })

    // Тест 2: Вызов onDelete при клике на кнопку
    it('calls onDelete when delete button is clicked', () => {
        render(<FilterCard card="TypeScript" onDelete={mockOnDelete} />)

        const deleteButton = screen.getByText('✖')

        fireEvent.click(deleteButton)

        expect(mockOnDelete).toHaveBeenCalledTimes(1)
    })

    // Тест 3: Рендеринг с другим названием навыка
    it('renders different skill names', () => {
        const { rerender } = render(<FilterCard card="JavaScript" onDelete={mockOnDelete} />)
        expect(screen.getByText('JavaScript')).toBeTruthy()

        rerender(<FilterCard card="Redux" onDelete={mockOnDelete} />)
        expect(screen.getByText('Redux')).toBeTruthy()

        rerender(<FilterCard card="Next.js" onDelete={mockOnDelete} />)
        expect(screen.getByText('Next.js')).toBeTruthy()
    })

    // Тест 4: Кнопка имеет правильный текст
    it('delete button has correct symbol', () => {
        render(<FilterCard card="Sass" onDelete={mockOnDelete} />)

        const button = screen.getByRole('button')
        expect(button.textContent).toBe('✖')
    })
})

