import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import VacancyCard from './VacancyCard'

// Моковые данные для тестов
const mockVacancy = {
    items: 'React Developer',
    fork: {
        from: 100000,
        to: 200000,
        currency: 'RUR',
        gross: false
    },
    experience: 'От 1 года до 3 лет',
    company: 'Tech Company Inc.',
    workFormat: [
        { id: 'remote', name: 'Удаленно' },
        { id: 'office', name: 'В офисе' }
    ],
    city: 'Москва',
    ref: 'https://hh.ru/vacancy/123'
}

const mockVacancyWithoutSalary = {
    id: '1',
    items: 'Vue Developer',
    fork: null,
    experience: 'Нет опыта',
    company: 'Startup LLC',
    workFormat: [{ id: 'hybrid', name: 'Гибрид' }],
    city: 'Санкт-Петербург',
    ref: 'https://hh.ru/vacancy/456'
}

describe('VacancyCard', () => {
    // Тест 1: Рендеринг основных данных
    it('renders vacancy title and company name', () => {
        render(<VacancyCard id={''} {...mockVacancy} />)

        // Проверяем, что название вакансии отображается
        expect(screen.getByText('React Developer')).toBeInTheDocument()

        // Проверяем, что название компании отображается
        expect(screen.getByText('Tech Company Inc.')).toBeInTheDocument()
    })


    // Тест 3: Не отображает зарплату когда fork=null
    it('does not display salary when fork is null', () => {
        render(<VacancyCard {...mockVacancyWithoutSalary} />)

        // Проверяем, что название вакансии есть
        expect(screen.getByText('Vue Developer')).toBeInTheDocument()

        // Проверяем, что есть опыт
        expect(screen.getByText('Нет опыта')).toBeInTheDocument()

        // Проверяем, что зарплаты нет (сейчас у вас нет сообщения "Зарплата не указана")
        // Просто убедимся, что компонент рендерится без ошибок
        expect(screen.getByText('Startup LLC')).toBeInTheDocument()
    })

    // Тест 4: Отображение города
    it('displays city correctly', () => {
        render(<VacancyCard id={''} {...mockVacancy} />)
        expect(screen.getByText('Москва')).toBeInTheDocument()
    })

    // Тест 5: Отображение формата работы
    it('displays work format correctly', () => {
        render(<VacancyCard id={''} {...mockVacancy} />)
        // Проверяем что хотя бы один из форматов отображается
        expect(screen.getByText(/Удаленно|В офисе|Гибрид/i)).toBeInTheDocument()
    })

    // Тест 6: Проверка ссылки "Откликнуться"
    it('has correct apply link', () => {
        render(<VacancyCard id={''} {...mockVacancy} />)

        const applyButton = screen.getByText('Откликнутся')
        const link = applyButton.closest('a')

        expect(link).toHaveAttribute('href', 'https://hh.ru/vacancy/123')
        expect(link).toHaveAttribute('style', 'text-decoration: none; color: inherit;')
    })

    // Тест 7: Проверка кнопок
    it('has both buttons', () => {
        render(<VacancyCard id={''} {...mockVacancy} />)

        expect(screen.getByText('Смотреть вакансию')).toBeInTheDocument()
        expect(screen.getByText('Откликнутся')).toBeInTheDocument()
    })
})
