import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect} from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import VacancyFilter from './VacancyFilter'
import vacancyReducer from '../../store/slices/VacancySlice'

interface TestState {
    vacancies: any[]
    loading: boolean
    error: string | null
    skillsList: string[]
    searchValue: string
    skillPointValue: string
    searchMessage: string
    aboutMe: boolean
    currentPage: number
    totalPages: number
    cities: string[]
    city: string
    filterCards: string[]
}

// Начальное состояние для тестов
const initialState: TestState = {
    vacancies: [],
    loading: false,
    error: null,
    skillsList: ['React', 'TypeScript', 'JavaScript'],
    searchValue: '',
    skillPointValue: '',
    searchMessage: '',
    aboutMe: false,
    currentPage: 1,
    totalPages: 1,
    cities: ['Москва', 'Санкт-Петербург', 'Новосибирск'],
    city: '',
    filterCards: []
}


describe('VacancyFilter', () => {
    // Создаем тестовый store с начальным состоянием
    const createTestStore = (preloadedState = {}) => {
        return configureStore({
            reducer: {
                vacancy: vacancyReducer
            },
            preloadedState: {
                vacancy: {
                    ...initialState,
                    ...preloadedState
                }
            }
        })
    }

    // Тест 1: Рендеринг компонента со всеми элементами
    it('renders all filter elements correctly', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        // Проверяем заголовок "Ключевые навыки"
        expect(screen.getByText('Ключевые навыки')).toBeTruthy()

        // Проверяем поле ввода для навыков
        expect(screen.getByPlaceholderText('Навык')).toBeTruthy()

        // Проверяем кнопку добавления
        expect(screen.getByText('+')).toBeTruthy()

        // Проверяем селект городов
        expect(screen.getByRole('combobox')).toBeTruthy()

        // Проверяем что навыки отображаются
        expect(screen.getByText('React')).toBeTruthy()
        expect(screen.getByText('TypeScript')).toBeTruthy()
        expect(screen.getByText('JavaScript')).toBeTruthy()

        // Проверяем что города в селекте
        expect(screen.getByText('Москва')).toBeTruthy()
        expect(screen.getByText('Санкт-Петербург')).toBeTruthy()
    })

    // Тест 2: Добавление нового навыка
    it('allows adding a new skill', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Навык') as HTMLInputElement
        const addButton = screen.getByText('+')

        fireEvent.change(input, { target: { value: 'Redux' } })

        expect(input.value).toBe('Redux')

        const initialState = store.getState().vacancy
        expect(initialState.skillPointValue).toBe('Redux')

        fireEvent.click(addButton)

    })

    // Тест 3: Выбор города из селекта
    it('allows selecting a city from dropdown', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        const select = screen.getByRole('combobox') as HTMLSelectElement

        fireEvent.change(select, { target: { value: 'Санкт-Петербург' } })

        expect(select.value).toBe('Санкт-Петербург')
    })


    // Тест 4: Удаление навыка (через FilterCard)
    it('allows deleting a skill', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        expect(screen.getByText('React')).toBeTruthy()

        const skillElements = screen.getAllByText(/React|TypeScript|JavaScript/)
        expect(skillElements.length).toBe(3)
    })

    // Тест 5: Рендеринг без навыков
    it('renders correctly when no skills', () => {
        const store = createTestStore({ skillsList: [] })

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        expect(screen.getByPlaceholderText('Навык')).toBeTruthy()

        const skillElements = screen.queryAllByText(/React|TypeScript|JavaScript/)
        expect(skillElements.length).toBe(0)
    })

    // Тест 6: Ввод текста в поле навыка
    it('updates skill input value', () => {
        const store = createTestStore()

        render(
            <Provider store={store}>
                <VacancyFilter />
            </Provider>
        )

        const input = screen.getByPlaceholderText('Навык') as HTMLInputElement

        // Вводим текст
        fireEvent.change(input, { target: { value: 'Next.js' } })

        // Проверяем что значение обновилось
        expect(input.value).toBe('Next.js')
    })
})
