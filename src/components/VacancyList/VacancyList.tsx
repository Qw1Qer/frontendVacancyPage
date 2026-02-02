import VacancySearch from "../VacancySearch/VacancySearch.tsx";
import VacancyFilter from "../VacancyFilter/VacancyFilter.tsx";
import './VacancyList.css'
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {useEffect} from "react";
import {changePage, fetchVacancy} from "../../store/slices/VacancySlice.ts";
import {Pagination, Tabs} from "@mantine/core";
import { Outlet, useLocation, useNavigate} from "react-router-dom";





const VacancyList = () => {

    const dispatch = useAppDispatch();
    const vacancies = useAppSelector(state => state.vacancy.vacancies)
    const currentPage = useAppSelector(state => state.vacancy.currentPage)
    const city = useAppSelector(state => state.vacancy.city)
    const searchValue = useAppSelector(state => state.vacancy.searchValue)
    const loading = useAppSelector(state => state.vacancy.loading)
    const skillArray = useAppSelector(state => state.vacancy.skillsList)
    const totalPages = useAppSelector(state => state.vacancy.totalPages)

    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {

    }, []);

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


    return (

            <>
                <div className="VacancyList">
                    <VacancySearch />
                    <div className="VacancyList__cardList">
                        <VacancyFilter />
                        <div className='VacancyCardList'>
                            <Tabs defaultValue={location.pathname} >
                                <Tabs.List >
                                    <Tabs.Tab
                                        value="/vacancies/moscow"
                                        onClick={() => navigate('/vacancies/moscow')}
                                    >
                                        Москва
                                    </Tabs.Tab>
                                    <Tabs.Tab
                                        value="/vacancies/petersburg"
                                        onClick={() => navigate('/vacancies/petersburg')}
                                    >
                                        Санкт-Петербург
                                    </Tabs.Tab>
                                </Tabs.List>
                            </Tabs>

                            <Outlet/>

                        </div>
                    </div>
                </div>
                {loading || vacancies.length === 0 ? null : (
                    <Pagination
                        withEdges
                        total={totalPages}
                        value={currentPage}
                        onChange={(event) => handleChangePage(event)}
                    />
                )}
            </>

    );
    };

export default VacancyList;