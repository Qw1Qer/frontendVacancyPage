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
    const searchMessage = useAppSelector(state => state.vacancy.searchMessage)
    const aboutMe = useAppSelector(state => state.vacancy.aboutMe)
    const currentPage = useAppSelector(state => state.vacancy.currentPage)
    const city = useAppSelector(state => state.vacancy.city)
    const searchValue = useAppSelector(state => state.vacancy.searchValue)
    const error = useAppSelector(state => state.vacancy.error)
    const loading = useAppSelector(state => state.vacancy.loading)
    const skillArray = useAppSelector(state => state.vacancy.skillsList)
    const totalPages = useAppSelector(state => state.vacancy.totalPages)


    const handleChangePage = (page: number) => {
        dispatch(changePage(page))
    }

    useEffect(() => {
        dispatch(fetchVacancy(currentPage))
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },[dispatch,currentPage,city, searchValue,skillArray])


    return (aboutMe ?
                (<div className='AboutMe'>
                    <h2>Кто-то</h2>
                    <span>Привет! Я - Frontend-разработчик. Пишу приложения на React + TypeScript + Redux Toolkit.</span>
                </div>)
                : error
                ? (<div className='Error__Script'>
                        <div>
                        <h1>Упс! Такой страницы не существует</h1>
                        <button onClick={() => window.location.reload()}>На главную</button>
                        </div>
                        <p>Давайте перейдем к началу</p>
                        <img alt='sad-cat' src={catGif} />
                    </div>
                )
                :  (<>
                        <div className="VacancyList">
                            <VacancySearch />
                        <div className="VacancyList__cardList">
                            <VacancyFilter />
                        <div className='VacancyCardList'>
                        {vacancies.length > 0 ? vacancies?.map((vacancy:any ) => (
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
                            </div>}
                            </div>
                        </div>
                    </div>
                            {loading
                            || vacancies.length === 0 ? null
                                : <Pagination withEdges  total={totalPages} value={currentPage} onChange={(event) => handleChangePage(event)} />}
            </>
            )
        );
    };

export default VacancyList;