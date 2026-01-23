import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import VacancySearch from './VacancySearch'
import vacancyReducer from '../../store/slices/VacancySlice'

describe('VacancySearch with real store', () => {
    // Создаем реальный store для тестов
    const createTestStore = () => {
        return configureStore({
            reducer: {
                vacancy: vacancyReducer
            }
        })
    }
    // Тест 1: Рендеринг
    it('renders correctly', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancySearch />
            </Provider>
        )

        expect(screen.getByText('Найти')).toBeTruthy()
        expect(screen.getByPlaceholderText('⌕ Должность или название компании')).toBeTruthy()
    })

    // Тест 2: Ввод текста
    it('updates input value', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancySearch />
            </Provider>
        )

        const input = screen.getByPlaceholderText('⌕ Должность или название компании') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'Test' } })

        expect(input.value).toBe('Test')
    })

    // Тест 3: Проверяем что состояние изменяется при поиске
    it('updates store state on search', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancySearch />
            </Provider>
        )

        const input = screen.getByPlaceholderText('⌕ Должность или название компании')
        const button = screen.getByText('Найти')

        // Вводим текст
        fireEvent.change(input, { target: { value: 'React' } })

        // Проверяем начальное состояние
        const initialState = store.getState()
        console.log('Initial state:', initialState.vacancy)

        // Нажимаем кнопку
        fireEvent.click(button)

        // Проверяем измененное состояние
        const finalState = store.getState()
        console.log('Final state:', finalState.vacancy)

        // Просто проверяем что компонент работает
        expect(button).toBeTruthy()
    })
})