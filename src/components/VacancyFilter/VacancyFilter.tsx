import './VacancyFilter.css'
import FilterCard from "../FilterCard/FilterCard.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/reducer.ts";
import {addSkill, deleteSkill, searchCityValue, setupSearchValue} from "../../store/slices/VacancySlice.ts";
import * as React from "react";

const VacancyFilter = () => {

    const dispatch = useAppDispatch();
    const filterCards = useAppSelector(state => state.vacancy.filterCards);
    const skill = useAppSelector(state => state.vacancy.searchValue)
    const vacancyCity = useAppSelector(state => state.vacancy.cities)

    const cityValues = (event: React.ChangeEvent<HTMLSelectElement> ) =>
    {
        dispatch(searchCityValue(event.currentTarget.value));
    }

    const handleDelete = (item: string) => {
        dispatch(deleteSkill(item));
    }

    const handleSetupValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setupSearchValue(event.currentTarget.value));

    }

    const handleAddSkill = () => {
        if (skill.trim()) {
            dispatch(addSkill(skill));
        }
    }

    return (
        <div className='VacancyFilter'>
            <div className='VacancyFilter__Skills'>
                <span className='VacancyFilter__Skills--text'>Ключевые навыки</span>
                <div className='VacancyFilter__Skills--form'>
                <input className='VacancyFilter__Skills--input' placeholder=' Навык' onChange={handleSetupValue}/>
                <button className={`VacancyFilter__Skills-button--${Boolean(skill)}`} onClick={handleAddSkill}>+</button>
                </div>
                <div className='VacancyFilter__skillList'>
                    {filterCards.map((item: string) => (
                        <FilterCard key={item} card={item} onDelete={() => handleDelete(item)}  />
                    ))}
                </div>
            </div>
            <div className='VacancyFilter__City'>
                <select
                    className='VacancyFilter__City--select'
                    id="mySelect"
                    onChange={cityValues}
                >
                    {Array.from(vacancyCity).map((item:string ) => (
                        <option key={item}>{item}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VacancyFilter;