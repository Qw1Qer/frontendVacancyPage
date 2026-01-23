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

const VacancyFilter = () => {

    const dispatch = useAppDispatch();
    const filterCards = useAppSelector(state => state.vacancy.skillsList);
    const vacancyCity = useAppSelector(state => state.vacancy.cities)
    const skillValue = useAppSelector(state => state.vacancy.skillPointValue)

    const cityValues = (event: React.ChangeEvent<HTMLSelectElement> ) => {
        dispatch(searchCityValue(event.currentTarget.value));
        dispatch(resetPage())
    }

    const handleDelete = (item: string) => {
        dispatch(deleteSkill(item));
        dispatch(resetPage())
    }

    const handleSetupValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSkillValue(event.currentTarget.value));
    }

    const handleAddSkill = () => {
        if (skillValue.trim()) {
            dispatch(addSkill(skillValue));
            dispatch(resetPage())
        }
    }

    return (
        <div className='VacancyFilter'>
            <div className='VacancyFilter__Skills'>
                <span className='VacancyFilter__Skills--text'>Ключевые навыки</span>
                <div className='VacancyFilter__Skills--form'>
                <input className='VacancyFilter__Skills--input' placeholder=' Навык' onChange={handleSetupValue}/>
                <button className={`VacancyFilter__Skills-button--${Boolean(skillValue)}`} onClick={handleAddSkill}>+</button>
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