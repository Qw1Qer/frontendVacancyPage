import './VacancySearch.css'
import {useAppDispatch} from "../../hooks/reducer.ts";
import {resetPage, setupSearchValue} from "../../store/slices/VacancySlice.ts";
import {useEffect, useRef} from "react";
import {useSearchParams} from "react-router-dom";




const VacancySearch = () => {

    const dispatch = useAppDispatch();
    const [search, setSearch] = useSearchParams();



    useEffect(() => {
        const searchQuery = search.get('search') || '';

        dispatch(setupSearchValue(searchQuery));

    },[search,dispatch]);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSetupSearchValue = () => {
        if (inputRef.current) {
            const value = inputRef.current.value.trim();

            const newParams = new URLSearchParams(search.toString());

            if (value) {
                newParams.set('search', value);
            } else {
                newParams.delete('search');
            }

            setSearch(newParams, { replace: true });
            dispatch(resetPage());
        }
    };


    return (
        <div className="VacancySearch">
            <div className="VacancySearch__text">
                <h2>Список вакансий</h2>
                <span>по профессии Frontend-разработчик</span>
            </div>
            <div className="VacancySearch__input">
            <input placeholder="Должность или название компании" ref={inputRef} />
            <button onClick={handleSetupSearchValue}>Найти</button>
            </div>
        </div>
    );
};

export default VacancySearch;