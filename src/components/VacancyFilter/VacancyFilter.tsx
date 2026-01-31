import './VacancyFilter.css'
import FilterCard from "../FilterCard/FilterCard.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {
    addSkill,
    deleteSkill, resetPage,
    searchCityValue,
    setSkillValue,
} from "../../store/slices/VacancySlice.ts";
import * as React from "react";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const VacancyFilter = () => {

    const dispatch = useAppDispatch();
    const skillsList = useAppSelector(state => state.vacancy.skillsList);
    const vacancyCity = useAppSelector(state => state.vacancy.cities)
    const skillValue = useAppSelector(state => state.vacancy.skillPointValue)



    const [search, setSearch] = useSearchParams();

    useEffect(() => {

        const cityQuery = search.get('city') || 'Все города';
        dispatch(searchCityValue(cityQuery));

        const skillsFromURL = search.getAll('skills');
        if (skillsFromURL.length > 0) {
            skillsList.forEach(skill => dispatch(deleteSkill(skill)));
            skillsFromURL.forEach(skill => dispatch(addSkill(skill)));
        }
    }, [search, dispatch]);


    useEffect(() => {

        const newSearch = new URLSearchParams(search);
        newSearch.delete('skills');

        skillsList.forEach(skill => {
            newSearch.append('skills', skill);
        });

        if (search.toString() !== newSearch.toString()) {
            setSearch(newSearch, { replace: true });
        }
    }, [skillsList, setSearch, search]);

    const cityValues = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCity = event.currentTarget.value;

        const newSearch = new URLSearchParams(search);
        if (newCity && newCity !== 'Все города') {
            newSearch.set('city', newCity);
        } else {
            newSearch.delete('city');
        }

        setSearch(newSearch);
        dispatch(resetPage());
    };

    const handleDelete = (item: string) => {
        dispatch(deleteSkill(item));
        dispatch(resetPage());
    };

    const handleSetupValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSkillValue(event.currentTarget.value));
    };

    const handleAddSkill = () => {
        if (skillValue.trim()) {
            dispatch(addSkill(skillValue.trim()));
            dispatch(resetPage());
        }
    };

    return (
        <div className='VacancyFilter'>
            <div className='VacancyFilter__Skills'>
                <span className='VacancyFilter__Skills--text'>Ключевые навыки</span>
                <div className='VacancyFilter__Skills--form'>
                <input className='VacancyFilter__Skills--input' placeholder=' Навык' onChange={handleSetupValue}/>
                <button className={`VacancyFilter__Skills-button--${Boolean(skillValue)}`} onClick={handleAddSkill}></button>
                </div>
                <div className='VacancyFilter__skillList'>
                    {skillsList.map((item: string) => (
                        <FilterCard key={item} card={item} onDelete={() => handleDelete(item)}  />
                    ))}
                </div>
            </div>
            <div className='VacancyFilter__City'>
                <select
                    className='VacancyFilter__City--select'
                    id="mySelect"
                    value={search.get('city') || ''}
                    onChange={cityValues}
                >
                    {Array.from(vacancyCity).map((item: string) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
};

export default VacancyFilter;