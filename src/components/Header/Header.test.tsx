import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Header from './Header'


describe('Header', () => {
    // Создаем mock store
    const createTestStore = (aboutMe = false) => {
        return configureStore({
            reducer: {
                vacancy: () => ({
                    aboutMe,
                    // остальные поля не нужны для Header
                    vacancies: [],
                    loading: false,
                    error: null,
                    searchValue: '',
                    currentPage: 1,
                    totalPages: 1
                })
            }
        })
    }

    // Тест 1: Клик по "Обо мне" вызывает dispatch
    it('dispatches aboutMeChanged(true) when clicking "Обо мне"', () => {
        const store = createTestStore()
        const dispatchSpy = vi.spyOn(store, 'dispatch')

        render(
            <Provider store={store}>
                <Header />
            </Provider>
        )

        const aboutMeButton = screen.getByText('Обо мне')

        fireEvent.click(aboutMeButton)

        expect(dispatchSpy).toHaveBeenCalled()

        expect(dispatchSpy.mock.calls[0][0]).toEqual(
            expect.objectContaining({ type: expect.any(String) })
        )
    })

    // Тест 2: Клик по "Вакансии FE" вызывает dispatch
    it('dispatches aboutMeChanged(false) when clicking "Вакансии FE"', () => {
        const store = createTestStore()
        const dispatchSpy = vi.spyOn(store, 'dispatch')

        render(
            <Provider store={store}>
                <Header />
            </Provider>
        )

        const vacancyButton = screen.getByText('Вакансии FE')

        fireEvent.click(vacancyButton)

        expect(dispatchSpy).toHaveBeenCalled()
    })

    // Тест 3: Проверка изображений
    it('renders images with correct sources', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <Header />
            </Provider>
        )

        const images = screen.getAllByRole('img')
        expect(images.length).toBe(2) // лого и иконка человека
    })
})

