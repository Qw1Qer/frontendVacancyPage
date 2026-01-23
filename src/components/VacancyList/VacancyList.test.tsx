import { render, screen} from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import VacancyList from './VacancyList'

vi.mock('../../assets/sad-cat.gif', () => ({
    default: 'cat.gif'
}))

vi.mock('../VacancySearch/VacancySearch', () => ({
    default: () => <div data-testid="vacancy-search">VacancySearch Mock</div>
}))

vi.mock('../VacancyFilter/VacancyFilter', () => ({
    default: () => <div data-testid="vacancy-filter">VacancyFilter Mock</div>
}))

vi.mock('../VacancyCard/VacancyCard', () => ({
    default: ({ items }: { items: string }) => (
        <div data-testid="vacancy-card">{items}</div>
    )
}))

vi.mock('@mantine/core', () => ({
    Pagination: ({ total, value, onChange, withEdges }: any) => (
        <div data-testid="pagination">
            <button onClick={() => onChange(value - 1)}>Prev</button>
            <span>Page {value} of {total}</span>
            <button onClick={() => onChange(value + 1)}>Next</button>
            {withEdges && <span>With Edges</span>}
        </div>
    )
}))

window.scrollTo = vi.fn()

describe('VacancyList', () => {
    // Создаем простой reducer для тестов
    const testReducer = (state = {}) => state

    // Создаем тестовый store
    const createTestStore = (stateOverrides = {}) => {
        return configureStore({
            reducer: {
                vacancy: testReducer
            },
            preloadedState: {
                vacancy: {
                    vacancies: [],
                    searchMessage: '',
                    aboutMe: false,
                    currentPage: 1,
                    totalPages: 5,
                    city: '',
                    searchValue: '',
                    error: null,
                    loading: false,
                    skillsList: [],
                    ...stateOverrides
                }
            }
        })
    }

    // Тест 1: Рендеринг списка вакансий
    it('renders vacancy list with child components', () => {
        const store = createTestStore({
            vacancies: [
                {
                    id: '1',
                    name: 'React Developer',
                    salary: { from: 100000, to: 200000 },
                    experience: { name: '1-3 года' },
                    employer: { name: 'Company A' },
                    work_format: [{ id: 'remote', name: 'Удаленно' }],
                    area: { name: 'Москва' },
                    alternate_url: 'https://hh.ru/vacancy/1'
                }
            ]
        })

        render(
            <Provider store={store}>
                <VacancyList />
            </Provider>
        )

        expect(screen.getByTestId('vacancy-search')).toBeTruthy()
        expect(screen.getByTestId('vacancy-filter')).toBeTruthy()
    })

    // Тест 2: Отображение состояния "Обо мне"
    it('renders about me section when aboutMe is true', () => {
        const store = createTestStore({ aboutMe: true })

        render(
            <Provider store={store}>
                <VacancyList />
            </Provider>
        )

        expect(screen.getByText('Кто-то')).toBeTruthy()
        expect(screen.getByText(/Привет! Я - Frontend-разработчик/i)).toBeTruthy()
    })

    // Тест 3: Отображение ошибки
    it('renders error section when error exists', () => {
        const store = createTestStore({
            error: 'Server error',
            aboutMe: false
        })

        render(
            <Provider store={store}>
                <VacancyList />
            </Provider>
        )

        expect(screen.getByText('Упс! Такой страницы не существует')).toBeTruthy()
        expect(screen.getByText('На главную')).toBeTruthy()
    })

    // Тест 4: Отображение сообщения при отсутствии вакансий
    it('renders message when no vacancies found', () => {
        const store = createTestStore({
            vacancies: [],
            searchMessage: 'По вашему запросу ничего не найдено'
        })

        render(
            <Provider store={store}>
                <VacancyList />
            </Provider>
        )

        expect(screen.getByText('По вашему запросу ничего не найдено')).toBeTruthy()
    })
})
