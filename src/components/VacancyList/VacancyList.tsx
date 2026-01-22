import VacancySearch from "../VacancySearch/VacancySearch.tsx";
import VacancyCard from "../VacancyCard/VacancyCard.tsx";
import VacancyFilter from "../VacancyFilter/VacancyFilter.tsx";
import './VacancyList.css'
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {useEffect} from "react";
import {changePage, fetchVacancy} from "../../store/slices/VacancySlice.ts";
import {Pagination} from "@mantine/core";
import catGif from '../../assets/sad-cat.gif'


const VacancyList = () => {

    const dispatch = useAppDispatch();
    const vacancies = useAppSelector(state => state.vacancy.vacancies)
    const filteredVacancies = useAppSelector(state => state.vacancy.filteredVacancies)
    const searchMessage = useAppSelector(state => state.vacancy.searchMessage)
    const filteredOrNot = filteredVacancies.length > 0 || searchMessage ? filteredVacancies : vacancies
    const aboutMe = useAppSelector(state => state.vacancy.aboutMe)
    const skillFilter = useAppSelector(state => state.vacancy.filterCards)
    const currentPage = useAppSelector(state => state.vacancy.currentPage)
    const totalPage = useAppSelector(state => state.vacancy.totalPages)
    const city = useAppSelector(state => state.vacancy.city)
    const searchValue = useAppSelector(state => state.vacancy.searchValue)
    const error = useAppSelector(state => state.vacancy.error)

    // фильтрация по ключевым навыкам
    const handleSkillsFilter = () => {
        if (skillFilter.length === 0) {
            return filteredOrNot;
        }

        return filteredOrNot.filter((vacancy) => {
            const requirement = vacancy.snippet?.requirement || '';
            const requirementLower = requirement.trim().toLowerCase();


            return skillFilter.some(skill =>
                requirementLower.includes(skill.trim().toLowerCase())
            );
        });
    };

    // Изменение страницы
    const handleChangePage = (page: number) => {
        dispatch(changePage(page))
    }

    useEffect(() => {
        dispatch(fetchVacancy(currentPage))
    },[dispatch,currentPage,city, searchValue])


    return (aboutMe ?
                (<div className='AboutMe'>
                    <h2>Кто-то</h2>
                    <span>Привет! Я-Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit</span>
                </div>)
                : error
                ? (<div className='Error__Script'>
                        <div>
                        <h1>Упс! Такой страницы не существует</h1>
                        <button onClick={() => window.location.reload()}>На главную</button>
                        </div>
                        <p>Давайте перейдем к началу</p>
                        <img src={catGif} />
                    </div>
                )
                :  (<>
                        <div className="VacancyList">
                            <VacancySearch />
            <div className="VacancyList__cardList">
            <VacancyFilter />
                <div className='VacancyCardList'>
            {(handleSkillsFilter().length > 0 ? handleSkillsFilter()?.map((vacancy:any ) => (
                <VacancyCard
                    key={vacancy.id}
                    items={vacancy.name}
                    fork={vacancy.salary ? vacancy.salary : null}
                    experience={vacancy.experience.name}
                    company={vacancy.employer.name}
                    workFormat={vacancy.work_format}
                    city={vacancy.area.name}
                    ref={vacancy.alternate_url}
                />
            )): <div className='VacancyFilter__message'>
                {searchMessage}
            </div>)}
                </div>
            </div>
        </div>
              <Pagination  total={totalPage} value={currentPage} onChange={(event) => handleChangePage(event)} />
    </>
    )
    );
};

export default VacancyList;