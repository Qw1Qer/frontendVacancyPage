import VacancyCard from "../VacancyCard/VacancyCard.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {useEffect} from "react";
import {searchCityValue} from "../../store/slices/VacancySlice.ts";

type VacanciesTabProps = {
    tab?: string;
}


const VacanciesTab = ({tab}: VacanciesTabProps) => {
    const dispatch = useAppDispatch();
    const vacancies = useAppSelector(state => state.vacancy.vacancies)

    useEffect(() => {
        console.log()
        if(tab) {
            dispatch(searchCityValue(tab))
        }
    }, [tab]);

    return (
        <div>
            { vacancies.map((vacancy: any) => (
                <VacancyCard
                    key={vacancy.id}
                    id={vacancy.id}
                    items={vacancy.name}
                    fork={vacancy.salary ? vacancy.salary : null}
                    experience={vacancy.experience.name}
                    company={vacancy.employer.name}
                    workFormat={vacancy.work_format}
                    city={vacancy.area.name}
                    ref={vacancy.alternate_url}
                />))


            }
        </div>
    );
};

export default VacanciesTab;