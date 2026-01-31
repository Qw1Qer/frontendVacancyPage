
import VacancyCard from "../VacancyCard/VacancyCard.tsx";
import './SeeVacancy.css'
import { useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {useEffect, useState} from "react";
import {seeVacancy} from "../../store/slices/VacancySlice.ts";

const SeeVacancy = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const currentVacancy = useAppSelector(state => state.vacancy.currentVacancy);
    const [localData, setLocalData] = useState(null);


    useEffect(() => {
        if (id) {
            const saved = localStorage.getItem(`vacancies/${id}`);
            if (saved) {
                setLocalData(JSON.parse(saved));
            }

            dispatch(seeVacancy(id));

        }
    }, [id, dispatch]);


    const vacancyData = currentVacancy.id ? currentVacancy : localData;

    const responsibility = vacancyData?.snippet.responsibility

    return (
        <div className='See'>
            <VacancyCard
                id={vacancyData?.id}
                items={vacancyData?.name}
                fork={vacancyData?.salary ? vacancyData?.salary : null}
                experience={vacancyData?.experience.name}
                company={vacancyData?.employer.name}
                workFormat={vacancyData?.work_format}
                city={vacancyData?.area.name}
                ref={vacancyData?.alternate_url}
                vac={true}
            />
            <div className='SeeVacancyCard'>
                <h3>Требования :</h3>
                {vacancyData?.snippet.requirement.replace(/<\/?[^>]+(>|$)/g, '')}


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