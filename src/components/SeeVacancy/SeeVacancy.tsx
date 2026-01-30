
import VacancyCard from "../VacancyCard/VacancyCard.tsx";
import './SeeVacancy.css'
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {useEffect} from "react";
import {seeVacancy} from "../../store/slices/VacancySlice.ts";

const SeeVacancy = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentVacancy = useAppSelector(state => state.vacancy.currentVacancy)

    useEffect(() => {
        if (id) {
            dispatch(seeVacancy(id));
        }
    }, [id, dispatch]);

    useEffect(() => {

        const timer = setTimeout(() => {

            if (!currentVacancy.id) {
                navigate('/vacancies', { replace: true });
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [id, currentVacancy.id, navigate]);



    const responsibility = currentVacancy.snippet.responsibility

    return (
        <div className='See'>
            <VacancyCard
                id={currentVacancy.id}
                items={currentVacancy.name}
                fork={currentVacancy.salary ? currentVacancy.salary : null}
                experience={currentVacancy.experience.name}
                company={currentVacancy.employer.name}
                workFormat={currentVacancy.work_format}
                city={currentVacancy.area.name}
                ref={currentVacancy.alternate_url}
                vac={true}
            />
            <div className='SeeVacancyCard'>
                <h3>Требования :</h3>
                {currentVacancy.snippet.requirement.replace(/<\/?[^>]+(>|$)/g, '')}


                {responsibility && (
                    <>
                <h3>Обязанности :</h3>
                {responsibility.replace(/<\/?[^>]+(>|$)/g, '')}
                    </>)
                }
            </div>
        </div>
    );
};

export default SeeVacancy;